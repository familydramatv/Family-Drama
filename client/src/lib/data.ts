export type ProjectCategory = "featured" | "content" | "experience" | "ai" | "stills";

export interface ContentSection {
  type: "text" | "text-columns" | "image-pair" | "image-full";
  heading?: string;
  paragraphs?: string[];
  images?: { src: string; alt: string }[];
}

export interface ProjectContent {
  headline?: string;
  services?: string[];
  talent?: string;
  sections: ContentSection[];
  awards?: string[];
  credits?: { label: string; value: string }[];
}

export interface Project {
  id: string;
  title: string;
  client: string;
  director?: string;
  tags?: string[];
  image: string;
  featured?: boolean;
  categories: ProjectCategory[];
  muxPlaybackId?: string;
  muxProjectPlaybackId?: string;
  thumbnailTime?: number;
  gifStart?: number;
  gifEnd?: number;
  btsVideoPlaybackId?: string;
  productionPhotos?: string[];
  content?: ProjectContent;
  directorOnly?: boolean;
}

export function getMuxThumbnail(playbackId: string, time = 0, width = 800, fit_crop?: string): string {
  let url = `https://image.mux.com/${playbackId}/thumbnail.jpg?time=${time}&width=${width}`;
  if (fit_crop) url += `&fit_crop=${fit_crop}`;
  return url;
}

export function getMuxGif(playbackId: string, start = 2, end = 6, width = 640): string {
  return `https://image.mux.com/${playbackId}/animated.gif?start=${start}&end=${end}&width=${width}`;
}

export interface NewsItem {
  id: string;
  source: string;
  title: string;
  image: string;
  link: string;
}

export interface Service {
  id: string;
  title: string;
  bullets: string[];
  description: string;
  image: string;
  muxVideoId?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  email: string;
}

export interface Office {
  city: string;
  locations: { label: string; address: string; mapLink: string }[];
  phone?: string;
}

export const projects: Project[] = [
  // === Featured row 1: Lego + Toyota (bright, energetic, family-friendly) ===
  {
    id: "lego-play-unstoppable",
    title: "Play Unstoppable",
    client: "LEGO",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "YtMByMlUh5xCQWHAllei6sxaRxApD021flcJ9mln7vvA",
    muxProjectPlaybackId: "vQMV101BNy8k5iiFv2EhM9wLLU0064100bSPvhMkNCYPTI",
    thumbnailTime: 0,
  },
  {
    id: "toyota-survivor",
    title: "Survivor",
    client: "Toyota",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "00daUhHraACCAGWIwUrI2OEAKtU01hsNL9LShB5yLHxvM",
    muxProjectPlaybackId: "aKBG01hI1xIc7t00u022YZiw1RCiJ1s5FKYMklyXom3qXY",
    thumbnailTime: 0,
  },
  // === Featured row 2: Porsche + Dr. Teal's (moody, athletic, high-contrast) ===
  {
    id: "porsche-freedom",
    title: "Freedom",
    client: "Porsche",
    director: "Greenwood",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "75Ia9i67Bg022YDHoa13cBEUQWxi86W77OuyT02dYMWo4",
    muxProjectPlaybackId: "psaEHB01fMyip8QHJFH01dptKJHS00MCilvc4jypBTZGhQ",
    thumbnailTime: 0,
  },
  {
    id: "dr-teals-stay-hungry",
    title: "Stay Hungry",
    client: "Dr. Teal's",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "Suz9ZUBQoxegDECIKhvGzyVHBQM9c02jdsM38JuH6qhE",
    muxProjectPlaybackId: "m1FlwgNrObAAkfSWeQ5KdX5pPCNs3rhoAZz7HFZ15Dg",
    thumbnailTime: 0,
    btsVideoPlaybackId: "33uu022rWzJI3oHshCHzRRfulop00SoxMfhSrMP5aOkDk",
    productionPhotos: [
      "/images/bts/dt-aaron-donald-4.jpg",
      "/images/bts/dt-aaron-donald-1.jpg",
      "/images/bts/dt-aaron-donald-2.jpg",
      "/images/bts/dt-aaron-donald-3.jpg",
    ],
    content: {
      headline: "What does it take to stay on top? For Aaron Donald, it starts with pushing your body to the limit and knowing how to bring it back.",
      talent: "Aaron Donald",
      services: ["Commercial Production", "Virtual Production Design", "Still Photography"],
      sections: [
        {
          type: "text",
          paragraphs: [
            "After 8 seasons in the league, Aaron Donald solidified himself as one of the most dominant forces the game has ever seen. Pro Bowler every season, 3x Defensive Player of the Year, and Super Bowl champion. But staying at the top requires more than talent. It demands relentless training, elite-level recovery, and an unwavering commitment to the process. We partnered with Dr Teal\u2019s to produce a series of commercial spots that gave viewers a window into Aaron\u2019s world. The grind, the recovery, and the discipline that fuels greatness.",
          ],
        },
        {
          type: "image-pair",
          images: [
            { src: "/images/bts/IMG_2574.jpg", alt: "BTS gym shoot, camera crew filming talent training" },
            { src: "/images/bts/set-prelight.jpg", alt: "Bathroom set with talent and crew, slider track in foreground" },
          ],
        },
        {
          type: "text-columns",
          paragraphs: [
            "We were tasked with producing a series of commercial spots for Dr Teal\u2019s featuring Aaron Donald of the Los Angeles Rams. As an elite athlete, Aaron needs to train at the highest level and recover fast to maintain the physical requirements of professional football. Our goal was to give the viewer a brief glimpse into Aaron\u2019s world and what it takes to stay on top. The concept centered on the physical demands placed on athletes like Aaron Donald and the restorative properties of\nDr Teal\u2019s Epsom Salt.",
            "We wanted to create a powerful visual narrative that blended the worlds of sports, health, and wellness in a way that would resonate with consumers. Working with an athlete who actually uses Dr Teal\u2019s products daily gave us the opportunity to build a world that was authentic to Aaron\u2019s routine. This wasn\u2019t a manufactured endorsement. It was a genuine extension of his recovery process.",
          ],
        },
        {
          type: "text",
          heading: "Design + Build",
          paragraphs: [
            "Going into production, our team began in pre-viz, designing a virtual bathroom set in Unreal Engine. We needed enough room to bring in cameras, support, and lighting while also building an environment that felt elevated and served as a natural extension of the Dr Teal\u2019s brand.",
            "Designing the set in Unreal Engine allowed our Director of Photography, Hiram Borges-Barrios, to place virtual cameras in the space before construction began. This gave us precise control over framing, lighting, and shot planning well ahead of the shoot day.",
            "From virtual to physical. Our art department brought the pre-viz to life on stage, constructing the bathroom set from the ground up. Every detail from the shelving and sconces to the plants and window dressing was designed to feel like a real, lived in space while still giving our camera and lighting teams the room they needed to work.",
          ],
        },
        {
          type: "image-pair",
          images: [
            { src: "/images/bts/UE5_1.jpg", alt: "Unreal Engine pre-viz, wide shot of virtual bathroom set design" },
            { src: "/images/bts/UE5_3.jpg", alt: "Unreal Engine pre-viz, mannequin figure in bathtub for camera angle testing" },
            { src: "/images/bts/IMG_2971.jpg", alt: "Production team member standing next to the constructed set exterior" },
            { src: "/images/bts/IMG_5626.jpg", alt: "Backside of set walls during construction, lighting rigs being positioned" },
          ],
        },
        {
          type: "text",
          heading: "The Shoot",
          paragraphs: [
            "With the set built and the pre-viz locked, our team brought Aaron\u2019s world to life on the stage. The production blended the intensity of Aaron\u2019s training environment with the calm, restorative ritual of his recovery. Two contrasting worlds unified through a single narrative arc.",
          ],
        },
        {
          type: "image-full",
          images: [
            { src: "/images/bts/dt-aaron-donald-4.jpg", alt: "Completed bathroom set with bathtub, Dr Teal\u2019s product on display, crew in position" },
          ],
        },
      ],
      awards: [
        "2022 NYX Awards, Grand Winner, Commercial & Marketing / Health & Wellness",
      ],
      credits: [
        { label: "Production Company", value: "Family Drama" },
        { label: "Client", value: "Dr Teal\u2019s" },
        { label: "Talent", value: "Aaron Donald" },
        { label: "Director of Photography", value: "Hiram Borges-Barrios" },
        { label: "Virtual Production Design", value: "Unreal Engine" },
      ],
    },
  },
  // === Featured row 3: Adyen + European Wax Center (lifestyle, warm tones) ===
  {
    id: "tap-to-pay",
    title: "Tap to Pay",
    client: "Adyen",
    director: "Greenwood",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "aJOFI38nUnV5OuoOr9Px3qer901UXY5w2pncMsKtpQsE",
    muxProjectPlaybackId: "15eUP7zo5W00fTSwV00C9013HS02EfpPFTUOQkp9zuy01gpU",
    thumbnailTime: 0,
  },
  {
    id: "european-wax-center-keep-exploring",
    title: "Keep Exploring",
    client: "European Wax Center",
    director: "Jake Rosenberg",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "ePOJaCZuGddPgv4F1vh9NU02F568LryiuT3Klvzx18Lo",
    muxProjectPlaybackId: "101SBA3ODzJQ4KAEV7TovHpc5Uak99mzSd7IeF31Jo5c",
    thumbnailTime: 0,
  },
  // === Featured row 4: Crown Royal + Ferrari MBJ (dark, luxury, warm amber/gold) ===
  {
    id: "crown-royal-chopped-and-screwed",
    title: "Chopped & Screwed",
    client: "Crown Royal",
    director: "Nate Simmons",
    image: "/images/project-2.png",
    featured: true,
    categories: ["featured", "content"],
    muxPlaybackId: "HMl3XojTjJCOU02zqPuYn7gSbiAUH4kTA5g4wU683HHE",
    muxProjectPlaybackId: "UtaxZzqtYqW5h55ZZrEABba00OfBtt3Xe6Mny4UXSlE8",
    thumbnailTime: 0,
  },
  {
    id: "ferrari-michael-b-jordan",
    title: "Michael B. Jordan",
    client: "Ferrari",
    director: "Jake Rosenberg",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "RAonU6hfNTfz00Z0229tQIDmvHFBq76nQW89bu6b58cLM",
    muxProjectPlaybackId: "CMTEClOV01b729piRjbJ3Y3hLd00uY4gFXaYzaW7Pu7aE",
    thumbnailTime: 0,
  },
  // === Featured row 5: Verizon + Zuvi (bright, people-focused, lifestyle) ===
  {
    id: "celebrate-the-magic",
    title: "Celebrate The Magic",
    client: "Verizon",
    director: "Jake Rosenberg",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "6Yfr2Fq01RvVhHMTl6z8U68wqejGv02cohN6ONNJn4wYo",
    muxProjectPlaybackId: "00PPR7YQuCCny5uCsrtH3ynYm5Z42dCzPor01H5PB200BY",
    thumbnailTime: 0,
  },
  {
    id: "zuvi-lifestyle",
    title: "Lifestyle",
    client: "Zuvi",
    director: "Jake Rosenberg",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "gUe1Kf6802BFZYh1OqmnjR01W1suTzYNxGBpNKgsG6Onc",
    muxProjectPlaybackId: "wIOyBTXPswIT02EL800yoXjWtk3gjyWRtH100jhjnYfrbk",
    thumbnailTime: 0,
  },
  // === Featured row 6: Ferrari Sedona + State of Art (cinematic, action, outdoor) ===
  {
    id: "ferrari-sedona",
    title: "Sedona",
    client: "Ferrari",
    director: "Jake Rosenberg",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "huz1f7I7hHw302Sk01cglU3dS6dPA7RW0000v02Iw6M00lG6M",
    muxProjectPlaybackId: "mkLctWKhUsGc2XngAQLr452l6qhjngT402d02AH6Ok01JU",
    thumbnailTime: 0,
  },
  {
    id: "state-of-art-the-chase",
    title: "The Chase",
    client: "State of Art",
    director: "Greenwood",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "00Fny99v4K6x5B0101ol4EYKE7VLiAV00cYR902EXh00S6H200",
    muxProjectPlaybackId: "GQ2UekTk9QBB8dL11XIqVwRlPTWFRnANIZgkfofgiDg",
    thumbnailTime: 0,
  },
  // === Featured row 7: Mackage + Orlebar Brown (fashion, clean, minimal) ===
  {
    id: "mackage-ss21",
    title: "SS21",
    client: "Mackage",
    director: "Jake Rosenberg",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "001TGE3wjb02LRo2q2bsxNIMkuuIog01fUdCjl902seNf9Q",
    muxProjectPlaybackId: "f3zkSwQ2J8uzx01M4K8llh4K8bg8s02G4NkR5Y401ZolsA",
    thumbnailTime: 0,
    directorOnly: true,
  },
  {
    id: "orlebar-brown-graphite",
    title: "Graphite",
    client: "Orlebar Brown",
    director: "Jake Rosenberg",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "uCyb9bA028Dide3MTohHvl4kGZNE8dib7EF0042emX5EE",
    muxProjectPlaybackId: "A02BH4ki4CE01uHYZKNRMZ4CO2fAOVSMyQrW4GVwJ2uGs",
    thumbnailTime: 0,
    directorOnly: true,
  },
  // === Featured row 8: Hour Glass + Beats (dark, premium, bold) ===
  {
    id: "maximilian-busser",
    title: "Maximilian B\u00fcsser",
    client: "The Hour Glass",
    director: "Greenwood",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "Ce2dHVo62qppLQb026Khie5zg6IeT63Hqv3IaLwPujic",
    muxProjectPlaybackId: "ho2JDNResHqOKXuH74L2hI01kjPB4fARvMX01KfUOdyWs",
    thumbnailTime: 0,
  },
  {
    id: "beats-by-dre-be-heard",
    title: "Be Heard",
    client: "Beats by Dre",
    director: "Ryan Bucci",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "8V00LG9VJsR5jHa00sv0001AVZhZzcsGa2v9kXfJGIMGMZ00",
    muxProjectPlaybackId: "u00oQXX5kmdwwyV9gIdq029NLmrNbwSJdkEXZPXbesPdc",
    thumbnailTime: 0,
  },
  // === Featured row 9: Vinted + Essentia (colorful, lifestyle, fresh) ===
  {
    id: "vinted-keep-searching",
    title: "Keep Searching",
    client: "Vinted",
    director: "Greenwood",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "9AKNQqdg01W9S01dckq8b02K78QWKuuSV2e01J2eFPSRcLw",
    muxProjectPlaybackId: "Lh52D1rhLrkTxuAG9ugIlPyLNOEZb02Aa7iIKvQDUeYY",
    thumbnailTime: 0,
  },
  {
    id: "essentia-water-advice",
    title: "Advice To Your Future Self",
    client: "Essentia Water",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "CN02yJ36du02TMHgr1hbYds5L0000zvmfLTsHDWOs6Sw6os",
    muxProjectPlaybackId: "JLgrZgcZ1aAaxU41hU8roEIsTvPbLpSzIpGy9paighM",
    thumbnailTime: 0,
  },
  // === Featured row 10: Dr. Teal's Soak It In (solo, warm closing) ===
  {
    id: "dr-teals-soak-it-in",
    title: "Soak It In",
    client: "Dr. Teal's",
    image: "",
    categories: ["featured", "content"],
    muxPlaybackId: "00vUl88PjuJFhYOIiE02F6Tgz8I2aZ01sJGuDjNDoqZQ2E",
    muxProjectPlaybackId: "0200YAO00N01biNOvl00dQbR7hdofj2JVTGIdgHdjrsdBFAc",
    thumbnailTime: 0,
  },
  // === Content-only projects ===
  {
    id: "together",
    title: "Together",
    client: "Bugatti",
    director: "Greenwood",
    image: "",
    categories: ["content"],
    muxPlaybackId: "aYFoM00OkX5UVzCedsb5H00ALAyaI8WIBm31plKK2IJFw",
    muxProjectPlaybackId: "lU7mmYETa9zXJ3v7RHazCnhX8y01FxQ1026pu6bzuvFVc",
    thumbnailTime: 0,
  },
  {
    id: "cowboy",
    title: "Posts From The City",
    client: "Cowboy",
    director: "Greenwood",
    image: "",
    categories: ["content"],
    muxPlaybackId: "YPq028Y1iVriWQtjGc300QzSvdY00n5n4Tf01r9SBhvzHvw",
    muxProjectPlaybackId: "8DdwKY9JLsWLfD47G9EGCs38syLNdlEmjnm69nBCOVI",
    thumbnailTime: 0,
  },
  {
    id: "jp-morgan-chase-mi-golondrina",
    title: "Mi Golondrina",
    client: "J.P. Morgan Chase",
    director: "Manahi Taber-Kewene",
    image: "",
    categories: ["content"],
    muxPlaybackId: "uBmim2oq02oJ8301YHv00BsoJWsTR8dVaURrHcwhyZv003s",
    muxProjectPlaybackId: "Zj01wmdRwbQWmKoKkVsqCZZNvEY1vq2xizkkglUdoWL8",
    thumbnailTime: 0,
  },
  {
    id: "new-balance-within-reach",
    title: "Within Reach",
    client: "New Balance",
    director: "Judd Ehrlich",
    image: "",
    categories: ["content"],
    muxPlaybackId: "HpdrfzOMrikq4w02H7Yq1KePRNZeEZ02rYPpp00s9iE017I",
    muxProjectPlaybackId: "U801NDDko2V02kx7GxT30123IfZIzbly9BWoyZLxTeGocU",
    thumbnailTime: 0,
  },
  {
    id: "shell-robots",
    title: "Shell Robots",
    client: "Shell",
    image: "",
    categories: ["content"],
    muxPlaybackId: "keovK007quxzE7Muj02Lv02O4dBioKR50013eFDTIEUw7vw",
    muxProjectPlaybackId: "eY3nynuZ02Vp00lgC3aHJKtjXTibpBbsIuSP015XpbfKHo",
    thumbnailTime: 0,
  },
];

export const newsItems: NewsItem[] = [
  {
    id: "hybrid-approach",
    source: "Forbes",
    title: "The Hybrid Approach: How Marketers Can Blend AI And Traditional Production",
    image: "/images/about-hero.png",
    link: "#",
  },
  {
    id: "5-minutes-with-dustin",
    source: "Little Black Book",
    title: "President of Tool speaks about building a new framework for commercial production and the next golden age of AI",
    image: "/images/about-abstract.png",
    link: "#",
  },
];

export const services: Service[] = [
  {
    id: "ai-consulting",
    title: "AI Consulting",
    bullets: ["Modernizing Content Workflow", "Creating Brand Specific Data Sets", "Developing A Private Network"],
    description: "Our focus is to advise brands and agencies on how to leverage AI to modernize their marketing content workflow and convert this into a bespoke web tool that can be used by the marketing department.",
    image: "/images/project-1.png",
    muxVideoId: "YtMByMlUh5xCQWHAllei6sxaRxApD021flcJ9mln7vvA",
  },
  {
    id: "ideation",
    title: "Ideation",
    bullets: ["Cultural Strategy", "Concept Development"],
    description: "We have a proven model of rapid ideation and strategy that allows us to consider creative, brand message and production logistics within a 3 week collaboration with our clients.",
    image: "/images/about-abstract.png",
  },
  {
    id: "content",
    title: "Content",
    bullets: ["Shoot Production", "Post Production", "Content Design (3D & 2D)", "AI Content & VFX Production"],
    description: "Twenty six years of creative production experience, creating long and short form branded content for some of the world's largest brands. Our range of production spans Super Bowl spots to celebrity driven content to long-form branded content.",
    image: "/images/about-content.png",
    muxVideoId: "75Ia9i67Bg022YDHoa13cBEUQWxi86W77OuyT02dYMWo4",
  },
  {
    id: "experience",
    title: "Experience",
    bullets: ["Activations", "Event Logistics", "Experiential Tech", "Live Stream Events"],
    description: "Integrating creative technologies such as AR, AI and anything that can be dreamed into IRL and digital experiences.",
    image: "/images/about-experience.png",
    muxVideoId: "Suz9ZUBQoxegDECIKhvGzyVHBQM9c02jdsM38JuH6qhE",
  },
  {
    id: "creative-technology",
    title: "Creative Technology",
    bullets: ["WebAR (8th Wall Partner)", "AI & Computer Vision", "GenAI", "LED Design & Projection Mapping"],
    description: "We have deep experience leveraging creative technology to create buzz-worthy marketing campaigns, with an internal team of technologists, combined with a world-class roster of technologists & storytellers.",
    image: "/images/project-7.png",
  },
  {
    id: "3d",
    title: "3D",
    bullets: ["3D Design & Animation", "Game Engine Development", "MetaHuman Creation", "Immersive Environments"],
    description: "Creating 3D optimized for the web and interactive experiences.",
    image: "/images/about-3d.png",
    muxVideoId: "aJOFI38nUnV5OuoOr9Px3qer901UXY5w2pncMsKtpQsE",
  },
];

export const teamMembers: TeamMember[] = [
  { name: "Nate Simmons", role: "Founder, Executive Producer", email: "nate@familydrama.tv" },
  { name: "Nick Simmons", role: "Co-Founder, Executive Producer", email: "nick@familydrama.tv" },
  { name: "Colton Gatlin", role: "Managing Director - Post Production", email: "colton@familydrama.tv" },
  { name: "Cris Rodriguez", role: "Managing Director - Content", email: "cris@familydrama.tv" },
  { name: "Sarah Garza", role: "Managing Director - Experience", email: "sarah@familydrama.tv" },
  { name: "Isabelle Wilson", role: "Head of Finance", email: "isabelle@familydrama.tv" },
];

export const offices: Office[] = [
  {
    city: "Austin",
    locations: [
      { label: "Austin", address: "1201 West 5th Street\nAustin, TX 78703", mapLink: "https://maps.google.com/?q=1201+West+5th+Street+Austin+TX+78703" },
      { label: "HQ", address: "3003 South Loop West, Suite 108\nHouston, TX 77054", mapLink: "https://maps.google.com/?q=3003+South+Loop+West+Suite+108+Houston+TX+77054" },
    ],
  },
  {
    city: "Los Angeles",
    locations: [
      { label: "Los Angeles", address: "1201 West 5th Street\nLos Angeles, CA 90017", mapLink: "https://maps.google.com/?q=1201+West+5th+Street+Los+Angeles+CA+90017" },
    ],
  },
  {
    city: "London",
    locations: [
      { label: "London", address: "1201 West 5th Street\nLos Angeles, CA 90017", mapLink: "https://maps.google.com/?q=1201+West+5th+Street+Los+Angeles+CA+90017" },
    ],
  },
];

export interface Director {
  id: string;
  name: string;
  muxPlaybackId: string;
}

export const directors: Director[] = [
  { id: "jake-rosenberg", name: "Jake Rosenberg", muxPlaybackId: "kD00BLaKnOKzRLFtGMpuczU00OdAjPCYmrvcpMwWq7mDQ" },
  { id: "greenwood", name: "Greenwood", muxPlaybackId: "kD00BLaKnOKzRLFtGMpuczU00OdAjPCYmrvcpMwWq7mDQ" },
  { id: "nate-simmons", name: "Nate Simmons", muxPlaybackId: "kD00BLaKnOKzRLFtGMpuczU00OdAjPCYmrvcpMwWq7mDQ" },
  { id: "sarah-garza", name: "Sarah Garza", muxPlaybackId: "kD00BLaKnOKzRLFtGMpuczU00OdAjPCYmrvcpMwWq7mDQ" },
  { id: "chris-strong", name: "Chris Strong", muxPlaybackId: "kD00BLaKnOKzRLFtGMpuczU00OdAjPCYmrvcpMwWq7mDQ" },
];

export function getProjectsByDirector(directorName: string): Project[] {
  return projects.filter((p) => p.director?.toLowerCase() === directorName.toLowerCase());
}

export const salesReps = [
  {
    region: "West",
    members: [
      { name: "Marcus Torelli", role: "Content", phone: "(310) 686-6006", email: "sales@familydrama.tv" },
      { name: "Lena Hartwell", role: "Experience", phone: "(917) 373-5658", email: "sales@familydrama.tv" },
    ],
  },
  {
    region: "Mid West",
    members: [
      { name: "Jordan Kessler", role: "Content & Experience", phone: "(646) 361-0933", email: "sales@familydrama.tv" },
    ],
  },
  {
    region: "East",
    members: [
      { name: "Elena Marsh", role: "Content", phone: "(917) 237 6532", email: "sales@familydrama.tv" },
      { name: "David Cho", role: "Content", phone: "(917) 593 6577", email: "sales@familydrama.tv" },
      { name: "Nina Castillo", role: "Experience", phone: "(917) 733 4765", email: "sales@familydrama.tv" },
    ],
  },
];
