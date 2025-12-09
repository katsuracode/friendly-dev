import ProjectCard from "~/components/ProjectCard";
import type { Project } from "../../type";
import type { Route } from "./+types";

export const loader = async ({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> => {
  try {
    const apiUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8300/projects"
        : "https://https://friendly-4l2uojve2-katsuracodes-projects.vercel.app/projects";

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

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-2">Projects 🛫</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
