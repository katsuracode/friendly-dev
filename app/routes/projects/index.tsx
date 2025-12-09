import type { Project } from "../../type";
import type { Route } from "./+types";

export const loader = async ({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> => {
  try {
    const res = await fetchApi("/api/projects");
    if (!res.ok) throw new Error("Failed to fetch data from the server.");

    const data = await res.json();
    console.log(data);

    return { projects: data };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { projects: [] };
  }
};

const fetchApi = async (path: string) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
  const url = baseUrl ? `${baseUrl}${path.replace("/api", "")}` : path;

  return fetch(url);
};

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };
  console.log(projects);

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-2">Projects 🛫</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project: Project) => (
          <div
            key={project.id}
            className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-sm transition hover:shadow-md"
          >
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="text-3xl font-semibold text-blue-400 mb-1">{project.title}</h3>
              <p className="text-sm text-gray-300 mb-2">{project.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>{project.category}</span>
                <span>{new Date(project.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
