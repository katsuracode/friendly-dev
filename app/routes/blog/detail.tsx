import Markdown from "react-markdown";
import type { Post } from "~/type";
import type { Route } from "./+types";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { slug } = params;

  const url = new URL("/posts-meta.json", request.url);
  const response = await fetch(url.href);

  if (!response.ok) {
    throw new Response("Failed to fetch post metadata", { status: 500 });
  }

  const posts: Post[] = await response.json();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }

  const markdown = await import(`../../posts/${slug}.md?raw`);
  return { post: { ...post, content: markdown.default } };
};

type BlogDetailLoaderData = {
  loaderData: {
    post: Post & { content: string };
    markdown: string;
  };
};

const BlogDetailPage = ({ loaderData }: BlogDetailLoaderData) => {
  const { post } = loaderData;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-12 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-2">{post.title}</h2>
      <p className="text-sm-text-gray-400 mb-4">{new Date(post.date).toLocaleDateString()}</p>
      <Markdown>{post.content}</Markdown>
      <div className="max-w-none mb-12"></div>
    </div>
  );
};

export default BlogDetailPage;
