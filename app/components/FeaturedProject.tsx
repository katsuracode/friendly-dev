import type { Project } from "~/type";
import ProjectCard from "./ProjectCard";

type FeaturedProjectProps = {
  projects: Project[];
  count: number;
};

const FeaturedProject = ({ projects, count }: FeaturedProjectProps) => {
  if (projects.length === 0) return null;

  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-200 mb-6">🏰 Featured Projects</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProject;
