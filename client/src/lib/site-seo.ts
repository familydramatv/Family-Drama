import {
  directors,
  getMuxThumbnail,
  newsItems,
  projects,
} from "@/lib/data";
import {
  SITE_URL,
} from "@shared/pseo";

export type SitemapGroup = "core" | "services" | "locations" | "service-locations";

export interface SiteSeoDefinition {
  path: string;
  canonicalPath: string;
  title: string;
  description: string;
  image?: string;
  robots?: string;
  jsonLd?: Record<string, unknown>;
  includeInSitemap: boolean;
  sitemapGroup: SitemapGroup;
}

const indexRobots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const noindexRobots = "noindex, follow, max-image-preview:large";

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

function truncateAtWord(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  const shortened = value.slice(0, maxLength + 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return shortened.slice(0, lastSpace > maxLength * 0.6 ? lastSpace : maxLength).trim();
}

function webPageSchema(page: Pick<SiteSeoDefinition, "canonicalPath" | "description" | "title">) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(page.canonicalPath)}#webpage`,
    url: absoluteUrl(page.canonicalPath),
    name: page.title,
    description: page.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };
}

const corePages: SiteSeoDefinition[] = [
  {
    path: "/",
    canonicalPath: "/",
    title: "Family Drama | Video Production & Creative Studio",
    description: "Family Drama is a full-service production company creating commercials, branded content, social video, photography, post, and creative technology.",
    includeInSitemap: true,
    sitemapGroup: "core",
  },
  {
    path: "/work",
    canonicalPath: "/work",
    title: "Commercial & Branded Video Work | Family Drama",
    description: "Watch commercial, branded content, social, documentary, and creative technology work produced by Family Drama for leading brands and agencies.",
    includeInSitemap: true,
    sitemapGroup: "core",
  },
  {
    path: "/talent",
    canonicalPath: "/talent",
    title: "Commercial Directors & Creative Talent | Family Drama",
    description: "Explore Family Drama's roster of commercial directors and creative talent working across film, branded content, social, and emerging media.",
    includeInSitemap: true,
    sitemapGroup: "core",
  },
  {
    path: "/about",
    canonicalPath: "/about",
    title: "About Family Drama | Creative Production Company",
    description: "Meet Family Drama, a culture-forward production company creating commercials, branded stories, live experiences, and creative technology.",
    includeInSitemap: true,
    sitemapGroup: "core",
  },
  {
    path: "/contact",
    canonicalPath: "/contact",
    title: "Contact Family Drama | Start a Production",
    description: "Contact Family Drama for commercial production, branded content, social video, post-production, photography, and creative technology projects.",
    includeInSitemap: true,
    sitemapGroup: "core",
  },
  {
    path: "/news",
    canonicalPath: "/news",
    title: "Family Drama News, Work & Production Insights",
    description: "Read company news, campaign stories, awards, director announcements, and production insights from Family Drama.",
    includeInSitemap: true,
    sitemapGroup: "core",
  },
  {
    path: "/careers",
    canonicalPath: "/careers",
    title: "Production Careers and Opportunities | Family Drama",
    description: "Explore future production, post-production, creative technology, and operations career opportunities with the Family Drama team.",
    robots: noindexRobots,
    includeInSitemap: false,
    sitemapGroup: "core",
  },
];

const workCategoryPages = ["content", "experience", "ai", "stills"].map<SiteSeoDefinition>((category) => ({
  path: `/work/${category}`,
  canonicalPath: "/work",
  title: "Commercial & Branded Video Work | Family Drama",
  description: "Watch commercial, branded content, social, documentary, and creative technology work produced by Family Drama for leading brands and agencies.",
  robots: noindexRobots,
  includeInSitemap: false,
  sitemapGroup: "core",
}));

function projectSeo(project: typeof projects[number]): SiteSeoDefinition {
  const description = `Watch ${project.client}: ${project.title}, produced by Family Drama${project.director ? ` and directed by ${project.director}` : ""}. Explore the film, credits, and commercial production craft.`;
  const playbackId = project.muxProjectPlaybackId || project.muxPlaybackId;
  const image = project.homeImage
    || (playbackId ? getMuxThumbnail(playbackId, project.thumbnailTime || 0, 1600) : project.image)
    || "/images/og-image.jpg";
  const page: SiteSeoDefinition = {
    path: `/project/${project.id}`,
    canonicalPath: `/project/${project.id}`,
    title: `${project.client}: ${project.title}${`${project.client}: ${project.title}`.length < 15 ? " Commercial" : ""} | Family Drama`,
    description,
    image,
    includeInSitemap: true,
    sitemapGroup: "core",
  };
  page.jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${absoluteUrl(page.path)}#work`,
    url: absoluteUrl(page.path),
    name: project.title,
    description,
    image: new URL(image, SITE_URL).toString(),
    creator: { "@id": `${SITE_URL}/#organization` },
    copyrightHolder: { "@id": `${SITE_URL}/#organization` },
    ...(project.director ? { director: { "@type": "Person", name: project.director } } : {}),
    about: { "@type": "Organization", name: project.client },
  };
  return page;
}

function articleSeo(article: typeof newsItems[number]): SiteSeoDefinition {
  const shortArticleTitle = truncateAtWord(article.title, 48);
  const description = article.subtitle && article.subtitle.length >= 110
    ? truncateAtWord(article.subtitle, 165)
    : `Read ${truncateAtWord(article.title, 50)}. News about Family Drama's campaign work, commercial productions, creative talent, and company updates.`;
  const page: SiteSeoDefinition = {
    path: `/news/${article.id}`,
    canonicalPath: `/news/${article.id}`,
    title: `${shortArticleTitle} | Family Drama`,
    description,
    image: article.image,
    includeInSitemap: true,
    sitemapGroup: "core",
  };
  page.jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(page.path)}#article`,
    url: absoluteUrl(page.path),
    headline: article.title,
    description,
    image: absoluteUrl(article.image),
    datePublished: new Date(article.date).toISOString(),
    ...(article.author ? { author: { "@type": "Person", name: article.author } } : {}),
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  return page;
}

function directorSeo(director: typeof directors[number]): SiteSeoDefinition {
  const page: SiteSeoDefinition = {
    path: `/talent/${director.id}`,
    canonicalPath: `/talent/${director.id}`,
    title: `${director.name}, Commercial Director | Family Drama`,
    description: `Watch work by commercial director ${director.name}, represented by Family Drama for U.S. commercial and branded content production.`,
    includeInSitemap: true,
    sitemapGroup: "core",
  };
  page.jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${absoluteUrl(page.path)}#person`,
    url: absoluteUrl(page.path),
    name: director.name,
    jobTitle: "Commercial Director",
    affiliation: { "@id": `${SITE_URL}/#organization` },
  };
  return page;
}

export function getStaticSiteSeoPages(): SiteSeoDefinition[] {
  return [
    ...corePages,
    ...workCategoryPages,
    ...projects.map(projectSeo),
    ...newsItems.map(articleSeo),
    ...directors.map(directorSeo),
  ].map((page) => ({
    ...page,
    robots: page.robots || indexRobots,
    jsonLd: page.jsonLd || webPageSchema(page),
  }));
}

export function getSitewideSeo(pathname: string): SiteSeoDefinition | undefined {
  const path = pathname.split("?")[0].replace(/\/+$/, "") || "/";
  const staticPage = getStaticSiteSeoPages().find((page) => page.path === path);
  if (staticPage) return staticPage;

  if (path === "/services" || path.startsWith("/services/")) return undefined;
  if (path === "/locations" || path.startsWith("/locations/")) return undefined;

  const segments = path.split("/").filter(Boolean);
  if (
    segments.length === 2
    && ["news", "project", "talent", "work"].includes(segments[0])
  ) {
    return {
      path,
      canonicalPath: "/",
      title: "Page Not Found | Family Drama",
      description: "The requested Family Drama page could not be found.",
      robots: noindexRobots,
      includeInSitemap: false,
      sitemapGroup: "core",
    };
  }
  if (segments.length === 2) return undefined;

  return {
    path,
    canonicalPath: "/",
    title: "Page Not Found | Family Drama",
    description: "The requested Family Drama page could not be found.",
    robots: noindexRobots,
    includeInSitemap: false,
    sitemapGroup: "core",
  };
}
