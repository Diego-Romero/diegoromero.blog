import {
  Flex,
  Text,
  Stack,
  Heading,
  Box,
  Code,
  List,
  ListItem,
  Tag,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { Post } from "utils/posts";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Date from "components/Date";

interface Props {
  content: Post;
}

// @ts-ignore
const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <Box boxShadow="lg">
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, "")}
        style={nightOwl}
        showLineNumbers
        language={match[1]}
        PreTag="div"
        {...props}
      />
    </Box>
  ) : (
    <Code className={className} {...props} children={children} />
  );
};

const myTheme: object = {
  code: CodeBlock,
  p: ({ children }: { children: React.ReactNode }) => (
    <Text pb={2} fontSize="lg">
      {children}
    </Text>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote>
      <Flex borderLeft="5px solid" borderColor="gray.300" alignItems="center">
        <Text fontSize="lg" ml="3" verticalAlign="center">
          {children}
        </Text>
      </Flex>
    </blockquote>
  ),
  h1: ({ children }: { children: React.ReactNode }) => (
    <Heading as="h1" fontSize="6xl">
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
        <ReactMarkdown
          components={ChakraUIRenderer(myTheme)}
          children={content.markdown}
          skipHtml
        />
      </Stack>
      <Stack
        p="4"
        width={["100%", null, "20%"]}
        spacing="4"
        borderLeft="1px solid"
      >
        <Date dateString={content.date} />
        <Flex flexWrap="wrap">
          {/* @ts-ignore */}
          {content.tags.map((tag: string) => (
            <Tag mb="2" mr="2" colorScheme="cyan" variant="subtle" size="lg">
              {tag}
            </Tag>
          ))}
        </Flex>
      </Stack>
    </Flex>
  );
};

export default ContentLayout;
