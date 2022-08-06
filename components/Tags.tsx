import { HStack, Stack, Tag } from "@chakra-ui/react";
import React from "react";

interface Props {
  tags: string[];
  direction?: "horizontal" | "vertical";
}

const Tags: React.FunctionComponent<Props> = ({
  tags,
  direction = "horizontal",
}) => {
  if (direction === "vertical")
    return (
      <Stack spacing={2}>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Stack>
    );

  return (
    <HStack spacing={2}>
      {tags.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </HStack>
  );
};

export default Tags;
