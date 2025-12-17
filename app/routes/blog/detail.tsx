import Markdown from "react-markdown";
import type { Post } from "~/type";
import type { Route } from "./+types";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { slug } = params;

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=image`,
  );

  if (!response.ok) {
    throw new Response("Failed to fetch post metadata", { status: 500 });
  }

  const json = await response.json();

  if (!json.data.length) {
    throw new Response("Post not found", { status: 404 });
  }

  const item = json.data[0];

  const post = {
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    slug: item.slug,
    date: item.date,
    body: item.body,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : "/images/no-image.png",
  };

  return { post };
};

type BlogDetailLoaderData = {
  loaderData: {
    post: Post;
  };
};

const BlogDetailPage = ({ loaderData }: BlogDetailLoaderData) => {
  const { post } = loaderData;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-12 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-2">{post.title}</h2>
      <p className="text-sm-text-gray-400 mb-4">{new Date(post.date).toLocaleDateString()}</p>
      <img src={post.image} alt={post.title} className="w-full h-64 object-cover mb-4" />
      <Markdown>{post.body}</Markdown>
      <div className="max-w-none mb-12"></div>
    </div>
  );
};

export default BlogDetailPage;
