import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import "@mux/mux-video";
import { directors } from "@/lib/data";

export default function Talent() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLElement | null>>({});
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(true);
    return;
  }, []);

  useEffect(() => {
    if (hoveredId) {
      setLoadedIds((prev) => {
        if (prev.has(hoveredId)) return prev;
        const next = new Set(prev);
        next.add(hoveredId);
        return next;
      });
    }
  }, [hoveredId]);

  useEffect(() => {
    if (hoveredId) {
      const tryPlay = () => {
        const video = videoRefs.current[hoveredId] as HTMLVideoElement | null;
        if (video) {
          video.play().catch(() => {});
        }
      };
      const timer = setTimeout(tryPlay, 30);
      return () => clearTimeout(timer);
    }
    Object.entries(videoRefs.current).forEach(([id, el]) => {
      if (id !== hoveredId && el) {
        const v = el as HTMLVideoElement;
        v.pause();
      }
    });
  }, [hoveredId]);

  return (
    <div className="min-h-screen bg-black pt-[40px] md:pt-[56px]" data-testid="page-talent">
      <div
        className="relative px-4 sm:px-6 md:px-10 lg:px-16 pt-12 pb-6 sm:pt-8 sm:pb-8 md:py-12"
        style={{ paddingLeft: "clamp(1rem, 5vw + 10px, calc(4rem + 70px))" }}
      >
        <nav className="flex flex-col" data-testid="talent-list">
          {directors.map((director, i) => {
            const isFirst = i === 0;
            const isLoaded = loadedIds.has(director.id);
            const words = director.name.split(" ");
            return (
              <div
                key={director.id}
                className="relative"
                style={{ zIndex: hoveredId === director.id ? 30 : 10 }}
              >
                <Link href={`/talent/${director.id}`} data-testid={`link-talent-${director.id}`}>
                  <span
                    className="relative block py-0 md:py-2 cursor-pointer transition-colors duration-300 tracking-tight leading-none font-light"
                    style={{
                      fontSize: "clamp(3rem, 7.2vw, 6rem)",
                      whiteSpace: "nowrap",
                      zIndex: hoveredId === director.id ? 30 : 10,
                      color: hoveredId === null
                        ? "rgba(255,255,255,0.5)"
                        : hoveredId === director.id
                          ? "#ffffff"
                          : "rgba(255,255,255,0.25)",
                    }}
                    onMouseEnter={() => setHoveredId(director.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onTouchStart={() => setHoveredId(director.id)}
                    onTouchEnd={() => setHoveredId(null)}
                    data-testid={`text-talent-${director.id}`}
                  >
                    {words.map((word, wi) => (
                      <span key={wi} className="about-word" style={{ marginRight: "0.3em" }}>
                        <span
                          className={`about-word-inner ${revealed ? "revealed-inner" : ""}`}
                          style={{ transitionDelay: revealed ? `${i * 60}ms` : "0ms" }}
                        >
                          {word}
                        </span>
                      </span>
                    ))}
                  </span>
                </Link>

                <div
                  className="absolute pointer-events-none hidden md:block"
                  style={{
                    top: isFirst ? "calc(-40px - 1rem)" : "50%",
                    left: "min(55%, 430px)",
                    transform: isFirst ? "none" : "translateY(-50%)",
                    width: "min(840px, 55vw)",
                    aspectRatio: "16/9",
                    clipPath: hoveredId === director.id
                      ? "inset(0 0 0 0)"
                      : "inset(0 0 0 100%)",
                    transition: hoveredId === director.id
                      ? "clip-path 0.27s cubic-bezier(0.25, 0.1, 0.25, 1)"
                      : "clip-path 0.18s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    willChange: "clip-path",
                    zIndex: 20,
                  }}
                >
                  {isLoaded && (
                    <mux-video
                      ref={(el: HTMLElement | null) => { videoRefs.current[director.id] = el; }}
                      playback-id={director.muxPlaybackId}
                      preload="auto"
                      muted
                      loop
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
