import NextLink from "next/link";
import {
  Box,
  Stack,
  Heading,
  Link,
  List,
  ListItem,
  HStack,
  Text,
} from "@chakra-ui/react";
import Layout, { siteTitle } from "layouts/layout";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { SimpleDate } from "components/DateComponent";
import Tags from "components/Tags";
import { getSortedProtocolsData, Protocol } from "../../utils/protocols";

interface Props {
  allProtocols: Protocol[];
}

export const ProtocolsIndex: React.FunctionComponent<Props> = ({
  allProtocols,
}) => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle + " - Protocols"}</title>
      </Head>
      <Stack mt={4} spacing={4}>
        <Heading as="h1" fontSize="4xl">
          Protocols
        </Heading>
        <List spacing={3}>
          {allProtocols.map((protocol) => (
            <ListItem
              key={protocol.id}
              borderBottom="1px solid"
              pb={2}
              borderColor="gray.100"
            >
              <Stack>
                <HStack>
                  <NextLink href={`/protocols/${protocol.id}`} passHref>
                    <Link>
                      <Text fontSize="lg">{protocol.title}</Text>
                    </Link>
                  </NextLink>
                </HStack>
                <Box color="gray.500" mt={2}>
                  <Text fontSize="sm">
                    <SimpleDate dateString={protocol.date} />
                  </Text>
                </Box>
                <Text fontSize="sm">{protocol.description}</Text>
                <Tags tags={protocol.tags} />
              </Stack>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allProtocols = getSortedProtocolsData();
  return {
    props: {
      allProtocols,
    },
  };
};

export default ProtocolsIndex;
