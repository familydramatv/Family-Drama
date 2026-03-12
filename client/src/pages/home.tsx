import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { projects, getMuxThumbnail } from "@/lib/data";
import "@mux/mux-video";

const homeProjects = [
  projects[5],  // European Wax Center - Keep Exploring
  projects[6],  // Crown Royal - Chopped & Screwed
  projects[17], // Essentia Water - Advice To Your Future Self
  projects[3],  // Dr. Teal's - Stay Hungry
  projects[0],  // LEGO - Play Unstoppable
  projects[4],  // Adyen - Tap to Pay
  projects[8],  // Verizon - Celebrate The Magic
  projects[15], // Beats by Dre - Be Heard
  projects[1],  // Toyota - Survivor
  projects[20], // Cowboy - Posts From The City
].filter(Boolean);

const placeholderColors = [
  "#1a1a2e", "#2d1b2e", "#1b2e1a", "#2e2a1a", "#1a2a2e",
  "#2e1a1a", "#1a2e2d", "#2a1a2e", "#1e2e1a", "#2e1e1a",
];

function VideoLoopThumbnail({ playbackId }: { playbackId: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute("muted", "");
    el.setAttribute("autoplay", "");
    el.setAttribute("loop", "");
    el.setAttribute("playsinline", "");
    (el as HTMLVideoElement & { muted: boolean }).muted = true;
    (el as HTMLVideoElement).play?.().catch(() => {});
  }, [playbackId]);

  return (
    <mux-video
      ref={ref}
      playback-id={playbackId}
      preload="auto"
      style={{ width: "100%", height: "100%", objectFit: "cover" } as React.CSSProperties}
    />
  );
}

function ProjectThumbnail({ project, index }: { project: typeof projects[0]; index: number }) {
  if (project.homeVideoLoop && project.muxPlaybackId) {
    return <VideoLoopThumbnail playbackId={project.muxPlaybackId} />;
  }

  const src = project.homeImage
    ? project.homeImage
    : project.muxPlaybackId
      ? getMuxThumbnail(project.muxPlaybackId, project.thumbnailTime || 0, 1200)
      : project.image;

  if (src) {
    return (
      <img
        src={src}
        alt={`${project.client} - ${project.title}`}
        className="w-full h-full object-cover"
        loading={index < 2 ? "eager" : "lazy"}
      />
    );
  }

  return (
    <div
      className="w-full h-full"
      style={{ backgroundColor: placeholderColors[index % placeholderColors.length] }}
    />
  );
}

type CardLayout = "full" | "tall" | "wide" | "medium";

interface ShowcaseItem {
  type: "project";
  project: typeof projects[0];
  layout: CardLayout;
  textSide?: "left" | "right";
  noLink?: boolean;
}

type FeedItem = ShowcaseItem;

const feed: FeedItem[] = [
  { type: "project", project: homeProjects[4], layout: "full" },
  { type: "project", project: homeProjects[3], layout: "medium" },
  { type: "project", project: homeProjects[1], layout: "full" },
  { type: "project", project: homeProjects[2], layout: "medium", textSide: "right" },
  { type: "project", project: homeProjects[0], layout: "medium", textSide: "left" },
  { type: "project", project: homeProjects[5], layout: "tall", noLink: true },
  { type: "project", project: homeProjects[6], layout: "medium", textSide: "left" },
  { type: "project", project: homeProjects[7], layout: "medium", textSide: "right" },
  { type: "project", project: homeProjects[8], layout: "full" },
  { type: "project", project: homeProjects[9], layout: "medium" },
];

function ProjectCard({ item, index }: { item: ShowcaseItem; index: number }) {
  const { project, layout, textSide, noLink } = item;
  const director = project.director || "";
  const client = project.client;
  const title = project.title;

  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: false, margin: "-80px 0px" });
  const inView = useInView(textRef, { once: false, margin: "0px" });

  const aspectClass = layout === "tall"
    ? "aspect-[16/9]"
    : layout === "full"
    ? "aspect-[16/9] md:aspect-[2.2/1]"
    : layout === "wide"
    ? "aspect-[16/10] md:aspect-[1.8/1]"
    : "aspect-[4/3] md:aspect-[16/10]";

  const widthClass = layout === "full" || layout === "tall"
    ? "w-full"
    : layout === "wide"
    ? "w-[90%] md:w-[85%]"
    : "w-[75%] md:w-[65%]";

  const defaultAlign = index % 2 === 0 ? "mr-auto" : "ml-auto";
  const alignClass = textSide === "right" ? "mr-auto" : textSide === "left" ? "ml-auto" : defaultAlign;
  const isFullWidth = layout === "full" || layout === "tall";
  const bleedLeft = !isFullWidth && alignClass === "ml-auto";

  const textContent = (
    <>
      <motion.h2
        className="text-white tracking-tight"
        style={{
          fontFamily: "'Ritmica', sans-serif",
          fontWeight: 600,
          fontSize: "clamp(28px, 5vw, 72px)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
        data-testid={`text-home-title-${project.id}`}
        initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
        animate={inView
          ? { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 } }
          : { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }
        }
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-white mt-1 md:mt-2"
        style={{
          fontFamily: "'Ritmica', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(13px, 1.4vw, 22px)",
          letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}
        data-testid={`text-home-meta-${project.id}`}
        initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
        animate={inView
          ? { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.45 } }
          : { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }
        }
      >
        <span style={{ fontWeight: 600 }}>{client}</span>
        {director && <>{" "}<span style={{ fontWeight: 400 }}>DIRECTED BY</span>{" "}{director}</>}
      </motion.p>
    </>
  );

  const cardInner = (
    <div className="relative">
      <motion.div
        className={`relative ${aspectClass} overflow-hidden ${noLink ? "" : "cursor-pointer group"}`}
        data-testid={`card-home-project-${project.id}`}
        initial={{ opacity: 0 }}
        animate={cardInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          <ProjectThumbnail project={project} index={index} />
        </div>
        {isFullWidth ? (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-[1]" />
        ) : bleedLeft ? (
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-[1]" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent z-[1]" />
        )}
        {isFullWidth && (
          <motion.div
            ref={textRef}
            className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-10 z-[2]"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {textContent}
          </motion.div>
        )}
      </motion.div>

      {!isFullWidth && (
        <motion.div
          ref={textRef}
          className="absolute top-1/2 -translate-y-1/2 z-10 px-5 md:px-8 pointer-events-none"
          style={bleedLeft
            ? { left: layout === "wide" ? "-12%" : "-45%", right: "20%", textAlign: "left" }
            : { right: layout === "wide" ? "-12%" : "-45%", left: "20%", textAlign: "right" }
          }
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {textContent}
        </motion.div>
      )}
    </div>
  );

  return (
    <div
      ref={cardRef}
      className={`relative ${widthClass} ${isFullWidth ? "" : alignClass}`}
    >
      {noLink ? cardInner : (
        <Link
          href={project.muxPlaybackId ? `/project/${project.id}` : "#"}
          onClick={() => sessionStorage.setItem("homeScrollY", String(window.scrollY))}
        >
          {cardInner}
        </Link>
      )}
    </div>
  );
}


const heroLines = [
  "CREATING CONTENT",
  "AT THE SPEED",
  "OF CULTURE",
  "AND ENTERTAINMENT",
];

function HeroTypography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [fontSizes, setFontSizes] = useState<number[]>(heroLines.map(() => 10));
  const [scales, setScales] = useState<number[]>(heroLines.map(() => 1));

  useEffect(() => {
    const fitAll = () => {
      const container = containerRef.current;
      const spans = spanRefs.current;
      if (!container || spans.some(s => !s)) return;
      const targetWidth = container.clientWidth - 64;

      const newSizes: number[] = [];
      const newScales: number[] = [];
      for (const span of spans) {
        if (!span) { newSizes.push(10); newScales.push(1); continue; }
        span.style.transform = "scaleX(1)";
        let lo = 10, hi = 600, best = 10;
        while (lo <= hi) {
          const mid = Math.floor((lo + hi) / 2);
          span.style.fontSize = `${mid}px`;
          if (span.scrollWidth <= targetWidth) {
            best = mid;
            lo = mid + 1;
          } else {
            hi = mid - 1;
          }
        }
        span.style.fontSize = `${best}px`;
        const actualWidth = span.scrollWidth;
        newSizes.push(best);
        newScales.push(actualWidth > 0 ? targetWidth / actualWidth : 1);
      }
      setFontSizes(newSizes);
      setScales(newScales);
    };
    fitAll();
    window.addEventListener("resize", fitAll);
    return () => window.removeEventListener("resize", fitAll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, -rect.top / (rect.height * 0.8));

      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        const direction = i % 2 === 0 ? -1 : 1;
        const shift = progress * direction * 120;
        el.style.transform = `translateX(${shift}vw)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-start overflow-hidden bg-black"
      data-testid="section-hero"
    >
      <div
        ref={containerRef}
        style={{
          padding: "80px 32px 20px",
          fontFamily: "'Ritmica', sans-serif",
          fontWeight: 500,
          color: "#f0efe9",
          letterSpacing: "-0.03em",
          textTransform: "uppercase",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "2.5vh",
        }}
      >
        {heroLines.map((line, i) => (
          <div
            key={i}
            ref={(el) => { lineRefs.current[i] = el; }}
            style={{ willChange: "transform" }}
            data-testid={`text-headline-${i}`}
          >
            <span
              ref={(el) => { spanRefs.current[i] = el; }}
              style={{
                fontSize: `${fontSizes[i] ?? 10}px`,
                display: "block",
                lineHeight: 0.9,
                whiteSpace: "nowrap",
                transform: `scaleX(${scales[i] ?? 1})`,
                transformOrigin: "left center",
              }}
            >
              {line}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    const saved = sessionStorage.getItem("homeScrollY");
    if (saved) {
      sessionStorage.removeItem("homeScrollY");
      requestAnimationFrame(() => {
        window.scrollTo({ top: Number(saved), behavior: "instant" });
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <HeroTypography />

      <section className="py-8 md:py-12 px-4 md:px-8" data-testid="section-showcase">
        <div className="flex flex-col gap-8 md:gap-16 lg:gap-20">
          {feed.map((item, i) => (
            <ProjectCard key={item.project.id} item={item} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
