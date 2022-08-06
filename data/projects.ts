import { IconType } from "react-icons";
import { FaCode, FaExternalLinkAlt, FaGithub, FaYoutube } from "react-icons/fa";
import { tags } from "./tags";

export const projects: {
  title: string;
  description: string[];
  url: string;
  tags: string[];
  links: { name: string; url: string; icon: IconType }[];
  icon: IconType;
}[] = [
  {
    title: "Deepflow",
    description: [
      "Deepflow is a software research project whose focus is to find out whether it is possible to help the user achieve more and better periods of Deep Work.",
    ],
    icon: FaCode,
    url: "http://deepflow.vercel.app",
    links: [
      {
        name: "Website",
        url: "http://deepflow.vercel.app",
        icon: FaExternalLinkAlt,
      },
      {
        name: "Github",
        url: "https://github.com/Diego-Romero/deepflow",
        icon: FaGithub,
      },
      {
        name: "Demo",
        url: "https://www.youtube.com/watch?v=A3RsoN5fAz4",
        icon: FaYoutube,
      },
    ],
    tags: [
      tags.typescript,
      tags.react,
      tags.firebase,
      tags.googleCloudFunctions,
      tags.nextjs,
      tags.vercel,
    ],
  },
  {
    title: "Listu",
    description: [
      "Looking to keep track of lists with your friends, team-mates, etc?",
    ],
    icon: FaCode,
    url: "https://listu.me",
    links: [
      {
        name: "Website",
        url: "https://listu.me",
        icon: FaExternalLinkAlt,
      },
      {
        name: "Github Client",
        url: "https://github.com/Diego-Romero/listu-client",
        icon: FaGithub,
      },
      {
        name: "Github API",
        url: "https://github.com/Diego-Romero/listu-api",
        icon: FaGithub,
      },
    ],
    tags: [
      tags.typescript,
      tags.react,
      tags.node,
      tags.express,
      tags.aws,
      tags.mongoDb,
    ],
  },
  {
    title: "KODR",
    description: [
      "Looking to learn some fundamentals about algorithms in other languages different than English? ",
    ],
    icon: FaCode,
    url: "https://listu.me",
    links: [
      {
        name: "Website",
        url: "https://kodr.me/en",
        icon: FaExternalLinkAlt,
      },
    ],
    tags: [tags.typescript, tags.react, tags.netlify, tags.docusaurus],
  },
];
