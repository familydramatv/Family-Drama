import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = 0.05;
const SCROLL_DAMPEN = 0.5;
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

const manifestoLines = [
  "We conceptualize.",
  "We create.",
  "We produce.",
  "We distribute.",
  "From first frame to final delivery.",
];
const manifestoCrescendo = "EVERY. SINGLE. STEP.";

const missionText = {
  before: "Family Drama is a full-service production company that creates content which transcends ",
  keyword1: "PLATFORMS",
  mid: " and ",
  keyword2: "LIVES",
  after: " at the intersection of ",
  keywords: ["branded entertainment,", "culture,", "sports,", "technology", "and storytelling."],
};

const reachText = {
  intro: "Based in ",
  cities: ["Houston,", "Los Angeles,", "New York,", "Miami"],
  mid: " with productions spanning ",
  after: " and locations worldwide, ",
  crescendo: "WE GO WHERE THE STORY TAKES US.",
};

const rosterLines = [
  "Producers who've managed $10M+ campaigns...",
  "Directors of photography who paint with light...",
  "Editors who find the story in the footage...",
  "VFX artists who make the impossible real...",
  "A production team that treats every project like it's personal.",
];

const impactLines = [
  "From national broadcast campaigns...",
  "to globally distributed brand content...",
  "to award-winning storytelling...",
];
const impactCrescendo = "TO WORK THAT MOVES PEOPLE.";

const clientGrid = [
  "Air New Zealand", "Discovery", "Ford",
  "HBO Max", "Marriott", "Philips",
  "Essentia", "Freeport LNG", "Dr. Teal's",
];



function useHorizontalScroll() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentVirtual = useRef(0);
  const targetVirtual = useRef(0);
  const maxVirtual = useRef(0);
  const heroLockDist = useRef(0);
  const slide2LockDist = useRef(0);
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

  return { wrapperRef };
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
            : heroReady ? "translateY(-50%)" : "translateY(calc(-50% + 40px))",
          opacity: heroReady ? 1 : 0,
          transition: heroReady ? "transform 1.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.4s, opacity 1.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.4s" : "none",
        }}
      >
        <h1 className="-t-80 text-white" style={{ fontFamily: "'Ritmica', Inter, sans-serif", fontWeight: 400 }}>
          <span style={{ fontWeight: 700 }}>FAMILY DRAMA</span> is fluent in…
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

    const positionRolodex = () => {
      if (!bannerRef.current || !rolodexContainerRef.current || isMobileView) return;
      const bannerEl = bannerRef.current;
      const slideEl = bannerEl.closest(".slide") as HTMLElement;
      if (!slideEl) return;
      const bannerRect = bannerEl.getBoundingClientRect();
      const slideRect = slideEl.getBoundingClientRect();
      const bannerRight = bannerRect.right - slideRect.left;
      const slideWidth = slideRect.width;
      const spaceRight = slideWidth - bannerRight;
      const padding = spaceRight * 0.08;
      const rolodexLeft = bannerRight + padding;
      const rolodexWidth = spaceRight - padding * 2;
      rolodexContainerRef.current.style.left = `${rolodexLeft}px`;
      rolodexContainerRef.current.style.width = `${Math.max(rolodexWidth, 100)}px`;
      rolodexContainerRef.current.style.right = "auto";
      const line2El = bannerEl.querySelector("div[style]") as HTMLElement;
      if (line2El) {
        const line2Rect = line2El.getBoundingClientRect();
        const line2CenterY = line2Rect.top + line2Rect.height / 2 - slideRect.top;
        const rolodexHeight = 220;
        rolodexContainerRef.current.style.top = `${line2CenterY - rolodexHeight / 2}px`;
        rolodexContainerRef.current.style.bottom = "auto";
      }
    };

    positionRolodex();
    window.addEventListener("resize", positionRolodex);

    const applyAnimations = (s2p: number, scrollX: number, vw: number, isDesktop: boolean) => {
      
      if (isDesktop && imgRef.current) {
        const imgP = s2p + 0.08;
        const slideT = Math.max(0, Math.min(1, imgP / 0.4));
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
      positionRolodex();
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
      window.removeEventListener("resize", positionRolodex);
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
            left: 0,
            right: 0,
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

function PlaceholderImage({ label, color, className, style }: {
  label: string;
  color: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      data-label={label}
      className={`placeholder-image ${className || ""}`}
      style={{ backgroundColor: color, ...style }}
    />
  );
}

function FilmstripSlides() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    const onHScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const scrollX = detail.scrollX as number;
      const vw = window.innerWidth;

      if (!containerRef.current) return;
      const slides = containerRef.current.querySelectorAll<HTMLElement>(".filmstrip-slide");

      slides.forEach((slide) => {
        const slideLeft = slide.offsetLeft;
        const slideWidth = slide.offsetWidth;
        const slideCenter = slideLeft + slideWidth / 2;
        const viewCenter = scrollX + vw / 2;
        const distFromCenter = (viewCenter - slideCenter) / vw;
        const entryProgress = Math.max(0, Math.min(1, (scrollX + vw - slideLeft) / slideWidth));
        const exitProgress = Math.max(0, Math.min(1, (scrollX - slideLeft) / slideWidth));
        const centerProgress = Math.max(0, Math.min(1, 1 - Math.abs(distFromCenter) / (slideWidth / vw)));

        slide.style.setProperty("--entry", String(entryProgress));
        slide.style.setProperty("--exit", String(exitProgress));
        slide.style.setProperty("--center", String(centerProgress));
        slide.style.setProperty("--dist", String(distFromCenter));

        const headlines = slide.querySelectorAll<HTMLElement>(".film-headline");
        headlines.forEach((h) => {
          const speed = 1.15;
          const offset = distFromCenter * vw * (speed - 1) * -0.5;
          h.style.transform = `translateX(${offset}px)`;
        });

        const bodyTexts = slide.querySelectorAll<HTMLElement>(".film-body");
        bodyTexts.forEach((b) => {
          b.style.transform = `translateX(0px)`;
        });

        const images = slide.querySelectorAll<HTMLElement>(".film-image");
        images.forEach((img) => {
          const speed = 0.78;
          const offset = distFromCenter * vw * (1 - speed) * 0.5;
          img.style.transform = `translateX(${offset}px) ${img.dataset.extraTransform || ""}`;
        });
      });
    };

    window.addEventListener("horizontalscroll", onHScroll);
    return () => window.removeEventListener("horizontalscroll", onHScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ display: "contents" }}>
      <Slide6Mission />
      <Slide3WorkSpeaks />
      <Slide4Manifesto />
      <Slide5CoreBeliefs />
      <Slide7Reach />
      <Slide8Roster />
      <Slide9Impact />
      <Slide10Partners />
      <Slide11Closing />
    </div>
  );
}

function Slide3WorkSpeaks() {
  const slideRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    const onHScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const scrollX = detail.scrollX as number;
      const vw = window.innerWidth;
      if (!slideRef.current) return;

      const slideLeft = slideRef.current.offsetLeft;
      const slideWidth = slideRef.current.offsetWidth;
      const localScroll = scrollX - slideLeft + vw;
      const p = Math.max(0, localScroll / slideWidth);
      const vr = vw / slideWidth;

      if (imgRef.current) {
        const enterP = Math.max(0, Math.min(1, p / (vr * 0.6)));
        const exitP = Math.max(0, Math.min(1, (p - (1 - vr * 0.2)) / (vr * 0.4)));
        const scale = 0.5 + enterP * 0.5 - exitP * 0.35;
        const xP = (1 - enterP) * 25 - exitP * 25;
        const opacity = Math.min(1, enterP * 1.5) * (1 - exitP * 0.5);
        imgRef.current.style.transform = `scale(${scale}) translateX(${xP}%)`;
        imgRef.current.style.opacity = String(opacity);
      }

      if (headlineRef.current) {
        const enterP = Math.max(0, Math.min(1, p / (vr * 0.2)));
        const exitP = Math.max(0, Math.min(1, (p - (1 - vr * 0.15)) / (vr * 0.3)));
        const opacity = enterP * (1 - exitP);
        const y = (1 - enterP) * 60;
        const xExit = exitP * -40;
        headlineRef.current.style.transform = `translateY(${y}px) translateX(${xExit}%)`;
        headlineRef.current.style.opacity = String(opacity);
      }

      if (subtitleRef.current) {
        const enterP = Math.max(0, Math.min(1, (p - vr * 0.05) / (vr * 0.2)));
        const exitP = Math.max(0, Math.min(1, (p - (1 - vr * 0.15)) / (vr * 0.3)));
        const opacity = enterP * (1 - exitP);
        const y = (1 - enterP) * 20;
        subtitleRef.current.style.transform = `translateY(${y}px) translateX(${exitP * -30}%)`;
        subtitleRef.current.style.opacity = String(opacity);
      }
    };

    window.addEventListener("horizontalscroll", onHScroll);
    return () => window.removeEventListener("horizontalscroll", onHScroll);
  }, []);

  return (
    <section
      ref={slideRef}
      className="filmstrip-slide"
      style={{ width: "calc(150vw - 350px)", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden" }}
      aria-label="The Work Speaks"
      data-testid="slide-3-workspeaks"
    >
      <div
        ref={imgRef}
        style={{
          position: "absolute",
          width: "90vw",
          height: "auto",
          aspectRatio: "16/9",
          top: "50%",
          left: "5vw",
          marginTop: "-25.3125vw",
          zIndex: 1,
          willChange: "transform, opacity",
          transform: "scale(0.5) translateX(25%)",
          opacity: 0,
        }}
      >
        <img
          src="/images/work-speaks.jpg"
          alt="Production shot"
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
      </div>
      <h2
        ref={headlineRef}
        className="film-headline"
        style={{
          position: "absolute",
          bottom: "15vh",
          left: "5vw",
          zIndex: 2,
          fontSize: "clamp(60px, 9vw, 160px)",
          lineHeight: 0.95,
          color: "#FFFFFF",
          fontFamily: "'Ritmica', sans-serif",
          fontWeight: 600,
          textShadow: "0 2px 40px rgba(0,0,0,0.5)",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      >
        The Work Speaks
      </h2>
      <p
        ref={subtitleRef}
        style={{
          position: "absolute",
          bottom: "8vh",
          left: "5vw",
          zIndex: 2,
          fontSize: "clamp(16px, 2vw, 28px)",
          color: "#FFFFFF",
          fontFamily: "'Ritmica', sans-serif",
          fontWeight: 400,
          opacity: 0,
          willChange: "transform, opacity",
        }}
      >
        A decade of content for the world's most recognized brands.
      </p>
    </section>
  );
}

function Slide4Manifesto() {
  const slideRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const crescendoRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    const onHScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const scrollX = detail.scrollX as number;
      const vw = window.innerWidth;
      if (!slideRef.current) return;

      const slideLeft = slideRef.current.offsetLeft;
      const slideWidth = slideRef.current.offsetWidth;
      const localScroll = scrollX - slideLeft + vw;
      const p = Math.max(0, localScroll / slideWidth);
      const vr = vw / slideWidth;

      const exitP = Math.max(0, Math.min(1, (p - (1 - vr * 0.2)) / (vr * 0.3)));

      if (imgRef.current) {
        const imgEnter = Math.max(0, Math.min(1, p / (vr * 0.4)));
        const imgExit = Math.max(0, Math.min(1, (p - (1 - vr * 0.1)) / (vr * 0.8)));
        const scale = 0.4 + imgEnter * 0.6 - imgExit * 0.4;
        imgRef.current.style.transform = `scale(${scale})`;
        imgRef.current.style.opacity = String(Math.min(1, imgEnter * 2) * (1 - imgExit));
      }

      if (labelRef.current) {
        const lP = Math.max(0, Math.min(1, p / (vr * 0.25)));
        labelRef.current.style.opacity = String(lP * (1 - exitP));
        labelRef.current.style.transform = `translateX(${(1 - lP) * 40}px)`;
      }

      if (headlineRef.current) {
        const hP = Math.max(0, Math.min(1, p / (vr * 0.3)));
        headlineRef.current.style.opacity = String(hP * (1 - exitP));
        headlineRef.current.style.transform = `translateX(${(1 - hP) * 60}px)`;
      }

      const totalItems = manifestoLines.length + 1;
      const revealEnd = 0.7;
      manifestoLines.forEach((_, i) => {
        const el = lineRefs.current[i];
        if (!el) return;
        const lineStart = vr * 0.15 + (i / totalItems) * (revealEnd - vr * 0.15);
        const lineP = Math.max(0, Math.min(1, (p - lineStart) / (vr * 0.2)));
        el.style.opacity = String(lineP * (1 - exitP));
        el.style.transform = `translateY(${(1 - lineP) * 25}px)`;
      });

      if (crescendoRef.current) {
        const cStart = vr * 0.15 + (manifestoLines.length / totalItems) * (revealEnd - vr * 0.15);
        const cP = Math.max(0, Math.min(1, (p - cStart) / (vr * 0.2)));
        crescendoRef.current.style.opacity = String(cP * (1 - exitP));
        crescendoRef.current.style.transform = `translateY(${(1 - cP) * 25}px)`;
      }
    };

    window.addEventListener("horizontalscroll", onHScroll);
    return () => window.removeEventListener("horizontalscroll", onHScroll);
  }, []);

  return (
    <section
      ref={slideRef}
      className="filmstrip-slide"
      style={{ width: "calc(150vw - 550px)", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden" }}
      aria-label="Capabilities Manifesto"
      data-testid="slide-4-manifesto"
    >
      <div
        ref={imgRef}
        style={{
          position: "absolute",
          width: "42vw",
          height: "75vh",
          left: "52vw",
          top: "12vh",
          zIndex: 1,
          willChange: "transform, opacity",
          transform: "scale(0.4)",
          opacity: 0,
        }}
      >
        <PlaceholderImage
          label="ACTION: Camera operator tracking shot through set"
          color="#3B2A0D"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div style={{ position: "absolute", top: "18vh", left: "5vw", zIndex: 2 }}>
        <p
          ref={labelRef}
          style={{
            fontSize: "clamp(11px, 1.2vw, 16px)",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#FFFFFF",
            opacity: 0,
            willChange: "transform, opacity",
            fontFamily: "'Ritmica', sans-serif",
            fontWeight: 400,
          }}
        >
          What We Do
        </p>
        <h2
          ref={headlineRef}
          style={{
            fontSize: "clamp(60px, 9vw, 160px)",
            lineHeight: 0.95,
            color: "#FFFFFF",
            fontFamily: "'Ritmica', sans-serif",
            fontWeight: 600,
            marginTop: "12px",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        >
          Full Service
        </h2>

        <div style={{ marginTop: "40px" }}>
          {manifestoLines.map((line, i) => (
            <p
              key={i}
              ref={(el) => { lineRefs.current[i] = el; }}
              style={{
                fontSize: "clamp(18px, 2.5vw, 36px)",
                lineHeight: 1.6,
                color: "#FFFFFF",
                fontFamily: "'Ritmica', sans-serif",
                fontWeight: 400,
                opacity: 0,
                willChange: "transform, opacity",
                marginBottom: "8px",
              }}
            >
              {line}
            </p>
          ))}
          <p
            ref={crescendoRef}
            style={{
              fontSize: "clamp(22px, 3vw, 40px)",
              lineHeight: 1.6,
              color: "#FFFFFF",
              fontFamily: "'Ritmica', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.05em",
              opacity: 0,
              willChange: "transform, opacity",
              marginTop: "8px",
            }}
          >
            {manifestoCrescendo}
          </p>
        </div>
      </div>
    </section>
  );
}

const coreBeliefLines = [
  "Creativity isn't produced in a factory.",
  "We're active partners.",
  "Your problems are our problems.",
];

function Slide5CoreBeliefs() {
  const slideRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    const onHScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const scrollX = detail.scrollX as number;
      const vw = window.innerWidth;
      if (!slideRef.current || !contentRef.current) return;

      const slideLeft = slideRef.current.offsetLeft;
      const slideWidth = slideRef.current.offsetWidth;
      const lockRange = Math.max(1, slideWidth - vw);

      const lockStart = slideLeft;
      const lockEnd = slideLeft + lockRange;

      let counterX = 0;
      if (scrollX >= lockStart && scrollX <= lockEnd) {
        counterX = scrollX - lockStart;
      } else if (scrollX > lockEnd) {
        const overscroll = scrollX - lockEnd;
        counterX = lockRange + overscroll * 0.35;
      }
      contentRef.current.style.transform = `translateX(${counterX}px)`;

      const stickyP = Math.max(0, Math.min(1, (scrollX - lockStart) / lockRange));
      const entryP = Math.max(0, Math.min(1, (scrollX - (slideLeft - vw)) / vw));

      if (headlineRef.current) {
        const hP = Math.max(0, Math.min(1, entryP / 0.3));
        headlineRef.current.style.opacity = String(hP);
        headlineRef.current.style.transform = `translateY(${(1 - hP) * 40}px)`;
      }

      coreBeliefLines.forEach((_, i) => {
        const el = lineRefs.current[i];
        if (!el) return;
        if (i === 0) {
          const firstP = Math.max(0, Math.min(1, entryP / 0.3));
          el.style.opacity = String(firstP);
          el.style.transform = `translateY(${(1 - firstP) * 20}px)`;
        } else {
          const lineStart = (i - 1) * 0.35;
          const lineP = Math.max(0, Math.min(1, (stickyP - lineStart) / 0.25));
          el.style.opacity = String(lineP);
          el.style.transform = `translateY(${(1 - lineP) * 20}px)`;
        }
      });
    };

    window.addEventListener("horizontalscroll", onHScroll);
    return () => window.removeEventListener("horizontalscroll", onHScroll);
  }, []);

  return (
    <section
      ref={slideRef}
      className="filmstrip-slide filmstrip-slide--sticky"
      style={{
        width: "200vw",
        height: "100vh",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Core Beliefs"
      data-testid="slide-5-core-beliefs"
    >
      <div
        ref={contentRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          willChange: "transform",
        }}
      >
        <img
          src="/images/core-beliefs-bg.jpg"
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%)",
            zIndex: 1,
          }}
        />

        <div style={{ position: "absolute", bottom: "30vh", left: "5vw", zIndex: 2, maxWidth: "70vw" }}>
          <h2
            ref={headlineRef}
            style={{
              fontSize: "clamp(60px, 9vw, 160px)",
              lineHeight: 0.95,
              color: "#FFFFFF",
              fontFamily: "'Ritmica', sans-serif",
              fontWeight: 600,
              opacity: 0,
              willChange: "transform, opacity",
              marginBottom: "30px",
            }}
          >
            Core Beliefs
          </h2>

          {coreBeliefLines.map((line, i) => (
            <p
              key={i}
              ref={(el) => { lineRefs.current[i] = el; }}
              style={{
                fontSize: "clamp(18px, 2.5vw, 36px)",
                lineHeight: 1.2,
                color: "#FFFFFF",
                fontFamily: "'Ritmica', sans-serif",
                fontWeight: 400,
                opacity: 0,
                willChange: "transform, opacity",
                marginBottom: "0px",
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Slide6Mission() {
  const slideRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    const onHScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const scrollX = detail.scrollX as number;
      const vw = window.innerWidth;
      if (!slideRef.current || !textRef.current) return;

      const slideLeft = slideRef.current.offsetLeft;
      const slideWidth = slideRef.current.offsetWidth;
      const localScroll = scrollX - slideLeft + vw;
      const p = Math.max(0, localScroll / slideWidth);
      const vr = vw / slideWidth;

      const textRect = textRef.current.getBoundingClientRect();
      const textCenter = (textRect.left + textRect.width / 2) / vw;

      let contextOpacity;
      if (textCenter > 0.85) {
        contextOpacity = 0;
      } else if (textCenter > 0.5) {
        contextOpacity = (0.85 - textCenter) / 0.35;
      } else if (textCenter > 0.15) {
        contextOpacity = (textCenter - 0.15) / 0.35;
      } else {
        contextOpacity = 0;
      }

      const c = Math.round(contextOpacity * 255);
      textRef.current.querySelectorAll<HTMLElement>(".context-word").forEach((el) => {
        el.style.color = `rgb(${c}, ${c}, ${c})`;
        el.style.opacity = "1";
      });

      textRef.current.querySelectorAll<HTMLElement>(".keyword").forEach((el) => {
        el.style.color = "#FFFFFF";
        el.style.fontWeight = "700";
        el.style.opacity = "1";
      });

      textRef.current.style.opacity = "1";
    };

    window.addEventListener("horizontalscroll", onHScroll);
    return () => window.removeEventListener("horizontalscroll", onHScroll);
  }, []);

  return (
    <section
      ref={slideRef}
      className="filmstrip-slide"
      style={{
        width: "120vw",
        height: "100vh",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: "30vw",
      }}
      aria-label="The Mission"
      data-testid="slide-6-mission"
    >
      <div
        ref={textRef}
        style={{
          maxWidth: "80vw",
          fontSize: "clamp(24px, 3.5vw, 52px)",
          lineHeight: 1.3,
          textAlign: "center",
          fontFamily: "'Ritmica', sans-serif",
          fontWeight: 400,
          willChange: "transform, opacity",
        }}
      >
        <span className="context-word" style={{ color: "rgb(0,0,0)" }}>Family Drama is a full-service production company that creates content which transcends </span>
        <span className="keyword" style={{ color: "#FFFFFF", fontWeight: 700 }}>PLATFORMS</span>
        <span className="context-word" style={{ color: "rgb(0,0,0)" }}> and </span>
        <span className="keyword" style={{ color: "#FFFFFF", fontWeight: 700 }}>LIVES</span>
        <span className="context-word" style={{ color: "rgb(0,0,0)" }}> at the intersection of </span>
        <span className="keyword" style={{ color: "#FFFFFF", fontWeight: 700 }}>branded entertainment,</span>
        <span className="context-word" style={{ color: "rgb(0,0,0)" }}> </span>
        <span className="keyword" style={{ color: "#FFFFFF", fontWeight: 700 }}>culture,</span>
        <span className="context-word" style={{ color: "rgb(0,0,0)" }}> </span>
        <span className="keyword" style={{ color: "#FFFFFF", fontWeight: 700 }}>sports,</span>
        <span className="context-word" style={{ color: "rgb(0,0,0)" }}> </span>
        <span className="keyword" style={{ color: "#FFFFFF", fontWeight: 700 }}>technology</span>
        <span className="context-word" style={{ color: "rgb(0,0,0)" }}> and </span>
        <span className="keyword" style={{ color: "#FFFFFF", fontWeight: 700 }}>storytelling.</span>
      </div>
    </section>
  );
}

function Slide7Reach() {
  const slideRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    const onHScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const scrollX = detail.scrollX as number;
      const vw = window.innerWidth;
      if (!slideRef.current || !textRef.current) return;

      const slideLeft = slideRef.current.offsetLeft;
      const slideWidth = slideRef.current.offsetWidth;
      const localScroll = scrollX - slideLeft + vw;
      const p = Math.max(0, localScroll / slideWidth);
      const vr = vw / slideWidth;

      if (imgRef.current) {
        const enterP = Math.max(0, Math.min(1, p / (vr * 0.3)));
        imgRef.current.style.opacity = String(Math.min(1, enterP * 2));
      }

      if (img2Ref.current) {
        const enterP = Math.max(0, Math.min(1, (p - vr * 0.15) / (vr * 0.3)));
        img2Ref.current.style.opacity = String(Math.min(1, enterP * 2));
        img2Ref.current.style.transform = `translateY(${(1 - Math.min(1, enterP)) * 30}px)`;
      }

      const exitP = Math.max(0, Math.min(1, (p - (1 - vr * 0.2)) / (vr * 0.4)));

      textRef.current.style.opacity = "1";

      const contextRevealP = Math.max(0, Math.min(1, (p - vr * 0.3) / (vr * 0.5)));
      textRef.current.querySelectorAll<HTMLElement>(".reach-context").forEach((el) => {
        const revealColor = Math.round(contextRevealP * 255);
        el.style.color = `rgb(${revealColor}, ${revealColor}, ${revealColor})`;
      });

      const cities = textRef.current.querySelectorAll<HTMLElement>(".city-name");
      cities.forEach((el) => {
        el.style.fontWeight = "700";
        el.style.color = "#FFFFFF";
        el.style.opacity = String(1 - exitP);
      });

      const crescendo = textRef.current.querySelector<HTMLElement>(".reach-crescendo");
      if (crescendo) {
        const cP = Math.max(0, Math.min(1, (p - vr * 0.5) / (vr * 0.4)));
        crescendo.style.color = `rgb(${Math.round(cP * 255)}, ${Math.round(cP * 255)}, ${Math.round(cP * 255)})`;
        crescendo.style.fontWeight = "700";
      }
    };

    window.addEventListener("horizontalscroll", onHScroll);
    return () => window.removeEventListener("horizontalscroll", onHScroll);
  }, []);

  return (
    <section
      ref={slideRef}
      className="filmstrip-slide"
      style={{
        width: "150vw",
        height: "100vh",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="The Reach"
      data-testid="slide-7-reach"
    >
      <div
        ref={imgRef}
        style={{
          position: "absolute",
          width: "45vw",
          height: "55vh",
          top: "3vh",
          right: "5vw",
          zIndex: 1,
          willChange: "opacity",
          opacity: 0,
          overflow: "hidden",
        }}
      >
        <img
          src="/images/reach-bg.jpg"
          alt="Production scene"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <div
        ref={img2Ref}
        style={{
          position: "absolute",
          width: "35vw",
          height: "55vh",
          top: "25vh",
          left: "3vw",
          zIndex: 1,
          willChange: "transform, opacity",
          opacity: 0,
          overflow: "hidden",
        }}
      >
        <PlaceholderImage
          label="PRODUCTION: On-location shoot"
          color="#1A2B0D"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div
        ref={textRef}
        style={{
          position: "absolute",
          bottom: "8vh",
          right: "5vw",
          maxWidth: "42vw",
          fontSize: "clamp(19px, 2.8vw, 42px)",
          lineHeight: 1.3,
          textAlign: "left",
          fontFamily: "'Ritmica', sans-serif",
          fontWeight: 400,
          zIndex: 2,
          willChange: "opacity",
        }}
      >
        <span className="reach-context" style={{ color: "rgb(0,0,0)" }}>Based in </span>
        <span className="city-name" style={{ color: "#FFFFFF", fontWeight: 700 }}>Houston, </span>
        <span className="reach-context" style={{ color: "rgb(0,0,0)" }}>with productions spanning </span>
        <span className="city-name" style={{ color: "#FFFFFF", fontWeight: 700 }}>Los Angeles, </span>
        <span className="city-name" style={{ color: "#FFFFFF", fontWeight: 700 }}>New York, </span>
        <span className="city-name" style={{ color: "#FFFFFF", fontWeight: 700 }}>Miami </span>
        <span className="reach-context" style={{ color: "rgb(0,0,0)" }}>and locations worldwide, </span>
        <span className="reach-crescendo" style={{ color: "rgb(0,0,0)", display: "block", marginTop: "20px", fontWeight: 700 }}>
          WE GO WHERE THE STORY TAKES US.
        </span>
      </div>
    </section>
  );
}

function Slide8Roster() {
  const slideRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    const onHScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const scrollX = detail.scrollX as number;
      const vw = window.innerWidth;
      if (!slideRef.current) return;

      const slideLeft = slideRef.current.offsetLeft;
      const slideWidth = slideRef.current.offsetWidth;
      const localScroll = scrollX - slideLeft + vw;
      const p = Math.max(0, localScroll / slideWidth);
      const vr = vw / slideWidth;

      if (imgRef.current) {
        const enterP = Math.max(0, Math.min(1, p / (vr * 0.2)));
        const exitP = Math.max(0, Math.min(1, (p - (1 - vr * 0.15)) / (vr * 0.3)));
        const scale = 0.4 + enterP * 0.6;
        imgRef.current.style.transform = `scale(${scale})`;
        imgRef.current.style.opacity = String(Math.min(1, enterP * 2) * (1 - exitP));
      }

      if (labelRef.current) {
        const enterP = Math.max(0, Math.min(1, p / (vr * 0.15)));
        const exitP = Math.max(0, Math.min(1, (p - (1 - vr * 0.15)) / (vr * 0.3)));
        labelRef.current.style.opacity = String(enterP * (1 - exitP));
      }

      if (headlineRef.current) {
        const enterP = Math.max(0, Math.min(1, p / (vr * 0.15)));
        const exitP = Math.max(0, Math.min(1, (p - (1 - vr * 0.15)) / (vr * 0.3)));
        headlineRef.current.style.opacity = String(enterP * (1 - exitP));

        const letters = headlineRef.current.querySelectorAll<HTMLElement>(".headline-letter");
        letters.forEach((letter, i) => {
          const seed = i * 73 + 17;
          const randomY = (seededRandom(seed) - 0.5) * 100;
          const randomScale = 0.6 + seededRandom(seed + 1) * 0.9;
          const randomRot = (seededRandom(seed + 2) - 0.5) * 30;

          const y = randomY * (1 - enterP);
          const s = randomScale + (1 - randomScale) * enterP;
          const r = randomRot * (1 - enterP);

          const exitScatterP = exitP;
          const ey = randomY * exitScatterP;
          const es = 1 + (randomScale - 1) * exitScatterP;
          const er = randomRot * exitScatterP;

          letter.style.transform = `translateY(${y + ey}px) scale(${s * es}) rotate(${r + er}deg)`;
          letter.style.opacity = String(enterP * (1 - exitP));
        });
      }

      const cycleStart = vr * 0.15;
      const cycleEnd = 1 - vr * 0.1;
      const cycleP = Math.max(0, Math.min(1, (p - cycleStart) / (cycleEnd - cycleStart)));

      rosterLines.forEach((_, i) => {
        const el = lineRefs.current[i];
        if (!el) return;
        const total = rosterLines.length;
        const lineStart = i / total;
        const lineEnd = (i + 1) / total;
        const lineP = Math.max(0, Math.min(1, (cycleP - lineStart) / (lineEnd - lineStart)));
        const isLast = i === total - 1;

        const enterLineP = Math.min(1, lineP * 3);
        el.style.opacity = String(enterLineP);
        el.style.transform = `translateY(${(1 - enterLineP) * 20}px)`;

        if (!isLast && lineP > 0.6) {
          const dimP = (lineP - 0.6) / 0.4;
          const color = Math.round(255 - dimP * 204);
          el.style.color = `rgb(${color}, ${color}, ${color})`;
        } else {
          el.style.color = "#FFFFFF";
        }
      });
    };

    window.addEventListener("horizontalscroll", onHScroll);
    return () => window.removeEventListener("horizontalscroll", onHScroll);
  }, []);

  const headlineText = "Built Different";

  return (
    <section
      ref={slideRef}
      className="filmstrip-slide"
      style={{ width: "180vw", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden" }}
      aria-label="The Roster"
      data-testid="slide-8-roster"
    >
      <div
        ref={imgRef}
        style={{
          position: "absolute",
          left: "52vw",
          width: "42vw",
          height: "78vh",
          top: "11vh",
          zIndex: 1,
          willChange: "transform, opacity",
          opacity: 0,
        }}
      >
        <PlaceholderImage
          label="PORTRAIT: Producer reviewing shot list on location"
          color="#0D3B3B"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div style={{ position: "absolute", top: "20vh", left: "5vw", zIndex: 2 }}>
        <p
          ref={labelRef}
          style={{
            fontSize: "clamp(11px, 1.2vw, 16px)",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#FFFFFF",
            fontFamily: "'Ritmica', sans-serif",
            fontWeight: 400,
            opacity: 0,
          }}
        >
          One Team
        </p>
        <h2
          ref={headlineRef}
          style={{
            fontSize: "clamp(60px, 9vw, 160px)",
            lineHeight: 0.95,
            color: "#FFFFFF",
            fontFamily: "'Ritmica', sans-serif",
            fontWeight: 600,
            marginTop: "12px",
            opacity: 0,
          }}
        >
          {headlineText.split("").map((ch, i) => (
            <span
              key={i}
              className="headline-letter"
              style={{
                display: "inline-block",
                willChange: "transform, opacity",
                minWidth: ch === " " ? "0.3em" : undefined,
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h2>

        <div style={{ marginTop: "60px", maxWidth: "45vw" }}>
          {rosterLines.map((line, i) => (
            <p
              key={i}
              ref={(el) => { lineRefs.current[i] = el; }}
              style={{
                fontSize: "clamp(20px, 2.8vw, 40px)",
                lineHeight: 1.4,
                color: "#FFFFFF",
                fontFamily: "'Ritmica', sans-serif",
                fontWeight: 400,
                opacity: 0,
                willChange: "transform, opacity",
                marginBottom: "12px",
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Slide9Impact() {
  const slideRef = useRef<HTMLDivElement>(null);
  const fullBleedRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const crescendoRef = useRef<HTMLParagraphElement>(null);
  const newImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    const onHScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const scrollX = detail.scrollX as number;
      const vw = window.innerWidth;
      if (!slideRef.current) return;

      const slideLeft = slideRef.current.offsetLeft;
      const slideWidth = slideRef.current.offsetWidth;
      const localScroll = scrollX - slideLeft + vw;
      const p = Math.max(0, localScroll / slideWidth);
      const vr = vw / slideWidth;

      if (fullBleedRef.current) {
        const enterP = Math.max(0, Math.min(1, p / (vr * 0.2)));
        const shrinkStart = vr * 0.5;
        const shrinkEnd = 1 - vr * 0.2;
        const shrinkP = Math.max(0, Math.min(1, (p - shrinkStart) / (shrinkEnd - shrinkStart)));

        const w = 100 - shrinkP * 72;
        const h = 100 - shrinkP * 45;
        const t = shrinkP * 20;
        const l = shrinkP * 2;

        fullBleedRef.current.style.width = `${w}%`;
        fullBleedRef.current.style.height = `${h}%`;
        fullBleedRef.current.style.top = `${t}%`;
        fullBleedRef.current.style.left = `${l}%`;
        fullBleedRef.current.style.opacity = String(Math.min(1, enterP * 2));
      }

      if (headlineRef.current) {
        const enterP = Math.max(0, Math.min(1, p / (vr * 0.2)));
        const exitP = Math.max(0, Math.min(1, (p - vr * 0.4) / (vr * 0.15)));
        headlineRef.current.style.opacity = String(enterP * (1 - exitP));
        headlineRef.current.style.transform = `translateY(${(1 - enterP) * 40}px) translateX(${exitP * -50}%)`;
      }

      if (subtitleRef.current) {
        const enterP = Math.max(0, Math.min(1, (p - vr * 0.05) / (vr * 0.2)));
        const exitP = Math.max(0, Math.min(1, (p - vr * 0.45) / (vr * 0.15)));
        subtitleRef.current.style.opacity = String(enterP * (1 - exitP));
        subtitleRef.current.style.transform = `translateY(${(1 - enterP) * 20}px) translateX(${exitP * -40}%)`;
      }

      const awardsStart = vr * 0.5;
      const awardsEnd = 1 - vr * 0.15;
      impactLines.forEach((_, i) => {
        const el = lineRefs.current[i];
        if (!el) return;
        const lineStart = awardsStart + (i / (impactLines.length + 1)) * (awardsEnd - awardsStart);
        const lineP = Math.max(0, Math.min(1, (p - lineStart) / (vr * 0.15)));
        el.style.opacity = String(lineP);
        el.style.transform = `translateY(${(1 - lineP) * 20}px)`;

        if (i > 0) {
          const prevEl = lineRefs.current[i - 1];
          if (prevEl) {
            const dimP = Math.max(0, Math.min(1, (p - (lineStart + vr * 0.08)) / (vr * 0.12)));
            const color = Math.round(255 - dimP * 34);
            prevEl.style.color = `rgb(${color}, ${color}, ${color})`;
          }
        }
      });

      if (crescendoRef.current) {
        const cStart = awardsStart + (impactLines.length / (impactLines.length + 1)) * (awardsEnd - awardsStart);
        const cP = Math.max(0, Math.min(1, (p - cStart) / (vr * 0.15)));
        crescendoRef.current.style.opacity = String(cP);
        crescendoRef.current.style.transform = `translateY(${(1 - cP) * 25}px)`;

        impactLines.forEach((_, i) => {
          const el = lineRefs.current[i];
          if (el && cP > 0) {
            const color = Math.round(255 - cP * 119);
            el.style.color = `rgb(${color}, ${color}, ${color})`;
          }
        });
      }

      if (newImgRef.current) {
        const enterP = Math.max(0, Math.min(1, (p - vr * 0.4) / (vr * 0.3)));
        const scale = 0.3 + enterP * 0.7;
        newImgRef.current.style.transform = `scale(${scale}) translateX(${(1 - enterP) * 40}%)`;
        newImgRef.current.style.opacity = String(enterP);
      }
    };

    window.addEventListener("horizontalscroll", onHScroll);
    return () => window.removeEventListener("horizontalscroll", onHScroll);
  }, []);

  return (
    <section
      ref={slideRef}
      className="filmstrip-slide"
      style={{ width: "300vw", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden" }}
      aria-label="The Impact"
      data-testid="slide-9-impact"
    >
      <div
        ref={fullBleedRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 1,
          willChange: "width, height, top, left, opacity",
          opacity: 0,
        }}
      >
        <PlaceholderImage
          label="CAMPAIGN: Final delivered commercial frame — dramatic, cinematic, the hero shot"
          color="#3B2A0D"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <h2
        ref={headlineRef}
        style={{
          position: "absolute",
          left: "5vw",
          top: "35vh",
          zIndex: 2,
          fontSize: "clamp(60px, 9vw, 160px)",
          lineHeight: 0.95,
          color: "#FFFFFF",
          fontFamily: "'Ritmica', sans-serif",
          fontWeight: 600,
          textShadow: "0 4px 60px rgba(0,0,0,0.6), 0 2px 20px rgba(0,0,0,0.4)",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      >
        The Impact
      </h2>

      <p
        ref={subtitleRef}
        style={{
          position: "absolute",
          left: "5vw",
          top: "calc(35vh + clamp(60px, 9vw, 160px) + 20px)",
          zIndex: 2,
          fontSize: "clamp(16px, 2vw, 28px)",
          color: "#FFFFFF",
          fontFamily: "'Ritmica', sans-serif",
          fontWeight: 400,
          textShadow: "0 2px 20px rgba(0,0,0,0.4)",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      >
        Work that resonates beyond the screen.
      </p>

      <div style={{ position: "absolute", left: "5vw", top: "30vh", zIndex: 3, maxWidth: "45vw" }}>
        {impactLines.map((line, i) => (
          <p
            key={i}
            ref={(el) => { lineRefs.current[i] = el; }}
            style={{
              fontSize: "clamp(20px, 2.8vw, 40px)",
              lineHeight: 1.4,
              color: "#FFFFFF",
              fontFamily: "'Ritmica', sans-serif",
              fontWeight: 400,
              opacity: 0,
              willChange: "transform, opacity",
              marginBottom: "8px",
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
              paddingLeft: `${i * 20}px`,
            }}
          >
            {line}
          </p>
        ))}
        <p
          ref={crescendoRef}
          style={{
            fontSize: "clamp(22px, 3vw, 42px)",
            lineHeight: 1.4,
            color: "#FFFFFF",
            fontFamily: "'Ritmica', sans-serif",
            fontWeight: 700,
            opacity: 0,
            willChange: "transform, opacity",
            marginTop: "16px",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
          }}
        >
          {impactCrescendo}
        </p>
      </div>

      <div
        ref={newImgRef}
        style={{
          position: "absolute",
          left: "52vw",
          top: "15vh",
          width: "38vw",
          height: "70vh",
          zIndex: 2,
          willChange: "transform, opacity",
          opacity: 0,
        }}
      >
        <PlaceholderImage
          label="DRAMATIC: Low-key figure in motion against pure black"
          color="#0D1A3B"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </section>
  );
}

function Slide10Partners() {
  const slideRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    const onHScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const scrollX = detail.scrollX as number;
      const vw = window.innerWidth;
      if (!slideRef.current) return;

      const slideLeft = slideRef.current.offsetLeft;
      const slideWidth = slideRef.current.offsetWidth;
      const localScroll = scrollX - slideLeft + vw;
      const p = Math.max(0, localScroll / slideWidth);
      const vr = vw / slideWidth;

      if (headlineRef.current) {
        const enterP = Math.max(0, Math.min(1, p / (vr * 0.2)));
        const exitP = Math.max(0, Math.min(1, (p - (1 - vr * 0.15)) / (vr * 0.3)));
        headlineRef.current.style.opacity = String(enterP * (1 - exitP));
        headlineRef.current.style.transform = `translateY(${(1 - enterP) * 30}px)`;
      }

      if (gridRef.current) {
        const items = gridRef.current.children;
        for (let i = 0; i < items.length; i++) {
          const el = items[i] as HTMLElement;
          const row = Math.floor(i / 3);
          const col = i % 3;
          const delay = row * (vr * 0.04) + col * (vr * 0.03);
          const enterP = Math.max(0, Math.min(1, (p - vr * 0.05 - delay) / (vr * 0.2)));
          const exitP = Math.max(0, Math.min(1, (p - (1 - vr * 0.15)) / (vr * 0.3)));
          el.style.opacity = String(enterP * (1 - exitP));
          el.style.transform = `translateY(${(1 - enterP) * 15}px)`;
        }
      }
    };

    window.addEventListener("horizontalscroll", onHScroll);
    return () => window.removeEventListener("horizontalscroll", onHScroll);
  }, []);

  return (
    <section
      ref={slideRef}
      className="filmstrip-slide"
      style={{
        width: "150vw",
        height: "100vh",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      aria-label="Select Partners"
      data-testid="slide-10-partners"
    >
      <h2
        ref={headlineRef}
        style={{
          fontSize: "clamp(36px, 5vw, 80px)",
          color: "#FFFFFF",
          fontFamily: "'Ritmica', sans-serif",
          fontWeight: 600,
          textAlign: "center",
          marginTop: "22vh",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      >
        Select Partners
      </h2>

      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(24px, 3vw, 40px) clamp(30px, 4vw, 60px)",
          maxWidth: "75vw",
          marginTop: "8vh",
        }}
      >
        {clientGrid.map((name, i) => (
          <div
            key={i}
            style={{
              fontSize: "clamp(16px, 2vw, 30px)",
              color: "#FFFFFF",
              fontFamily: "'Ritmica', sans-serif",
              fontWeight: 600,
              textAlign: "center",
              opacity: 0,
              willChange: "transform, opacity",
            }}
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}

function Slide11Closing() {
  const slideRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    const onHScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const scrollX = detail.scrollX as number;
      const vw = window.innerWidth;
      if (!slideRef.current) return;

      const slideLeft = slideRef.current.offsetLeft;
      const slideWidth = slideRef.current.offsetWidth;
      const localScroll = scrollX - slideLeft + vw;
      const p = Math.max(0, localScroll / slideWidth);
      const vr = vw / slideWidth;

      if (line1Ref.current) {
        const enterP = Math.max(0, Math.min(1, p / (vr * 0.2)));
        line1Ref.current.style.opacity = String(enterP);
      }

      if (line2Ref.current) {
        const enterP = Math.max(0, Math.min(1, (p - vr * 0.05) / (vr * 0.2)));
        line2Ref.current.style.opacity = String(enterP);
      }

      if (emailRef.current) {
        const enterP = Math.max(0, Math.min(1, (p - vr * 0.1) / (vr * 0.2)));
        emailRef.current.style.opacity = String(enterP);
      }
    };

    window.addEventListener("horizontalscroll", onHScroll);
    return () => window.removeEventListener("horizontalscroll", onHScroll);
  }, []);

  return (
    <section
      ref={slideRef}
      className="filmstrip-slide"
      style={{
        width: "150vw",
        height: "100vh",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label="The Closing"
      data-testid="slide-11-closing"
    >
      <p
        ref={line1Ref}
        style={{
          fontSize: "clamp(22px, 3vw, 42px)",
          color: "#FFFFFF",
          fontFamily: "'Ritmica', sans-serif",
          fontWeight: 400,
          textAlign: "center",
          opacity: 0,
          willChange: "opacity",
          maxWidth: "80vw",
        }}
      >
        We'd love the opportunity to build something meaningful.
      </p>
      <p
        ref={line2Ref}
        style={{
          fontSize: "clamp(28px, 3.8vw, 52px)",
          color: "#FFFFFF",
          fontFamily: "'Ritmica', sans-serif",
          fontWeight: 700,
          textAlign: "center",
          marginTop: "10px",
          opacity: 0,
          willChange: "opacity",
        }}
      >
        Together.
      </p>
      <a
        ref={emailRef}
        href="mailto:hello@familydrama.tv"
        style={{
          fontSize: "14px",
          color: "#FFFFFF",
          letterSpacing: "0.1em",
          fontFamily: "'Ritmica', sans-serif",
          fontWeight: 400,
          marginTop: "60px",
          opacity: 0,
          willChange: "opacity",
          textDecoration: "none",
        }}
      >
        hello@familydrama.tv
      </a>
    </section>
  );
}

export default function About() {
  const { wrapperRef } = useHorizontalScroll();
  useReveal();
  useParallax();

  return (
    <div className="page-about" data-testid="page-about">
      <div ref={wrapperRef} className="page-about__wrapper">
        <Slide1Hero />
        <Slide2Difference />
        <FilmstripSlides />
      </div>
    </div>
  );
}
