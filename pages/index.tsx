import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import Layout, { siteTitle } from "../layouts/layout/layout";
import { getSortedPostsData, Post } from "../utils/posts";
import Link from "next/link";
import Date from "../components/Date";
import { GetStaticProps, NextPage } from "next";
import { Avatar, Stack, Text } from "@chakra-ui/react";

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
      <Stack justifyContent="center" alignItems="center" spacing={6}>
        <Avatar
          size="2xl"
          name="Diego Romero"
          src="/images/profile-image.jpeg"
        />
        <Text>
          Hi, my name is Diego Romero and I'm a Software Engineer living in
          London. I currently work as a fullstack engineer at Voisey (owned by
          Snap). You can contact me in Twitter.
        </Text>
      </Stack>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPosts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
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
