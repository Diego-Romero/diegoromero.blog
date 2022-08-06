import Head from "next/head";
import Layout, {
  borderColor,
  gradientMain,
  siteTitle,
} from "../layouts/layout";
import { getSortedPostsData, Post } from "../utils/posts";
import NextLink from "next/link";
import Date from "../components/Date";
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
  UnorderedList,
} from "@chakra-ui/react";
import {
  FaCode,
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { IconType } from "react-icons";
import React from "react";

interface Props {
  allPosts: Post[];
}

const iconsSize = "4xl";
const tags = {
  typescript: "Typescript",
  react: "React",
  nextjs: "Next JS",
  firebase: "Firebase",
  googleCloudFunctions: "Google Cloud Functions",
  vercel: "Vercel",
  mouseTrap: "Mouse Trap",
  netlify: "Netlify",
  mongoDb: "Mongo DB",
  node: "Node",
  express: "Express",
  aws: "Aws",
  passportJs: "Passport JS",
  sendgrid: "Sendgrid",
  docusaurus: "Docusaurus",
};
const featuredProjects: {
  title: string;
  description: string[];
  url: string;
  tags: string[];
  links: { name: string; url: string; icon: IconType }[];
  icon: IconType;
}[] = [
  {
    title: "Deepflow",
    description: [
      "Deepflow is a software research project whose focus is to find out whether it is possible to help the user achieve more and better periods of Deep Work.",
    ],
    icon: FaCode,
    url: "http://deepflow.vercel.app",
    links: [
      {
        name: "Website",
        url: "http://deepflow.vercel.app",
        icon: FaExternalLinkAlt,
      },
      {
        name: "Github",
        url: "https://github.com/Diego-Romero/deepflow",
        icon: FaGithub,
      },
      {
        name: "Demo",
        url: "https://www.youtube.com/watch?v=A3RsoN5fAz4",
        icon: FaYoutube,
      },
    ],
    tags: [
      tags.typescript,
      tags.react,
      tags.firebase,
      tags.googleCloudFunctions,
      tags.nextjs,
      tags.vercel,
    ],
  },
  {
    title: "Listu",
    description: [
      "Looking to keep track of lists with your friends, team-mates, etc?",
    ],
    icon: FaCode,
    url: "https://listu.me",
    links: [
      {
        name: "Website",
        url: "https://listu.me",
        icon: FaExternalLinkAlt,
      },
      {
        name: "Github Client",
        url: "https://github.com/Diego-Romero/listu-client",
        icon: FaGithub,
      },
      {
        name: "Github API",
        url: "https://github.com/Diego-Romero/listu-api",
        icon: FaGithub,
      },
    ],
    tags: [
      tags.typescript,
      tags.react,
      tags.node,
      tags.express,
      tags.aws,
      tags.mongoDb,
    ],
  },
  {
    title: "KODR",
    description: [
      "Looking to learn some fundamentals about algorithms in other languages different than English? ",
    ],
    icon: FaCode,
    url: "https://listu.me",
    links: [
      {
        name: "Website",
        url: "https://kodr.me/en",
        icon: FaExternalLinkAlt,
      },
    ],
    tags: [tags.typescript, tags.react, tags.netlify, tags.docusaurus],
  },
];

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
        {featuredProjects.map((project, index) => (
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
                  colorScheme="cyan"
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
                  colorScheme="cyan"
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
