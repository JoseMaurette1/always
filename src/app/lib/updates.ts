import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const updatesDirectory = path.join(process.cwd(), "src/app/content/updates");

export type Update = {
  id: string;
  title: string;
  date: string;
  content: string;
};

export const getUpdates = async (): Promise<Update[]> => {
  try {
    const fileNames = await fs.readdir(updatesDirectory);

    const updates = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map(async (fileName) => {
          const id = fileName.replace(/\.md$/, "");
          const fullPath = path.join(updatesDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          return {
            id,
            title: data.title,
            date: data.date,
            content,
          };
        })
    );

    return updates.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error loading updates:", error);
    return [];
  }
};
