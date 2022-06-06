import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Layout, {siteTitle} from "../layouts/layout/layout";
import {getSortedPostsData} from "../utils/posts";
import Link from "next/link";
import Date from "../components/Date";

export default function Home(props) {
    const {allPostsData } = props;
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>Hi, my name is Diego Romero and I'm a Software Engineer living in London. I currently work as a fullstack engineer at Voisey (owned by Snap). You can contact me in Twitter.</p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
               <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({id, date, title}) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}><a>{title}</a></Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}

export async function getStaticProps() {
   const allPostsData = getSortedPostsData();
   return {
       props: {
           allPostsData,
       }
   }
}