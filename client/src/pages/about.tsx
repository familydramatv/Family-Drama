import { useEffect, useRef, useState, useCallback } from "react";

const EASE = 0.05;
const SCROLL_DAMPEN = 0.5;
const SLIDE_COUNT = 15;
const SHOWCASE_SLIDE = 14;
const HERO_LOCK_MULTIPLIER = 1;
const SLIDE2_LOCK_MULTIPLIER = 2;

const slide2Line1 = "We're All";
const slide2UseLogo = true;

function seededRandom(seed: number) {
  let x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}
const slide2Line2 = "Family";
const allBannerText = slide2Line1 + " " + slide2Line2;
const slide2LetterParams = Array.from({ length: allBannerText.length + 1 }, (_, i) => ({
  dropDist: 200 + seededRandom(i + 7) * 400,
  xOffset: (seededRandom(i + 13) - 0.5) * 600,
  staggerDelay: seededRandom(i + 31) * 0.45,
  speed: 0.35 + seededRandom(i + 47) * 0.25,
}));

const rolodexSlides = [
  "Whatever a traditional production company looks like, we've never been that…",
  "We're a different kind of company. Intentionally.",
  "A company that treats every project like it's personal, every director like they're family, and every frame like it's the one people remember.",
];

const cyclingWords = [
  "Commercials",
  "Branded Content",
  "Documentaries",
  "Live Experiences",
  "Storytelling",
  "Culture & Media",
  "Content Worth Watching",
];

const coreBeliefs = [
  "The best work comes from trust, not timelines.",
  "Directors aren't interchangeable.",
  "Brands deserve a partner, not a vendor.",
  "We don't hide behind the treatment.",
  "We don't play it safe.",
];

const rosterItems = [
  "From Super Bowl spots to startup launch films…",
  "To athlete driven docuseries…",
  "To brand campaigns that live beyond the media buy…",
  "To passion projects that win festivals…",
  "To content that earns press, not just placement…",
  "To work that makes the reel and the culture.",
];

const showcaseCards = [
  {
    statNumber: "3 Part Docuseries",
    statLabel: "Original Production",
    creditTitle: "Grit & Glory: Journey to the Draft",
    creditDetail: "Directed by Family Drama / Produced by Family Drama",
    image: "/images/project-1.png",
  },
  {
    statNumber: "National Broadcast",
    statLabel: "Network Campaign",
    creditTitle: "Dr. Teal's x Aaron Donald",
    creditDetail: "Directed by Family Drama",
    image: "/images/project-2.png",
  },
  {
    statNumber: "12 Million",
    statLabel: "Views",
    creditTitle: "Branded Content Partnership",
    creditDetail: "Family Drama × Brand",
    image: "/images/project-3.png",
  },
  {
    statNumber: "SXSW",
    statLabel: "Official Selection",
    creditTitle: "Documentary Feature",
    creditDetail: "A Family Drama Production",
    image: "/images/project-4.png",
  },
  {
    statNumber: "Director Spotlight",
    statLabel: "Family Drama Roster",
    creditTitle: "Director Reel",
    creditDetail: "Featured Work",
    image: "/images/project-5.png",
  },
];

function useHorizontalScroll() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentVirtual = useRef(0);
  const targetVirtual = useRef(0);
  const maxVirtual = useRef(0);
  const heroLockDist = useRef(0);
  const slide2LockDist = useRef(0);
  const showcaseContainer = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number>(0);
  const isMobile = useRef(false);

  const calculateMax = useCallback(() => {
    if (!wrapperRef.current) return;
    isMobile.current = window.innerWidth <= 1024;
    if (isMobile.current) {
      maxVirtual.current = 0;
      heroLockDist.current = 0;
      slide2LockDist.current = 0;
      return;
    }
    const vw = window.innerWidth;
    heroLockDist.current = vw * HERO_LOCK_MULTIPLIER;
    slide2LockDist.current = vw * SLIDE2_LOCK_MULTIPLIER;
    const wrapperMax = wrapperRef.current.scrollWidth - vw;
    maxVirtual.current = wrapperMax + heroLockDist.current + slide2LockDist.current;
  }, []);

  useEffect(() => {
    calculateMax();

    const virtualToReal = (v: number) => {
      const vw = window.innerWidth;
      const hLock = heroLockDist.current;
      const s2Lock = slide2LockDist.current;
      let r = Math.max(0, v - hLock);
      if (v > hLock + vw) {
        const s2Progress = v - (hLock + vw);
        const consumed = Math.min(s2Lock, s2Progress);
        r = r - consumed;
      }
      return r;
    };

    const heroProgress = (v: number) => Math.min(1, Math.max(0, v / heroLockDist.current));

    const slide2Progress = (v: number) => {
      const vw = window.innerWidth;
      const hLock = heroLockDist.current;
      const s2Lock = slide2LockDist.current;
      const s2Start = hLock + vw;
      return Math.min(1, Math.max(0, (v - s2Start) / s2Lock));
    };

    const onWheel = (e: WheelEvent) => {
      if (isMobile.current) return;
      e.preventDefault();

      const realX = virtualToReal(currentVirtual.current);
      const showcaseSlidePos = SHOWCASE_SLIDE * window.innerWidth;
      const atShowcase = realX >= showcaseSlidePos - 10;

      if (atShowcase && showcaseContainer.current) {
        const sc = showcaseContainer.current;
        const scrollMax = sc.scrollHeight - sc.clientHeight;
        const delta = e.deltaY || e.deltaX;

        if (delta > 0 && sc.scrollTop < scrollMax - 2) {
          sc.scrollTop = Math.min(scrollMax, sc.scrollTop + delta);
          return;
        }
        if (delta < 0 && sc.scrollTop > 2) {
          sc.scrollTop = Math.max(0, sc.scrollTop + delta);
          return;
        }
        if (delta < 0 && sc.scrollTop <= 2) {
          targetVirtual.current = Math.max(0, targetVirtual.current + delta);
          return;
        }
        if (delta > 0 && sc.scrollTop >= scrollMax - 2) {
          return;
        }
      }

      const delta = (e.deltaY || e.deltaX) * SCROLL_DAMPEN;
      targetVirtual.current = Math.max(0, Math.min(maxVirtual.current, targetVirtual.current + delta));
    };

    const animate = () => {
      if (isMobile.current) {
        rafId.current = requestAnimationFrame(animate);
        return;
      }
      currentVirtual.current += (targetVirtual.current - currentVirtual.current) * EASE;

      const realX = virtualToReal(currentVirtual.current);
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translateX(${-realX}px)`;
      }

      const totalLock = heroLockDist.current + slide2LockDist.current;
      const realMax = maxVirtual.current - totalLock;
      window.dispatchEvent(
        new CustomEvent("horizontalscroll", {
          detail: {
            scrollX: realX,
            progress: realMax ? realX / realMax : 0,
            heroProgress: heroProgress(currentVirtual.current),
            slide2Progress: slide2Progress(currentVirtual.current),
          },
        })
      );

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", calculateMax);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", calculateMax);
      cancelAnimationFrame(rafId.current);
    };
  }, [calculateMax]);

  return { wrapperRef, showcaseContainer };
}

function useReveal() {
  useEffect(() => {
    const isMobile = () => window.innerWidth <= 1024;
    (window as any).__aboutScrollX = (window as any).__aboutScrollX ?? 0;

    const check = () => {
      if (isMobile()) {
        document.querySelectorAll(".reveal, .clip-reveal, .slide-in-right, .slide-in-left, .climax-word").forEach((el) => {
          const rect = el.getBoundingClientRect();
          const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
          el.classList.toggle("is-visible", inView);
        });
        document.querySelectorAll(".transparent-reveal").forEach((el) => {
          const rect = el.getBoundingClientRect();
          const inView = rect.top < window.innerHeight * 0.6;
          el.classList.toggle("is-revealed", inView);
        });
        return;
      }

      const scrollX = (window as any).__aboutScrollX ?? 0;
      const vw = window.innerWidth;

      document.querySelectorAll(".reveal, .clip-reveal, .slide-in-right, .slide-in-left, .climax-word").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elLeft = rect.left + scrollX;
        const elRight = elLeft + rect.width;
        const viewLeft = scrollX;
        const viewRight = scrollX + vw;
        el.classList.toggle("is-visible", elRight > viewLeft && elLeft < viewRight);
      });

      document.querySelectorAll(".transparent-reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.left + scrollX + rect.width / 2;
        const viewCenter = scrollX + vw * 0.6;
        el.classList.toggle("is-revealed", elCenter < viewCenter);
      });
    };

    const onHScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      (window as any).__aboutScrollX = detail.scrollX;
      check();
    };

    const aboutEl = document.querySelector(".page-about");

    window.addEventListener("horizontalscroll", onHScroll);
    window.addEventListener("scroll", check, { passive: true });
    if (aboutEl) {
      aboutEl.addEventListener("scroll", check, { passive: true });
    }
    check();
    const raf = requestAnimationFrame(check);

    return () => {
      window.removeEventListener("horizontalscroll", onHScroll);
      window.removeEventListener("scroll", check);
      if (aboutEl) {
        aboutEl.removeEventListener("scroll", check);
      }
      cancelAnimationFrame(raf);
    };
  }, []);
}

function useParallax() {
  useEffect(() => {
    const isMobileCheck = () => window.innerWidth <= 1024;

    const update = () => {
      if (isMobileCheck()) {
        document.querySelectorAll("[data-parallax]").forEach((el) => {
          const htmlEl = el as HTMLElement;
          const rect = htmlEl.getBoundingClientRect();
          const vh = window.innerHeight;
          const elCenter = rect.top + rect.height / 2;
          const distance = vh / 2 - elCenter;
          const speed = parseFloat(htmlEl.dataset.parallax || "0.1");
          htmlEl.style.transform = `translateY(${distance * speed}px) ${htmlEl.style.transform?.includes("scale") ? "scale(1.3)" : ""}`;
        });
        return;
      }
      const scrollX = (window as any).__aboutScrollX ?? 0;
      const vw = window.innerWidth;
      const viewCenter = scrollX + vw / 2;

      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const htmlEl = el as HTMLElement;
        const rect = htmlEl.getBoundingClientRect();
        const elCenter = rect.left + scrollX + rect.width / 2;
        const distance = viewCenter - elCenter;
        const speed = parseFloat(htmlEl.dataset.parallax || "0.1");
        htmlEl.style.setProperty("--parallax-value", String(distance * speed));
      });
    };

    const aboutEl = document.querySelector(".page-about");

    window.addEventListener("horizontalscroll", update);
    window.addEventListener("scroll", update, { passive: true });
    if (aboutEl) {
      aboutEl.addEventListener("scroll", update, { passive: true });
    }
    update();
    return () => {
      window.removeEventListener("horizontalscroll", update);
      window.removeEventListener("scroll", update);
      if (aboutEl) {
        aboutEl.removeEventListener("scroll", update);
      }
    };
  }, []);
}

function Slide1Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const [exitProgress, setExitProgress] = useState(0);

  const heroScrollRef = useRef<HTMLDivElement>(null);
  const isMobileView = typeof window !== "undefined" && window.innerWidth <= 1024;

  useEffect(() => {
    const onHScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const hp = detail.heroProgress ?? 0;
      const idx = Math.min(cyclingWords.length - 1, Math.floor(hp * cyclingWords.length));
      setWordIndex(idx);
    };

    const onVerticalScroll = () => {
      if (window.innerWidth > 1024) return;
      if (!heroScrollRef.current) return;
      const container = heroScrollRef.current;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = -rect.top;
      const scrollRange = container.offsetHeight - vh;
      if (scrollRange <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));

      const wordsEnd = 0.6;
      const pauseEnd = 0.75;
      const exitEnd = 0.92;

      const wordP = Math.min(1, progress / wordsEnd);
      const idx = Math.min(cyclingWords.length - 1, Math.floor(wordP * cyclingWords.length));
      setWordIndex(idx);

      const ep = progress < pauseEnd ? 0 : Math.min(1, (progress - pauseEnd) / (exitEnd - pauseEnd));
      setExitProgress(ep);
    };

    const scrollContainer = heroScrollRef.current?.closest(".page-about") as HTMLElement | null;

    window.addEventListener("horizontalscroll", onHScroll);
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", onVerticalScroll, { passive: true });
    }
    window.addEventListener("scroll", onVerticalScroll, { passive: true });
    return () => {
      window.removeEventListener("horizontalscroll", onHScroll);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", onVerticalScroll);
      }
      window.removeEventListener("scroll", onVerticalScroll);
    };
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/about-hero.jpeg";
    const trigger = () => setTimeout(() => setHeroReady(true), 200);
    if (img.complete) {
      trigger();
    } else {
      img.onload = trigger;
      img.onerror = trigger;
    }
  }, []);

  const slideContent = (
    <div className="slide slide-1-sticky" data-testid="slide-1-hero">
      <div
        className="absolute right-0 top-[10%] w-[55vw] h-[80vh] overflow-hidden"
        style={{
          transform: isMobileView && exitProgress > 0
            ? `translateY(-${exitProgress * 30}vh)`
            : heroReady ? "translateX(0)" : "translateX(100%)",
          transition: exitProgress > 0 ? "none" : "transform 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        <img
          src="/images/about-hero.jpeg"
          alt=""
          className="w-full h-full object-cover parallax-element"
          data-parallax="0.05"
          style={{ transform: "scale(1.05)" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "black",
            opacity: heroReady ? 0 : 1,
            transition: "opacity 2s cubic-bezier(0.25, 0.1, 0.25, 1)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        {isMobileView && exitProgress > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "black",
              opacity: exitProgress,
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        )}
      </div>
      <div
        className="absolute top-[42%] left-[8vw] z-10"
        style={{
          transform: isMobileView && exitProgress > 0
            ? `translateY(-50%) translateX(-${exitProgress * 120}%)`
            : "translateY(-50%)",
        }}
      >
        <h1 className="-t-80 text-white" style={{ fontFamily: "'Ritmica', Inter, sans-serif", fontWeight: 400 }}>
          <span style={{ fontWeight: 600 }}>FAMILY DRAMA</span> is fluent in…
        </h1>
        <div className="hero-cycling -t-80" style={{ marginTop: "0.1em", fontFamily: "'Ritmica', Inter, sans-serif", fontWeight: 400 }}>
          <div
            className="hero-cycling__track"
            style={{ transform: `translateY(-${wordIndex * 1.2}em)` }}
          >
            {cyclingWords.map((word, i) => (
              <span key={i} className="hero-cycling__word">{word}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={heroScrollRef} className="slide-lock-zone slide-lock-zone--hero">
      {slideContent}
    </div>
  );
}

function Slide2Difference() {
  const isMobileView = typeof window !== "undefined" && window.innerWidth <= 1024;
  const imgRef = useRef<HTMLDivElement>(null);
  const slide2StickyRef = useRef<HTMLDivElement>(null);
  const line1Refs = useRef<(HTMLSpanElement | null)[]>([]);
  const line2Refs = useRef<(HTMLSpanElement | null)[]>([]);
  const bannerRef = useRef<HTMLDivElement>(null);
  const rolodexContainerRef = useRef<HTMLDivElement>(null);
  const slide2ScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const BANNER_END = 0.30;
    const ROLODEX_START = 0.18;
    const ROLODEX_END = 0.95;
    const isMobileView = window.innerWidth <= 1024;

    const animateLine = (
      refs: (HTMLSpanElement | null)[],
      total: number,
      progress: number,
      globalOffset: number,
      paramOffset: number = 0,
      exitProgress: number = 0,
    ) => {

      const scaled = progress / BANNER_END;
      refs.forEach((el, i) => {
        if (!el) return;
        const pi = paramOffset + i;
        const params = slide2LetterParams[pi] || { dropDist: 300, xOffset: 0, staggerDelay: 0, speed: 0.3 };
        const stagger = globalOffset + params.staggerDelay;
        const letterT = Math.max(0, Math.min(1, (scaled - stagger) / params.speed));
        const eased = letterT < 0.5 ? 2 * letterT * letterT : 1 - Math.pow(-2 * letterT + 2, 2) / 2;
        const introY = params.dropDist * (1 - eased);
        const isYLetter = el.classList.contains("slide-2-letter-y");
        const yAdjust = (isMobileView && isYLetter) ? -15 : 0;

        if (exitProgress > 0) {
          const exitStagger = params.staggerDelay;
          const exitLetterT = Math.max(0, Math.min(1, (exitProgress - exitStagger) / 0.3));
          const exitEased = exitLetterT < 0.5 ? 2 * exitLetterT * exitLetterT : 1 - Math.pow(-2 * exitLetterT + 2, 2) / 2;
          const exitY = exitEased * params.dropDist;
          const clipBottom = exitEased * 100;
          el.style.transform = `translate(0px, calc(${exitY}% + ${yAdjust}px))`;
          (el as HTMLElement).style.clipPath = `inset(0 0 ${clipBottom}% 0)`;
        } else {
          const clipTop = (1 - eased) * 100;
          const clipBottom = isYLetter ? Math.min(0, -10 * eased) : -10;
          el.style.transform = `translate(0px, calc(${-introY}% + ${yAdjust}px))`;
          (el as HTMLElement).style.clipPath = `inset(${clipTop}% 0 ${clipBottom}% 0)`;
        }
      });
    };

    const ROLODEX_ITEM_HEIGHT = isMobileView ? 180 : 220;

    const animateRolodex = (progress: number) => {
      if (!rolodexContainerRef.current) return;

      const rp = Math.max(0, Math.min(1, (progress - ROLODEX_START) / (ROLODEX_END - ROLODEX_START)));

      const fadeIn = Math.min(1, rp / 0.08);
      const fadeOut = Math.min(1, (1 - rp) / 0.15);
      rolodexContainerRef.current.style.opacity = String(Math.min(fadeIn, fadeOut));

      const track = rolodexContainerRef.current.querySelector<HTMLElement>("[data-rolodex-track]");
      if (!track) return;

      const totalSlides = rolodexSlides.length;
      const maxScroll = totalSlides + 1;
      const rawScroll = rp * maxScroll;
      const easeSmooth = (t: number) => t * t * (3 - 2 * t);
      const stepIdx = Math.min(maxScroll - 1, Math.floor(rawScroll));
      const frac = rawScroll - stepIdx;
      const easedFrac = easeSmooth(Math.min(1, frac));
      const scrollAmount = Math.min(maxScroll, stepIdx + easedFrac);
      const yOffset = (1 - scrollAmount) * ROLODEX_ITEM_HEIGHT;

      track.style.transform = `translateY(${yOffset}px)`;
    };

    const applyAnimations = (s2p: number, scrollX: number, vw: number, isDesktop: boolean) => {
      
      if (isDesktop && imgRef.current) {
        const slideT = Math.max(0, Math.min(1, s2p / 0.4));
        const eased = slideT < 0.5 ? 2 * slideT * slideT : 1 - Math.pow(-2 * slideT + 2, 2) / 2;
        const offsetX = (1 - eased) * vw * 0.6;
        imgRef.current.style.transform = `translateX(${offsetX}px)`;
      }

      if (!isDesktop && imgRef.current) {
        const slideT = Math.max(0, Math.min(1, s2p / 0.15));
        const slideEased = slideT < 0.5 ? 2 * slideT * slideT : 1 - Math.pow(-2 * slideT + 2, 2) / 2;
        const offsetX = (1 - slideEased) * 100;
        const fadeT = Math.max(0, Math.min(1, (slideEased - 0.15) / 0.85));
        imgRef.current.style.transform = `translateX(${offsetX}%)`;
        imgRef.current.style.opacity = String(fadeT);
      }

      const bannerExitP = isDesktop
        ? Math.max(0, Math.min(1, (scrollX - vw * 1.0) / (vw * 0.6)))
        : 0;

      animateLine(line1Refs.current, slide2Line1.length, s2p, 0, 0, bannerExitP);

      const line2Offset = slide2Line1.length + 1;
      animateLine(line2Refs.current, slide2Line2.length, s2p, 0.15, line2Offset, bannerExitP);

      animateRolodex(s2p);
    };

    const onHScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const vw = window.innerWidth;
      if (vw > 1024) {
        applyAnimations(detail.slide2Progress ?? 0, detail.scrollX, vw, true);
      }
    };

    const onVerticalScroll = () => {
      if (window.innerWidth > 1024) return;
      if (!slide2ScrollRef.current) return;
      const container = slide2ScrollRef.current;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = -rect.top;
      const scrollRange = container.offsetHeight - vh;
      if (scrollRange <= 0) return;
      const s2p = Math.max(0, Math.min(1, scrolled / scrollRange));
      applyAnimations(s2p, 0, window.innerWidth, false);
    };

    const scrollContainer = slide2ScrollRef.current?.closest(".page-about") as HTMLElement | null;

    window.addEventListener("horizontalscroll", onHScroll);
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", onVerticalScroll, { passive: true });
    }
    window.addEventListener("scroll", onVerticalScroll, { passive: true });
    onVerticalScroll();
    return () => {
      window.removeEventListener("horizontalscroll", onHScroll);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", onVerticalScroll);
      }
      window.removeEventListener("scroll", onVerticalScroll);
    };
  }, []);

  const renderLine = (
    text: string,
    refs: React.MutableRefObject<(HTMLSpanElement | null)[]>,
    paramOffset: number = 0,
  ) => {
    const words = text.split(" ");
    let ci = 0;
    return words.map((word, wi) => {
      const chars = (wi > 0 ? " " + word : word).split("");
      return (
        <span key={wi} style={{ display: "inline" }}>
          {chars.map((ch) => {
            const idx = ci++;
            const pi = paramOffset + idx;
            const isLetterY = ch.toLowerCase() === "y" && paramOffset > 0;
            return (
              <span
                key={idx}
                ref={(el) => { refs.current[idx] = el; }}
                className={isLetterY ? "slide-2-letter-y" : undefined}
                style={{
                  display: "inline-block",
                  willChange: "transform, clip-path",
                  transform: `translate(0px, ${-(slide2LetterParams[pi]?.dropDist || 300)}%)`,
                  clipPath: isLetterY ? "inset(110% 0 0 0)" : "inset(100% 0 -10% 0)",
                  minWidth: ch === " " ? "0.3em" : undefined,
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            );
          })}
        </span>
      );
    });
  };

  return (
    <div ref={slide2ScrollRef} className="slide-lock-zone slide-lock-zone--slide2">
      <div ref={slide2StickyRef} className="slide slide-2-sticky" style={{ overflow: "visible" }} data-testid="slide-2-difference">
        <div className="slide-2-bg-mobile" style={{ display: "none" }}>
          <img src="/images/about-abstract-3.png?v=2" alt="" />
        </div>

        <div
          ref={imgRef}
          className="absolute top-[8vh] left-[calc(6vw+300px)] w-[37.5vw] h-[28vh] overflow-hidden slide-2-desktop-only slide-2-img-top"
          style={{ transform: `translateX(${0.6 * 100}vw)`, transition: "none", willChange: "transform", zIndex: 0 }}
        >
          <img src="/images/about-slide2-camera.jpg" alt="" className="w-full h-full object-cover" style={{ transform: "scale(1.2)" }} />
        </div>

        <div className="absolute left-[-5vw] top-[20%] w-[35vw] h-[60vh] overflow-hidden slide-2-desktop-only slide-2-img-bottom" style={{ zIndex: -1 }}>
          <img src="/images/about-abstract-3.png?v=2" alt="" className="w-full h-full object-cover clip-reveal" />
        </div>

        <div ref={bannerRef} className="slide-2-banner absolute top-[25%] z-10" style={{ left: "calc(15vw - 120px)", mixBlendMode: "difference", willChange: "transform" }}>
          <div style={{ display: "inline-block" }}>
            <h2 className="-t-125 font-normal text-white" style={{ whiteSpace: "nowrap", textAlign: "center" }}>
              {renderLine(slide2Line1, line1Refs)}
            </h2>
            <div
              style={{
                marginTop: "0.05em",
                textAlign: "center",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "min(18.2vw, 31.2vh)",
                lineHeight: 1,
                color: "white",
                paddingBottom: "0.15em",
              }}
            >
              {renderLine(slide2Line2, line2Refs, slide2Line1.length + 1)}
            </div>
          </div>
        </div>

        <div
          ref={rolodexContainerRef}
          className="absolute slide-2-rolodex-container"
          style={{
            bottom: "calc(8vh + 195px)",
            left: "calc(15vw - 120px + min(18.2vw, 31.2vh) * 2.8)",
            right: "1vw",
            height: "220px",
            overflow: "hidden",
            opacity: 0,
            zIndex: 10,
            maskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 60%, transparent 100%)",
          }}
          data-testid="slide-2-rolodex"
        >
        <div
          data-rolodex-track
          style={{
            display: "flex",
            flexDirection: "column",
            willChange: "transform",
          }}
        >
          {rolodexSlides.map((text, i) => (
            <div
              key={i}
              style={{
                height: "220px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  fontSize: "min(2vw, 32px)",
                  lineHeight: 1.4,
                  textAlign: "center",
                  color: "white",
                  margin: 0,
                }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

function Slide3Philosophy() {
  return (
    <div className="slide flex flex-col items-center justify-center" data-testid="slide-3-philosophy">
      <div className="w-[60vw] max-w-[800px] overflow-hidden mb-12" style={{ aspectRatio: "2.4 / 1" }}>
        <img
          src="/images/about-production-2.png?v=2"
          alt=""
          className="w-full h-full object-cover parallax-element"
          data-parallax="0.1"
          style={{ transform: "scale(1.05)" }}
        />
      </div>
      <p className="reveal -t-20 max-w-[560px] text-center mx-auto px-8">
        We started as Bolt TV Studios with a camera, a roster, and a point of view.
        We rebranded as Family Drama because that's what we've always been. A tight
        crew that fights for the work, shows up for each other, and treats every
        production like it matters. Because it does.
      </p>
    </div>
  );
}

function Slide4Directors() {
  return (
    <div className="slide" data-testid="slide-4-directors">
      <div className="absolute right-0 top-0 h-full w-[50vw] overflow-hidden">
        <img
          src="/images/about-production-3.png"
          alt=""
          className="w-full h-full object-cover parallax-element"
          data-parallax="0.1"
          style={{ transform: "scale(1.2)", transformOrigin: "top center" }}
        />
      </div>
      <div className="absolute top-[30%] left-[8vw] z-20" style={{ transform: "translateY(-50%)" }}>
        <h2 className="-t-100 font-normal text-white reveal">
          It Starts with Directors
        </h2>
        <p className="reveal -t-20 max-w-[440px] mt-10 text-white" style={{ transitionDelay: "100ms" }}>
          We don't assign directors to projects. We build relationships with filmmakers
          who have a voice, a vision, and something to prove. Then we put the full weight
          of the company behind them.
        </p>
      </div>
    </div>
  );
}

function Slide5Craft() {
  return (
    <div className="slide flex flex-col items-center justify-center" data-testid="slide-5-craft">
      <div className="w-[45vh] h-[45vh] overflow-hidden mb-12 mx-auto">
        <img
          src="/images/about-content.png"
          alt=""
          className="w-full h-full object-cover parallax-element"
          data-parallax="0.08"
          style={{ transform: "scale(1.15)" }}
        />
      </div>
      <p className="reveal -t-20 max-w-[500px] px-8" style={{ marginLeft: "28%" }}>
        From concept to color, we're in the room. We don't hand off. We stay involved
        because the gap between a good spot and a great one is the hundred decisions
        nobody sees.
      </p>
    </div>
  );
}

function Slide6CoreBeliefs() {
  return (
    <div className="slide" data-testid="slide-6-beliefs">
      <div className="absolute inset-0">
        <img src="/images/about-experience.png?v=2" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)" }} />
      </div>
      <div className="absolute left-[8vw] bottom-[50%] z-10">
        <h2 className="-t-100 font-normal text-white reveal">Core Beliefs</h2>
      </div>
      <div className="absolute left-[8vw] bottom-[8vh] max-w-[500px] z-10">
        <p className="reveal -t-20">
          {coreBeliefs.join(" ")}{" "}
          <span className="font-bold">WE MAKE IT PERSONAL.</span>
        </p>
      </div>
    </div>
  );
}

function Slide7Beyond() {
  return (
    <div className="slide" data-testid="slide-7-beyond">
      <div className="absolute left-[8vw]" style={{ top: "calc(50% - 22vh)" }}>
        <h2 className="-t-125 font-normal text-white reveal">Beyond<br />the Brief</h2>
      </div>
      <div
        className="absolute overflow-hidden slide-in-right"
        style={{ right: "8vw", top: "50%", transform: "translateY(-30%)", width: "40vw", height: "50vh" }}
      >
        <img src="/images/about-abstract.png" alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

function Slide8Capabilities() {
  return (
    <div className="slide flex items-center" data-testid="slide-8-capabilities">
      <div className="transparent-reveal" style={{ position: "relative", left: "8vw" }}>
        <span className="tr-context">Family Drama is a full service production company creating work across </span>
        <span className="tr-keyword">Commercials</span>
        <span className="tr-context">, </span>
        <span className="tr-keyword">Branded Content</span>
        <span className="tr-context">, </span>
        <span className="tr-keyword">Documentaries</span>
        <span className="tr-context">, and </span>
        <span className="tr-keyword">Special Projects</span>
        <span className="tr-context"> for agencies, brands, and platforms that expect more than just execution.</span>
      </div>
      <div
        className="absolute slide-in-right overflow-hidden"
        style={{ right: "6vw", bottom: "15vh", width: "25vw" }}
      >
        <img src="/images/project-6.png" alt="" className="w-full h-auto object-cover" />
      </div>
    </div>
  );
}

function Slide9Reach() {
  return (
    <div className="slide flex items-center" data-testid="slide-9-reach">
      <div className="transparent-reveal" style={{ position: "relative", left: "8vw" }}>
        <span className="tr-context">Based in </span>
        <span className="tr-keyword">Texas</span>
        <span className="tr-context">, shooting </span>
        <span className="tr-keyword">everywhere</span>
        <span className="tr-context">, with a director roster that spans coasts, styles, and sensibilities. </span>
        <span className="tr-keyword tr-kicker">The work goes wherever the story is.</span>
      </div>
    </div>
  );
}

function Slide10Roster() {
  return (
    <div className="slide" data-testid="slide-10-roster">
      <div className="absolute left-[8vw] top-[15%] max-w-[45vw] z-10">
        <p className="-t-60 font-normal text-white reveal">One Roster</p>
        <h2 className="-t-100 font-normal text-white reveal mt-4" style={{ transitionDelay: "100ms" }}>Every Register</h2>
        <div className="cascade mt-10">
          {rosterItems.map((item, i) => (
            <p key={i} className="reveal -t-20 mb-4 text-[#999]">{item}</p>
          ))}
        </div>
      </div>
      <div className="absolute right-0 top-0 w-[50vw] h-full overflow-hidden">
        <img src="/images/about-3d.png" alt="" className="w-full h-full object-cover clip-reveal" />
      </div>
    </div>
  );
}

function Slide11TheWork() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onHScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const vw = window.innerWidth;
      const slideStart = 10 * vw;
      const slideEnd = 12 * vw;
      setActive(detail.scrollX >= slideStart - vw * 0.5 && detail.scrollX <= slideEnd);
    };
    window.addEventListener("horizontalscroll", onHScroll);
    return () => window.removeEventListener("horizontalscroll", onHScroll);
  }, []);

  return (
    <>
      <div className={`slide-11-bg ${active ? "is-active" : ""}`}>
        <img src="/images/about-abstract-1.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="slide flex flex-col items-center justify-center" data-testid="slide-11-thework">
        <h2 className="-t-200 font-normal text-white reveal text-center">The Work</h2>
        <p className="reveal -t-24 text-center text-[#999] mt-8 max-w-[500px]" style={{ transitionDelay: "200ms" }}>
          We don't just deliver. We make things people talk about.
        </p>
      </div>
    </>
  );
}

function Slide12Proof() {
  return (
    <div className="slide flex items-center" data-testid="slide-12-proof">
      <div className="absolute left-[8vw] top-[50%] max-w-[500px] cascade" style={{ transform: "translateY(-50%)" }}>
        <p className="reveal -t-24 mb-6">From national broadcast campaigns,</p>
        <p className="reveal -t-24 mb-6">to series that changed how brands tell stories,</p>
        <p className="reveal -t-24">to projects that put new directors on the map…</p>
      </div>
      <div
        className="absolute overflow-hidden slide-in-right"
        style={{ right: "12vw", top: "50%", transform: "translateY(-50%)", width: "30vw", height: "45vh" }}
      >
        <img src="/images/project-7.png" alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

function Slide13Flagship() {
  return (
    <div className="slide" data-testid="slide-13-flagship">
      <div className="absolute left-[8vw] top-[15vh] w-[35vw] h-[70vh] overflow-hidden">
        <img
          src="/images/project-1.png"
          alt=""
          className="w-full h-full object-cover reveal"
          style={{ transform: "scale(1.1)", transition: "opacity 0.8s var(--ease), transform 1.2s var(--ease)" }}
        />
      </div>
      <div className="absolute right-[8vw] top-[50%] max-w-[480px] text-right cascade" style={{ transform: "translateY(-50%)" }}>
        <p className="reveal -t-24 mb-6">From "Grit &amp; Glory," a docuseries that followed Bo Nix from draft prep to the NFL,</p>
        <p className="reveal -t-24 mb-6">to branded content partnerships with top-tier brands,</p>
        <p className="reveal -t-24">to commercial work seen by millions.</p>
      </div>
    </div>
  );
}

function Slide14Culture() {
  return (
    <div className="slide" data-testid="slide-14-culture">
      <div className="absolute left-[6vw] top-[15vh] w-[30vw] h-[65vh] overflow-hidden">
        <img src="/images/about-production-1.png" alt="" className="w-full h-full object-cover clip-reveal" />
      </div>
      <div className="absolute right-[8vw] top-[30%] max-w-[440px]" style={{ transform: "translateY(-50%)" }}>
        <p className="reveal -t-20 text-[#999]">
          We measure success the same way we pick projects. By gut. Does it move people?
          Does it hold up? Does it make our directors proud?
        </p>
      </div>
      <div className="absolute right-[8vw] bottom-[15vh]">
        <p className="reveal -t-24 text-white" style={{ transitionDelay: "200ms" }}>
          That's the only metric that
        </p>
        <p className="-t-100 text-uppercase-bold text-white climax-word mt-2">
          MATTERS.
        </p>
      </div>
    </div>
  );
}

function Slide15Showcase({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const sc = containerRef.current;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = (entry.target as HTMLElement).querySelector(".media-video") as HTMLVideoElement | null;
          const container = entry.target.querySelector(".media-container");
          if (!video || !container) return;
          if (entry.isIntersecting) {
            video.play().then(() => container.classList.add("video-active")).catch(() => {});
          } else {
            video.pause();
            container.classList.remove("video-active");
          }
        });
      },
      { threshold: 0.3, root: sc }
    );

    sc.querySelectorAll(".showcase__card").forEach((card) => obs.observe(card));
    return () => obs.disconnect();
  }, [containerRef]);

  return (
    <div className="slide" data-testid="slide-15-showcase" style={{ overflow: "hidden" }}>
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="w-full h-full overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {showcaseCards.map((card, i) => (
          <div key={i} className="showcase__card">
            <div className="media-container absolute inset-0">
              <img className="media-image" src={card.image} alt="" loading="lazy" />
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                className="media-video"
                muted
                loop
                playsInline
                preload="none"
                poster={card.image}
              />
            </div>
            <div className="showcase__overlay" />
            <div className="absolute top-[12vh] left-[8vw] z-[2]">
              <p className="-t-150 font-normal">{card.statNumber}</p>
              <p className="-t-24 text-[#999] mt-2">{card.statLabel}</p>
            </div>
            <div className="absolute bottom-[8vh] left-[8vw] z-[2]" style={{ mixBlendMode: "difference" }}>
              <p className="text-lg font-medium">{card.creditTitle}</p>
              <p className="text-sm text-[#999] mt-1">{card.creditDetail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const { wrapperRef, showcaseContainer } = useHorizontalScroll();
  useReveal();
  useParallax();

  return (
    <div className="page-about" data-testid="page-about">
      <div ref={wrapperRef} className="page-about__wrapper">
        <Slide1Hero />
        <Slide2Difference />
        <Slide3Philosophy />
        <Slide4Directors />
        <Slide5Craft />
        <Slide6CoreBeliefs />
        <Slide7Beyond />
        <Slide8Capabilities />
        <Slide9Reach />
        <Slide10Roster />
        <Slide11TheWork />
        <Slide12Proof />
        <Slide13Flagship />
        <Slide14Culture />
        <Slide15Showcase containerRef={showcaseContainer} />
      </div>
    </div>
  );
}
