# Family Drama programmatic SEO system

## What ships

The build generates a crawlable HTML document for every supported hub and service/market combination. Each document includes visible page copy, one H1, a semantic H2/H3 hierarchy, selected Family Drama work, honest market context, internal links, a canonical URL, page-specific title and description, robots directives, Open Graph metadata, and Schema.org Organization, WebSite, Service or CollectionPage, and BreadcrumbList data.

The architecture is:

- `/services`: the national service directory
- `/services/:service`: a national service hub
- `/locations`: the U.S. market directory
- `/locations/:city`: a market hub
- `/:service/:city`: a service/market landing page, such as `/video-production/houston`

Hyphenated service slugs are intentional. They are easier to read than compressed slugs such as `/videoproduction/dallas`, and each topic has one canonical URL.

## Service taxonomy

The system uses 23 useful service clusters instead of creating dozens of synonym pages that compete with one another.

| Service | Slug | City-page indexing |
| --- | --- | --- |
| Video Production | `video-production` | Yes |
| Commercial Video Production | `commercial-video-production` | Yes |
| Branded Content | `branded-content` | Yes |
| Social Media Video | `social-media-video` | Yes |
| Corporate Video Production | `corporate-video-production` | Yes |
| Cinematography | `cinematography` | Yes |
| Camera Operators & Crews | `camera-operators` | Yes |
| Commercial Photography | `commercial-photographer` | Yes |
| Post-Production | `post-production` | Yes |
| Video Editing | `video-editing` | Yes |
| Local Production Services | `local-production-services` | Yes |
| Product Video Production | `product-video-production` | Yes |
| Testimonial & Case Study Video Production | `testimonial-video-production` | Yes |
| Explainer Video Production | `explainer-video-production` | Yes |
| Drone Video Production | `drone-video-production` | Yes |
| Motion Graphics | `motion-graphics` | Yes |
| 3D Animation | `3d-animation` | Yes |
| Virtual Production | `virtual-production` | Yes |
| AI Video Production | `ai-video-production` | Yes |
| Experiential Production | `experiential-production` | Yes |
| Live Event Production | `live-event-production` | Yes |
| Creative Development | `creative-development` | Yes |
| Documentary Production | `documentary-production` | Yes |

Every national service hub and service/city combination is indexable.

## Market taxonomy

The market dataset contains the 39 U.S. incorporated places above 500,000 residents in the Census Bureau's Vintage 2025 estimates, plus Miami as a strategic production-market exception. Population is a transparent starting rule, not a claim that population alone predicts lead value.

All 40 market hubs are indexable, and all 40 markets are approved for city pages belonging to launched services. This includes Miami as a strategic production-market exception.

The complete market set is New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, Fort Worth, Jacksonville, Austin, San Jose, Charlotte, Columbus, Indianapolis, San Francisco, Seattle, Denver, Nashville, Oklahoma City, Washington, DC, El Paso, Las Vegas, Boston, Detroit, Louisville, Portland, Memphis, Baltimore, Milwaukee, Albuquerque, Fresno, Tucson, Sacramento, Atlanta, Kansas City, Mesa, Raleigh, and Miami.

Source: [U.S. Census Bureau, City and Town Population Totals: 2020–2025](https://www.census.gov/data/tables/time-series/demo/popest/2020s-total-cities-and-towns.html).

## Indexing posture

The build currently creates:

- 23 service hubs
- 40 market hubs
- 920 service/market pages
- 920 indexable service/market pages
- 0 staged service/market pages
- 2 national directory pages
- 42 indexable core, portfolio, director, and news URLs
- 1,027 total URLs across four sitemap files
- 5 noindex utility or filtered-work routes outside the sitemap

All configured service and market combinations are approved for indexing. Google's spam policies call out city-targeted doorway pages and scaled pages made mainly to manipulate rankings, so every page still needs useful service detail, honest market context, selected work, clear internal relationships, and ongoing improvement based on real search and lead data.

References: [Google Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies), [Google guidance for AI search experiences](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## How to release another service or market

The source of truth is `shared/pseo.ts`.

1. Add first-hand proof: a relevant Family Drama project, director or crew capability, and production insight specific to the service or market.
2. Confirm the copy does not imply a local office where Family Drama does not have one.
3. Confirm the page gives a buyer something materially different from a city-name swap.
4. Set the service or city's `launch` value to `true`.
5. Run `npm run check` and `npm run build`.
6. Confirm the URL is included in the appropriate sitemap file referenced by `dist/public/sitemap.xml` and its HTML robots directive is `index, follow`.

Because a service/city page becomes indexable only when both records have `launch: true`, expansion stays controlled from one data file.

## Deployment and search launch

Railway continues to run the existing build and start commands. During `npm run build`, the project now pre-renders the SEO documents and creates `robots.txt`, a sitemap index, and four focused sitemap files. The Express server maps clean URLs to those documents while the React app preserves the existing interactive experience.

The sitemap index contains:

- `sitemap-core.xml` for primary, portfolio, director, and news pages
- `sitemap-services.xml` for the service directory and service hubs
- `sitemap-locations.xml` for the location directory and market hubs
- `sitemap-service-locations.xml` for service/market landing pages

After deployment:

1. Verify a representative sample of service, market, and service/market URLs on the production domain.
2. Submit `https://www.familydrama.tv/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
3. Request indexing for the service and location hubs plus a few highest-value launch pages; do not manually request all pages at once.
4. Watch indexing, impressions, non-brand queries, qualified form/email leads, and cannibalization by service and market.
5. Add case-specific proof and refine weak pages before enabling additional launch flags.

Google's current AI-search guidance says standard crawlability and SEO fundamentals still apply and emphasizes unique, first-hand, non-commodity content. It does not require a special AI schema or `llms.txt`, so this implementation concentrates on crawlable HTML, clear entities, useful copy, strong media, and structured internal relationships. `robots.txt` also explicitly permits OpenAI's OAI-SearchBot and ChatGPT-User crawlers.

## Motion and interaction

The pSEO templates inherit the existing global navigation behavior, menu animation, and black page transition. Their page-level motion uses the homepage as its source of truth:

- alternating hero lines move laterally as the hero scrolls away;
- project media fades into view and scales on hover;
- project titles and metadata use the homepage's clipped reveal treatment;
- eligible Mux project loops play only when the media is near the viewport;
- supporting sections use restrained, staggered intersection-based reveals;
- buttons include hover, keyboard-focus, and pressed feedback.

Motion enhancement only activates after the React app mounts, so pre-rendered search content remains fully visible when JavaScript is unavailable. Users with `prefers-reduced-motion` receive the static layout and poster imagery without spatial motion or autoplay video.
