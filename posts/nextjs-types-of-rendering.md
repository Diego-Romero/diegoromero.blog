---
title: "Types of rendering in Next JS"
description: "NextJS types of rendering"
date: "2022-07-10"
tags:
  - react
  - nextjs
  - web
  - javascript
---

# Types of rendering in Next JS

## Pre Rendering

By default NextJs pre-renders every page. This means that it generates HTML in advance for every page, rather than having it all done by client side JS. This results in better performance and SEO.

Each of these generated HTML pages is associated with the minimal Javascript code necessary for that page. When a page is loaded by the browser, its Javascript code runs and makes the page fully interactive (**hydration**)

## Two types of pre-rendering

### Static Generation

is the pre-rendering that generates HTML at **build time.** The HTML generated gets reused at every request.

This is the preferred and recommended method, because the page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

Good use cases:

- Marketing pages
- Blogs
- E-commerce product listings
- Documentation

Static generation can be created at build time with or without data. Whenever we would like to fetch data at build time, we use `getStaticProps` (in dev, this runs on each request instead).

```jsx
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

You can also fetch data from other sources, like an external API, such as:

```jsx
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

This is possible because `getStaticProps` only runs on the server side. It will never run on the client-side. It won’t even be included inn the JS bundle for the browser. Meaning you can write code such as direct DB queries without them being sent to browsers.

> it is important to make the distinction that in **development** `getStaticProps` will run on every request. In **production** it will run at build time.

### Server Side Rendering

is the pre-rendering method that generates HTML on **each request.** This is slower, but the pre-rendered page will always be up to date. Or you can skip pre-rendering and use client-side JS to populate frequently updated data. To use this we need to use `getServerSideProps:`

```jsx
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

> Because is called at request time, its parameter `context` contains request specific parameters.

You should only use this if you need to pre-render a page whose data must be fetched at request time. TTFB (Time to first byte) will be slower than getStaticProps because the server must compute the result on every request, and this result can’t be cached by the CDN without extra configuration.

### Client Side Rendering

If we don’t need to pre-render data, we can also use this strategy. This will pre-render parts of the page that do not require external data, but when the page loads it will fetch external data from the client using JS.

This approach works well for user dashboard pages, for example. Because a dashboard is a private, user-specific page, SEO is not relevant, and the page doesn’t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching. Vercel also created a React hook for data fetching called SWR, it handles caching, revalidation, focus tracking, refetching on interval and more. Here is an example:

```jsx
import useSWR from "swr";

function Profile() {
  const { data, error } = useSWR("/api/user", fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

### Dynamically Generating Routes

In order to dynamically create routes we need to make use of `getStaticPaths`. The other thing we will need is to specify inside the pages folder the page with `[id].js`. For example creating a page called **`[id].js`** under `pages/posts`. Then inside of that file we can specify all the possible paths, such as:

```jsx
import Layout from "../../components/layout";

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```

In this case it will work this way:

![how-to-dynamic-routes.png](/images/posts/how-to-dynamic-routes.png)

It is also important to note that it is possible to fetch data from any source, including DB’s, CMS systems, etc. There is also a environment distinction in **dev** get static paths will run on every request, whilst in **prod** this will run at build time.

### API Routes

NextJs has support to create its own API endpoints as NodeJs lambda functions. For example if you create a file inside `pages/api` called `hello.js` with the following code:

```jsx
export default function handler(req, res) {
  res.status(200).json({ text: "Hello" });
}
```

You will be able to access this via: [`http://localhost:3000/api/hello`](http://localhost:3000/api/hello).

Some important considerations:

- Do not fetch an API route from `getStaticProps` or `getStaticPaths`, instead write the server side code directly in these functions. That’s because they run on the server side and will never run on the client.
- A good use case would be to handle form input validation. You could for example create a form on the page and have this send a POST request, then you can write your code directly into the DB. This API route will not be part of the client bundle, so its safe to write there.
