import Layout from "../../layouts/layout";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import ContentLayout from "../../layouts/content-layout";
import { Book, getAllBooksId, getBookData } from "utils/books";

interface Props {
  book: Book;
}

export const BookPage: NextPage<Props> = ({ book }) => {
  return (
    <Layout>
      <Head>
        <title>{book.title}</title>
      </Head>
      <ContentLayout content={book} />
    </Layout>
  );
};

interface Params extends ParsedUrlQuery {
  bookId: string;
}

/* This is needed to know which static paths will be available */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllBooksId();
  return {
    paths,
    fallback: false,
  };
};

/* This are the props that will be passed down to each individual post at build time */
export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { bookId } = params!;
  console.log(bookId);
  const book = await getBookData(bookId);
  return {
    props: {
      book,
    },
  };
};

export default BookPage;
