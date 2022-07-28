import Layout from "../../layouts/layout";
import { getAllPostsIds, Post, getPostData } from "../../utils/posts";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import ContentLayout from "../../layouts/content-layout";

interface Props {
  post: Post;
}

export const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <ContentLayout content={post} />
    </Layout>
  );
};

interface Params extends ParsedUrlQuery {
  postId: string;
}

/* This is needed to know which static paths will be available */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostsIds();
  return {
    paths,
    fallback: false,
  };
};

/* This are the props that will be passed down to each individual post at build time */
export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { postId } = params!;
  const post = await getPostData(postId);
  return {
    props: {
      post,
    },
  };
};

export default PostPage;
