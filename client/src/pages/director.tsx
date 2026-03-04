import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "wouter";
import "@mux/mux-video";
import { directors, projects, type Project } from "@/lib/data";

interface MuxMeta {
  title?: string;
  director?: string;
  client?: string;
}

function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [mediaReady, setMediaReady] = useState(false);

  const displayClient = project.client;
  const displayTitle = project.title;
  const displayDirector = project.director;

  useEffect(() => {
    setMediaReady(false);
    if (project.muxPlaybackId) {
      const checkVideo = () => {
        const video = videoRef.current as HTMLVideoElement | null;
        if (video && video.readyState >= 1) {
          setMediaReady(true);
        } else if (video) {
          video.addEventListener("loadeddata", () => setMediaReady(true), { once: true });
        }
      };
      const timer = setTimeout(checkVideo, 50);
      return () => clearTimeout(timer);
    } else {
      setMediaReady(true);
    }
  }, [project.muxPlaybackId]);

  return (
    <Link href={`/project/${project.id}`}>
      <div
        className="relative aspect-[2.39/1] overflow-hidden group cursor-pointer card-video"
        style={{ opacity: mediaReady ? 1 : 0, transition: "opacity 0.4s ease" }}
        data-testid={`card-project-${project.id}`}
        onMouseEnter={() => {
          setHovered(true);
          if (project.muxPlaybackId) {
            const video = videoRef.current as HTMLVideoElement | null;
            if (video) video.play().catch(() => {});
          }
        }}
        onMouseLeave={() => {
          setHovered(false);
          if (project.muxPlaybackId) {
            const video = videoRef.current as HTMLVideoElement | null;
            if (video) { video.pause(); video.currentTime = 0; }
          }
        }}
      >
        {project.muxPlaybackId ? (
          <div className="video-cover-wrap transition-transform duration-500 ease-out group-hover:scale-105">
            <mux-video
              ref={(el: HTMLElement | null) => { videoRef.current = el; }}
              playback-id={project.muxPlaybackId}
              preload="auto"
              muted
              loop
            />
          </div>
        ) : (
          <img
            src={project.image}
            alt={`${displayClient} - ${displayTitle}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onLoad={() => setMediaReady(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-[2]" />
        <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-between z-[3]">
          <div className="flex justify-between items-start">
            <span className="text-white text-lg md:text-xl font-medium tracking-wide" data-testid={`text-client-${project.id}`}>
              {displayClient}
            </span>
          </div>
          <div className="relative">
            <span
              className="text-white/80 text-sm md:text-base italic block will-change-transform"
              style={{
                transform: hovered ? "translate3d(0, -10px, 0)" : "translate3d(0, 10px, 0)",
                transition: "transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
              data-testid={`text-title-${project.id}`}
            >
              {displayTitle}
            </span>
            {displayDirector && (
              <span
                className="text-white/50 text-xs md:text-sm block absolute left-0 will-change-transform"
                style={{
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "translate3d(0, 0, 0)" : "translate3d(0, 8px, 0)",
                  transition: hovered
                    ? "opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.08s, transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.08s"
                    : "opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  top: "100%",
                  marginTop: "-10px",
                }}
                data-testid={`text-director-${project.id}`}
              >
                {displayDirector}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function DirectorPage() {
  const params = useParams<{ id: string }>();
  const director = directors.find((d) => d.id === params.id);
  const [muxMetadata, setMuxMetadata] = useState<Record<string, MuxMeta>>({});
  const [metaLoaded, setMetaLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/mux/metadata")
      .then((r) => r.json())
      .then((data) => {
        setMuxMetadata(data);
        setMetaLoaded(true);
      })
      .catch(() => setMetaLoaded(true));
  }, []);

  const directorProjects = useMemo(() => {
    if (!director) return [];

    const matchedPlaybackIds = new Set<string>();
    for (const [playbackId, meta] of Object.entries(muxMetadata)) {
      if (meta.director?.toLowerCase() === director.name.toLowerCase()) {
        matchedPlaybackIds.add(playbackId);
      }
    }

    return projects.filter((p) => {
      if (p.director?.toLowerCase() === director.name.toLowerCase()) return true;
      if (p.muxPlaybackId && matchedPlaybackIds.has(p.muxPlaybackId)) return true;
      if (p.muxProjectPlaybackId && matchedPlaybackIds.has(p.muxProjectPlaybackId)) return true;
      return false;
    });
  }, [director, muxMetadata]);

  if (!director) {
    return (
      <div className="min-h-screen bg-black pt-[120px] flex items-center justify-center">
        <p className="text-white/60 text-xl">Director not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-[90px] md:pt-[106px]" data-testid="page-director">
      <div className="px-6 md:px-10 pb-2 md:pb-3">
        <Link href="/talent" data-testid="link-back-talent">
          <span className="text-white text-[17px] md:text-base font-light cursor-pointer">
            {director.name.toUpperCase()}
          </span>
        </Link>
      </div>

      {!metaLoaded ? (
        <div className="px-[35px] py-20 text-center">
          <p className="text-white/40 text-lg">Loading...</p>
        </div>
      ) : directorProjects.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 px-[35px] py-0"
            data-testid="grid-director-projects"
          >
            {directorProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="px-[35px] py-20 text-center">
          <p className="text-white/40 text-lg">Portfolio coming soon</p>
        </div>
      )}
    </div>
  );
}
