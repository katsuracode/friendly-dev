import AboutPreview from "~/components/AboutPreview";
import FeaturedProject from "~/components/FeaturedProject";
import LatestPosts from "~/components/LatestPosts";
import type { Post, Project } from "~/type";
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
  try {
    const apiUrl =
      process.env.NODE_ENV === "development"
        ? `${import.meta.env.VITE_API_URL}/projects`
        : "https://friendly-dev-one.vercel.app/projects";

    const url = new URL("/posts-meta.json", request.url);

    const [responseProjects, responsePosts] = await Promise.all([
      fetch(apiUrl),
      fetch(url.toString()),
    ]);

    if (!responseProjects.ok) {
      throw new Response("Failed to fetch projects", { status: 500 });
    }

    if (!responsePosts.ok) {
      throw new Response("Failed to fetch post metadata", { status: 500 });
    }

    const projects = await responseProjects.json();
    const posts = await responsePosts.json();

    return { projects, posts };
  } catch (error) {
    console.error(
      "Error fetching projects and posts:",
      error instanceof Error ? error.message : error,
    );

    return { projects: [], posts: [] };
  }
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
