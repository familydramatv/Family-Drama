import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  CityPageContent,
  LocationsPageContent,
  ServiceCityPageContent,
  ServicePageContent,
  ServicesPageContent,
  pageSchema,
  serviceCitySchema,
} from "../client/src/pages/pseo";
import {
  LOCATIONS_DESCRIPTION,
  LOCATIONS_TITLE,
  SERVICES_DESCRIPTION,
  SERVICES_TITLE,
  SITE_URL,
  cityPageDescription,
  cityPageTitle,
  cityPath,
  isServiceCityIndexable,
  seoCities,
  seoServices,
  serviceCityDescription,
  serviceCityPath,
  serviceCityTitle,
  servicePageDescription,
  servicePageTitle,
  servicePath,
  type SeoCity,
  type SeoService,
} from "../shared/pseo";

const publicDirectory = path.resolve("dist/public");
const defaultImage = `${SITE_URL}/images/og-image.jpg`;
const indexRobots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

interface PageDefinition {
  path: string;
  title: string;
  description: string;
  robots: string;
  jsonLd: Record<string, unknown>;
  markup: string;
  includeInSitemap: boolean;
}

function absoluteUrl(urlPath: string): string {
  return new URL(urlPath, SITE_URL).toString();
}

function render<T extends object>(Component: ComponentType<T>, props: T): string {
  return renderToStaticMarkup(createElement(Component, props));
}

function escapeAttribute(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeXml(value: string): string {
  return escapeAttribute(value).replaceAll("'", "&apos;");
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function setMeta(html: string, attribute: "name" | "property", key: string, content: string): string {
  const expression = new RegExp(`<meta\\s+[^>]*${attribute}=["']${escapeRegExp(key)}["'][^>]*>`, "i");
  const tag = `<meta ${attribute}="${escapeAttribute(key)}" content="${escapeAttribute(content)}" />`;
  return expression.test(html) ? html.replace(expression, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function buildDocument(template: string, page: PageDefinition): string {
  const canonical = absoluteUrl(page.path);
  const serializedSchema = JSON.stringify(page.jsonLd).replaceAll("<", "\\u003c");
  let html = template.replace(/<title>.*?<\/title>/i, `<title>${escapeAttribute(page.title)}</title>`);

  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "name", "robots", page.robots);
  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "property", "og:type", "website");
  html = setMeta(html, "property", "og:url", canonical);
  html = setMeta(html, "property", "og:image", defaultImage);
  html = setMeta(html, "name", "twitter:card", "summary_large_image");
  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);
  html = html.replace(/\s*<link\s+rel=["']canonical["'][^>]*>/i, "");
  html = html.replace(/\s*<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "");
  html = html.replace(/\s*<link\s+rel=["']preload["']\s+as=["']image["'][^>]*>/gi, "");
  html = html.replace(
    "</head>",
    `    <link rel="canonical" href="${escapeAttribute(canonical)}" />\n    <script type="application/ld+json">${serializedSchema}</script>\n  </head>`,
  );
  html = html.replace('<div id="root"></div>', `<div id="root">${page.markup}</div>`);
  return html;
}

function collectionSchema(
  title: string,
  description: string,
  urlPath: string,
  breadcrumbs: Array<{ name: string; path: string }>,
) {
  return pageSchema(title, description, urlPath, breadcrumbs);
}

function createDefinitions(): PageDefinition[] {
  const pages: PageDefinition[] = [
    {
      path: "/services",
      title: SERVICES_TITLE,
      description: SERVICES_DESCRIPTION,
      robots: indexRobots,
      jsonLd: collectionSchema(SERVICES_TITLE, SERVICES_DESCRIPTION, "/services", [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ]),
      markup: render(ServicesPageContent, {}),
      includeInSitemap: true,
    },
    {
      path: "/locations",
      title: LOCATIONS_TITLE,
      description: LOCATIONS_DESCRIPTION,
      robots: indexRobots,
      jsonLd: collectionSchema(LOCATIONS_TITLE, LOCATIONS_DESCRIPTION, "/locations", [
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
      ]),
      markup: render(LocationsPageContent, {}),
      includeInSitemap: true,
    },
  ];

  for (const service of seoServices) {
    const title = servicePageTitle(service);
    const description = servicePageDescription(service);
    const urlPath = servicePath(service);
    pages.push({
      path: urlPath,
      title,
      description,
      robots: indexRobots,
      jsonLd: collectionSchema(title, description, urlPath, [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.name, path: urlPath },
      ]),
      markup: render(ServicePageContent, { service }),
      includeInSitemap: true,
    });
  }

  for (const city of seoCities) {
    const title = cityPageTitle(city);
    const description = cityPageDescription(city);
    const urlPath = cityPath(city);
    pages.push({
      path: urlPath,
      title,
      description,
      robots: indexRobots,
      jsonLd: collectionSchema(title, description, urlPath, [
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
        { name: city.name, path: urlPath },
      ]),
      markup: render(CityPageContent, { city }),
      includeInSitemap: true,
    });
  }

  for (const service of seoServices) {
    for (const city of seoCities) {
      const indexable = isServiceCityIndexable(service, city);
      pages.push({
        path: serviceCityPath(service, city),
        title: serviceCityTitle(service, city),
        description: serviceCityDescription(service, city),
        robots: indexable ? indexRobots : "noindex, follow, max-image-preview:large",
        jsonLd: serviceCitySchema(service, city),
        markup: render(ServiceCityPageContent, { service, city }),
        includeInSitemap: indexable,
      });
    }
  }

  return pages;
}

function createSitemap(pages: PageDefinition[]): string {
  const existingRoutes = ["/", "/work", "/talent", "/about", "/contact", "/news", "/careers"];
  const urls = [...existingRoutes, ...pages.filter((page) => page.includeInSitemap).map((page) => page.path)];
  const entries = Array.from(new Set(urls))
    .map((urlPath) => `  <url><loc>${escapeXml(absoluteUrl(urlPath))}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

export async function generateSeoPages() {
  const template = await readFile(path.join(publicDirectory, "index.html"), "utf8");
  const pages = createDefinitions();

  for (const page of pages) {
    const relativePath = `${page.path.replace(/^\//, "")}.html`;
    const outputPath = path.join(publicDirectory, relativePath);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, buildDocument(template, page), "utf8");
  }

  await writeFile(path.join(publicDirectory, "sitemap.xml"), createSitemap(pages), "utf8");
  await writeFile(
    path.join(publicDirectory, "robots.txt"),
    `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    "utf8",
  );

  const indexablePages = pages.filter((page) => page.includeInSitemap).length;
  console.log(`generated ${pages.length} pSEO pages (${indexablePages} indexable, ${pages.length - indexablePages} staged)`);
}

