import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@assets/fd-logo-2025_1771706568573.png";

function Logo({ className }: { className?: string }) {
  return (
    <img
      src={logoImg}
      alt="Family Drama"
      className={`${className || ""} transition-opacity duration-300 hover:opacity-70`}
      style={{ objectFit: "contain" }}
    />
  );
}

export { Logo };

const menuLinks = [
  { label: "Work", href: "/work" },
  { label: "Talent", href: "/talent" },
  { label: "About", href: "/about" },
  { label: "News", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [location] = useLocation();

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (location === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.dispatchEvent(new Event("page-transition"));
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onTransition = () => {
      setIsOpen(false);
      setHidden(false);
      lastScrollY.current = 0;
    };
    window.addEventListener("page-transition", onTransition);
    return () => window.removeEventListener("page-transition", onTransition);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[10000] h-[100px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)" }}
        animate={{ y: hidden && !isOpen ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[10001] px-6 md:px-10 py-5"
        data-testid="header-nav"
        animate={{ y: hidden && !isOpen ? -80 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/" data-testid="link-home">
          <Logo className="h-[50px] md:h-[58px]" />
        </Link>
      </motion.div>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group fixed top-5 right-6 md:right-10 z-[10002] text-white p-2 w-[60px] h-[60px] flex items-center justify-center"
        data-testid="button-menu-toggle"
        aria-label="Toggle menu"
        animate={{ y: hidden && !isOpen ? -80 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-[44px] flex flex-col items-end gap-[7px]">
          <span className="block h-[1.5px] bg-white w-full transition-transform duration-300 group-hover:translate-x-1" />
          <motion.span
            className="block h-[1.5px] bg-white transition-all duration-300 group-hover:-translate-x-1 group-hover:w-full"
            initial={false}
            animate={{ width: isOpen ? "100%" : "71%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col overflow-hidden cursor-pointer"
            data-testid="mobile-menu"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute top-0 left-0 right-0 px-6 md:px-10 py-5 flex items-center justify-between z-20">
              <Link href="/" onClick={() => setIsOpen(false)} data-testid="link-menu-home">
                <Logo className="h-[50px] md:h-[58px]" />
              </Link>
            </div>

            <div className="flex-1 flex items-center relative z-10">
              <div className="px-8 md:px-16 lg:px-20">
                <nav className="flex flex-col gap-0 cursor-default" onClick={(e) => e.stopPropagation()}>
                  {menuLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: isOpen ? 0.1 + i * 0.06 : (menuLinks.length - 1 - i) * 0.04, duration: 0.3 }}
                    >
                      <Link href={link.href} onClick={() => handleLinkClick(link.href)} data-testid={`link-menu-${link.label.toLowerCase()}`}>
                        <span className="text-white font-bold uppercase text-5xl sm:text-5xl md:text-6xl lg:text-7xl block py-3 sm:py-1 md:py-2 transition-opacity hover:opacity-50 duration-300 tracking-tight leading-none cursor-pointer">
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
