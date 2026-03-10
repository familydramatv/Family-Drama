import { motion } from "framer-motion";
import { Link } from "wouter";
import { projects, newsItems, getMuxThumbnail } from "@/lib/data";

const homeProjects = [
  projects[5],  // Crown Royal - Chopped & Screwed
  projects[6],  // Ferrari - Michael B. Jordan
  projects[2],  // Porsche - Freedom
  projects[3],  // Dr. Teal's - Stay Hungry
  projects[0],  // LEGO - Play Unstoppable
  projects[4],  // Adyen - Tap to Pay
  projects[8],  // Verizon - Celebrate The Magic
  projects[10], // Ferrari - Sedona
  projects[14], // The Hour Glass - Maximilian Büsser
  projects[16], // Vinted - Keep Searching
].filter(Boolean);

const placeholderColors = [
  "#1a1a2e", "#2d1b2e", "#1b2e1a", "#2e2a1a", "#1a2a2e",
  "#2e1a1a", "#1a2e2d", "#2a1a2e", "#1e2e1a", "#2e1e1a",
];

function ProjectThumbnail({ project, index }: { project: typeof projects[0]; index: number }) {
  const src = project.muxPlaybackId
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

type CardLayout = "full" | "wide" | "medium";

interface ShowcaseItem {
  type: "project";
  project: typeof projects[0];
  layout: CardLayout;
}

interface PressItem {
  type: "press";
  news: typeof newsItems[0];
}

type FeedItem = ShowcaseItem | PressItem;

const feed: FeedItem[] = [
  { type: "project", project: homeProjects[0], layout: "full" },
  { type: "press", news: newsItems[0] },
  { type: "project", project: homeProjects[1], layout: "full" },
  { type: "project", project: homeProjects[2], layout: "wide" },
  { type: "press", news: newsItems[1] },
  { type: "project", project: homeProjects[3], layout: "full" },
  { type: "project", project: homeProjects[4], layout: "wide" },
  { type: "project", project: homeProjects[5], layout: "medium" },
  { type: "project", project: homeProjects[6], layout: "full" },
  { type: "project", project: homeProjects[7], layout: "wide" },
  { type: "project", project: homeProjects[8], layout: "full" },
  { type: "project", project: homeProjects[9], layout: "medium" },
];

function ProjectCard({ item, index }: { item: ShowcaseItem; index: number }) {
  const { project, layout } = item;
  const director = project.director || "";
  const client = project.client;
  const title = project.title;

  const aspectClass = layout === "full"
    ? "aspect-[16/9] md:aspect-[2.2/1]"
    : layout === "wide"
    ? "aspect-[16/10] md:aspect-[1.8/1]"
    : "aspect-[4/3] md:aspect-[16/10]";

  const widthClass = layout === "full"
    ? "w-full"
    : layout === "wide"
    ? "w-[90%] md:w-[85%]"
    : "w-[75%] md:w-[65%]";

  const alignClass = index % 2 === 0 ? "mr-auto" : "ml-auto";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className={`${widthClass} ${layout !== "full" ? alignClass : ""}`}
    >
      <Link href={project.muxPlaybackId ? `/project/${project.id}` : "#"}>
        <div
          className={`relative ${aspectClass} overflow-hidden group cursor-pointer`}
          data-testid={`card-home-project-${project.id}`}
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
            <ProjectThumbnail project={project} index={index} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-[1]" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-10 z-[2]">
            <h2
              className="text-white tracking-tight"
              style={{
                fontFamily: "'Ritmica', sans-serif",
                fontWeight: 600,
                fontSize: layout === "full"
                  ? "clamp(28px, 5vw, 72px)"
                  : layout === "wide"
                  ? "clamp(24px, 4vw, 56px)"
                  : "clamp(20px, 3vw, 42px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
              data-testid={`text-home-director-${project.id}`}
            >
              {director || client}
            </h2>
            <p
              className="text-white/80 mt-1 md:mt-2"
              style={{
                fontFamily: "'Ritmica', sans-serif",
                fontWeight: 400,
                fontSize: layout === "full"
                  ? "clamp(13px, 1.4vw, 22px)"
                  : "clamp(12px, 1.2vw, 18px)",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
              data-testid={`text-home-meta-${project.id}`}
            >
              <span style={{ fontWeight: 600 }}>{client}</span>
              {" "}{title}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function PressCard({ item, index }: { item: PressItem; index: number }) {
  const { news } = item;
  const alignClass = index % 2 === 0 ? "mr-auto" : "ml-auto";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className={`w-[75%] md:w-[65%] ${alignClass}`}
    >
      <a href={news.link} target="_blank" rel="noopener noreferrer">
        <div
          className="relative aspect-[16/10] overflow-hidden group cursor-pointer"
          data-testid={`card-home-press-${news.id}`}
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[1]" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 z-[2]">
            <p
              className="text-white leading-snug"
              style={{
                fontFamily: "'Ritmica', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(18px, 3vw, 42px)",
                lineHeight: 1.2,
              }}
            >
              {news.title}
            </p>
            <p
              className="text-white/60 mt-2"
              style={{
                fontFamily: "'Ritmica', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(12px, 1.2vw, 18px)",
              }}
            >
              {news.source}
            </p>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

function HeroSection() {
  const lines = [
    { text: "CREATING CONTENT", size: "clamp(48px, 12.2vw, 200px)" },
    { text: "AND ENTERTAINMENT", size: "clamp(44px, 11vw, 182px)" },
    { text: "AT THE SPEED", size: "clamp(56px, 16vw, 264px)" },
    { text: "OF CULTURE", size: "clamp(64px, 19vw, 314px)" },
  ];

  return (
    <section
      className="relative h-screen flex flex-col justify-center bg-black"
      style={{ padding: "70px 1.5vw 0" }}
      data-testid="section-hero"
    >
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
          style={{
            fontFamily: "'Ritmica', sans-serif",
            fontWeight: 700,
            color: "#f0efe9",
            fontSize: line.size,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
          }}
          data-testid={`text-headline-${i}`}
        >
          {line.text}
        </motion.div>
      ))}
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />

      <section className="py-8 md:py-12 px-4 md:px-8" data-testid="section-showcase">
        <div className="flex flex-col gap-8 md:gap-16 lg:gap-20">
          {feed.map((item, i) => {
            if (item.type === "project") {
              return <ProjectCard key={item.project.id} item={item} index={i} />;
            }
            return <PressCard key={item.news.id} item={item} index={i} />;
          })}
        </div>
      </section>
    </div>
  );
}
