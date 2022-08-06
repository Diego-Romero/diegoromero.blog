import {
  Stack,
  Text,
  Heading,
  List,
  ListItem,
  ListIcon,
  HStack,
  Button,
  Flex,
  Badge,
} from "@chakra-ui/react";
import React from "react";
import { projects } from "../data/projects";
import { defaultColorScheme } from "../theme";

const FeaturedProjects = () => (
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
);

export default FeaturedProjects;
