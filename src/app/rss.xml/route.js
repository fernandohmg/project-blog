import { BLOG_DESCRIPTION, BLOG_TITLE, BLOG_URL } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";
import RSS from "rss";

export async function GET() {
  const posts = await getBlogPostList();

  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      date: post.publishedOn,
      url: `${BLOG_URL}/${post.slug}`,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
