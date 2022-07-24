import Layout from "../../layouts/layout/layout";
import { getAllPostsIds, Post, getPostData } from "../../utils/posts";
import Head from "next/head";
import Date from "../../components/Date";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

// function Post(props): NextPage<PostProps> {
//   const { postData } = props;
//   return (
//     <Layout>
//       <Head>
//         <title>{postData.title}</title>
//       </Head>
//       <h1>{postData.title}</h1>
//       <div>
//         <Date dateString={postData.date} />
//       </div>
//       <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
//     </Layout>
//   );
// }

interface Props {
  post: Post;
}

export const PostPage: NextPage<Props> = ({ post }) => {
  console.log(post);
  return <div>Post goes here</div>;
};

interface Params extends ParsedUrlQuery {
  postId: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { postId } = params!;
  console.log(params);

  const post = await getPostData(postId);
  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = getAllPostsIds();
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};

export default Post;
