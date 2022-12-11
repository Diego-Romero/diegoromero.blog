import NextLink from "next/link";
import {
  Box,
  Stack,
  Heading,
  Link,
  List,
  ListItem,
  HStack,
} from "@chakra-ui/react";
import Layout, { siteTitle } from "layouts/layout";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { getSortedPostsData, Post } from "utils/posts";
import { SimpleDate } from "components/DateComponent";
import Tags from "components/Tags";

interface Props {
  allPosts: Post[];
}

export const BlogIndex: React.FunctionComponent<Props> = ({ allPosts }) => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle + " - Blog"}</title>
      </Head>
      <Stack mt={4} spacing={4}>
        <Heading as="h1" fontSize="4xl">
          Posts
        </Heading>
        <List spacing={3}>
          {allPosts.map((post) => (
            <ListItem
              key={post.id}
              borderBottom="1px solid"
              pb={2}
              borderColor="gray.100"
            >
              <Stack>
                <HStack>
                  <NextLink href={`/blogs/${post.id}`} passHref>
                    <Link>👉🏽 {post.title}</Link>
                  </NextLink>
                  <Box color="gray.500" mt={2}>
                    <SimpleDate dateString={post.date} />
                  </Box>
                </HStack>
                <Tags tags={post.tags} />
              </Stack>
            </ListItem>
          ))}
        </List>
      </Stack>
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
