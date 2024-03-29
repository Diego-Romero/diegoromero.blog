import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData(): Post[] {
  // get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    // remove .md from file name to get the id
    const id = fileName.replace(/\.md$/, "");

    // read markdown file as a string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    // use gray-matter to parse the post metadata section
    const { data } = matter(fileContent);

    const post = {
      id,
      ...data,
    } as Post;

    return post;
  });

  // sort the posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    return 0;
  });
}

/*
Important: The returned list is not just an array of strings — it must be an array of objects that look like the comment above. Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name). Otherwise, getStaticPaths will fail.
 */
export function getAllPostsIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  const result = fileNames.map((fileName) => {
    const postId = fileName.replace(/\.md$/, "");
    return {
      params: {
        postId,
      },
    };
  });
  return result;
}

export interface PostMeta {}

export interface Post {
  id: string;
  markdown: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents: string = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents); // parses into front matter and markdown

  return {
    id,
    markdown: content,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags,
  };
}
