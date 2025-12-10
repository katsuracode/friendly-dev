import FeaturedProject from "~/components/FeaturedProject";
import type { Project } from "~/type";
import type { Route } from "./+types";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom website development" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> => {
  try {
    const apiUrl =
      process.env.NODE_ENV === "development"
        ? `${import.meta.env.VITE_API_URL}/projects`
        : "https://friendly-dev-one.vercel.app/projects";

    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error("Failed to fetch data from the server.");

    const data = await res.json();
    console.log(data);

    return { projects: data };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { projects: [] };
  }
};

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };

  return <FeaturedProject projects={projects} count={2} />;
};

export default HomePage;
