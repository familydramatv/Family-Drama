import { motion } from "framer-motion";
import type { Project } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
  size?: "large" | "medium" | "small";
}

export default function ProjectCard({ project, index, size = "medium" }: ProjectCardProps) {
  const aspectClass = size === "large" ? "aspect-[16/10]" : size === "small" ? "aspect-[4/3]" : "aspect-[16/10]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group cursor-pointer"
      data-testid={`card-project-${project.id}`}
    >
      <div className={`relative ${aspectClass} overflow-hidden rounded-md bg-white/5`}>
        <img
          src={project.image}
          alt={`${project.client} - ${project.title}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-white font-semibold text-base md:text-lg leading-snug">
                {project.title}
              </p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-white/60 text-sm">{project.client}</span>
                {project.director && (
                  <>
                    <span className="text-white/30">/</span>
                    <span className="text-white/50 text-sm">{project.director}</span>
                  </>
                )}
              </div>
              {project.tags && project.tags.length > 0 && (
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[11px] text-white/50 border border-white/15 rounded-sm px-2 py-0.5 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="invisible group-hover:visible flex-shrink-0">
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
