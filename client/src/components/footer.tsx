import { Link } from "wouter";
import { SiLinkedin, SiInstagram, SiFacebook } from "react-icons/si";
import { Logo } from "./navigation";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div>
            <Link href="/">
              <Logo className="h-[1.875rem]" />
            </Link>
            <p className="text-white/40 text-sm mt-4 leading-relaxed max-w-xs">
              Creative production partner helping brands create breakthrough content and experiences.
            </p>
          </div>

          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-widest mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/work" data-testid="link-footer-work"><span className="text-white/60 text-sm transition-opacity hover:opacity-70">Work</span></Link>
              <Link href="/about" data-testid="link-footer-about"><span className="text-white/60 text-sm transition-opacity hover:opacity-70">About</span></Link>
              <Link href="/contact" data-testid="link-footer-contact"><span className="text-white/60 text-sm transition-opacity hover:opacity-70">Contact</span></Link>
            </nav>
          </div>

          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-widest mb-4">Offices</h4>
            <div className="flex flex-col gap-2">
              <span className="text-white/60 text-sm">Los Angeles, CA</span>
              <span className="text-white/60 text-sm">Gent, Belgium</span>
              <span className="text-white/60 text-sm">Saint Cloud, France</span>
            </div>
          </div>

          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-widest mb-4">Follow</h4>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/family-drama/" target="_blank" rel="noopener noreferrer" className="text-white/50 transition-opacity hover:opacity-70" aria-label="LinkedIn" data-testid="link-footer-linkedin">
                <SiLinkedin className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/familydrama/" target="_blank" rel="noopener noreferrer" className="text-white/50 transition-opacity hover:opacity-70" aria-label="Instagram" data-testid="link-footer-instagram">
                <SiInstagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/familydrama" target="_blank" rel="noopener noreferrer" className="text-white/50 transition-opacity hover:opacity-70" aria-label="Facebook" data-testid="link-footer-facebook">
                <SiFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">
          <p className="text-white/30 text-xs" data-testid="text-copyright">
            &copy; {new Date().getFullYear()} Family Drama. All rights reserved.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <a href="https://www.linkedin.com/company/family-drama/jobs/" target="_blank" rel="noopener noreferrer" className="text-white/30 text-xs transition-opacity hover:opacity-70" data-testid="link-footer-careers">
              Careers
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
