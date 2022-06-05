import Head from "next/head";

function FirstPost() {
    return (
      <>
        <Head>
          <title>My first post</title>
          <Script
            src="https://connect.facebook.net/en_US/sdk.js"
            strategy="lazyOnload"
            onLoad={() =>
              console.log(
                `script loaded correctly, window.FB has been populated`
              )
            }
          />
        </Head>
        <>
          <h1>My first post</h1>
        </>
      </>
    );
}

export default FirstPost;