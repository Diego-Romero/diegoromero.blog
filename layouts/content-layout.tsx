import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: React.ReactNode;
  title: string;
}

const ContentLayout = ({ children, title }: Props) => {
  return (
    <Flex>
      <Stack>
        <Heading>{title}</Heading>
        <Box>{children}</Box>
      </Stack>
      <Stack>side bar goes here</Stack>
    </Flex>
  );
};

export default ContentLayout;
