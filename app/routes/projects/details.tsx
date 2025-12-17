import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import type { Project, StrapiProject, StrapiResponse } from "~/type";
import type { Route } from "./+types";

export const loader = async ({
  request,
  params,
}: Route.LoaderArgs): Promise<{ project: Project }> => {
  const { id } = params;

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? `${import.meta.env.VITE_API_URL}/projects?filters[documentId][$eq]=${id}&populate=*`
      : `https://friendly-dev-one.vercel.app/projects/${id}`;

  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error("Failed to fetch data from the server.");

  const json: StrapiResponse<StrapiProject> = await res.json();
  const item = json.data[0];

  console.log(item);

  const project = {
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
  };

  return { project };
};

const ProjectDetailPage = ({ loaderData }: Route.ComponentProps) => {
  const { project } = loaderData;

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
