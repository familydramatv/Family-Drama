import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <div className="text-center px-6">
        <h1 className="text-7xl md:text-9xl font-light text-white/10" data-testid="text-404">404</h1>
        <p className="text-white/60 text-lg mt-4">Page not found</p>
        <Link href="/">
          <span className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mt-8 transition-colors cursor-pointer" data-testid="link-back-home">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </span>
        </Link>
      </div>
    </div>
  );
}
