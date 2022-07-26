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
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/router";

interface Props {
  allPosts: Post[];
}

const iconsSize = "4xl";

const Home: NextPage<Props> = (props) => {
  const { allPosts } = props;
  const router = useRouter();
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Flex
        flexDir={["column", null, "row"]}
        width="100%"
        justifyContent={["center", null, "space-between"]}
        height="100%"
      >
        <Stack spacing={[4, null, 8]} width={["100%", null, "50%"]} py="8">
          <Avatar
            size="4xl"
            name="Diego Romero"
            src="/images/profile-image.jpeg"
            boxShadow="outline"
          />
          <Box>
            <Heading
              as="h1"
              margin={0}
              fontSize="8xl"
              bgGradient={gradientMain}
              bgClip="text"
            >
              Hola!
            </Heading>
            <Heading as="h1" margin={0} fontSize="6xl">
              I'm Diego 🤙🏽
            </Heading>
          </Box>
          <Heading as="h2">
            I'm a Software Engineer from 🇬🇹, working{" "}
            <Link href="https://www.snapchat.com">@Snapchat</Link>, based in
            London 🇬🇧
          </Heading>
          <HStack>
            <IconButton
              aria-label="twitter"
              icon={<FaTwitter />}
              size="2xl"
              fontSize={iconsSize}
              variant="ghost"
              colorScheme="twitter"
              onClick={() =>
                router.push(
                  "https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fkodr.me%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5Ediego_romero_x&region=follow_link&screen_name=diego_romero_x"
                )
              }
            />
            <IconButton
              aria-label="Github"
              icon={<FaGithub />}
              size="2xl"
              fontSize={iconsSize}
              variant="ghost"
              onClick={() => router.push("https://github.com/diego-romero")}
            />
            <IconButton
              aria-label="Linkedin"
              icon={<FaLinkedin />}
              size="2xl"
              colorScheme="linkedin"
              fontSize={iconsSize}
              variant="ghost"
              onClick={() =>
                router.push("https://www.linkedin.com/in/dev-diego-romero/")
              }
            />
          </HStack>
          <Stack>
            <Heading as="h3">About</Heading>
            <Text>
              I'm passionate about technology and software, particularly about
              toying with emerging technologies. Most recently I've been
              building projects with Typescript, Javascript, Serverless
              technologies, Firebase, React, Node, Kotlin, Java and Android. In
              my spare time you will find me learning Brazilian Jiu Jitsu,
              dancing salsa or playing guitar.
            </Text>
          </Stack>
          <Stack>
            <Heading as="h3">Featured Projects</Heading>
            <Text>List featured projects</Text>
          </Stack>
          <Stack>
            <Heading as="h3">Featured Articles</Heading>
            <Text>List featured articles</Text>
          </Stack>
        </Stack>
        <Stack
          justifyContent="flex-start"
          alignItems="flex-end"
          borderLeft="1px"
          borderColor={borderColor}
          textAlign="right"
          pl="10"
          py="8"
        >
          <Heading as="h3" fontSize="3xl">
            Latest Articles
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
