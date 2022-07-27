import Head from "next/head";
import React from "react";
import NextLink from "next/link";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaMoon, FaSun } from "react-icons/fa";

export const siteTitle = "Diego Romero - Blog";

const maxW = "800px";
export const gradientMain = "linear(to-l, #7928CA, #FF0080)";
export const gradientSecondary = "linear(to-r, green.200, pink.500)";
export const borderColor = "gray.400";

const NavLink: React.FunctionComponent<{ href: string; text: string }> = ({
  href,
  text,
}) => {
  return (
    <NextLink href={href} passHref>
      <Link>
        <Text fontSize="xl">{text}</Text>
      </Link>
    </NextLink>
  );
};

const NavBar = () => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      as="header"
      // color="gray.700"
      borderBottom="1px"
      borderColor={borderColor}
      py={4}
      px={4}
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        maxW={maxW}
        width="100%"
        alignContent="center"
        justifyContent="space-between"
      >
        <Text
          fontSize="2xl"
          fontWeight="extrabold"
          onClick={() => router.push("/")}
          cursor="pointer"
          _hover={{
            bgGradient: gradientMain,
            bgClip: "text",
          }}
        >
          Diego Romero
        </Text>
        <HStack spacing="4">
          <NavLink href="/blog" text="Blog" />
          <NavLink href="/projects" text="Projects" />
          <NavLink href="/Books" text="Books" />
          <IconButton
            aria-label="toggle color mode"
            variant="ghost"
            colorScheme="cyan"
            fontSize="xl"
            size="md"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
          />
        </HStack>
      </Flex>
    </Flex>
  );
};

interface Props {
  home?: boolean;
  children?: React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = ({ children, home }) => {
  return (
    <Box>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Diego Romero</title>
      </Head>
      <NavBar />
      <Flex alignItems="center" as="main" flexDir="column" width="100%" px={4}>
        <Box maxW={maxW} width="100%" height="100%">
          {children}
        </Box>
      </Flex>
      {!home && (
        <Flex>
          <NavLink href="/" text="← Back to home" />
        </Flex>
      )}
    </Box>
  );
};

export default Layout;
