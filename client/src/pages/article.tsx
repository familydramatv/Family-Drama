import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { newsItems, type ArticleBlock } from "@/lib/data";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

function ArticleBlockRenderer({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          className="text-[17px] md:text-[19px] leading-[1.75] text-neutral-800 font-light"
          data-testid="text-article-paragraph"
        >
          {block.text}
        </p>
      );
    case "subheading":
      return (
        <h2
          className="text-2xl md:text-3xl font-light text-neutral-900 mt-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          data-testid="text-article-subheading"
        >
          {block.text}
        </h2>
      );
    case "image":
      return (
        <figure className="my-4" data-testid="figure-article-image">
          <div className="overflow-hidden rounded-sm">
            <img
              src={block.src}
              alt={block.caption || ""}
              className="w-full object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="text-sm text-neutral-400 mt-3 font-light">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

export default function Article() {
  const { id } = useParams<{ id: string }>();
  const article = newsItems.find((item) => item.id === id);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Family Drama`;
    }
    return () => {
      document.title = "Family Drama";
    };
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center" data-testid="page-article-not-found">
        <div className="text-center">
          <h1 className="text-4xl font-light text-neutral-900 mb-4">Article not found</h1>
          <Link
            href="/news"
            className="text-neutral-500 hover:text-neutral-900 transition-colors inline-flex items-center gap-2"
            data-testid="link-back-to-news"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50" data-testid={`page-article-${article.id}`}>
      <div className="max-w-2xl mx-auto px-6 md:px-12 pt-28 pb-24">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-900 transition-colors mb-12"
          data-testid="link-back-to-news"
        >
          <ArrowLeft className="w-4 h-4" />
          News
        </Link>

        <div className="mb-8">
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${article.isExternal ? "text-red-500" : "text-neutral-500"}`}
            data-testid="label-article-source"
          >
            {article.category || article.source}
          </span>
        </div>

        <h1
          className="text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-light text-neutral-900 mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          data-testid="text-article-title"
        >
          {article.title}
        </h1>

        <p
          className="text-sm uppercase tracking-wider text-neutral-400 mb-10"
          data-testid="text-article-date"
        >
          {article.date}
        </p>

        <div className="overflow-hidden rounded-sm mb-12">
          <img
            src={article.image}
            alt={article.title}
            className="w-full aspect-[16/9] object-cover"
            data-testid="img-article-hero"
          />
        </div>

        {article.subtitle && (
          <p
            className="text-xl md:text-2xl leading-relaxed font-light text-neutral-700 mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            data-testid="text-article-subtitle"
          >
            {article.subtitle}
          </p>
        )}

        {article.author && (
          <p className="text-sm text-neutral-500 mb-10" data-testid="text-article-author">
            By <span className="font-semibold text-neutral-700">{article.author}</span>
          </p>
        )}

        {article.body && (
          <div className="space-y-6" data-testid="article-body">
            {article.body.map((block, i) => (
              <ArticleBlockRenderer key={i} block={block} />
            ))}
          </div>
        )}

        {article.externalUrl && (
          <div className="mt-16 pt-10 border-t border-neutral-200">
            <a
              href={article.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-neutral-900 font-semibold hover:text-red-500 transition-colors text-lg"
              data-testid="link-read-external"
            >
              Read article on {article.source}
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
