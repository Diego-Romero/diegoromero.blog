import {
  Flex,
  Text,
  Stack,
  Heading,
  Box,
  Code,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { Post } from "utils/posts";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { borderColor } from "./layout";
import { DateComponent } from "components/DateComponent";
import Tags from "components/Tags";

interface Props {
  content: Post;
}

// @ts-ignore
const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <Box boxShadow="lg">
      <SyntaxHighlighter
        style={nightOwl}
        showLineNumbers
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {children}
      </SyntaxHighlighter>
    </Box>
  ) : (
    <Code className={className} {...props}>
      {children}
    </Code>
  );
};

const myTheme: object = {
  code: CodeBlock,
  p: ({ children }: { children: React.ReactNode }) => (
    <Text pb={2} fontSize="lg">
      {children}
    </Text>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { colorMode } = useColorMode();
    const isLight = colorMode === "light";
    return (
      <blockquote>
        <Flex
          borderLeft="5px solid"
          borderColor={isLight ? "gray.300" : "gray.500"}
          alignItems="center"
          bgColor={isLight ? "gray.100" : "gray.700"}
          justifyContent="center"
          py={2}
          mb={2}
        >
          <Text as="span" fontSize="lg" ml="3" verticalAlign="center">
            {children}
          </Text>
        </Flex>
      </blockquote>
    );
  },
  h1: ({ children }: { children: React.ReactNode }) => (
    <Heading as="h1" fontSize="6xl" mb={4}>
      {children}
    </Heading>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <Heading as="h2" py={4} fontSize="4xl">
      {children}
    </Heading>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <Heading as="h2" py={4} fontSize="3xl">
      {children}
    </Heading>
  ),
};

const ContentLayout = ({ content }: Props) => {
  return (
    <Flex flexDir={["column", null, "row"]} pb={8}>
      <Stack maxW={["100%", null, "80%"]} py="4" pr="4">
        <ReactMarkdown components={ChakraUIRenderer(myTheme)} skipHtml>
          {content.markdown}
        </ReactMarkdown>
      </Stack>
      <Stack
        p="4"
        width={["100%", null, "15%"]}
        spacing="4"
        borderLeft={`1px solid `}
        borderColor={borderColor}
      >
        <DateComponent dateString={content.date} />
        <Tags direction="vertical" tags={content.tags} />
      </Stack>
    </Flex>
  );
};

export default ContentLayout;
