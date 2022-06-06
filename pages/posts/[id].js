import Layout from "../../layouts/layout/layout";
import {getAllPostsIds, getPostData} from "../../utils/posts";
import Head from 'next/head'
import Date from "../../components/Date";
import utilStyles from '../../styles/utils.module.css';


function Post({ postData }) {
   return (
       <Layout>
           <Head>
               <title>{postData.title}</title>
           </Head>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
           <div className={utilStyles.lightText}>
               <Date dateString={postData.date} />
           </div>
           <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
       </Layout>
   )
}

export async function getStaticPaths() {
    const paths = getAllPostsIds();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}

export default Post;