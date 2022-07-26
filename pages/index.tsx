import Head from "next/head";
import Layout, {
  borderColor,
  gradientMain,
  siteTitle,
} from "../layouts/layout/layout";
import { getSortedPostsData, Post } from "../utils/posts";
import NextLink from "next/link";
import Date from "../components/Date";
import { GetStaticProps, NextPage } from "next";
import {
  Avatar,
  Flex,
  Heading,
  Link,
  List,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

interface Props {
  allPosts: Post[];
}

const Home: NextPage<Props> = (props) => {
  const { allPosts } = props;
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Flex
        flexDir={["column", null, "row"]}
        width="100%"
        justifyContent="space-between"
        height="100%"
      >
        <Stack spacing={4} alignItems="center" width="50%" pt="8">
          <Avatar
            size="4xl"
            name="Diego Romero"
            src="/images/profile-image.jpeg"
          />
          <Heading
            as="h1"
            margin={0}
            fontSize="8xl"
            bgGradient={gradientMain}
            bgClip="text"
          >
            Hola! I'm Diego
          </Heading>
          <Heading as="h2">
            I'm a Software Engineer @Snapchat, and living in London, UK.
          </Heading>
        </Stack>
        <Stack
          justifyContent="flex-start"
          alignItems="flex-end"
          borderLeft="1px"
          borderColor={borderColor}
          textAlign="right"
          pl="10"
          pt="8"
        >
          <Heading as="h3" fontSize="3xl">
            Blog Latest
          </Heading>
          <UnorderedList>
            {allPosts.map(({ id, date, title }) => (
              <ListItem key={id}>
                <NextLink href={`/blog/${id}`} passHref>
                  <Link>{title}</Link>
                </NextLink>
                <br />
                <Text color="gray.500">
                  <Date dateString={date} />
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        </Stack>
      </Flex>
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

export default Home;
