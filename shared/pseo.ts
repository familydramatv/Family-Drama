export const SITE_URL = "https://www.familydrama.tv";
export const SERVICES_TITLE = "Creative & Video Production Services | Family Drama";
export const SERVICES_DESCRIPTION = "Explore Family Drama's commercial, branded content, social video, cinematography, post, AI, 3D, experiential, and live production capabilities.";
export const LOCATIONS_TITLE = "U.S. Video Production Locations | Family Drama";
export const LOCATIONS_DESCRIPTION = "Explore Family Drama's video production coverage across major U.S. markets, with offices in Houston, Austin, and Los Angeles and nationwide crews.";

export interface SeoCapability {
  title: string;
  description: string;
}

export interface SeoService {
  slug: string;
  name: string;
  seoTitle: string;
  singularLabel: string;
  summary: string;
  overview: string;
  capabilities: SeoCapability[];
  processFocus: string;
  keywordVariants: string[];
  related: string[];
  projectIds: string[];
  launch: boolean;
}

export interface SeoCity {
  slug: string;
  name: string;
  state: string;
  stateCode: string;
  population2025: number;
  region: string;
  industries: string[];
  productionCharacter: string;
  logistics: string;
  nearestOffice: "Austin" | "Houston" | "Los Angeles";
  hasOffice?: boolean;
  strategicException?: boolean;
  launch: boolean;
}

export const seoServices: SeoService[] = [
  {
    slug: "video-production",
    name: "Video Production",
    seoTitle: "Video Production Company",
    singularLabel: "video production partner",
    summary: "End-to-end video production for campaigns, commercials, branded stories, and platform-native content.",
    overview: "Family Drama brings creative development, production, and post under one accountable team. We build the crew and workflow around the idea, then carry every asset through final delivery for broadcast, digital, social, and experiential use.",
    capabilities: [
      { title: "Creative and pre-production", description: "Treatments, bidding, schedules, casting, locations, art direction, and a production plan built around the campaign goal." },
      { title: "Production", description: "Directors, cinematographers, producers, camera, lighting, sound, art, talent, and field logistics scaled to the brief." },
      { title: "Post-production", description: "Editorial, color, sound, motion, VFX, versioning, and finishing managed as one connected workflow." },
      { title: "Campaign delivery", description: "Hero films, cutdowns, aspect ratios, still pulls, and channel-ready exports organized for every placement." },
    ],
    processFocus: "a connected production plan that protects the idea from first treatment through final master",
    keywordVariants: ["video production agency", "film production company", "marketing video production", "brand video production"],
    related: ["commercial-video-production", "branded-content", "social-media-video", "post-production"],
    projectIds: ["lego-play-unstoppable", "crown-royal-chopped-and-screwed", "dr-teals-stay-hungry"],
    launch: true,
  },
  {
    slug: "commercial-video-production",
    name: "Commercial Video Production",
    seoTitle: "Commercial Video Production",
    singularLabel: "commercial production company",
    summary: "Commercial production for broadcast, connected TV, digital, and social campaigns.",
    overview: "We produce commercial work with the creative ambition of entertainment and the operational discipline of advertising. Family Drama aligns agency, brand, director, crew, talent, and post so the production stays clear, responsive, and ready for every deliverable.",
    capabilities: [
      { title: "Bid and production design", description: "Transparent bidding, boards, treatments, technical planning, art direction, and production design tied to the creative." },
      { title: "Director and crew pairing", description: "A tailored director, cinematography, production, and department-head team selected for the story and visual language." },
      { title: "Broadcast craft", description: "Performance, camera movement, lighting, sound, and production value designed to hold up on the biggest screen." },
      { title: "Multi-format campaign assets", description: "Primary spots, cutdowns, vertical edits, product moments, stills, and alternate versions captured in one production ecosystem." },
    ],
    processFocus: "commercial craft, agency collaboration, and version-aware production planning",
    keywordVariants: ["TV commercial production", "advertising production company", "commercial film production", "brand campaign production"],
    related: ["video-production", "cinematography", "commercial-photographer", "post-production"],
    projectIds: ["crown-royal-chopped-and-screwed", "toyota-survivor", "ferrari-michael-b-jordan"],
    launch: true,
  },
  {
    slug: "branded-content",
    name: "Branded Content",
    seoTitle: "Branded Content Production",
    singularLabel: "branded content studio",
    summary: "Story-led branded films and content systems built to earn attention beyond a traditional ad placement.",
    overview: "Family Drama develops branded content around a real audience tension, cultural idea, or human story. We shape the concept, choose the right format, and produce a connected body of work that can live across long-form, social, editorial, and campaign channels.",
    capabilities: [
      { title: "Story development", description: "Audience framing, research, concept development, narrative architecture, and format selection before cameras roll." },
      { title: "Branded films", description: "Documentary, lifestyle, talent-led, episodic, and narrative work designed to feel chosen rather than interrupted." },
      { title: "Content ecosystems", description: "A hero story supported by short-form edits, social chapters, photography, behind-the-scenes material, and editorial assets." },
      { title: "Cultural production", description: "Directors and collaborators chosen for an authentic point of view and a credible connection to the audience." },
    ],
    processFocus: "finding the human or cultural idea that makes branded work worth watching",
    keywordVariants: ["brand video production", "brand storytelling", "brand campaign content", "marketing video production"],
    related: ["video-production", "social-media-video", "documentary-production", "creative-development"],
    projectIds: ["beats-by-dre-be-heard", "essentia-water-advice", "jp-morgan-chase-mi-golondrina"],
    launch: true,
  },
  {
    slug: "social-media-video",
    name: "Social Media Video",
    seoTitle: "Social Media Video Production",
    singularLabel: "social video production team",
    summary: "Platform-native social video that moves quickly without flattening the craft or the brand.",
    overview: "We design social content as a system, not an afterthought. Family Drama plans for hooks, pacing, sound-off clarity, creator or talent performance, vertical composition, and the volume of assets a modern campaign actually needs.",
    capabilities: [
      { title: "Platform-first concepts", description: "Ideas shaped for the behavior, rhythm, and viewing context of TikTok, Reels, Shorts, paid social, and emerging placements." },
      { title: "Always-on capture", description: "Modular production days that create a durable library of campaign moments, product stories, people, and reactions." },
      { title: "Vertical cinematography", description: "Framing, movement, production design, and performance planned for 9:16 rather than cropped after the fact." },
      { title: "Rapid post and versioning", description: "Hooks, supers, captions, cutdowns, sound options, and channel-specific exports organized for fast approvals." },
    ],
    processFocus: "a modular capture and post system built around platform behavior and campaign cadence",
    keywordVariants: ["brand social video", "TikTok video production", "Instagram Reels production", "short-form video production"],
    related: ["branded-content", "video-production", "video-editing", "commercial-photographer"],
    projectIds: ["cowboy", "vinted-keep-searching", "zuvi-lifestyle"],
    launch: true,
  },
  {
    slug: "corporate-video-production",
    name: "Corporate Video Production",
    seoTitle: "Corporate Video Production",
    singularLabel: "corporate video production company",
    summary: "Credible, cinematic company stories for leadership, recruiting, internal communications, and B2B marketing.",
    overview: "Family Drama applies commercial craft to corporate communication without making it feel generic. We help teams find the sharpest story, prepare real people to appear on camera, and create films that work for customers, employees, investors, and partners.",
    capabilities: [
      { title: "Company and founder stories", description: "Narrative-led films that connect the company’s reason for existing to the people it serves." },
      { title: "Executive and employee films", description: "Interview development, coaching, multi-camera capture, and a visual system that makes real voices feel confident." },
      { title: "Recruiting and culture", description: "People-first stories built to show how work actually feels, not just repeat values from a wall." },
      { title: "B2B campaign assets", description: "Case studies, customer stories, product films, event content, and modular edits for sales and marketing teams." },
    ],
    processFocus: "turning complex organizations and real interviews into a clear, human narrative",
    keywordVariants: ["company video production", "corporate filmmaker", "B2B video production", "recruiting video production"],
    related: ["video-production", "branded-content", "documentary-production", "post-production"],
    projectIds: ["shell-robots", "jp-morgan-chase-mi-golondrina", "maximilian-busser"],
    launch: true,
  },
  {
    slug: "cinematography",
    name: "Cinematography",
    seoTitle: "Commercial Cinematography",
    singularLabel: "cinematography team",
    summary: "Commercial cinematography shaped around the story, location, format, and production reality.",
    overview: "Our cinematography work starts with intent: what the camera should make the audience feel and why. We pair the right director of photography, camera system, lens language, lighting approach, movement, and crew to the creative rather than forcing every job through one look.",
    capabilities: [
      { title: "Visual language", description: "References, shot design, lensing, movement, lighting, texture, and format choices connected to the narrative." },
      { title: "Camera and lighting packages", description: "Right-sized technical packages, specialty movement, grip, electric, data, and monitoring for the production." },
      { title: "Location and stage work", description: "Cinematography plans built for practical locations, controlled stages, LED environments, and mixed workflows." },
      { title: "Multi-format composition", description: "Frames protected for broadcast, widescreen, square, and vertical delivery without compromising the hero image." },
    ],
    processFocus: "a visual system in which camera, lighting, movement, and production design tell the same story",
    keywordVariants: ["commercial cinematographer", "director of photography", "DP services", "brand cinematography"],
    related: ["camera-operators", "commercial-video-production", "virtual-production", "post-production"],
    projectIds: ["porsche-freedom", "dr-teals-stay-hungry", "state-of-art-the-chase"],
    launch: true,
  },
  {
    slug: "camera-operators",
    name: "Camera Operators & Crews",
    seoTitle: "Camera Operators & Crews",
    singularLabel: "camera crew partner",
    summary: "Experienced camera operators and complete production crews for commercial, branded, corporate, and event shoots.",
    overview: "Family Drama assembles camera teams around the assignment: operator-only support, a DP-led unit, or a complete field-production crew. The goal is dependable execution, clear communication, and footage that drops cleanly into the wider campaign workflow.",
    capabilities: [
      { title: "Camera operators", description: "Operators matched to the format, visual approach, movement requirements, and collaboration style of the production." },
      { title: "DP-led camera units", description: "Director of photography, assistants, DIT, grip, electric, and camera support organized under one production plan." },
      { title: "Field production crews", description: "Producer, sound, art, HMU, production support, releases, media management, and location logistics as needed." },
      { title: "Remote production support", description: "Local execution for agency and brand teams producing away from their home market, with organized review and media handoff." },
    ],
    processFocus: "matching crew depth, technical package, and production support to the real needs of the shoot",
    keywordVariants: ["camera crew", "videographer crew", "director of photography crew", "local production crew"],
    related: ["cinematography", "video-production", "live-event-production", "commercial-photographer"],
    projectIds: ["new-balance-within-reach", "cowboy", "together"],
    launch: true,
  },
  {
    slug: "commercial-photographer",
    name: "Commercial Photography",
    seoTitle: "Commercial Photographer",
    singularLabel: "commercial photography team",
    summary: "Campaign photography, unit stills, lifestyle imagery, product moments, and social assets produced alongside motion or independently.",
    overview: "Family Drama builds still photography into the campaign from the start. That can mean a dedicated photo unit, a shared production design and talent day, or an integrated capture plan that creates cohesive motion and still assets without compromising either craft.",
    capabilities: [
      { title: "Campaign photography", description: "Hero key art, lifestyle, portrait, product, and environmental imagery produced for paid, owned, retail, and editorial placements." },
      { title: "Motion and stills integration", description: "Shared locations, casting, styling, art direction, and production resources with distinct time protected for the photo idea." },
      { title: "Unit and behind-the-scenes", description: "Authentic production imagery for press, social, case studies, talent, and the campaign’s wider story." },
      { title: "Retouching and delivery", description: "Selects, color, retouching, crops, usage organization, and channel-ready file delivery." },
    ],
    processFocus: "an integrated stills plan that shares production value while protecting the photography",
    keywordVariants: ["advertising photographer", "brand photographer", "campaign photography", "commercial lifestyle photographer"],
    related: ["commercial-video-production", "social-media-video", "branded-content", "creative-development"],
    projectIds: ["dr-teals-stay-hungry", "mackage-ss21", "orlebar-brown-graphite"],
    launch: true,
  },
  {
    slug: "post-production",
    name: "Post-Production",
    seoTitle: "Video Post-Production",
    singularLabel: "post-production partner",
    summary: "Editorial, color, sound, VFX, motion, versioning, and finishing managed as one campaign workflow.",
    overview: "Post is where a campaign becomes a system. Family Drama coordinates editorial and finishing around the story, review process, technical specifications, music, graphics, and the many versions required for modern distribution.",
    capabilities: [
      { title: "Editorial", description: "Story edit, performance shaping, pacing, music, review rounds, and cut architecture for hero and short-form work." },
      { title: "Color and finishing", description: "Color grade, online, cleanup, compositing, conform, quality control, and final masters." },
      { title: "Sound", description: "Dialogue, sound design, mix, music supervision support, stems, and deliverables for every placement." },
      { title: "Campaign versioning", description: "Durations, ratios, languages, supers, end cards, product variants, and platform specifications managed without chaos." },
    ],
    processFocus: "a review and finishing pipeline that keeps creative decisions and deliverable complexity visible",
    keywordVariants: ["post production company", "video finishing", "commercial editing", "campaign versioning"],
    related: ["video-editing", "motion-graphics", "3d-animation", "video-production"],
    projectIds: ["celebrate-the-magic", "beats-by-dre-be-heard", "shell-robots"],
    launch: true,
  },
  {
    slug: "video-editing",
    name: "Video Editing",
    seoTitle: "Professional Video Editing",
    singularLabel: "video editing team",
    summary: "Story-first editing for commercials, branded films, social content, corporate stories, and campaign versioning.",
    overview: "Our editors look for the structure, performance, pace, and emotional turns that make footage connect. Family Drama can lead post from raw media through final delivery or plug into an existing production with a clear, collaborative editorial workflow.",
    capabilities: [
      { title: "Commercial editing", description: "Performance, rhythm, product clarity, music, and brand communication shaped within exact duration requirements." },
      { title: "Branded and documentary edit", description: "Interview architecture, scene building, archive integration, and narrative development across longer formats." },
      { title: "Social editing", description: "Fast hooks, platform pacing, captions, graphic systems, and modular edits for organic and paid placements." },
      { title: "Versioning and adaptation", description: "Cutdowns, reframes, localization, alternate supers, product swaps, and delivery packages." },
    ],
    processFocus: "finding the clearest story in the footage, then adapting it without losing its point of view",
    keywordVariants: ["commercial video editor", "brand video editing", "social media video editing", "editing studio"],
    related: ["post-production", "motion-graphics", "social-media-video", "branded-content"],
    projectIds: ["essentia-water-advice", "vinted-keep-searching", "together"],
    launch: true,
  },
  {
    slug: "local-production-services",
    name: "Local Production Services",
    seoTitle: "Local Production Services",
    singularLabel: "local production partner",
    summary: "Local crews, locations, permits, equipment, logistics, and production management for teams filming away from home.",
    overview: "Family Drama gives visiting agencies, brands, networks, and production companies one accountable local partner. We connect the brief to trusted producers, crews, vendors, locations, equipment, and working knowledge of the market so an incoming team can move quickly without giving up control of the creative.",
    capabilities: [
      { title: "Local producing", description: "A market-based production lead for bidding, schedules, crew planning, vendor coordination, insurance, and communication with the traveling team." },
      { title: "Crews and department heads", description: "Directors of photography, camera, grip, electric, sound, art, HMU, production support, and specialty operators matched to the assignment." },
      { title: "Locations and permits", description: "Scouting, location agreements, municipal permits, neighborhood coordination, parking, basecamp, and practical access planning." },
      { title: "Equipment and logistics", description: "Camera, lighting, grip, transport, travel, catering, payroll, releases, data, and production services organized under one local plan." },
    ],
    processFocus: "one local production lead who connects the incoming creative team to the right people, places, equipment, and approvals",
    keywordVariants: ["production service company", "local film production services", "production support company", "film crew services"],
    related: ["camera-operators", "cinematography", "commercial-video-production", "video-production"],
    projectIds: ["crown-royal-chopped-and-screwed", "toyota-survivor", "ferrari-michael-b-jordan"],
    launch: true,
  },
  {
    slug: "product-video-production",
    name: "Product Video Production",
    seoTitle: "Product Video Production Company",
    singularLabel: "product video production partner",
    summary: "Product films, launch content, demonstrations, tabletop imagery, lifestyle capture, and ecommerce assets built to sell the detail.",
    overview: "Family Drama produces product video around the decision a customer needs to make. We translate features, materials, performance, and brand character into a visual system that can move from a hero launch film to product pages, paid social, retail screens, sales tools, and channel-specific cutdowns.",
    capabilities: [
      { title: "Product story and concept", description: "Audience, product truth, feature hierarchy, scripts, boards, demonstrations, and a visual idea designed around the buying journey." },
      { title: "Tabletop and detail capture", description: "Controlled lighting, macro cinematography, motion control, practical effects, styling, and art direction that make materials and features tangible." },
      { title: "Lifestyle and in-use production", description: "Casting, locations, performance, wardrobe, production design, and real product interaction that show how the product fits into life." },
      { title: "Ecommerce and campaign delivery", description: "Hero films, product-page videos, demos, paid-social variants, vertical edits, GIFs, still pulls, and retail-ready exports." },
    ],
    processFocus: "turning the most persuasive product truth into a repeatable visual system for launch, commerce, and campaign channels",
    keywordVariants: ["product videography", "ecommerce product video", "product commercial production", "product demo video production"],
    related: ["commercial-video-production", "social-media-video", "commercial-photographer", "3d-animation"],
    projectIds: ["dr-teals-stay-hungry", "shell-robots", "lego-play-unstoppable"],
    launch: true,
  },
  {
    slug: "testimonial-video-production",
    name: "Testimonial & Case Study Video Production",
    seoTitle: "Testimonial Video Production",
    singularLabel: "testimonial video production partner",
    summary: "Customer testimonials, case-study films, and interview-led stories that turn real experience into credible proof.",
    overview: "Family Drama approaches testimonial and case-study video with documentary care and commercial discipline. We prepare subjects without scripting away their voice, build a useful interview architecture, and surround each story with the people, places, product moments, and evidence that make the outcome believable.",
    capabilities: [
      { title: "Story and subject development", description: "Customer selection, pre-interviews, message priorities, question design, schedules, releases, and a narrative plan before the production day." },
      { title: "Cinematic interviews", description: "Subject care, direction, multi-camera capture, lighting, sound, and a comfortable set designed to produce specific, natural answers." },
      { title: "Proof and supporting footage", description: "Workplace, product, process, customer, archive, data, and environmental footage that shows the result instead of relying on claims alone." },
      { title: "Case-study content systems", description: "Hero stories, sales cutdowns, social clips, quote selects, vertical edits, paid-media versions, and modular assets for ongoing campaigns." },
    ],
    processFocus: "earning a specific and truthful customer story, then building enough visual proof for the audience to believe it",
    keywordVariants: ["case study video production", "customer testimonial video", "customer story video", "client testimonial video"],
    related: ["corporate-video-production", "documentary-production", "branded-content", "video-editing"],
    projectIds: ["jp-morgan-chase-mi-golondrina", "essentia-water-advice", "new-balance-within-reach"],
    launch: true,
  },
  {
    slug: "explainer-video-production",
    name: "Explainer Video Production",
    seoTitle: "Explainer Video Production Company",
    singularLabel: "explainer video production partner",
    summary: "Live-action, animated, and hybrid explainer videos that make complex products, services, and ideas easier to understand.",
    overview: "Family Drama starts an explainer with the audience's real question, not a list of features. We clarify the message, choose the right visual format, and connect writing, direction, live action, design, animation, sound, and finishing into a concise story people can understand and remember.",
    capabilities: [
      { title: "Message and script development", description: "Audience framing, information hierarchy, value proposition, scriptwriting, storyboards, and a clear action for the viewer." },
      { title: "Format and visual language", description: "Live action, interviews, 2D motion, 3D, product demonstration, interface animation, or a hybrid approach chosen for the idea." },
      { title: "Production and animation", description: "Direction, cinematography, design, illustration, animation, voice, music, sound, and post managed as one connected workflow." },
      { title: "Launch and sales versions", description: "Homepage films, product explainers, social cutdowns, sales-enablement edits, event versions, captions, and channel-ready ratios." },
    ],
    processFocus: "removing everything the audience does not need until the message and visual idea become immediately clear",
    keywordVariants: ["animated explainer video", "product explainer video", "corporate explainer video", "SaaS explainer video"],
    related: ["motion-graphics", "3d-animation", "corporate-video-production", "product-video-production"],
    projectIds: ["shell-robots", "state-of-art-the-chase", "celebrate-the-magic"],
    launch: true,
  },
  {
    slug: "drone-video-production",
    name: "Drone Video Production",
    seoTitle: "Drone Video Production Company",
    singularLabel: "aerial production partner",
    summary: "Commercial aerial cinematography, FPV capture, location reveals, and integrated ground-to-air production for campaigns and branded stories.",
    overview: "Family Drama treats the aerial unit as part of the film language, not an isolated shot list. We connect licensed and insured operators, aircraft, lenses, airspace planning, safety, weather, ground units, and post so every aerial image has a clear role in the story and cuts naturally with the wider production.",
    capabilities: [
      { title: "Aerial creative and planning", description: "Shot purpose, routes, sun position, location access, airspace research, permits, weather, safety, and contingency planning before flight." },
      { title: "Commercial aerial cinematography", description: "Cinematic establishing shots, tracking, reveals, vehicle work, landscape, architecture, industrial scale, and controlled camera movement." },
      { title: "FPV and specialty capture", description: "Dynamic interior-to-exterior moves, proximity work, fast action, compact aircraft, specialty pilots, and technical planning for distinctive perspectives." },
      { title: "Integrated production and post", description: "Aerial and ground units, matching formats, data, color, stabilization, compositing, sound, and delivery managed as one visual workflow." },
    ],
    processFocus: "designing the aerial unit around story, airspace, safety, weather, and a seamless match with the ground production",
    keywordVariants: ["aerial videography", "commercial drone videography", "drone cinematography", "FAA drone video services"],
    related: ["cinematography", "camera-operators", "video-production", "local-production-services"],
    projectIds: ["porsche-freedom", "new-balance-within-reach", "state-of-art-the-chase"],
    launch: true,
  },
  {
    slug: "motion-graphics",
    name: "Motion Graphics",
    seoTitle: "Motion Graphics Studio",
    singularLabel: "motion design partner",
    summary: "Motion design systems, titles, product stories, data visualization, and campaign graphics built for every screen.",
    overview: "Family Drama uses motion design to make an idea clearer, more ownable, or more alive. We develop visual systems that can carry through a hero film, social series, product launch, event environment, and the many versions between them.",
    capabilities: [
      { title: "2D motion design", description: "Typography, illustration, transitions, compositing, and graphic storytelling grounded in the brand system." },
      { title: "Campaign toolkits", description: "Reusable motion principles, templates, end cards, supers, and modular components for internal and external teams." },
      { title: "Product and interface stories", description: "Clear demonstrations, UI choreography, feature sequences, and abstract visualizations for complex ideas." },
      { title: "Screen and event content", description: "Motion designed for stage screens, LED canvases, installations, presentations, and unconventional aspect ratios." },
    ],
    processFocus: "a repeatable motion language that makes every campaign asset feel related",
    keywordVariants: ["motion design studio", "animated graphics", "2D animation company", "commercial motion graphics"],
    related: ["post-production", "3d-animation", "ai-video-production", "live-event-production"],
    projectIds: ["shell-robots", "celebrate-the-magic", "state-of-art-the-chase"],
    launch: true,
  },
  {
    slug: "3d-animation",
    name: "3D Animation",
    seoTitle: "3D Animation Studio",
    singularLabel: "3D production partner",
    summary: "3D design, animation, environments, product visualization, and real-time assets for campaigns and experiences.",
    overview: "Our 3D work connects design and production rather than treating animation as an isolated effect. Family Drama develops environments, products, characters, and visual systems for film, web, real-time, event, and interactive use.",
    capabilities: [
      { title: "3D design and animation", description: "Concept frames, modeling, look development, lighting, animation, rendering, and compositing." },
      { title: "Product visualization", description: "Materials, macro details, exploded views, impossible camera moves, and product worlds unconstrained by physical production." },
      { title: "Real-time environments", description: "Optimized assets, Unreal Engine development, virtual sets, MetaHumans, and interactive-ready scenes." },
      { title: "Hybrid live action", description: "Previsualization, on-set integration, match move, compositing, and finishing that join physical and digital craft." },
    ],
    processFocus: "designing assets once with a clear plan for film, real-time, interactive, and experiential outputs",
    keywordVariants: ["3D animation company", "CGI studio", "product animation", "3D content production"],
    related: ["motion-graphics", "virtual-production", "ai-video-production", "experiential-production"],
    projectIds: ["shell-robots", "dr-teals-stay-hungry", "state-of-art-the-chase"],
    launch: true,
  },
  {
    slug: "virtual-production",
    name: "Virtual Production",
    seoTitle: "Virtual Production Studio",
    singularLabel: "virtual production partner",
    summary: "Previsualization, Unreal Engine environments, LED workflows, and hybrid production for ambitious campaign worlds.",
    overview: "Virtual production is most useful when it solves a real creative or production problem. Family Drama connects directors, cinematographers, art, VFX, Unreal artists, stages, and post so the virtual workflow serves the shot rather than becoming the story.",
    capabilities: [
      { title: "Previsualization", description: "Virtual scouting, camera blocking, lens exploration, lighting studies, and production decisions made before the shoot." },
      { title: "Unreal Engine environments", description: "Real-time world building, optimized assets, material development, lighting, and stage-ready scenes." },
      { title: "LED and in-camera VFX", description: "Stage planning, frustums, tracking, playback, color workflow, practical lighting, and on-set technical direction." },
      { title: "Hybrid set design", description: "Physical foregrounds, practical props, art direction, and virtual extensions designed as one environment." },
    ],
    processFocus: "deciding early which parts of the world should be physical, virtual, or finished in post",
    keywordVariants: ["LED volume production", "Unreal Engine production", "in-camera VFX", "virtual set production"],
    related: ["3d-animation", "cinematography", "commercial-video-production", "post-production"],
    projectIds: ["dr-teals-stay-hungry", "shell-robots", "porsche-freedom"],
    launch: true,
  },
  {
    slug: "ai-video-production",
    name: "AI Video Production",
    seoTitle: "AI Video Production",
    singularLabel: "AI content production partner",
    summary: "Responsible generative workflows, custom content systems, and hybrid live-action production for brand-ready AI video.",
    overview: "Family Drama treats AI as a production capability, not a shortcut around creative judgment. We help brands identify the right use case, establish visual and approval controls, and combine generative tools with direction, design, live action, VFX, and finishing.",
    capabilities: [
      { title: "AI production strategy", description: "Use-case definition, feasibility, workflow design, risk review, approvals, and a realistic plan for quality and iteration." },
      { title: "Generative image and video", description: "Directed generation, visual development, continuity planning, compositing, and refinement toward campaign-ready output." },
      { title: "Hybrid production", description: "Live action, product capture, performance, 3D, VFX, and generative elements combined where each method is strongest." },
      { title: "Private brand workflows", description: "Brand-specific data, repeatable tools, documentation, and controlled systems designed for marketing teams." },
    ],
    processFocus: "controlled experimentation with clear creative ownership, brand review, and finishing standards",
    keywordVariants: ["generative AI video", "AI commercial production", "AI content studio", "AI marketing video"],
    related: ["3d-animation", "motion-graphics", "creative-development", "post-production"],
    projectIds: ["shell-robots", "celebrate-the-magic", "state-of-art-the-chase"],
    launch: true,
  },
  {
    slug: "experiential-production",
    name: "Experiential Production",
    seoTitle: "Experiential Production Company",
    singularLabel: "experiential production partner",
    summary: "Creative technology, activations, live environments, and content systems that connect physical and digital audiences.",
    overview: "Family Drama produces experiences by connecting the guest journey, creative idea, technology, content, space, and operations. The result can be a brand activation, interactive installation, projection, live moment, or a hybrid experience built to travel beyond the room.",
    capabilities: [
      { title: "Experience development", description: "Audience journey, creative concept, interaction model, feasibility, prototyping, and production planning." },
      { title: "Creative technology", description: "AR, AI, computer vision, real-time content, sensors, web experiences, and bespoke technical systems." },
      { title: "Environmental content", description: "LED, projection, motion, 3D, sound, show content, and responsive media designed for the space." },
      { title: "Live operations", description: "Vendors, fabrication, technical direction, rehearsal, show control, staffing, logistics, and on-site production." },
    ],
    processFocus: "designing the guest journey and technical architecture together from the beginning",
    keywordVariants: ["brand activation production", "experiential agency", "interactive installation", "event experience production"],
    related: ["live-event-production", "motion-graphics", "3d-animation", "creative-development"],
    projectIds: ["celebrate-the-magic", "shell-robots", "lego-play-unstoppable"],
    launch: true,
  },
  {
    slug: "live-event-production",
    name: "Live Event Production",
    seoTitle: "Live Event Video Production",
    singularLabel: "live event production partner",
    summary: "Multi-camera capture, livestreams, show content, and event films planned for the room and the audience beyond it.",
    overview: "We treat live production as both an event and a content opportunity. Family Drama coordinates camera, audio, switching, graphics, streaming, show content, and post so the experience works in real time and keeps creating value afterward.",
    capabilities: [
      { title: "Multi-camera production", description: "Camera plots, operators, switching, records, comms, audio, lighting coordination, and technical direction." },
      { title: "Livestreams and broadcasts", description: "Platform planning, encoding, graphics, remote contributors, redundancy, monitoring, and audience experience." },
      { title: "Show content", description: "Openers, speaker packages, stings, motion systems, playback, LED content, and presentation assets." },
      { title: "Event films and social", description: "Highlight edits, interviews, behind-the-scenes, rapid-turn social, and evergreen stories captured around the live moment." },
    ],
    processFocus: "one technical and editorial plan for the live moment, remote audience, and post-event content",
    keywordVariants: ["event videography", "livestream production", "multi-camera event production", "conference video production"],
    related: ["experiential-production", "camera-operators", "motion-graphics", "video-editing"],
    projectIds: ["celebrate-the-magic", "lego-play-unstoppable", "new-balance-within-reach"],
    launch: true,
  },
  {
    slug: "creative-development",
    name: "Creative Development",
    seoTitle: "Video Creative Development",
    singularLabel: "creative development partner",
    summary: "Cultural strategy, concept development, treatments, and production thinking that turn an open brief into a filmable idea.",
    overview: "Family Drama develops ideas with production reality in the room from the start. We connect the audience, brand truth, cultural opportunity, format, director, and execution plan so concepts are original, relevant, and buildable.",
    capabilities: [
      { title: "Cultural framing", description: "Audience behavior, category signals, brand tension, and the cultural context that gives the work a reason to exist." },
      { title: "Concept development", description: "Creative territories, scripts, formats, campaign systems, and ideas designed for the channels that matter." },
      { title: "Treatments and visualization", description: "Director thinking, references, boards, previsualization, prototypes, and clear articulation of the final experience." },
      { title: "Production feasibility", description: "Budget ranges, schedule, technology, talent, locations, deliverables, and execution paths evaluated while the idea is still flexible." },
    ],
    processFocus: "bringing culture, concept, and production feasibility into the same working session",
    keywordVariants: ["video concept development", "campaign ideation", "creative production strategy", "commercial treatment development"],
    related: ["branded-content", "commercial-video-production", "ai-video-production", "experiential-production"],
    projectIds: ["beats-by-dre-be-heard", "crown-royal-chopped-and-screwed", "celebrate-the-magic"],
    launch: true,
  },
  {
    slug: "documentary-production",
    name: "Documentary Production",
    seoTitle: "Documentary Production Company",
    singularLabel: "documentary production partner",
    summary: "Human-led documentary and unscripted storytelling for brands, organizations, athletes, and cultural subjects.",
    overview: "Our documentary approach protects real voices while building a clear story. Family Drama handles research, access, interview development, field production, archive, editorial, and finishing for short documentaries, episodic stories, and branded nonfiction.",
    capabilities: [
      { title: "Research and story producing", description: "Subject research, access, story mapping, pre-interviews, archive planning, and ethical production preparation." },
      { title: "Interviews", description: "Thoughtful question development, subject care, intimate crews, cinematic lighting, and an environment where people can be specific." },
      { title: "Field production", description: "Observational capture, travel, small-footprint crews, releases, media management, and adaptable schedules." },
      { title: "Documentary editorial", description: "Transcript-driven story building, archive, music, pacing, fact review, finishing, and long- and short-form versions." },
    ],
    processFocus: "earning access and building a truthful story before deciding what the film should say",
    keywordVariants: ["branded documentary", "documentary film crew", "unscripted production", "brand documentary production"],
    related: ["branded-content", "corporate-video-production", "camera-operators", "video-editing"],
    projectIds: ["new-balance-within-reach", "jp-morgan-chase-mi-golondrina", "essentia-water-advice"],
    launch: true,
  },
];

export const seoCities: SeoCity[] = [
  { slug: "new-york", name: "New York", state: "New York", stateCode: "NY", population2025: 8584629, region: "Northeast", industries: ["media", "finance", "fashion", "consumer brands"], productionCharacter: "dense urban locations, iconic architecture, controlled stages, and a deep creative talent base", logistics: "location access, compact company moves, street control, talent schedules, and multi-unit capture benefit from early coordination", nearestOffice: "Los Angeles", launch: true },
  { slug: "los-angeles", name: "Los Angeles", state: "California", stateCode: "CA", population2025: 3869089, region: "West", industries: ["entertainment", "automotive", "fashion", "consumer brands"], productionCharacter: "stages, backlots, modern architecture, residential worlds, coast, and desert within one production market", logistics: "stage selection, permitting, company moves, talent, specialty equipment, and traffic-aware scheduling are built into the plan", nearestOffice: "Los Angeles", hasOffice: true, launch: true },
  { slug: "chicago", name: "Chicago", state: "Illinois", stateCode: "IL", population2025: 2731585, region: "Midwest", industries: ["food and beverage", "finance", "sports", "consumer brands"], productionCharacter: "graphic architecture, neighborhoods, waterfront, practical businesses, and a mature commercial crew base", logistics: "seasonality, downtown access, neighborhood moves, stage options, and weather coverage shape a resilient schedule", nearestOffice: "Austin", launch: true },
  { slug: "houston", name: "Houston", state: "Texas", stateCode: "TX", population2025: 2397315, region: "South", industries: ["energy", "healthcare", "aerospace", "sports"], productionCharacter: "modern cityscapes, industrial environments, residential locations, stages, and Gulf Coast scale", logistics: "heat, weather, industrial access, cross-city moves, and location-specific safety planning are handled early", nearestOffice: "Houston", hasOffice: true, launch: true },
  { slug: "phoenix", name: "Phoenix", state: "Arizona", stateCode: "AZ", population2025: 1665481, region: "West", industries: ["healthcare", "technology", "hospitality", "consumer services"], productionCharacter: "desert landscapes, contemporary architecture, resorts, open roads, and controlled interiors", logistics: "heat-aware scheduling, sun position, remote location support, shade, hydration, and travel time guide production design", nearestOffice: "Los Angeles", launch: true },
  { slug: "philadelphia", name: "Philadelphia", state: "Pennsylvania", stateCode: "PA", population2025: 1574281, region: "Northeast", industries: ["healthcare", "education", "finance", "consumer brands"], productionCharacter: "historic texture, modern institutions, rowhouse neighborhoods, industrial spaces, and a walkable urban core", logistics: "historic locations, street access, parking, compact moves, and institutional approvals reward detailed pre-production", nearestOffice: "Los Angeles", launch: true },
  { slug: "san-antonio", name: "San Antonio", state: "Texas", stateCode: "TX", population2025: 1548422, region: "South", industries: ["tourism", "healthcare", "military services", "consumer brands"], productionCharacter: "historic districts, hospitality environments, contemporary growth, riverfront, and Texas landscapes", logistics: "heat, visitor traffic, historic access, company moves, and exterior timing are coordinated around the location", nearestOffice: "Austin", launch: true },
  { slug: "san-diego", name: "San Diego", state: "California", stateCode: "CA", population2025: 1406106, region: "West", industries: ["biotechnology", "defense", "tourism", "lifestyle brands"], productionCharacter: "coast, modern research campuses, neighborhoods, hospitality settings, and year-round exterior options", logistics: "coastal conditions, protected locations, military or institutional access, and travel between distinct zones need lead time", nearestOffice: "Los Angeles", launch: true },
  { slug: "dallas", name: "Dallas", state: "Texas", stateCode: "TX", population2025: 1329491, region: "South", industries: ["finance", "telecommunications", "retail", "sports"], productionCharacter: "corporate architecture, studios, residential worlds, sports environments, and broad North Texas location variety", logistics: "metro-scale travel, stage holds, talent, weather cover, and coordination across Dallas–Fort Worth are planned as one system", nearestOffice: "Austin", launch: true },
  { slug: "fort-worth", name: "Fort Worth", state: "Texas", stateCode: "TX", population2025: 1028117, region: "South", industries: ["aviation", "manufacturing", "sports", "lifestyle brands"], productionCharacter: "industrial scale, western heritage, arts districts, neighborhoods, and open North Texas landscapes", logistics: "Dallas–Fort Worth travel, large practical locations, heat, weather, and unit moves are accounted for in the schedule", nearestOffice: "Austin", launch: true },
  { slug: "jacksonville", name: "Jacksonville", state: "Florida", stateCode: "FL", population2025: 1017689, region: "South", industries: ["logistics", "finance", "healthcare", "tourism"], productionCharacter: "coastal environments, waterways, logistics infrastructure, neighborhoods, and modern commercial districts", logistics: "weather, water access, travel across a large footprint, and storm contingencies shape exterior production planning", nearestOffice: "Houston", launch: true },
  { slug: "austin", name: "Austin", state: "Texas", stateCode: "TX", population2025: 1002632, region: "South", industries: ["technology", "music", "consumer brands", "startups"], productionCharacter: "creative neighborhoods, music venues, modern offices, hill country, studios, and a culture comfortable on camera", logistics: "festival calendars, heat, traffic, exterior sound, and moves between city and hill-country locations are planned early", nearestOffice: "Austin", hasOffice: true, launch: true },
  { slug: "san-jose", name: "San Jose", state: "California", stateCode: "CA", population2025: 989814, region: "West", industries: ["technology", "enterprise software", "consumer electronics", "advanced manufacturing"], productionCharacter: "technology campuses, modern workplaces, residential neighborhoods, and access to the wider Bay Area", logistics: "campus approvals, confidential products, executive schedules, travel, and Bay Area location coordination require a precise plan", nearestOffice: "Los Angeles", launch: true },
  { slug: "charlotte", name: "Charlotte", state: "North Carolina", stateCode: "NC", population2025: 964784, region: "South", industries: ["finance", "sports", "energy", "consumer brands"], productionCharacter: "modern business districts, sports environments, neighborhoods, green spaces, and regional location range", logistics: "corporate access, sports schedules, city-to-suburb moves, weather, and talent availability are built into pre-production", nearestOffice: "Houston", launch: true },
  { slug: "columbus", name: "Columbus", state: "Ohio", stateCode: "OH", population2025: 938396, region: "Midwest", industries: ["retail", "insurance", "education", "manufacturing"], productionCharacter: "corporate campuses, retail environments, neighborhoods, institutions, and practical Midwest locations", logistics: "campus access, seasonality, company moves, real-customer casting, and weather cover are scheduled deliberately", nearestOffice: "Austin", launch: true },
  { slug: "indianapolis", name: "Indianapolis", state: "Indiana", stateCode: "IN", population2025: 901116, region: "Midwest", industries: ["sports", "healthcare", "manufacturing", "consumer brands"], productionCharacter: "major venues, industrial environments, institutions, neighborhoods, and accessible regional locations", logistics: "event calendars, venue access, seasonality, road moves, and industrial safety requirements inform the crew plan", nearestOffice: "Austin", launch: true },
  { slug: "san-francisco", name: "San Francisco", state: "California", stateCode: "CA", population2025: 826079, region: "West", industries: ["technology", "finance", "consumer products", "hospitality"], productionCharacter: "recognizable streets, steep geography, historic and modern architecture, waterfront, and design-led interiors", logistics: "parking, compact moves, street control, fog, sound, and coordination across the wider Bay Area make scouting essential", nearestOffice: "Los Angeles", launch: true },
  { slug: "seattle", name: "Seattle", state: "Washington", stateCode: "WA", population2025: 784777, region: "West", industries: ["technology", "retail", "aerospace", "outdoor brands"], productionCharacter: "modern workplaces, waterfront, forests, industrial spaces, neighborhoods, and a strong outdoor point of view", logistics: "weather cover, short winter daylight, water or forest access, and regional travel are designed into the shooting plan", nearestOffice: "Los Angeles", launch: true },
  { slug: "denver", name: "Denver", state: "Colorado", stateCode: "CO", population2025: 740613, region: "West", industries: ["outdoor", "travel", "technology", "wellness"], productionCharacter: "urban growth, mountain access, high-desert light, sports environments, and outdoor-lifestyle locations", logistics: "altitude, fast-changing weather, mountain travel, sun, and remote support require flexible crews and contingency time", nearestOffice: "Los Angeles", launch: true },
  { slug: "nashville", name: "Nashville", state: "Tennessee", stateCode: "TN", population2025: 721074, region: "South", industries: ["music", "healthcare", "hospitality", "consumer brands"], productionCharacter: "performance spaces, studios, hospitality, neighborhoods, rural edges, and a production-savvy talent community", logistics: "venue calendars, live sound, downtown access, music talent, and city-to-country moves benefit from early holds", nearestOffice: "Houston", launch: true },
  { slug: "oklahoma-city", name: "Oklahoma City", state: "Oklahoma", stateCode: "OK", population2025: 719849, region: "South", industries: ["energy", "aviation", "sports", "agriculture"], productionCharacter: "broad streets, industrial environments, sports settings, ranch access, and modern urban locations", logistics: "wind, heat, distance, industrial safety, and remote location services are reflected in the schedule and package", nearestOffice: "Austin", launch: true },
  { slug: "washington-dc", name: "Washington, DC", state: "District of Columbia", stateCode: "DC", population2025: 693645, region: "Mid-Atlantic", industries: ["associations", "public affairs", "hospitality", "technology"], productionCharacter: "institutional architecture, modern offices, neighborhoods, hospitality, and recognizable public environments", logistics: "security, public-space restrictions, executive schedules, street access, and compact moves call for exact pre-production", nearestOffice: "Houston", launch: true },
  { slug: "el-paso", name: "El Paso", state: "Texas", stateCode: "TX", population2025: 683012, region: "Southwest", industries: ["logistics", "manufacturing", "healthcare", "cross-border commerce"], productionCharacter: "desert scale, mountain edges, industrial locations, highways, and a distinct cross-border visual identity", logistics: "heat, distance, sun, remote services, and access near sensitive locations require deliberate scouting and scheduling", nearestOffice: "Austin", launch: true },
  { slug: "las-vegas", name: "Las Vegas", state: "Nevada", stateCode: "NV", population2025: 679817, region: "West", industries: ["hospitality", "entertainment", "conventions", "consumer brands"], productionCharacter: "large venues, resorts, stages, night environments, desert locations, and high-impact visual infrastructure", logistics: "venue rules, guest traffic, overnight work, lighting control, union requirements, and desert moves are aligned early", nearestOffice: "Los Angeles", launch: true },
  { slug: "boston", name: "Boston", state: "Massachusetts", stateCode: "MA", population2025: 672973, region: "Northeast", industries: ["biotechnology", "education", "finance", "technology"], productionCharacter: "research campuses, historic streets, modern offices, waterfront, and dense neighborhoods", logistics: "institutional approvals, compact access, parking, seasonality, and travel across the metro shape the crew plan", nearestOffice: "Los Angeles", launch: true },
  { slug: "detroit", name: "Detroit", state: "Michigan", stateCode: "MI", population2025: 649095, region: "Midwest", industries: ["automotive", "mobility", "manufacturing", "music"], productionCharacter: "automotive infrastructure, industrial scale, distinctive architecture, music culture, and practical road environments", logistics: "vehicle control, industrial access, weather, road permits, specialty rigs, and large company moves are planned together", nearestOffice: "Austin", launch: true },
  { slug: "louisville", name: "Louisville", state: "Kentucky", stateCode: "KY", population2025: 641962, region: "South", industries: ["healthcare", "logistics", "food and beverage", "sports"], productionCharacter: "historic neighborhoods, industrial and logistics spaces, hospitality, sport, and regional landscapes", logistics: "event calendars, facility access, seasonality, city-to-rural moves, and weather cover are included from the bid", nearestOffice: "Houston", launch: true },
  { slug: "portland", name: "Portland", state: "Oregon", stateCode: "OR", population2025: 635109, region: "West", industries: ["outdoor", "apparel", "food and beverage", "technology"], productionCharacter: "maker spaces, industrial texture, neighborhoods, forests, coast access, and design-conscious lifestyle settings", logistics: "rain cover, daylight, forest or coast travel, permits, and protecting natural locations influence the schedule", nearestOffice: "Los Angeles", launch: true },
  { slug: "memphis", name: "Memphis", state: "Tennessee", stateCode: "TN", population2025: 609647, region: "South", industries: ["logistics", "music", "healthcare", "food and beverage"], productionCharacter: "music history, industrial and logistics environments, neighborhoods, riverfront, and regional landscapes", logistics: "facility access, live venues, heat, weather, exterior sound, and travel across the metro are coordinated in advance", nearestOffice: "Houston", launch: true },
  { slug: "baltimore", name: "Baltimore", state: "Maryland", stateCode: "MD", population2025: 569997, region: "Mid-Atlantic", industries: ["healthcare", "education", "maritime", "sports"], productionCharacter: "waterfront, rowhouse neighborhoods, institutions, industrial texture, and varied historic architecture", logistics: "street access, waterfront conditions, institutional approvals, compact moves, and weather cover reward early scouting", nearestOffice: "Houston", launch: true },
  { slug: "milwaukee", name: "Milwaukee", state: "Wisconsin", stateCode: "WI", population2025: 562407, region: "Midwest", industries: ["manufacturing", "food and beverage", "sports", "financial services"], productionCharacter: "industrial heritage, lakefront, neighborhoods, venues, and practical locations with strong visual texture", logistics: "seasonality, lake weather, industrial safety, venue schedules, and regional travel are built into production planning", nearestOffice: "Austin", launch: true },
  { slug: "albuquerque", name: "Albuquerque", state: "New Mexico", stateCode: "NM", population2025: 556588, region: "Southwest", industries: ["aerospace", "technology", "tourism", "energy"], productionCharacter: "desert, high-altitude light, stages, distinctive architecture, open roads, and access to varied New Mexico terrain", logistics: "altitude, sun, temperature swings, remote location support, weather, and travel time are treated as creative constraints", nearestOffice: "Los Angeles", launch: true },
  { slug: "fresno", name: "Fresno", state: "California", stateCode: "CA", population2025: 555549, region: "West", industries: ["agriculture", "food and beverage", "healthcare", "logistics"], productionCharacter: "agricultural scale, industrial processing, neighborhoods, road environments, and access to Central California landscapes", logistics: "seasonality, working facilities, heat, dust, travel, and active agricultural operations require a careful field plan", nearestOffice: "Los Angeles", launch: true },
  { slug: "tucson", name: "Tucson", state: "Arizona", stateCode: "AZ", population2025: 548371, region: "Southwest", industries: ["aerospace", "education", "healthcare", "tourism"], productionCharacter: "Sonoran desert, mountain edges, academic environments, historic texture, and expansive exterior light", logistics: "heat, protected desert locations, wildlife, sun, altitude, and remote support shape the production day", nearestOffice: "Los Angeles", launch: true },
  { slug: "sacramento", name: "Sacramento", state: "California", stateCode: "CA", population2025: 536449, region: "West", industries: ["public affairs", "healthcare", "agriculture", "technology"], productionCharacter: "institutional spaces, tree-lined neighborhoods, modern growth, agricultural access, and Central Valley landscapes", logistics: "government or institutional access, heat, regional travel, parking, and location-specific approvals need lead time", nearestOffice: "Los Angeles", launch: true },
  { slug: "atlanta", name: "Atlanta", state: "Georgia", stateCode: "GA", population2025: 529110, region: "South", industries: ["entertainment", "logistics", "consumer brands", "sports"], productionCharacter: "stages, city skylines, neighborhoods, forests, modern homes, and one of the country’s deepest production ecosystems", logistics: "traffic, stage availability, weather, union or vendor requirements, and moves across a broad metro are planned tightly", nearestOffice: "Houston", launch: true },
  { slug: "kansas-city", name: "Kansas City", state: "Missouri", stateCode: "MO", population2025: 521220, region: "Midwest", industries: ["food and beverage", "sports", "logistics", "technology"], productionCharacter: "industrial texture, sports culture, neighborhoods, architecture, and accessible regional landscapes", logistics: "seasonality, venue calendars, interstate moves, weather, and industrial access are reflected in the schedule", nearestOffice: "Austin", launch: true },
  { slug: "mesa", name: "Mesa", state: "Arizona", stateCode: "AZ", population2025: 513656, region: "West", industries: ["aerospace", "healthcare", "technology", "education"], productionCharacter: "desert, suburban scale, aviation environments, campuses, and access to the wider Phoenix production market", logistics: "heat, sun, travel across the valley, aviation access, and exterior contingencies are coordinated early", nearestOffice: "Los Angeles", launch: true },
  { slug: "raleigh", name: "Raleigh", state: "North Carolina", stateCode: "NC", population2025: 506306, region: "South", industries: ["technology", "life sciences", "education", "finance"], productionCharacter: "research campuses, modern offices, neighborhoods, green spaces, and access to the wider Triangle", logistics: "campus approvals, executive schedules, city-to-campus moves, weather, and confidential products shape pre-production", nearestOffice: "Houston", launch: true },
  { slug: "miami", name: "Miami", state: "Florida", stateCode: "FL", population2025: 489812, region: "South", industries: ["hospitality", "fashion", "finance", "entertainment"], productionCharacter: "coast, contemporary architecture, nightlife, hospitality, vibrant neighborhoods, and multilingual talent", logistics: "weather, water, guest traffic, permits, high-demand locations, and storm contingencies require flexible planning", nearestOffice: "Houston", strategicException: true, launch: true },
];

export function getSeoService(slug?: string): SeoService | undefined {
  return seoServices.find((service) => service.slug === slug);
}

export function getSeoCity(slug?: string): SeoCity | undefined {
  return seoCities.find((city) => city.slug === slug);
}

export function servicePath(service: SeoService): string {
  return `/services/${service.slug}`;
}

export function cityPath(city: SeoCity): string {
  return `/locations/${city.slug}`;
}

export function serviceCityPath(service: SeoService, city: SeoCity): string {
  return `/${service.slug}/${city.slug}`;
}

export function cityNameWithoutState(city: SeoCity): string {
  const stateSuffix = `, ${city.stateCode}`;
  return city.name.endsWith(stateSuffix) ? city.name.slice(0, -stateSuffix.length) : city.name;
}

export function cityNameWithState(city: SeoCity): string {
  return `${cityNameWithoutState(city)}, ${city.stateCode}`;
}

export function isServiceCityIndexable(service: SeoService, city: SeoCity): boolean {
  return service.launch && city.launch;
}

export function serviceCityTitle(service: SeoService, city: SeoCity): string {
  return `${service.seoTitle} ${city.name} | Family Drama`;
}

export function serviceCityDescription(service: SeoService, city: SeoCity): string {
  return `${service.name} in ${cityNameWithState(city)}, from Family Drama. Creative development, production, and delivery for ambitious brand campaigns. Start a project.`;
}

export function servicePageTitle(service: SeoService): string {
  return `${service.name} Services | Family Drama`;
}

export function servicePageDescription(service: SeoService): string {
  return `${service.summary} Explore Family Drama's approach, selected work, full capabilities, and production coverage across the United States.`;
}

export function cityPageTitle(city: SeoCity): string {
  return `Production Services ${cityNameWithState(city)} | Family Drama`;
}

export function cityPageDescription(city: SeoCity): string {
  return `Commercial, branded, social, photography, post, and experiential production in ${city.name}. Explore Family Drama's capabilities and start a project.`;
}
