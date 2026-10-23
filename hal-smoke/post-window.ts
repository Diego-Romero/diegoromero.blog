export interface Post {
  id: string;
  published: boolean;
  archived: boolean;
}

export function visiblePosts(posts: Post[]): Post[] {
  return posts.filter((post) => post.published);
}

export function pagePosts(posts: Post[], page: number, pageSize: number): Post[] {
  const visible = visiblePosts(posts);
  const start = (page - 1) * pageSize;
  return visible.splice(start, start + pageSize);
}
