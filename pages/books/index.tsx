import NextLink from "next/link";
import {
  Box,
  Stack,
  Heading,
  Link,
  List,
  ListItem,
  HStack,
  Text,
} from "@chakra-ui/react";
import Layout, { siteTitle } from "layouts/layout";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { SimpleDate } from "components/DateComponent";
import Tags from "components/Tags";
import { getSortedBooksData, Book } from "../../utils/books";

interface Props {
  allBooks: Book[];
}

export const BlogIndex: React.FunctionComponent<Props> = ({ allBooks }) => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle + " - Blog"}</title>
      </Head>
      <Stack mt={4} spacing={4}>
        <Heading as="h1" fontSize="4xl">
          Books
        </Heading>
        <List spacing={3}>
          {allBooks.map((book) => (
            <ListItem
              key={book.id}
              borderBottom="1px solid"
              pb={2}
              borderColor="gray.100"
            >
              <Stack>
                <HStack>
                  <NextLink href={`/books/${book.id}`} passHref>
                    <Link>
                      <Text fontSize="lg">{book.title}</Text>
                    </Link>
                  </NextLink>
                </HStack>
                <Box color="gray.500" mt={2}>
                  <Text fontSize="sm">
                    <SimpleDate dateString={book.date} />
                  </Text>
                </Box>
                <Text fontSize="sm">{book.description}</Text>
                <Tags tags={book.tags} />
              </Stack>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allBooks = getSortedBooksData();
  return {
    props: {
      allBooks,
    },
  };
};

export default BlogIndex;
