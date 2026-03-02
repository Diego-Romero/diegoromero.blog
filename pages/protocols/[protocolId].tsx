import Layout from "../../layouts/layout";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import ContentLayout from "../../layouts/content-layout";
import {
  Protocol,
  getAllProtocolsIds,
  getProtocolData,
} from "utils/protocols";

interface Props {
  protocol: Protocol;
}

export const ProtocolPage: NextPage<Props> = ({ protocol }) => {
  return (
    <Layout>
      <Head>
        <title>{protocol.title}</title>
      </Head>
      <ContentLayout content={protocol} />
    </Layout>
  );
};

interface Params extends ParsedUrlQuery {
  protocolId: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllProtocolsIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { protocolId } = params!;
  const protocol = await getProtocolData(protocolId);
  return {
    props: {
      protocol,
    },
  };
};

export default ProtocolPage;
