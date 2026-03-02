import fs from "fs";
import path from "path";
import matter from "gray-matter";

const protocolsDirectory = path.join(process.cwd(), "protocols");

export function getSortedProtocolsData(): Protocol[] {
  const fileNames = fs.readdirSync(protocolsDirectory);

  const allProtocolsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(protocolsDirectory, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContent);

    const protocol = {
      id,
      ...data,
    } as Protocol;

    return protocol;
  });

  return allProtocolsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    return 0;
  });
}

export function getAllProtocolsIds() {
  const fileNames = fs.readdirSync(protocolsDirectory);
  const result = fileNames.map((fileName) => {
    const protocolId = fileName.replace(/\.md$/, "");
    return {
      params: {
        protocolId,
      },
    };
  });
  return result;
}

export interface Protocol {
  id: string;
  markdown: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export async function getProtocolData(id: string): Promise<Protocol> {
  const fullPath = path.join(protocolsDirectory, `${id}.md`);
  const fileContents: string = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    id,
    markdown: content,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags,
  };
}
