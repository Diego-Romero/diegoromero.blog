import Layout, { siteTitle } from "layouts/layout";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { getSortedPostsData, Post } from "utils/posts";

interface Props {
  allPosts: Post[];
}

export const BlogIndex: React.FunctionComponent<Props> = ({ allPosts }) => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle + " - Blog"}</title>
      </Head>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPosts = getSortedPostsData();
  return {
    props: {
      allPosts,
    },
  };
};

export default BlogIndex;
