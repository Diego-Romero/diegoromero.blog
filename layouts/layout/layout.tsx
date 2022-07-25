import Head from "next/head";
import React from "react";
import NextLink from "next/link";
import { Flex, HStack, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const siteTitle = "Diego Romero - Blog";

const maxW = "960px";
const gradientMain = "linear(to-l, #7928CA, #FF0080)";
const gradientSecondary = "linear(to-r, green.200, pink.500)";

const NavLink: React.FunctionComponent<{ href: string; text: string }> = ({
  href,
  text,
}) => {
  return (
    <NextLink href={href} passHref>
      <Link>{text}</Link>
    </NextLink>
  );
};

const NavBar = () => {
  const router = useRouter();
  return (
    <Flex
      as="header"
      borderBottom="1px"
      borderColor="gray.200"
      mb={4}
      py={4}
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        maxW={maxW}
        width="100%"
        px={8}
        alignContent="center"
        justifyContent="space-between"
      >
        <Text
          fontSize="2xl"
          bgGradient={gradientMain}
          bgClip="text"
          fontWeight="extrabold"
          onClick={() => router.push("/")}
          cursor="pointer"
          _hover={{
            bgGradient: gradientSecondary,
          }}
        >
          Diego Romero
        </Text>
        <HStack spacing="4">
          <NavLink href="/" text="Home" />
          <NavLink href="/blog" text="blog" />
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
    <div>
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
      {/* <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile-image.jpeg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile-image.jpeg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header> */}
      <main>{children}</main>
      {!home && (
        <Flex>
          <NavLink href="/" text="← Back to home" />
        </Flex>
      )}
    </div>
  );
};

export default Layout;
