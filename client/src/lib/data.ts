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
  homeImage?: string;
  homeVideoLoop?: boolean;
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

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; caption?: string }
  | { type: "subheading"; text: string };

export interface NewsItem {
  id: string;
  source: string;
  title: string;
  image: string;
  link: string;
  date: string;
  category?: string;
  isExternal?: boolean;
  subtitle?: string;
  author?: string;
  externalUrl?: string;
  body?: ArticleBlock[];
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
    director: "Peter King",
    image: "",
    homeImage: "/images/home/lego-play-unstoppable.jpg",
    categories: ["featured", "content"],
    muxPlaybackId: "YtMByMlUh5xCQWHAllei6sxaRxApD021flcJ9mln7vvA",
    muxProjectPlaybackId: "vQMV101BNy8k5iiFv2EhM9wLLU0064100bSPvhMkNCYPTI",
    thumbnailTime: 0,
  },
  {
    id: "toyota-survivor",
    title: "Survivor",
    client: "Toyota",
    director: "William Fradette",
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
    director: "Nate Simmons",
    image: "",
    homeVideoLoop: true,
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
    title: "Grit & Glory",
    client: "Journey To The Draft",
    image: "",
    homeImage: "/images/home/tap-to-pay.jpg",
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
    homeImage: "/images/home/crown-royal-chopped-screwed.jpg?v=2",
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
    homeVideoLoop: true,
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
    director: "Nate Simmons",
    image: "",
    homeVideoLoop: true,
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
    homeVideoLoop: true,
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
    id: "chris-strong-joins",
    source: "Family Drama",
    title: "Family Drama Welcomes Director Chris Strong to its US Commercial Roster",
    image: "/images/chris-strong-bolt.jpg",
    link: "/news/chris-strong-joins",
    date: "March 12, 2026",
    category: "Family Drama",
    subtitle: "Award-winning director Chris Strong joins Family Drama for US commercial representation, bringing his dynamic visual style and diverse media experience to the roster.",
    body: [
      { type: "paragraph", text: "Family Drama is thrilled to announce the addition of award-winning director Chris Strong to its roster for US commercial representation. Known for his dynamic and visually striking films, Chris brings a wealth of experience spanning a diverse range of media, including commercials, branded content, AR/VR, music videos, and experiential media." },
      { type: "paragraph", text: "With a portfolio that boasts work for top-tier brands and recognition from prestigious award shows, including two Cannes Lions and two London International Awards, Chris's innovative approach to filmmaking blends artistry with strategic insight. His ability to craft compelling narratives across location-based shoots, animation, and post-production makes him a perfect fit for Family Drama's expanding team of creative talent." },
      { type: "paragraph", text: "\"We are incredibly excited to welcome Chris to the FD family, his wealth of experience and vision positions Family Drama to uniquely serve our clients globally.\" says Nate Simmons, Founder & Executive Producer. \"His ability to push creative boundaries and deliver fresh, vibrant content aligns perfectly with our vision to create work that resonates with audiences across all platforms and grow this division through 2025.\"" },
      { type: "paragraph", text: "From big-brand campaigns to immersive experiences, Chris's work demonstrates his versatility and keen eye for detail. His unique directorial style is sure to elevate the commercial offerings Family Drama provides to clients in the US. \"I'm so excited to join forces with the folks over at Family Drama. I'm really looking forward to us creating some amazing work together!\" says Chris Strong. We look forward to seeing the incredible work that Chris will create with us in the future." },
    ],
  },
  {
    id: "nyx-award-dr-teals",
    source: "NYX Awards",
    title: "Celebrating Our Grand Prize Win at NYX Awards with Dr Teal's x Aaron Donald Campaign",
    image: "/images/dr-teals-aaron-donald.jpg",
    link: "/news/nyx-award-dr-teals",
    date: "March 11, 2026",
    category: "NYX Awards",
    isExternal: true,
    subtitle: "Family Drama's Dr. Teal's campaign featuring Aaron Donald takes home the Grand Prize at the NYX Awards.",
    externalUrl: "https://nyxawards.com/winner-info.php?id=5125",
    body: [
      { type: "paragraph", text: "Family Drama is proud to celebrate a Grand Prize win at the NYX Awards for our Dr. Teal's x Aaron Donald campaign. The recognition honors the team's work bringing together one of the NFL's most dominant players and one of the most beloved wellness brands in a campaign that combined athletic intensity with authentic storytelling." },
      { type: "paragraph", text: "The NYX Awards recognize excellence in marketing, advertising, and communications across a broad range of categories. Earning the Grand Prize is a testament to the creative vision of our directors and the collaborative spirit between Family Drama, Dr. Teal's, and Aaron Donald's team." },
    ],
  },
  {
    id: "grit-glory-si",
    source: "Sports Illustrated",
    title: "Sports Illustrated spotlights Grit & Glory: Journey To The Draft",
    image: "/images/grit-glory-si.jpg",
    link: "/news/grit-glory-si",
    date: "March 10, 2026",
    category: "Sports Illustrated",
    isExternal: true,
    subtitle: "Sports Illustrated covers Family Drama's exclusive docuseries following Bo Nix's path from Oregon to the Denver Broncos.",
    externalUrl: "https://www.si.com/college/oregon/football/bo-nix-nfl-draft-exclusive-docuseries-denver-broncos-dan-lanning",
    body: [
      { type: "paragraph", text: "Sports Illustrated spotlights Grit & Glory: Journey To The Draft, the exclusive docuseries produced by Family Drama that chronicled Bo Nix's remarkable path from his final season at Oregon through the NFL Draft and into his rookie year with the Denver Broncos." },
      { type: "paragraph", text: "The series, which also featured Oregon head coach Dan Lanning, offered an unprecedented inside look at the highs and lows of the draft process — from All-American performances on the field to the high-stakes waiting game of draft night." },
      { type: "paragraph", text: "The Sports Illustrated feature highlights how Family Drama's documentary approach brought authentic storytelling to the world of college and professional football, capturing moments that went far beyond traditional sports coverage." },
    ],
  },
  {
    id: "grit-glory-prnewswire",
    source: "PR Newswire",
    title: "Family Drama Announces Original Series with Quarterback Bo Nix \"Grit & Glory: Journey To The Draft\"",
    image: "/images/grit-glory-promo.jpg",
    link: "/news/grit-glory-prnewswire",
    date: "March 8, 2026",
    category: "PR Newswire",
    isExternal: true,
    subtitle: "Family Drama launches an exclusive documentary series following collegiate quarterback Bo Nix as he prepares for the NFL Draft.",
    externalUrl: "https://www.prnewswire.com/news-releases/bolt-tv-announces-original-series-with-quarterback-bo-nix-grit--glory-journey-to-the-draft-302129545.html",
    body: [
      { type: "paragraph", text: "Family Drama is thrilled to announce the launch of its original documentary series with Quarterback Bo Nix \"Grit & Glory: Journey To The Draft\", directed by Nate Simmons and produced by Family Drama. The series offers an exclusive inside look into the life of collegiate quarterback Bo Nix as he prepares for the biggest night of his career: the NFL Draft." },
    ],
  },
  {
    id: "hybrid-approach",
    source: "Forbes",
    title: "The Hybrid Approach: How Marketers Can Blend AI And Traditional Production",
    image: "/images/about-hero-small.jpg",
    link: "/news/hybrid-approach",
    date: "March 5, 2026",
    category: "Forbes",
    isExternal: true,
    subtitle: "Family Drama's leadership weighs in on the future of blending artificial intelligence with traditional production craft.",
    author: "James Mitchell",
    externalUrl: "https://forbes.com",
    body: [
      { type: "paragraph", text: "As the advertising industry grapples with the rapid evolution of AI-powered tools, production companies are finding themselves at a crossroads. The question is no longer whether to adopt AI, but how to integrate it meaningfully without sacrificing the human touch that makes great creative work resonate." },
      { type: "paragraph", text: "Family Drama, founded by Nick and Nate Simmons, has been at the forefront of this conversation. The Houston-based production company has developed a hybrid workflow that leverages AI for pre-visualization, logistics planning, and post-production efficiency while keeping human directors, cinematographers, and producers at the creative helm." },
      { type: "paragraph", text: "\"The magic happens when you let AI handle the repetitive, time-consuming tasks and free up your creative team to focus on what they do best — telling stories that move people,\" says Nick Simmons. \"We're not replacing anyone. We're amplifying everyone.\"" },
    ],
  },
  {
    id: "5-minutes-with-dustin",
    source: "Little Black Book",
    title: "Family Drama speaks about building a new framework for commercial production and the next golden age of AI",
    image: "/images/about-abstract.jpg",
    link: "/news/5-minutes-with-dustin",
    date: "February 20, 2026",
    category: "Little Black Book",
    isExternal: true,
    subtitle: "An in-depth conversation about the evolving production landscape and what comes next.",
    author: "Laura Chen",
    externalUrl: "https://lbbonline.com",
    body: [
      { type: "paragraph", text: "In a wide-ranging interview with Little Black Book, Family Drama's leadership discusses the company's evolution from a traditional production house to a multi-disciplinary creative studio that spans branded content, documentaries, and live experiences." },
      { type: "paragraph", text: "The conversation touches on the challenges of scaling production without losing creative integrity, the importance of nurturing emerging directorial talent, and why the next five years could represent a golden age for production companies willing to embrace change." },
      { type: "paragraph", text: "\"We're building something intentionally different,\" the team explains. \"Where projects are personal, clients are family, and content should be remembered. That philosophy guides every decision we make.\"" },
    ],
  },
  {
    id: "future-of-production",
    source: "Shots",
    title: "Inside the studio redefining what it means to produce at scale",
    image: "/images/about-production-1.jpg",
    link: "/news/future-of-production",
    date: "February 12, 2026",
    category: "Shots",
    subtitle: "Family Drama's approach to production challenges conventional wisdom about what a modern studio can achieve.",
    author: "Marcus Webb",
    body: [
      { type: "paragraph", text: "Walk into Family Drama's studio and the first thing you'll notice is the energy. It's not the frantic, deadline-driven chaos you might expect from a production company juggling dozens of simultaneous projects. Instead, there's a deliberate calm — a confidence that comes from having systems that actually work." },
      { type: "image", src: "/images/about-production-2.jpg", caption: "Family Drama's production facility in Houston" },
      { type: "subheading", text: "Scaling Without Sacrificing" },
      { type: "paragraph", text: "The company's secret isn't a single innovation but rather a philosophy of intentional growth. Every new project, every new client relationship, every new hire is evaluated against a simple question: does this make our work better?" },
      { type: "paragraph", text: "\"Scale for its own sake doesn't interest us,\" says co-founder Nick Simmons. \"We've turned down projects that would have doubled our revenue because they didn't align with the kind of work we want to be known for. That discipline is what lets us maintain quality while still growing.\"" },
      { type: "image", src: "/images/about-content.jpg", caption: "Behind the scenes on a recent branded content shoot" },
      { type: "subheading", text: "The Team Behind the Work" },
      { type: "paragraph", text: "Central to Family Drama's model is its roster of directors. Rather than maintaining a sprawling list of names, the company keeps its roster tight and intentional, investing deeply in each director's development and ensuring every project is matched with the right creative voice." },
      { type: "paragraph", text: "The result is work that consistently feels personal, even when produced at the scale demanded by Fortune 500 clients. It's a balancing act that few production companies manage to pull off, and it's what makes Family Drama one of the most compelling studios working today." },
    ],
  },
  {
    id: "creative-innovation-awards",
    source: "LBB Online",
    title: "Family Drama wins Creative Innovation Award for groundbreaking campaign work",
    image: "/images/about-content.jpg",
    link: "/news/creative-innovation-awards",
    date: "January 28, 2026",
    category: "LBB Online",
    isExternal: true,
    subtitle: "The production company is recognized for pushing boundaries in branded content and commercial storytelling.",
    author: "Sophie Alvarez",
    externalUrl: "https://lbbonline.com",
    body: [
      { type: "paragraph", text: "Family Drama has been awarded the Creative Innovation Award at the annual LBB Online ceremony, recognizing the production company's boundary-pushing work across branded content, commercial spots, and experiential campaigns throughout the past year." },
      { type: "paragraph", text: "The judges cited the company's ability to consistently deliver work that blends cinematic craft with strategic thinking, noting several campaigns that achieved both viral cultural impact and measurable business results for clients." },
      { type: "paragraph", text: "\"This recognition belongs to our entire team — our directors, our producers, and the clients who trust us to push creative boundaries,\" said the team in a statement. \"We're just getting started.\"" },
    ],
  },
  {
    id: "ai-commercial-landscape",
    source: "Ad Age",
    title: "How AI is reshaping the commercial production landscape in 2026",
    image: "/images/about-experience.jpg",
    link: "/news/ai-commercial-landscape",
    date: "January 15, 2026",
    category: "Ad Age",
    isExternal: true,
    subtitle: "Family Drama's innovative experiences and bold approach strike a chord with brands.",
    author: "Arvelisse Bonilla Ramos",
    externalUrl: "https://adage.com",
    body: [
      { type: "paragraph", text: "AI was a major focus for Family Drama in 2025, as the production company launched a consulting service that works with brands and agencies to modernize their marketing content creation workflow with AI." },
      { type: "image", src: "/images/about-experience.jpg", caption: "Family Drama's experiential production work" },
      { type: "paragraph", text: "AI was also central to brand projects, which invited consumers to create their own personalized content experiences, made possible by Family Drama's custom AI pipeline, game engine layers, and virtual production." },
      { type: "paragraph", text: "Along with employing creative technology, Family Drama also made some standout content pieces, many of which leaned into humor and cultural relevance — a hallmark of the company's directorial roster." },
    ],
  },
  {
    id: "director-spotlight-colton",
    source: "Shots",
    title: "Director Spotlight: Colton Gatlin on blending cinematic storytelling with digital craft",
    image: "/images/colton-gatlin.jpg",
    link: "/news/director-spotlight-colton",
    date: "January 8, 2026",
    category: "Shots",
    subtitle: "The Family Drama director discusses his creative process and the evolving relationship between narrative and technology.",
    author: "Rachel Torres",
    body: [
      { type: "paragraph", text: "Colton Gatlin doesn't think of himself as a \"commercial director.\" He thinks of himself as a storyteller who happens to work primarily in the branded content space — a distinction that, while subtle, profoundly shapes the work he produces." },
      { type: "image", src: "/images/colton-gatlin.jpg", caption: "Director Colton Gatlin" },
      { type: "subheading", text: "Finding the Human Moment" },
      { type: "paragraph", text: "\"Every brief, no matter how corporate, has a human moment hiding inside it,\" Gatlin explains from his home office, surrounded by stacks of film reference books and a conspicuous absence of advertising awards. \"My job is to find that moment and build everything around it.\"" },
      { type: "paragraph", text: "It's an approach that has made Gatlin one of the most sought-after directors on Family Drama's roster. His work spans everything from documentary-style brand films to high-energy commercial spots, but it's all unified by a commitment to authentic human connection." },
      { type: "subheading", text: "The Digital Craft Evolution" },
      { type: "paragraph", text: "For Gatlin, technology isn't a replacement for traditional filmmaking — it's an expansion of the toolkit. He was one of the first directors at Family Drama to incorporate LED volume stages into his workflow, using virtual production not for spectacle but for subtle environmental storytelling." },
      { type: "paragraph", text: "\"The best use of technology in filmmaking is when the audience doesn't even notice it,\" he says. \"If someone watches one of my spots and thinks 'wow, great VFX,' I've failed. If they watch it and feel something, and only later realize the backdrop was virtual — that's the sweet spot.\"" },
      { type: "image", src: "/images/about-production-1.jpg", caption: "On set during a recent campaign shoot" },
      { type: "paragraph", text: "Looking ahead, Gatlin is excited about the intersection of AI-assisted pre-visualization and traditional cinematography. \"We're entering an era where a director can sketch an entire film in their mind, translate it through AI tools, and then bring a crew together to execute something even better than what they imagined. The human element doesn't go away — it gets supercharged.\"" },
    ],
  },
  {
    id: "billion-views-milestone",
    source: "The Drum",
    title: "Family Drama crosses one billion views milestone across digital campaigns",
    image: "/images/billion-views.jpg",
    link: "/news/billion-views-milestone",
    date: "December 18, 2025",
    category: "The Drum",
    isExternal: true,
    subtitle: "The production company's digital-first approach to branded content has generated unprecedented reach.",
    author: "Daniel Park",
    externalUrl: "https://thedrum.com",
    body: [
      { type: "paragraph", text: "Family Drama has quietly crossed a significant milestone: one billion cumulative views across its digital campaigns. The achievement reflects the production company's strategic pivot toward content designed specifically for digital platforms, rather than simply repurposing broadcast spots." },
      { type: "paragraph", text: "The billion-view mark was reached through a combination of branded content series, social-first campaigns, and interactive digital experiences produced for clients including major Fortune 500 brands across consumer goods, technology, and entertainment." },
      { type: "paragraph", text: "\"Views are just one metric, but reaching a billion tells us something important — the content we're making is resonating with real audiences, not just winning awards,\" the team shared. \"That's always been the goal.\"" },
    ],
  },
  {
    id: "production-innovation",
    source: "Shots",
    title: "The new production playbook: Why traditional agencies are rethinking their approach",
    image: "/images/about-production-2.jpg",
    link: "/news/production-innovation",
    date: "December 5, 2025",
    category: "Shots",
    subtitle: "How Family Drama is pioneering a new model that blurs the line between production company and creative agency.",
    author: "James Webb",
    body: [
      { type: "paragraph", text: "The traditional advertising model — agency conceives, production company executes — is fracturing. And companies like Family Drama are both a cause and a beneficiary of that shift." },
      { type: "subheading", text: "Beyond Execution" },
      { type: "paragraph", text: "Founded by Nick and Nate Simmons, Family Drama has always operated with a different philosophy than most production companies. Rather than positioning themselves purely as execution partners, they've built a team capable of contributing at every stage of the creative process — from strategy and concept development through production and post." },
      { type: "image", src: "/images/about-services-photo.jpg", caption: "The Family Drama team at work" },
      { type: "paragraph", text: "\"The old model assumed that creativity lived exclusively in one building and craft lived in another,\" explains the team. \"But the best work happens when those things aren't separated. When the people making the content are also thinking about why the content needs to exist.\"" },
      { type: "subheading", text: "A Model for the Future" },
      { type: "paragraph", text: "This approach has attracted a growing list of clients who are looking for production partners that can do more than just execute a pre-approved storyboard. They want collaborators who can challenge assumptions, propose unexpected solutions, and deliver work that performs across multiple platforms and formats." },
      { type: "paragraph", text: "The results speak for themselves: over one billion views generated, 40+ Fortune 500 client partnerships, and a creative reputation that continues to grow. For an industry in transition, Family Drama offers a compelling blueprint for what comes next." },
      { type: "image", src: "/images/about-production-1.jpg", caption: "Production in progress" },
    ],
  },
  {
    id: "virtual-production-studio",
    source: "Variety",
    title: "Inside Family Drama's approach to virtual production and what it means for the industry",
    image: "/images/about-abstract-1.jpg",
    link: "/news/virtual-production-studio",
    date: "November 20, 2025",
    category: "Variety",
    isExternal: true,
    subtitle: "The production company's investment in virtual production technology is paying dividends for clients and directors alike.",
    author: "Emily Zheng",
    externalUrl: "https://variety.com",
    body: [
      { type: "paragraph", text: "Virtual production has been one of the most talked-about developments in filmmaking over the past several years, but for many production companies, the promise has outpaced the reality. Family Drama is among a small group of studios that have managed to make the technology work practically and economically for branded content." },
      { type: "paragraph", text: "The company's approach to virtual production emphasizes flexibility over spectacle. Rather than building a single, massive LED volume stage, they've developed a modular system that can be scaled up or down depending on the project's needs and budget." },
      { type: "paragraph", text: "\"Virtual production isn't a one-size-fits-all solution,\" the team explains. \"Sometimes you need a full LED volume, sometimes you need a single panel for interactive lighting. We've built our capabilities to meet clients wherever they are.\"" },
    ],
  },
  {
    id: "talent-pipeline",
    source: "Shots",
    title: "Building the next generation of directors: How Family Drama nurtures emerging creative talent",
    image: "/images/about-services-photo.jpg",
    link: "/news/talent-pipeline",
    date: "November 8, 2025",
    category: "Shots",
    subtitle: "A look inside the production company's unique approach to director development and roster building.",
    author: "Michael Torres",
    body: [
      { type: "paragraph", text: "In an industry where directors are often treated as interchangeable commodities, Family Drama has built its reputation on doing the opposite. The company's roster is deliberately small, and its commitment to each director is deliberately deep." },
      { type: "subheading", text: "The Development Philosophy" },
      { type: "paragraph", text: "\"We don't sign directors to fill slots,\" explains co-founder Nick Simmons. \"Every director on our roster represents a creative voice we believe in. And once they're part of the family, we invest in them — not just in terms of business development, but in terms of creative growth.\"" },
      { type: "image", src: "/images/about-hero-small.jpg", caption: "Family Drama's directors bring diverse perspectives to every project" },
      { type: "paragraph", text: "That investment takes many forms. For emerging directors, it might mean funding passion projects that stretch their creative muscles. For established directors, it might mean facilitating collaborations with other artists, technologists, or storytellers outside the advertising world." },
      { type: "subheading", text: "Diversity of Voice" },
      { type: "paragraph", text: "Central to Family Drama's roster philosophy is diversity — not just demographic diversity, but diversity of creative perspective. The company actively seeks directors whose work challenges conventions and brings fresh viewpoints to commercial storytelling." },
      { type: "paragraph", text: "\"The brands we work with are trying to reach real, diverse audiences,\" Simmons notes. \"To do that authentically, you need directors who bring genuinely different perspectives to the work. That's not a checkbox exercise — it's a creative imperative.\"" },
      { type: "image", src: "/images/about-abstract.jpg", caption: "Creative development session" },
      { type: "paragraph", text: "The approach has paid off. Family Drama's directors have collectively generated over a billion views, won numerous industry awards, and built lasting relationships with clients who return again and again — not for the company name on the door, but for the specific creative voices behind the camera." },
    ],
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
    image: "/images/about-abstract.jpg",
  },
  {
    id: "content",
    title: "Content",
    bullets: ["Shoot Production", "Post Production", "Content Design (3D & 2D)", "AI Content & VFX Production"],
    description: "Twenty six years of creative production experience, creating long and short form branded content for some of the world's largest brands. Our range of production spans Super Bowl spots to celebrity driven content to long-form branded content.",
    image: "/images/about-content.jpg",
    muxVideoId: "75Ia9i67Bg022YDHoa13cBEUQWxi86W77OuyT02dYMWo4",
  },
  {
    id: "experience",
    title: "Experience",
    bullets: ["Activations", "Event Logistics", "Experiential Tech", "Live Stream Events"],
    description: "Integrating creative technologies such as AR, AI and anything that can be dreamed into IRL and digital experiences.",
    image: "/images/about-experience.jpg",
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
    image: "/images/about-3d.jpg",
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
  { id: "jake-rosenberg", name: "Jake Rosenberg", muxPlaybackId: "93HWnl2uR8DZJpoxn25SJiIvRPyL6FvmfnXbXdz01UxE" },
  { id: "greenwood", name: "Greenwood", muxPlaybackId: "kD00BLaKnOKzRLFtGMpuczU00OdAjPCYmrvcpMwWq7mDQ" },
  { id: "nate-simmons", name: "Nate Simmons", muxPlaybackId: "kD00BLaKnOKzRLFtGMpuczU00OdAjPCYmrvcpMwWq7mDQ" },
  { id: "sarah-garza", name: "Sarah Garza", muxPlaybackId: "kD00BLaKnOKzRLFtGMpuczU00OdAjPCYmrvcpMwWq7mDQ" },
  { id: "chris-strong", name: "Chris Strong", muxPlaybackId: "ZSEuY14DakxT1c1jomp7yEpori02q5txUnUtHmGcGq9A" },
];

export function getProjectsByDirector(directorName: string): Project[] {
  return projects.filter((p) => p.director?.toLowerCase() === directorName.toLowerCase());
}

export const salesReps = [
  {
    region: "West",
    members: [
      { name: "Marcus Torelli", role: "Content", email: "sales@familydrama.tv" },
      { name: "Lena Hartwell", role: "Experience", email: "sales@familydrama.tv" },
    ],
  },
  {
    region: "Mid West",
    members: [
      { name: "Jordan Kessler", role: "Content & Experience", email: "sales@familydrama.tv" },
    ],
  },
  {
    region: "East",
    members: [
      { name: "Elena Marsh", role: "Content", email: "sales@familydrama.tv" },
      { name: "David Cho", role: "Content", email: "sales@familydrama.tv" },
      { name: "Nina Castillo", role: "Experience", email: "sales@familydrama.tv" },
    ],
  },
];
