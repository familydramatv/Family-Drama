import React, { useEffect, useRef, useState } from "react";
import { useParams } from "wouter";
import SeoHead from "@/components/seo-head";
import { getMuxThumbnail, projects, type Project } from "@/lib/data";
import {
  LOCATIONS_DESCRIPTION,
  LOCATIONS_TITLE,
  SERVICES_DESCRIPTION,
  SERVICES_TITLE,
  SITE_URL,
  cityPageDescription,
  cityPageTitle,
  cityPath,
  getSeoCity,
  getSeoService,
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
} from "@shared/pseo";

const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Family Drama",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.svg`,
  email: "hello@familydrama.tv",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "3003 South Loop West, Suite 108",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77054",
      addressCountry: "US",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "111 Sandra Muraida Way, Suite 100",
      addressLocality: "Austin",
      addressRegion: "TX",
      postalCode: "78703",
      addressCountry: "US",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "1370 N. Saint Andrews Place",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      postalCode: "90028",
      addressCountry: "US",
    },
  ],
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Family Drama",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

function serviceNameInSentence(service: SeoService) {
  return service.name
    .toLowerCase()
    .replace(/\b3d\b/g, "3D")
    .replace(/\bai\b/g, "AI")
    .replace(/\bb2b\b/g, "B2B");
}

function PseoPage({
  children,
  motionKey,
  pageType,
}: {
  children: React.ReactNode;
  motionKey: string;
  pageType: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!root || reducedMotion || !("IntersectionObserver" in window)) return;

    const revealTargets = Array.from(root.querySelectorAll<HTMLElement>([
      ".pseo-section-heading",
      ".pseo-market-lead",
      ".pseo-market-copy",
      ".pseo-capability-list article",
      ".pseo-process li",
      ".pseo-faq-list article",
      ".pseo-related > div",
      ".pseo-related-links a",
      ".pseo-city-grid a",
      ".pseo-service-directory a",
      ".pseo-closing > *",
    ].join(",")));
    const workCards = Array.from(root.querySelectorAll<HTMLElement>(".pseo-work-card"));
    const observedElements = [...revealTargets, ...workCards];

    revealTargets.forEach((target, index) => {
      target.classList.add("pseo-reveal-target");
      target.style.setProperty("--pseo-reveal-delay", `${Math.min(index % 4, 3) * 65}ms`);
    });
    workCards.forEach((card, index) => {
      card.classList.add("pseo-motion-card");
      card.style.setProperty("--pseo-reveal-delay", `${Math.min(index, 2) * 90}ms`);
    });
    root.classList.add("pseo-motion-active");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-pseo-visible", entry.isIntersecting);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    const observeFrame = window.requestAnimationFrame(() => {
      observedElements.forEach((element) => observer.observe(element));
    });

    const hero = root.querySelector<HTMLElement>(".pseo-hero");
    const heroLines = Array.from(root.querySelectorAll<HTMLElement>(".pseo-hero h1 > span"));
    let scrollFrame = 0;
    const updateHero = () => {
      scrollFrame = 0;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(0, -rect.top / Math.max(rect.height * 0.8, 1));
      heroLines.forEach((line, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        line.style.transform = `translate3d(${progress * direction * 120}vw, 0, 0)`;
      });
    };
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateHero);
    };
    updateHero();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(observeFrame);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("pseo-motion-active");
      observedElements.forEach((element) => {
        element.classList.remove("pseo-reveal-target", "pseo-motion-card", "is-pseo-visible");
        element.style.removeProperty("--pseo-reveal-delay");
      });
      heroLines.forEach((line) => line.style.removeProperty("transform"));
    };
  }, [motionKey]);

  return (
    <div ref={rootRef} className="pseo-page" data-page-type={pageType}>
      {children}
    </div>
  );
}

function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceCitySchema(service: SeoService, city: SeoCity) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      {
        "@type": "Service",
        "@id": `${absoluteUrl(serviceCityPath(service, city))}#service`,
        name: `${service.name} in ${city.name}, ${city.stateCode}`,
        description: serviceCityDescription(service, city),
        serviceType: service.keywordVariants,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: {
          "@type": "City",
          name: city.name,
          containedInPlace: {
            "@type": "State",
            name: city.state,
          },
        },
        url: absoluteUrl(serviceCityPath(service, city)),
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.name, path: servicePath(service) },
        { name: city.name, path: serviceCityPath(service, city) },
      ]),
    ],
  };
}

export function pageSchema(
  name: string,
  description: string,
  path: string,
  breadcrumbs: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      {
        "@type": "CollectionPage",
        name,
        description,
        url: absoluteUrl(path),
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      breadcrumbSchema(breadcrumbs),
    ],
  };
}

function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="pseo-breadcrumbs">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Hero({
  eyebrow,
  lines,
  description,
  breadcrumbs,
}: {
  eyebrow: string;
  lines: string[];
  description: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
}) {
  return (
    <header className="pseo-hero">
      <Breadcrumbs items={breadcrumbs} />
      <p className="pseo-eyebrow">{eyebrow}</p>
      <h1>
        {lines.map((line) => <span key={line}>{line}</span>)}
      </h1>
      <div className="pseo-hero-intro">
        <p>{description}</p>
        <div className="pseo-actions">
          <a className="pseo-action-primary" href="mailto:sales@familydrama.tv?subject=Production%20Inquiry">Start a project</a>
          <a className="pseo-action-secondary" href="/work">View selected work</a>
        </div>
      </div>
    </header>
  );
}

function PseoVideoLoop({ playbackId }: { playbackId: string }) {
  const videoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    element.setAttribute("muted", "");
    element.setAttribute("loop", "");
    element.setAttribute("playsinline", "");
    const video = element as HTMLVideoElement;
    video.muted = true;

    const play = () => {
      element.setAttribute("autoplay", "");
      video.play?.().catch(() => {});
    };
    const pause = () => {
      element.removeAttribute("autoplay");
      video.pause?.();
    };

    if (!("IntersectionObserver" in window)) {
      play();
      return pause;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) play();
      else pause();
    }, { rootMargin: "240px 0px", threshold: 0.01 });
    observer.observe(element);

    return () => {
      observer.disconnect();
      pause();
    };
  }, [playbackId]);

  return (
    <mux-video
      ref={videoRef}
      playback-id={playbackId}
      preload="metadata"
      class="pseo-work-video"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}

function ProjectMedia({ project, eager }: { project: Project; eager?: boolean }) {
  const [showVideo, setShowVideo] = useState(false);
  const src = project.homeImage
    || (project.muxPlaybackId ? getMuxThumbnail(project.muxPlaybackId, project.thumbnailTime || 0, 1400) : project.image);

  useEffect(() => {
    if (
      project.homeVideoLoop
      && project.muxPlaybackId
      && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShowVideo(true);
    }
  }, [project.homeVideoLoop, project.muxPlaybackId]);

  return (
    <>
      <img
        src={src}
        alt={`${project.client}: ${project.title}, produced by Family Drama`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
      {showVideo && project.muxPlaybackId ? <PseoVideoLoop playbackId={project.muxPlaybackId} /> : null}
    </>
  );
}

function SelectedWork({ service }: { service: SeoService }) {
  const selectedProjects = service.projectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));

  return (
    <section className="pseo-work" aria-labelledby="selected-work-heading">
      <div className="pseo-section-heading">
        <p className="pseo-eyebrow">Proof, not promises</p>
        <h2 id="selected-work-heading">Selected work</h2>
      </div>
      <div className="pseo-work-list">
        {selectedProjects.map((project, index) => (
          <a href={`/project/${project.id}`} className="pseo-work-card" key={project.id}>
            <div className="pseo-work-media">
              <ProjectMedia project={project} eager={index === 0} />
            </div>
            <div className="pseo-work-meta">
              <h3>{project.title}</h3>
              <p>{project.client}{project.director ? ` · Directed by ${project.director}` : ""}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Capabilities({ service }: { service: SeoService }) {
  return (
    <section className="pseo-capabilities" aria-labelledby="capabilities-heading">
      <div className="pseo-section-heading pseo-section-heading-wide">
        <p className="pseo-eyebrow">Full service, one production line</p>
        <h2 id="capabilities-heading">What {serviceNameInSentence(service)} includes</h2>
      </div>
      <div className="pseo-capability-list">
        {service.capabilities.map((capability, index) => (
          <article key={capability.title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MarketSection({ service, city }: { service: SeoService; city: SeoCity }) {
  const officeStatement = city.hasOffice
    ? `Family Drama has a working office in ${city.name}, giving projects a direct production base in the market.`
    : `Family Drama coordinates ${city.name} production through its national crew and vendor network, led from the ${city.nearestOffice} office.`;

  return (
    <section className="pseo-market" aria-labelledby="market-heading">
      <div className="pseo-market-lead">
        <p className="pseo-eyebrow">{city.name}, {city.stateCode}</p>
        <h2 id="market-heading">Production built for the market, not pasted onto it.</h2>
      </div>
      <div className="pseo-market-copy">
        <p>{officeStatement}</p>
        <p>
          The market brings together {city.industries.slice(0, -1).join(", ")}, and {city.industries.at(-1)} with {city.productionCharacter}. For {serviceNameInSentence(service)}, that range creates options for both controlled campaign craft and work grounded in a real place.
        </p>
        <p>
          On the practical side, {city.logistics}. We build those realities into the bid, schedule, crew plan, and creative approach before they become production-day compromises.
        </p>
      </div>
    </section>
  );
}

function ProcessSection({ service, city }: { service: SeoService; city: SeoCity }) {
  const steps = [
    ["Define the job", `Align on audience, channels, deliverables, budget range, timing, and what success needs to look like for the ${city.name} production.`],
    ["Build the approach", `Build the production around ${service.processFocus}, then match director, crew, locations, talent, technology, and post to that approach.`],
    ["Produce with one lead", "Run creative, logistics, capture, client communication, and media management through one accountable production team."],
    ["Finish for every screen", "Edit, finish, quality-control, and deliver the hero asset and its campaign versions without losing the original idea."],
  ];

  return (
    <section className="pseo-process" aria-labelledby="process-heading">
      <div className="pseo-section-heading">
        <p className="pseo-eyebrow">From brief to delivery</p>
        <h2 id="process-heading">How we work</h2>
      </div>
      <ol>
        {steps.map(([title, description], index) => (
          <li key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ServiceFaq({ service, city }: { service: SeoService; city: SeoCity }) {
  const serviceLabel = serviceNameInSentence(service);
  const locationAnswer = city.hasOffice
    ? `Yes. Family Drama has a working office in ${city.name} and can lead local ${serviceLabel} from development through delivery.`
    : `Yes. Family Drama serves ${city.name} through a national production network, assembling the local crew, vendors, equipment, and location support each brief requires. The project is led from our ${city.nearestOffice} office.`;
  const questions = [
    [`Does Family Drama provide ${serviceLabel} in ${city.name}?`, locationAnswer],
    [`What kinds of ${serviceLabel} projects do you take on?`, `${service.summary} Common briefs also include ${service.keywordVariants.join(", ")}. We recommend one connected production plan when a campaign needs several of those outputs.`],
    [`Can you provide a crew and production support in ${city.name}?`, `Yes. We can provide a complete production team or a right-sized unit around an existing agency, brand, or director. Scope can include producers, camera, lighting, sound, art, talent, locations, releases, media management, and post.`],
    [`How much does ${serviceLabel} cost in ${city.name}?`, "Cost depends on creative scope, shoot days, crew size, talent, locations, equipment, travel, post, and the number of deliverables. Share the brief, or the problem before the brief, and we can recommend a realistic production path and budget range."],
  ];

  return (
    <section className="pseo-faq" aria-labelledby="faq-heading">
      <div className="pseo-section-heading">
        <p className="pseo-eyebrow">Before the first call</p>
        <h2 id="faq-heading">Frequently asked questions</h2>
      </div>
      <div className="pseo-faq-list">
        {questions.map(([question, answer]) => (
          <article key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RelatedLinks({ service, city }: { service: SeoService; city: SeoCity }) {
  const related = service.related
    .map((slug) => getSeoService(slug))
    .filter((item): item is SeoService => Boolean(item));

  return (
    <section className="pseo-related" aria-labelledby="related-heading">
      <div>
        <p className="pseo-eyebrow">Build the full campaign</p>
        <h2 id="related-heading">Related production services in {city.name}</h2>
      </div>
      <div className="pseo-related-links">
        {related.map((item) => (
          <a href={serviceCityPath(item, city)} key={item.slug}>
            <span>{item.name}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
        <a href={cityPath(city)}>
          <span>All {city.name} capabilities</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

function Closing({ lineOne, lineTwo }: { lineOne: string; lineTwo: string }) {
  return (
    <section className="pseo-closing">
      <p className="pseo-eyebrow">Have a brief, or the start of one?</p>
      <h2><span>{lineOne}</span><span>{lineTwo}</span></h2>
      <a href="mailto:sales@familydrama.tv?subject=Production%20Inquiry">sales@familydrama.tv</a>
    </section>
  );
}

export function ServiceCityPageContent({ service, city }: { service: SeoService; city: SeoCity }) {
  return (
    <PseoPage pageType="service-city" motionKey={serviceCityPath(service, city)}>
      <Hero
        eyebrow={`${city.name}, ${city.stateCode} · ${service.name}`}
        lines={[service.name, `IN ${city.name}`]}
        description={`${service.overview} In ${city.name}, we shape that system around the market, the locations, and the production realities of the brief.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name, href: servicePath(service) },
          { label: city.name },
        ]}
      />
      <SelectedWork service={service} />
      <MarketSection service={service} city={city} />
      <Capabilities service={service} />
      <ProcessSection service={service} city={city} />
      <ServiceFaq service={service} city={city} />
      <RelatedLinks service={service} city={city} />
      <Closing lineOne="MAKE SOMETHING" lineTwo="WORTH WATCHING" />
    </PseoPage>
  );
}

export function ServicePageContent({ service }: { service: SeoService }) {
  return (
    <PseoPage pageType="service" motionKey={servicePath(service)}>
      <Hero
        eyebrow="Family Drama · Capabilities"
        lines={service.name.split(" ").length > 2 ? [service.name] : [service.name, "BY FAMILY DRAMA"]}
        description={`${service.overview} ${service.summary}`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.name }]}
      />
      <SelectedWork service={service} />
      <Capabilities service={service} />
      <section className="pseo-index-list" aria-labelledby="service-locations-heading">
        <div className="pseo-section-heading pseo-section-heading-wide">
          <p className="pseo-eyebrow">Nationwide production coverage</p>
          <h2 id="service-locations-heading">{service.name} by market</h2>
        </div>
        <div className="pseo-city-grid">
          {seoCities.map((city) => (
            <a href={serviceCityPath(service, city)} key={city.slug}>
              <span>{city.name}</span><span>{city.stateCode}</span>
            </a>
          ))}
        </div>
      </section>
      <Closing lineOne="BRING US" lineTwo="THE BRIEF" />
    </PseoPage>
  );
}

export function ServicesPageContent() {
  return (
    <PseoPage pageType="services" motionKey="/services">
      <Hero
        eyebrow="Family Drama · Full-service production"
        lines={["PRODUCTION", "SERVICES"]}
        description="Strategy, creative, production, post, technology, and experiences connected under one production company. Explore the capability that fits the brief, then see how Family Drama delivers it in your market."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <section className="pseo-service-directory" aria-labelledby="service-directory-heading">
        <div className="pseo-section-heading pseo-section-heading-wide">
          <p className="pseo-eyebrow">One team, many forms</p>
          <h2 id="service-directory-heading">Capabilities</h2>
        </div>
        <div>
          {seoServices.map((service, index) => (
            <a href={servicePath(service)} key={service.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.name}</h3>
              <p>{service.summary}</p>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
      <Closing lineOne="FROM FIRST IDEA" lineTwo="TO FINAL MASTER" />
    </PseoPage>
  );
}

export function CityPageContent({ city }: { city: SeoCity }) {
  return (
    <PseoPage pageType="city" motionKey={cityPath(city)}>
      <Hero
        eyebrow={`Production coverage · ${city.state}`}
        lines={["PRODUCTION", `IN ${city.name}`]}
        description={`Family Drama produces commercials, branded content, social video, photography, and creative technology in ${city.name}. The market combines ${city.industries.join(", ")} with ${city.productionCharacter}.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Locations", href: "/locations" }, { label: city.name }]}
      />
      <section className="pseo-market pseo-market-standalone" aria-labelledby="city-production-heading">
        <div className="pseo-market-lead">
          <p className="pseo-eyebrow">Built for the place</p>
          <h2 id="city-production-heading">A production plan shaped around {city.name}.</h2>
        </div>
        <div className="pseo-market-copy">
          <p>{city.hasOffice ? `Family Drama has a working office in ${city.name}.` : `Projects in ${city.name} are led through Family Drama’s ${city.nearestOffice} office and national production network.`}</p>
          <p>We scout for the idea, assemble the crew around the format, and plan for the details that can change the day: {city.logistics}.</p>
          <p>The result is an honest local production approach with one national point of accountability from creative development through delivery.</p>
        </div>
      </section>
      <section className="pseo-service-directory" aria-labelledby="city-service-heading">
        <div className="pseo-section-heading pseo-section-heading-wide">
          <p className="pseo-eyebrow">Capabilities in {city.name}</p>
          <h2 id="city-service-heading">Production services</h2>
        </div>
        <div>
          {seoServices.map((service, index) => (
            <a href={serviceCityPath(service, city)} key={service.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.name}</h3>
              <p>{service.summary}</p>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
      <Closing lineOne="YOUR MARKET" lineTwo="OUR PRODUCTION" />
    </PseoPage>
  );
}

export function LocationsPageContent() {
  return (
    <PseoPage pageType="locations" motionKey="/locations">
      <Hero
        eyebrow="Family Drama · U.S. production coverage"
        lines={["PRODUCTION", "ACROSS", "THE COUNTRY"]}
        description="Family Drama leads work from offices in Houston, Austin, and Los Angeles, with production teams, crews, and vendor relationships across the United States. Explore each market’s production profile and available capabilities."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Locations" }]}
      />
      <section className="pseo-index-list" aria-labelledby="location-directory-heading">
        <div className="pseo-section-heading pseo-section-heading-wide">
          <p className="pseo-eyebrow">Markets we serve</p>
          <h2 id="location-directory-heading">U.S. production locations</h2>
        </div>
        <div className="pseo-city-grid pseo-city-grid-large">
          {seoCities.map((city) => (
            <a href={cityPath(city)} key={city.slug}>
              <span>{city.name}</span><span>{city.stateCode}</span>
            </a>
          ))}
        </div>
      </section>
      <Closing lineOne="WHEREVER THE IDEA" lineTwo="NEEDS TO GO" />
    </PseoPage>
  );
}

function NotFoundSeo() {
  return (
    <div className="pseo-page pseo-not-found">
      <SeoHead
        title="Page Not Found | Family Drama"
        description="The requested Family Drama production page could not be found."
        canonicalPath="/"
        robots="noindex, follow"
      />
      <h1>Page not found.</h1>
      <a href="/services">Explore production services</a>
    </div>
  );
}

export function ServiceCityRoute() {
  const { service: serviceSlug, city: citySlug } = useParams<{ service: string; city: string }>();
  const service = getSeoService(serviceSlug);
  const city = getSeoCity(citySlug);
  if (!service || !city) return <NotFoundSeo />;
  const indexable = isServiceCityIndexable(service, city);

  return (
    <>
      <SeoHead
        title={serviceCityTitle(service, city)}
        description={serviceCityDescription(service, city)}
        canonicalPath={serviceCityPath(service, city)}
        image="/images/og-image.jpg"
        robots={indexable ? undefined : "noindex, follow, max-image-preview:large"}
        jsonLd={serviceCitySchema(service, city)}
      />
      <ServiceCityPageContent service={service} city={city} />
    </>
  );
}

export function ServiceRoute() {
  const { service: serviceSlug } = useParams<{ service: string }>();
  const service = getSeoService(serviceSlug);
  if (!service) return <NotFoundSeo />;
  const title = servicePageTitle(service);
  const description = servicePageDescription(service);
  return (
    <>
      <SeoHead
        title={title}
        description={description}
        canonicalPath={servicePath(service)}
        jsonLd={pageSchema(title, description, servicePath(service), [
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: servicePath(service) },
        ])}
      />
      <ServicePageContent service={service} />
    </>
  );
}

export function ServicesRoute() {
  const title = SERVICES_TITLE;
  const description = SERVICES_DESCRIPTION;
  return (
    <>
      <SeoHead
        title={title}
        description={description}
        canonicalPath="/services"
        jsonLd={pageSchema(title, description, "/services", [
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <ServicesPageContent />
    </>
  );
}

export function CityRoute() {
  const { city: citySlug } = useParams<{ city: string }>();
  const city = getSeoCity(citySlug);
  if (!city) return <NotFoundSeo />;
  const title = cityPageTitle(city);
  const description = cityPageDescription(city);
  return (
    <>
      <SeoHead
        title={title}
        description={description}
        canonicalPath={cityPath(city)}
        jsonLd={pageSchema(title, description, cityPath(city), [
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: city.name, path: cityPath(city) },
        ])}
      />
      <CityPageContent city={city} />
    </>
  );
}

export function LocationsRoute() {
  const title = LOCATIONS_TITLE;
  const description = LOCATIONS_DESCRIPTION;
  return (
    <>
      <SeoHead
        title={title}
        description={description}
        canonicalPath="/locations"
        jsonLd={pageSchema(title, description, "/locations", [
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ])}
      />
      <LocationsPageContent />
    </>
  );
}
