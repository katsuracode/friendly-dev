import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import ProjectCard from "~/components/ProjectCard";
import type { Project } from "../../type";
import type { Route } from "./+types";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "The Friendly Dev | Projects" },
    { name: "description", content: "My website project portfolio" },
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

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  const { projects } = loaderData as { projects: Project[] };

  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-2">Projects 🛫</h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {currentProjects.map((project: Project) => (
            <motion.div key={project.id} layout>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
        />
      )}
    </>
  );
};

export default ProjectsPage;
