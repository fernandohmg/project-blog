import fs from "fs/promises";
import matter from "gray-matter";
import { existsSync } from "node:fs";
import path from "path";
import React from "react";

export async function getBlogPostList() {
  const fileNames = await readDirectory("/content");

  const blogPosts = [];

  for (let fileName of fileNames) {
    const rawContent = await readFile(`/content/${fileName}`);

    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace(".mdx", ""),
      ...frontmatter,
    });
  }

  return blogPosts.sort((p1, p2) => (p1.publishedOn < p2.publishedOn ? 1 : -1));
}

export const loadBlogPost = React.cache(async (slug) => {
  const path = `/content/${slug}.mdx`;

  if (!fileExists(path)) {
    return null;
  }

  const rawContent = await readFile(path);

  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
});

function readFile(localPath) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

function readDirectory(localPath) {
  return fs.readdir(path.join(process.cwd(), localPath));
}

function fileExists(localPath) {
  return existsSync(path.join(process.cwd(), localPath));
}
