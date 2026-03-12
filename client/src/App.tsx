import { useEffect, useRef, useState, createContext, useContext, useCallback } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import Work from "@/pages/work";
import ProjectPage from "@/pages/project";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Talent from "@/pages/talent";
import DirectorPage from "@/pages/director";
import Careers from "@/pages/careers";
import News from "@/pages/news";
import NotFound from "@/pages/not-found";

const TransitionContext = createContext<{
  navigateTo: (href: string) => void;
}>({ navigateTo: () => {} });

export function usePageTransition() {
  return useContext(TransitionContext);
}

function PageTransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  const pendingNav = useRef<string | null>(null);
  const transitioning = useRef(false);

  const navigateTo = useCallback((href: string) => {
    if (transitioning.current || href === location) return;
    transitioning.current = true;
    pendingNav.current = href;

    const el = overlayRef.current;
    if (!el) {
      setLocation(href);
      transitioning.current = false;
      return;
    }

    el.style.display = "block";
    const fadeIn = el.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 400, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards" }
    );

    fadeIn.onfinish = () => {
      window.scrollTo(0, 0);
      setLocation(href);
      window.dispatchEvent(new CustomEvent("page-transition"));

      setTimeout(() => {
        const fadeOut = el.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 600, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards" }
        );
        fadeOut.onfinish = () => {
          el.style.display = "none";
          transitioning.current = false;
          pendingNav.current = null;
        };
      }, 300);
    };
  }, [location, setLocation]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      e.preventDefault();
      e.stopPropagation();
      navigateTo(href);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [navigateTo]);

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "black",
          pointerEvents: "none",
          opacity: 0,
          display: "none",
        }}
      />
    </TransitionContext.Provider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work" component={Work} />
      <Route path="/work/:category" component={Work} />
      <Route path="/project/:id" component={ProjectPage} />
      <Route path="/talent" component={Talent} />
      <Route path="/talent/:id" component={DirectorPage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/careers" component={Careers} />
      <Route path="/news" component={News} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-black">
          <PageTransitionOverlay />
          <Navigation />
          <main>
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
