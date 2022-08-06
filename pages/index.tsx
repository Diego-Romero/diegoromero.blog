import Head from "next/head";
import Layout, {
  borderColor,
  gradientMain,
  siteTitle,
} from "../layouts/layout";
import { getSortedPostsData, Post } from "../utils/posts";
import NextLink from "next/link";
import { GetStaticProps, NextPage } from "next";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import React from "react";
import { defaultColorScheme } from "theme";
import { DateComponent } from "components/DateComponent";
import { projects } from "../data/projects";

interface Props {
  allPosts: Post[];
}

const iconsSize = "4xl";
const LeftCol = () => (
  <Stack
    spacing={[4, null, 8]}
    width={["100%", null, "50%"]}
    py={["4", null, "8"]}
  >
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
        I&apos;m Diego 🤙🏽
      </Heading>
    </Box>
    <Heading as="h2">
      I&apos;m a Software Engineer from 🇬🇹, working{" "}
      <Link href="https://www.snapchat.com">@Snapchat</Link>, based in London 🇬🇧
    </Heading>
    <HStack>
      <IconButton
        aria-label="twitter"
        icon={<FaTwitter />}
        size="2xl"
        fontSize={iconsSize}
        variant="ghost"
        onClick={() =>
          window.open(
            "https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fkodr.me%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5Ediego_romero_x&region=follow_link&screen_name=diego_romero_x",
            "_blank"
          )
        }
      />
      <IconButton
        aria-label="Github"
        icon={<FaGithub />}
        size="2xl"
        fontSize={iconsSize}
        variant="ghost"
        onClick={() => window.open("https://github.com/diego-romero", "_blank")}
      />
      <IconButton
        aria-label="Linkedin"
        icon={<FaLinkedin />}
        size="2xl"
        // colorScheme="linkedin"
        fontSize={iconsSize}
        variant="ghost"
        onClick={() =>
          window.open("https://www.linkedin.com/in/dev-diego-romero/", "_blank")
        }
      />
    </HStack>
    <Stack>
      <Heading as="h3">About</Heading>
      <Text>
        I&apos;m passionate about technology and software, particularly about
        toying with emerging technologies.
        <br />
        <br />
        Most recently I&apos;ve been building projects with Typescript,
        Javascript, Serverless technologies, Firebase, React, Node, Kotlin, Java
        and Android. In my spare time you will find me working out, dancing
        latin music (salsa/bachata) or playing guitar.
      </Text>
    </Stack>
    <Stack>
      <Heading as="h3">Featured Projects</Heading>
      <List spacing={8}>
        {projects.map((project, index) => (
          <ListItem key={index}>
            <Text fontWeight="bold" fontSize="xl" as="span">
              <ListIcon as={project.icon} fontSize="xl" />
              {project.title}
            </Text>
            <br />
            {project.description.map((text, index) => (
              <Text as="span" key={index}>
                {text}
                <br />
              </Text>
            ))}
            <HStack mt={4}>
              {project.links.map((link, index) => (
                <Button
                  key={index}
                  rightIcon={<link.icon />}
                  variant="outline"
                  colorScheme={defaultColorScheme}
                  onClick={() => window.open(link.url, "_blank")}
                >
                  {link.name}
                </Button>
              ))}
            </HStack>
            <Flex flexDir="row" flexWrap="wrap" mt={2}>
              {project.tags.map((tag, index) => (
                <Badge
                  variant="subtle"
                  colorScheme={defaultColorScheme}
                  key={index}
                  mt={2}
                  mr={2}
                >
                  {tag}
                </Badge>
              ))}
            </Flex>
          </ListItem>
        ))}
      </List>
    </Stack>
    <Stack>
      <Heading as="h3">Featured Articles</Heading>
      <Text>List featured articles</Text>
    </Stack>
  </Stack>
);

const Home: NextPage<Props> = (props) => {
  const { allPosts } = props;
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Flex
        flexDir={["column", null, "row"]}
        width="100%"
        justifyContent={["center", null, "space-between"]}
        height="100%"
      >
        <LeftCol />
        <Stack
          justifyContent="flex-start"
          alignItems={["flex-start", null, "flex-end"]}
          borderLeft={[null, null, "1px"]}
          borderColor={borderColor}
          textAlign={[null, null, "right"]}
          pl={[null, null, "10"]}
          py={[null, null, "8"]}
        >
          <Heading as="h3" fontSize="3xl" mb={2}>
            Latest Articles
          </Heading>
          <List>
            {allPosts.map(({ id, date, title }) => (
              <ListItem key={id} mb={4}>
                <NextLink href={`/blog/${id}`} passHref>
                  <Link>{title}</Link>
                </NextLink>
                <br />
                <Box color="gray.500">
                  <DateComponent dateString={date} />
                </Box>
              </ListItem>
            ))}
          </List>
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
