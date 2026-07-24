import { useEffect } from "react";
import { SITE_URL } from "@shared/pseo";

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  robots?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const managedSelector = "[data-family-drama-seo]";
const baseTitle = "Family Drama | Creative Production";
const baseDescription = "Family Drama is a creative production company helping brands create breakthrough content and experiences that drive cultural conversation.";

function upsertMeta(
  selector: string,
  attributes: Record<string, string>,
  removeOnCleanup = false,
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    removeOnCleanup = true;
    document.head.appendChild(element);
  }
  if (removeOnCleanup) element.setAttribute("data-family-drama-seo", "true");
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
}

function restoreBaseMetadata() {
  document.title = baseTitle;
  upsertMeta('meta[name="description"]', { name: "description", content: baseDescription });
  upsertMeta('meta[property="og:title"]', { property: "og:title", content: baseTitle });
  upsertMeta('meta[property="og:description"]', { property: "og:description", content: baseDescription });
  upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
  upsertMeta('meta[property="og:image"]', { property: "og:image", content: "/images/og-image.jpg" });
  upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: baseTitle });
  upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: baseDescription });
}

export default function SeoHead({
  title,
  description,
  canonicalPath,
  image = "/images/og-image.jpg",
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  jsonLd,
}: SeoHeadProps) {
  const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : undefined;

  useEffect(() => {
    const canonicalUrl = new URL(canonicalPath, SITE_URL).toString();
    const imageUrl = new URL(image, SITE_URL).toString();

    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots }, true);
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl }, true);
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("data-family-drama-seo", "true");
    canonical.href = canonicalUrl;

    if (serializedJsonLd) {
      let script = document.head.querySelector<HTMLScriptElement>(
        'script[type="application/ld+json"][data-family-drama-seo]',
      );
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-family-drama-seo", "true");
        document.head.appendChild(script);
      }
      script.textContent = serializedJsonLd;
    }

    return () => {
      document.head.querySelectorAll(managedSelector).forEach((element) => element.remove());
      restoreBaseMetadata();
    };
  }, [canonicalPath, description, image, robots, serializedJsonLd, title]);

  return null;
}
