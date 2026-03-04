import { useParams, useLocation, Link } from "wouter";
import { useRef, useEffect, useState, type RefObject, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import "media-chrome";
import "@mux/mux-video";
import { projects, getMuxThumbnail } from "@/lib/data";
import type { ContentSection } from "@/lib/data";

interface MuxMeta {
  title?: string;
  director?: string;
  client?: string;
}

const playerVars: Record<string, string> = {
  "--media-primary-color": "#e8a020",
  "--media-secondary-color": "transparent",
  "--media-control-background": "transparent",
  "--media-control-hover-background": "transparent",
  "--media-range-track-height": "2.5px",
  "--media-range-track-border-radius": "2px",
  "--media-range-thumb-width": "0px",
  "--media-range-thumb-height": "0px",
  "--media-range-thumb-border-radius": "50%",
  "--media-range-thumb-background": "#e8a020",
  "--media-range-bar-color": "#e8a020",
  "--media-range-track-background": "rgba(255,255,255,0.2)",
  "--media-time-range-buffered-color": "rgba(255,255,255,0.15)",
  "--media-icon-color": "#e8a020",
  "--media-control-padding": "0",
  "--media-button-icon-width": "18px",
  "--media-button-icon-height": "18px",
};

function usePlayerSetup(ref: RefObject<HTMLElement | null>, playbackId?: string, autoplay?: boolean) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !playbackId) return;
    el.setAttribute("class", "custom-player");
    el.setAttribute("noautohide", "");
    Object.entries(playerVars).forEach(([k, v]) => el.style.setProperty(k, v));

    const onEnter = () => {
      el.style.setProperty("--media-range-thumb-width", "10px");
      el.style.setProperty("--media-range-thumb-height", "10px");
      el.style.setProperty("--media-range-track-height", "4px");
    };
    const onLeave = () => {
      el.style.setProperty("--media-range-thumb-width", "0px");
      el.style.setProperty("--media-range-thumb-height", "0px");
      el.style.setProperty("--media-range-track-height", "2.5px");
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    if (autoplay) {
      const muxVideo = el.querySelector("mux-video") as HTMLVideoElement | null;
      if (muxVideo) muxVideo.play().catch(() => {});
    }

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [playbackId]);
}

function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5 }}
      className="flex justify-center py-[51.2px]"
    >
    </motion.div>
  );
}

function SectionRenderer({ section, index }: { section: ContentSection; index: number }) {
  if (section.type === "text") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-[750px] mx-auto"
        data-testid={`section-text-${index}`}
      >
        {section.heading && (
          <h3 className="text-white font-light tracking-wide mb-8 text-center text-2xl sm:text-[32px] md:text-[40px]">
            {section.heading}
          </h3>
        )}
        {section.paragraphs?.map((p, i) => (
          <p key={i} className="text-white text-base md:text-lg leading-relaxed mb-6 last:mb-0">
            {p}
          </p>
        ))}
      </motion.div>
    );
  }

  if (section.type === "text-columns") {
    const paragraphs = section.paragraphs || [];
    const mid = Math.ceil(paragraphs.length / 2);
    const leftCol = paragraphs.slice(0, mid);
    const rightCol = paragraphs.slice(mid);
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
        data-testid={`section-text-columns-${index}`}
      >
        <div>
          {leftCol.map((p, i) => (
            <p key={i} className="text-white text-base md:text-lg leading-relaxed mb-6 last:mb-0 whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>
        <div>
          {rightCol.map((p, i) => (
            <p key={i} className="text-white text-base md:text-lg leading-relaxed mb-6 last:mb-0 whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>
      </motion.div>
    );
  }

  if (section.type === "image-pair" && section.images) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
        data-testid={`section-image-pair-${index}`}
      >
        {section.images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            className="w-full h-auto object-cover aspect-video"
            loading="lazy"
            decoding="async"
            data-testid={`img-pair-${index}-${i}`}
          />
        ))}
      </motion.div>
    );
  }

  if (section.type === "image-full" && section.images?.[0]) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-[1100px] mx-auto"
        data-testid={`section-image-full-${index}`}
      >
        <img
          src={section.images[0].src}
          alt={section.images[0].alt}
          className="w-full h-auto object-cover"
          loading="lazy"
          decoding="async"
          data-testid={`img-full-${index}`}
        />
      </motion.div>
    );
  }

  return null;
}

export default function Project() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const controllerRef = useRef<HTMLElement>(null);
  const btsControllerRef = useRef<HTMLElement>(null);
  const project = projects.find((p) => p.id === id);
  const [meta, setMeta] = useState<MuxMeta | null>(null);

  const videoPlaybackId = project?.muxProjectPlaybackId || project?.muxPlaybackId;
  const content = project?.content;
  const hasContent = !!content;

  const hasBts = !hasContent && (project?.btsVideoPlaybackId || (project?.productionPhotos && project.productionPhotos.length > 0));

  const relatedProjects = projects
    .filter((p) => p.id !== id)
    .slice(0, 2);

  useEffect(() => {
    if (!videoPlaybackId) return;
    fetch("/api/mux/metadata")
      .then((r) => r.json())
      .then((data) => {
        if (data[videoPlaybackId]) {
          setMeta(data[videoPlaybackId]);
        }
      })
      .catch(() => {});
  }, [videoPlaybackId]);

  usePlayerSetup(controllerRef, videoPlaybackId, true);
  usePlayerSetup(btsControllerRef, project?.btsVideoPlaybackId);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/60 text-lg">Project not found.</p>
      </div>
    );
  }

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate("/work");
    }
  };

  const displayClient = meta?.client || project.client;
  const displayTitle = meta?.title || project.title;

  const posterUrl = videoPlaybackId
    ? getMuxThumbnail(videoPlaybackId, project.thumbnailTime, 1280)
    : project.image;

  return (
    <div className="min-h-screen bg-black">
      <motion.button
        onClick={() => navigate("/work")}
        className="fixed top-5 right-4 sm:right-[72px] md:right-[88px] z-50 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        data-testid="button-close-project"
        aria-label="Close project"
      >
        <X className="w-6 h-6" strokeWidth={1.5} />
      </motion.button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-screen flex flex-col pt-10 sm:pt-14"
        onClick={handleBackdropClick}
      >
        <div
          className="flex-1 min-h-0 w-full sm:w-[85%] mx-auto px-2 sm:px-4 md:px-8 lg:px-12 py-2"
          onClick={handleBackdropClick}
        >
          {videoPlaybackId ? (
            <div className="custom-player-wrapper" style={{ width: "100%", height: "100%", position: "relative" }}>
              <media-controller
                ref={controllerRef}
                style={{ width: "100%", height: "100%", backgroundColor: "black" }}
                data-testid="video-player"
              >
                <mux-video
                  slot="media"
                  playback-id={videoPlaybackId}
                  preload="auto"
                  autoplay
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
                <div className="player-gradient" />
                <media-control-bar>
                  <media-play-button />
                  <media-time-range />
                  <media-mute-button />
                  <media-fullscreen-button />
                </media-control-bar>
              </media-controller>
            </div>
          ) : (
            <div
              className="relative w-full h-full bg-black/50 flex items-center justify-center overflow-hidden"
              data-testid="video-placeholder"
            >
              <img
                src={posterUrl}
                alt={displayTitle}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-black/40" />
              <p className="relative text-white/40 text-sm">Video coming soon</p>
            </div>
          )}
        </div>

        <div className="shrink-0 px-6 md:px-10 lg:px-16 py-5 text-center">
          <h1
            className="text-[#e8a020] text-[15px] font-bold tracking-[0.15em] uppercase"
            data-testid="text-project-client"
          >
            {displayClient}
          </h1>
          <p
            className="text-white/60 text-[13px] italic tracking-[0.05em] mt-1 font-serif"
            data-testid="text-project-title"
          >
            {displayTitle}
          </p>
        </div>
      </motion.div>

      {hasContent && content && (
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">
          {content.headline && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-[900px] mx-auto py-16"
              data-testid="project-headline"
            >
              <h2 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-[42px] font-serif leading-tight italic">
                {content.headline}
              </h2>
            </motion.div>
          )}

          <div className="pb-24">
            {content.sections.map((section, idx) => (
              <div key={idx}>
                {idx > 0 && section.heading !== "Design + Build" && <SectionDivider />}
                {section.heading === "Design + Build" && (
                  <div className="flex justify-center py-10">
                    <div className="w-[1.25px] h-[79px] bg-white" />
                  </div>
                )}
                <SectionRenderer section={section} index={idx} />
              </div>
            ))}
          </div>

          {project.btsVideoPlaybackId && (
            <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-[1100px] mx-auto pb-12"
              data-testid="bts-video-section"
            >
              <div className="flex flex-col items-center pb-12">
                <div className="flex justify-center py-10">
                  <div className="w-[1.25px] h-[79px] bg-white" />
                </div>
                <h3 className="text-white font-light tracking-wide text-center text-2xl sm:text-[32px] md:text-[40px]">
                  Behind the Scenes
                </h3>
              </div>
              <div className="custom-player-wrapper" style={{ width: "100%", position: "relative", aspectRatio: "16/9" }}>
                <media-controller
                  ref={btsControllerRef}
                  style={{ width: "100%", height: "100%", backgroundColor: "black" }}
                  data-testid="bts-video-player"
                >
                  <mux-video
                    slot="media"
                    playback-id={project.btsVideoPlaybackId}
                    preload="auto"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                  <div className="player-gradient" />
                  <media-control-bar>
                    <media-play-button />
                    <media-time-range />
                    <media-mute-button />
                    <media-fullscreen-button />
                  </media-control-bar>
                </media-controller>
              </div>
            </motion.div>
            </>
          )}

          {content.awards && content.awards.length > 0 && (
            <>
            <SectionDivider />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-[750px] mx-auto pb-24 text-center"
              data-testid="project-awards"
            >
              <h3 className="text-white font-light tracking-wide text-center text-2xl sm:text-[32px] md:text-[40px] mb-6">
                Awards
              </h3>
              {content.awards.map((award, i) => (
                <p key={i} className="text-white text-base md:text-lg leading-relaxed mb-6 last:mb-0">
                  {award}
                </p>
              ))}
            </motion.div>
            </>
          )}
        </div>
      )}

      {hasBts && (
        <div className="w-[90%] sm:w-[75%] md:w-[60%] mx-auto">
          <div className="flex flex-col items-center py-16">
            <div className="w-px h-24 bg-white/30" />
          </div>

          <h2
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-12"
            data-testid="text-bts-heading"
          >
            Behind the Scenes
          </h2>

          {project.btsVideoPlaybackId && (
            <div className="mb-12">
              <div className="custom-player-wrapper" style={{ width: "100%", position: "relative", aspectRatio: "16/9" }}>
                <media-controller
                  ref={btsControllerRef}
                  style={{ width: "100%", height: "100%", backgroundColor: "black" }}
                  data-testid="bts-video-player"
                >
                  <mux-video
                    slot="media"
                    playback-id={project.btsVideoPlaybackId}
                    preload="auto"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                  <div className="player-gradient" />
                  <media-control-bar>
                    <media-play-button />
                    <media-time-range />
                    <media-mute-button />
                    <media-fullscreen-button />
                  </media-control-bar>
                </media-controller>
              </div>
            </div>
          )}

          {project.productionPhotos && project.productionPhotos.length > 0 && (
            <div className="space-y-4" data-testid="production-photos">
              {project.productionPhotos.length >= 1 && (
                <div className="w-full">
                  <img
                    src={project.productionPhotos[0]}
                    alt="Production photo"
                    className="w-full h-auto object-cover"
                    data-testid="photo-production-0"
                  />
                </div>
              )}

              {project.productionPhotos.length > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {project.productionPhotos.slice(1).map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo}
                      alt={`Production photo ${idx + 2}`}
                      className="w-full h-auto object-cover aspect-video"
                      data-testid={`photo-production-${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {relatedProjects.length > 0 && (
        <div className="w-full sm:w-[85%] mx-auto px-4 md:px-8 lg:px-12 pt-16 sm:pt-24 pb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-white text-sm font-serif italic whitespace-nowrap">
              Related Projects
            </span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedProjects.map((rp) => {
              const rpThumb = rp.muxPlaybackId
                ? getMuxThumbnail(rp.muxPlaybackId, rp.thumbnailTime, 800)
                : rp.image;
              return (
                <Link
                  key={rp.id}
                  href={`/project/${rp.id}`}
                  className="group relative aspect-video overflow-hidden block"
                  data-testid={`link-related-${rp.id}`}
                >
                  <img
                    src={rpThumb}
                    alt={rp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-white text-lg font-medium">{rp.client}</p>
                    <p className="text-white text-sm italic font-serif mt-0.5">{rp.title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
