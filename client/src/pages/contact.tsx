import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { offices, teamMembers, salesReps } from "@/lib/data";
import { MapPin, Phone } from "lucide-react";

function HoverPhoto({ src, parentRef }: { src: string; parentRef: React.RefObject<HTMLDivElement | null> }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, raf: 0 });

  useEffect(() => {
    if (window.innerWidth <= 1024) return;
    const parent = parentRef.current;
    if (!parent) return;

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      pos.current.targetX = e.clientX - rect.left - 100;
      pos.current.targetY = e.clientY - rect.top - 150;
    };

    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);
    parent.addEventListener("mousemove", onMove);

    const animate = () => {
      pos.current.x += (pos.current.targetX - pos.current.x) * 0.08;
      pos.current.y += (pos.current.targetY - pos.current.y) * 0.08;
      if (imgRef.current) {
        imgRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      pos.current.raf = requestAnimationFrame(animate);
    };
    pos.current.raf = requestAnimationFrame(animate);

    return () => {
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
      parent.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(pos.current.raf);
    };
  }, [parentRef]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 200,
        height: 300,
        objectFit: "cover",
        pointerEvents: "none",
        zIndex: -1,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.35s ease",
        willChange: "transform",
      }}
    />
  );
}

function TeamMember({ member, index, showHoverPhoto }: { member: { name: string; role: string; email: string }; index: number; showHoverPhoto: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      data-testid={`team-member-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
      style={{ position: "relative" }}
    >
      {showHoverPhoto && <HoverPhoto src="/images/sarah-garza.jpg" parentRef={ref} />}
      <div>
        <a href={`mailto:${member.email}`} className="text-white text-lg font-medium opacity-80 hover:opacity-100 transition-opacity">
          <RevealText text={member.name} delay={index * 60} />
        </a>
        <p className="text-white/40 text-sm mt-1">{member.role}</p>
      </div>
    </div>
  );
}

function RevealText({ text, delay = 0, className = "", style = {} }: { text: string; delay?: number; className?: string; style?: Record<string, string | number> }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={style}>
      {words.map((word, wi) => (
        <span key={wi} className="about-word" style={{ marginRight: "0.3em" }}>
          <span
            className={`about-word-inner ${visible ? "revealed-inner" : ""}`}
            style={{ transitionDelay: visible ? `${delay + wi * 40}ms` : "0ms" }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-black pt-28 md:pt-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 mb-24 md:mb-32" data-testid="section-offices">
          {offices.map((office, i) => (
            <div
              key={office.city}
              data-testid={`office-${office.city.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <h2 className="text-2xl md:text-3xl font-light text-white mb-6">
                <RevealText text={office.city} delay={i * 80} />
              </h2>
              <div className="space-y-4">
                {office.locations.map((loc) => (
                  <a
                    key={loc.label}
                    href={loc.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/40 text-xs uppercase tracking-widest block mb-1">{loc.label}</span>
                        <span className="text-white/70 text-sm opacity-80 hover:opacity-100 transition-opacity leading-relaxed block whitespace-pre-line">{loc.address}</span>
                      </div>
                    </div>
                  </a>
                ))}
                {office.phone && (
                  <a href={`tel:${office.phone}`} className="flex items-center gap-3 text-white/70 opacity-80 hover:opacity-100 transition-opacity">
                    <Phone className="w-4 h-4 text-white/30 flex-shrink-0" />
                    <span className="text-sm">{office.phone}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-16 md:pt-24 mb-24 md:mb-32" data-testid="section-team">
          <h2 className="text-white/40 text-sm uppercase tracking-widest mb-12">
            <RevealText text="Team" />
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {teamMembers.map((member, i) => {
              const isSarah = member.name === "Sarah Garza";
              return (
                <TeamMember key={member.name} member={member} index={i} showHoverPhoto={isSarah} />
              );
            })}
          </div>
        </div>

        <div className="border-t border-white/5 pt-16 md:pt-24" data-testid="section-sales">
          <h2 className="text-white/40 text-sm uppercase tracking-widest mb-12">
            <RevealText text="Sales Representatives" />
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
            {salesReps.map((region, i) => (
              <div key={region.region}>
                <h3 className="text-xl font-light text-white mb-6">
                  <RevealText text={region.region} delay={i * 80} />
                </h3>
                <div className="space-y-6">
                  {region.members.map((member) => (
                    <div key={member.name}>
                      <a href={`mailto:${member.email}`} className="group">
                        <h4 className="text-white text-base font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                          <RevealText text={member.name} />
                        </h4>
                        <p className="text-white/40 text-sm mt-0.5">{member.role}</p>
                      </a>
                      <a href={`tel:${member.phone}`} className="flex items-center gap-2 mt-1.5 text-white/30 opacity-80 hover:opacity-100 transition-opacity">
                        <Phone className="w-3 h-3" />
                        <span className="text-xs">{member.phone}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
