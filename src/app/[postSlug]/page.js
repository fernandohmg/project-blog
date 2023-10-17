import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";
import { BLOG_TITLE } from "@/constants";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";
import styles from "./postSlug.module.css";
const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo")
);

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);
  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

const components = {
  pre: (props) => <CodeSnippet {...props} />,
  DivisionGroupsDemo,
};

async function BlogPost({ params }) {
  const { frontmatter, content } = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={components} />
      </div>
    </article>
  );
}

export default BlogPost;
