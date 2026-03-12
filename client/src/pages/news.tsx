import { newsItems } from "@/lib/data";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

function NewsCard({ item }: { item: typeof newsItems[number] }) {
  return (
    <Link
      href={item.link}
      className="group block"
      data-testid={`card-news-${item.id}`}
    >
      <div className="overflow-hidden rounded-sm mb-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
          data-testid={`img-news-${item.id}`}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {item.isExternal ? (
            <span
              className="text-xs font-semibold uppercase tracking-wider text-red-500 flex items-center gap-1"
              data-testid={`label-source-${item.id}`}
            >
              {item.category || item.source}
              <ArrowRight className="w-3 h-3" />
            </span>
          ) : (
            <span
              className="text-xs font-medium uppercase tracking-wider text-neutral-500"
              data-testid={`label-source-${item.id}`}
            >
              {item.category || item.source}
            </span>
          )}
        </div>
        <p className="text-[11px] text-neutral-400 uppercase tracking-wide" data-testid={`text-date-${item.id}`}>
          {item.date}
        </p>
        <h3
          className="text-lg md:text-xl font-light leading-snug text-neutral-900 group-hover:text-neutral-600 transition-colors duration-300"
          data-testid={`text-headline-${item.id}`}
        >
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

export default function News() {
  return (
    <div className="min-h-screen bg-neutral-50" data-testid="page-news">
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <h1
          className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 mb-16"
          data-testid="text-news-heading"
        >
          News
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {newsItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
