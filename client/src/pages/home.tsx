import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projects, newsItems } from "@/lib/data";
import ProjectCard from "@/components/project-card";

const featuredProjects = projects.filter((p) => p.featured).slice(0, 8);

const serviceAreas = [
  { label: "Ideation", id: "ideation" },
  { label: "Content", id: "content" },
  { label: "Experience", id: "experience" },
  { label: "Creative Technology", id: "creative-technology" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <section
        className="relative h-screen flex items-center overflow-hidden bg-black"
        data-testid="section-hero"
      >
        <div className="w-full" style={{ padding: "0 1vw" }}>
          {[
            { text: "CREATING CONTENT", size: "clamp(36px, 12.5vw, 210px)" },
            { text: "AT THE SPEED OF", size: "clamp(36px, 13vw, 218px)" },
            { text: "CULTURE", size: "clamp(48px, 25vw, 420px)" },
          ].map((line, i) => (
            <motion.div
              key={line.text}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
              style={{
                fontFamily: "'Arial Black', 'Helvetica Neue', Impact, sans-serif",
                fontWeight: 900,
                fontStretch: "condensed",
                color: "#f0efe9",
                fontSize: line.size,
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
              }}
              data-testid={`text-headline-${i}`}
            >
              {line.text}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto" data-testid="section-featured-work">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featuredProjects.slice(0, 2).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} size="large" />
          ))}
        </div>

        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group cursor-pointer"
              data-testid={`card-news-${item.id}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-white/5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <span className="text-white/50 text-xs uppercase tracking-widest">{item.source}</span>
                  <p className="text-white text-sm md:text-base font-medium mt-2 leading-relaxed line-clamp-3">
                    {item.title}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-white/60 text-sm mt-3 transition-opacity group-hover:opacity-70">
                    Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.slice(2, 8).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} size="medium" />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Link href="/work" data-testid="link-view-all-work">
            <span className="inline-flex items-center gap-2 text-white/60 text-sm uppercase tracking-widest transition-opacity hover:opacity-70 duration-300">
              View All Work <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </section>

      <section className="py-20 md:py-32 border-t border-white/5" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white/40 text-sm uppercase tracking-widest mb-12"
          >
            Working at the intersection of:
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceAreas.map((area, i) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/about#${area.id}`}>
                  <div className="group relative rounded-md border border-white/10 p-6 md:p-8 h-40 flex flex-col justify-end hover-elevate cursor-pointer" data-testid={`card-service-${area.id}`}>
                    <h3 className="text-white text-xl md:text-2xl font-light">{area.label}</h3>
                    <span className="inline-flex items-center gap-1.5 text-white/40 text-sm mt-2 transition-opacity group-hover:opacity-70">
                      Explore <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
