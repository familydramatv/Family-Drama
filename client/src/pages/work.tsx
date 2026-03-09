import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "wouter";
import "@mux/mux-video";
import { projects, type ProjectCategory, type Project, getMuxThumbnail } from "@/lib/data";
import { useIsMobile } from "@/hooks/use-mobile";

interface MuxMeta {
  title?: string;
  director?: string;
  client?: string;
}

const categories: { label: string; value: ProjectCategory }[] = [
  { label: "Featured", value: "featured" },
  { label: "Content", value: "content" },
  { label: "Experience", value: "experience" },
  { label: "AI", value: "ai" },
  { label: "Photo", value: "stills" },
];

function FullscreenPlayer({ playbackId, onClose }: { playbackId: string; onClose: () => void }) {
  const videoRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const video = videoRef.current as HTMLVideoElement | null;
      if (video) video.play().catch(() => {});
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      data-testid="fullscreen-player"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white/70 hover:text-white p-2"
        data-testid="button-close-fullscreen"
        aria-label="Close"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="w-full h-full flex items-center justify-center">
        <mux-video
          ref={(el: HTMLElement | null) => { videoRef.current = el; }}
          playback-id={playbackId}
          controls
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  muxMeta,
  onMobilePlay,
  index = 0,
}: {
  project: Project;
  muxMeta?: MuxMeta;
  onMobilePlay?: (playbackId: string) => void;
  index?: number;
}) {
  const videoRef = useRef<HTMLElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [mediaReady, setMediaReady] = useState(false);
  const isMobile = useIsMobile();
  const showDetails = hovered || isMobile;
  const isRightColumn = index % 2 === 1;

  const displayClient = (muxMeta?.client || project.client);
  const displayTitle = (muxMeta?.title || project.title);
  const displayDirector = (muxMeta?.director || project.director);

  useEffect(() => {
    setMediaReady(false);
    if (isMobile) {
      setMediaReady(true);
      return;
    }
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
  }, [project.muxPlaybackId, isMobile]);

  const handleMobileTap = useCallback((e: React.MouseEvent) => {
    if (!isMobile || !project.muxPlaybackId || !onMobilePlay) return;
    e.preventDefault();
    e.stopPropagation();
    onMobilePlay(project.muxPlaybackId);
  }, [isMobile, project.muxPlaybackId, onMobilePlay]);

  const thumbnailUrl = project.muxPlaybackId
    ? getMuxThumbnail(project.muxPlaybackId, 0, 800)
    : project.image;

  const cardContent = (
    <div
      className="relative aspect-[2.39/1] overflow-hidden group cursor-pointer card-video"
      style={{ opacity: mediaReady ? 1 : 0, transition: "opacity 0.4s ease" }}
      data-testid={`card-project-${project.id}`}
      onClick={isMobile ? handleMobileTap : undefined}
      onMouseEnter={() => {
        if (isMobile) return;
        setHovered(true);
        if (project.muxPlaybackId) {
          const video = videoRef.current as HTMLVideoElement | null;
          if (video) video.play().catch(() => {});
        }
      }}
      onMouseLeave={() => {
        if (isMobile) return;
        setHovered(false);
        if (project.muxPlaybackId) {
          const video = videoRef.current as HTMLVideoElement | null;
          if (video) { video.pause(); video.currentTime = 0; }
        }
      }}
    >
      {project.muxPlaybackId ? (
        isMobile ? (
          <img
            src={thumbnailUrl}
            alt={`${displayClient} - ${displayTitle}`}
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={() => setMediaReady(true)}
          />
        ) : (
          <div className="video-cover-wrap transition-transform duration-500 ease-out group-hover:scale-105">
            <mux-video
              ref={(el: HTMLElement | null) => { videoRef.current = el; }}
              playback-id={project.muxPlaybackId}
              preload="auto"
              muted
              loop
            />
          </div>
        )
      ) : (
        <img
          src={project.image}
          alt={`${displayClient} - ${displayTitle}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onLoad={() => setMediaReady(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-[2]" />
      <div className="absolute inset-0 p-3 sm:p-5 md:p-7 flex flex-col justify-between z-[4]">
        <div className={`flex items-start ${!isMobile && isRightColumn ? "justify-end" : "justify-start"}`}>
          <span
            className="text-white text-[30px] sm:text-[32px] md:text-[34px] tracking-wide"
            style={{ fontFamily: "'Ritmica', sans-serif", fontWeight: 400 }}
            data-testid={`text-client-${project.id}`}
          >
            {displayClient}
          </span>
        </div>
        <div className="relative">
          <span
            className="text-white text-[20px] sm:text-[22px] md:text-[24px] block will-change-transform text-left"
            style={{
              fontFamily: "'Ritmica', sans-serif",
              fontWeight: 300,
              fontStyle: "italic",
              transform: showDetails ? "translate3d(0, -10px, 0)" : "translate3d(0, 10px, 0)",
              transition: isMobile ? "none" : "transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
            data-testid={`text-title-${project.id}`}
          >
            {displayTitle}
          </span>
          {displayDirector && (
            <span
              className="text-white/50 text-xs md:text-sm block absolute left-0 will-change-transform"
              style={{
                opacity: showDetails ? 1 : 0,
                transform: showDetails ? "translate3d(0, 0, 0)" : "translate3d(0, 8px, 0)",
                transition: isMobile ? "none" : (hovered
                  ? "opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.08s, transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.08s"
                  : "opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)"),
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
  );

  if (isMobile && project.muxPlaybackId) {
    return cardContent;
  }

  return (
    <Link href={`/project/${project.id}`}>
      {cardContent}
    </Link>
  );
}

export default function Work() {
  const params = useParams<{ category?: string }>();
  const activeCategory = (params.category as ProjectCategory) || "featured";
  const [muxMetadata, setMuxMetadata] = useState<Record<string, MuxMeta>>({});
  const [fullscreenPlaybackId, setFullscreenPlaybackId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/mux/metadata")
      .then((r) => r.json())
      .then((data) => setMuxMetadata(data))
      .catch(() => {});
  }, []);

  const filtered = useMemo(
    () => projects.filter((p) => !p.directorOnly && p.categories.includes(activeCategory)),
    [activeCategory]
  );

  return (
    <div className="min-h-screen bg-black pt-[72px] sm:pt-[90px] md:pt-[106px]">
      <motion.nav
        className="px-6 md:px-10 pb-2 md:pb-3 flex items-center gap-4 sm:gap-6 font-light overflow-x-auto scrollbar-hide"
        data-testid="nav-work-tabs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.value}
            href={cat.value === "featured" ? "/work" : `/work/${cat.value}`}
            data-testid={`tab-${cat.value}`}
          >
            <span
              className={`md:text-[19px] transition-colors duration-200 cursor-pointer text-[17px] sm:text-[20px] ${
                activeCategory === cat.value ? "text-white" : "text-white/40 hover:text-white"
              }`}
              style={{ fontFamily: "'Ritmica', sans-serif", fontWeight: 300 }}
            >
              {cat.label}
            </span>
          </Link>
        ))}
      </motion.nav>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-[35px] py-0"
          data-testid="grid-work-projects"
        >
          {activeCategory === "ai" ? (
            <div className="col-span-full flex items-center justify-center min-h-[50vh]">
              <p className="text-white/40 text-lg font-light tracking-wide uppercase">Coming Soon</p>
            </div>
          ) : (
            filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ProjectCard
                  project={project}
                  muxMeta={project.muxProjectPlaybackId ? muxMetadata[project.muxProjectPlaybackId] : undefined}
                  onMobilePlay={setFullscreenPlaybackId}
                  index={i}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
      {fullscreenPlaybackId && (
        <FullscreenPlayer
          playbackId={fullscreenPlaybackId}
          onClose={() => setFullscreenPlaybackId(null)}
        />
      )}
    </div>
  );
}
