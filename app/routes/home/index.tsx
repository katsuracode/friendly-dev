import AboutPreview from "~/components/AboutPreview";
import FeaturedProject from "~/components/FeaturedProject";
import LatestPosts from "~/components/LatestPosts";
import type { Post, Project, StrapiPost, StrapiProject, StrapiResponse } from "~/type";
import type { Route } from "./+types";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom website development" },
  ];
};

export const loader = async ({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: Post[] }> => {
  const apiUrlForProjects =
    process.env.NODE_ENV === "development"
      ? `${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`
      : "https://friendly-dev-one.vercel.app/projects";

  const apiUrlForPosts =
    process.env.NODE_ENV === "development"
      ? `${import.meta.env.VITE_API_URL}/posts?sort[0]=date:desc&populate=*`
      : "https://friendly-dev-one.vercel.app/projects";

  const [responseProjects, responsePosts] = await Promise.all([
    fetch(apiUrlForProjects),
    fetch(apiUrlForPosts),
  ]);

  if (!responseProjects.ok) {
    throw new Response("Failed to fetch projects", { status: 500 });
  }

  if (!responsePosts.ok) {
    throw new Response("Failed to fetch post metadata", { status: 500 });
  }

  const projectJson: StrapiResponse<StrapiProject> = await responseProjects.json();
  const projects = projectJson.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : "/images/no-image.png",
    date: item.date,
    url: item.url,
    category: item.category,
    featured: item.featured,
  }));

  const postJson: StrapiResponse<StrapiPost> = await responsePosts.json();
  const posts = postJson.data.map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    date: post.date,
    body: post.body,
    image: post.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${post.image.url}`
      : "/images/no-image.png",
  }));

  return { projects, posts };
};

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData as { projects: Project[]; posts: Post[] };

  return (
    <>
      <FeaturedProject projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} limit={3} />
    </>
  );
};

export default HomePage;
