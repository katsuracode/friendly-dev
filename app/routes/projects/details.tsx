import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import type { Project } from "~/type";
import type { Route } from "./+types";

export const loader = async ({ request, params }: Route.LoaderArgs): Promise<Project> => {
  try {
    const apiUrl =
      process.env.NODE_ENV === "development"
        ? `${import.meta.env.VITE_API_URL}/projects/${params.id}`
        : `https://friendly-4l2uojve2-katsuracodes-projects.vercel.app/projects/${params.id}`;

    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error("Failed to fetch data from the server.");

    const project = (await res.json()) as Project;
    console.log(project);

    return project;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {} as Project;
  }
};

export const HydrateFallback = () => {
  return <div>Loading project details...</div>;
};

const ProjectDetailPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData;
  console.log(project);

  return (
    <>
      <Link
        to="/projects"
        className="flex items-center text-blue-400 hover:text-blue-500 mb-6 transition"
      >
        <FaArrowLeft className="mr-2" /> Back to Projects
      </Link>

      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div>
          <img src={project.image} alt={project.title} className="w-full rounded-lg shadow-md" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-400 mb-4">{project.title}</h1>
          <p className="text-gray-300 text-sm-mb-4">
            {new Date(project.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            {project.category && `• ${project.category}`}
          </p>
          <p className="text-gray-200 mb-6">{project.description}</p>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            View Live Site <FaArrowRight className="inline-block ml-2" />
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
