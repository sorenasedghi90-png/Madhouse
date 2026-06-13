import { Stream, Creator, Category, SuccessStory, FAQItem, CareerRole, BlogPost, MonetizationChannel, ComparisonRow } from "./types";

export const STREAMS_DATA: Stream[] = [
  {
    id: "str_1",
    creatorName: "Aria_Code",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    title: "🚀 Rewriting my custom 3D game engine from scratch! | TypeScript & Rust",
    category: "Technology",
    viewers: 14500,
    tags: ["Programming", "Rust", "TypeScript", "NoBackseat"],
    duration: "02:44:11",
    isPrime: true
  },
  {
    id: "str_2",
    creatorName: "Vortex_Gaming",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    title: "🏆 MADHOUSE CHAMPIONSHIPS Grand Finals - LIVE from London!",
    category: "Gaming",
    viewers: 89400,
    tags: ["FPS", "Tournament", "DropsOn", "Clips"],
    duration: "04:12:05",
    isPrime: true
  },
  {
    id: "str_3",
    creatorName: "SynthWave_Max",
    creatorAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200",
    title: "🎹 Live improvisational cyberpunk synths and visual coding vibes",
    category: "Music",
    viewers: 5200,
    tags: ["LiveMusic", "Chill", "Ambient", "Creative"],
    duration: "01:15:30",
    isPrime: false
  },
  {
    id: "str_4",
    creatorName: "Neon_Chef",
    creatorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    title: "🍜 Making authentic hand-pulled noodles with custom neon spices!",
    category: "IRL",
    viewers: 7100,
    tags: ["Cooking", "ASMR", "Chatting", "Food"],
    duration: "03:02:45",
    isPrime: false
  },
  {
    id: "str_5",
    creatorName: "Pixel_Pulse",
    creatorAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200",
    title: "🎨 Designing interactive streaming overlays for the community with Figma",
    category: "Creative Arts",
    viewers: 3200,
    tags: ["Design", "UIUX", "Figma", "Cozy"],
    duration: "00:45:10",
    isPrime: false
  },
  {
    id: "str_6",
    creatorName: "Chronos_Talks",
    creatorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    title: "🎙️ Episode 144: The Future of Streamer Monetization & WebRTC Protocol",
    category: "Podcasts",
    viewers: 12500,
    tags: ["TechTalk", "Interviews", "CreatorEconomy", "Insight"],
    duration: "01:50:00",
    isPrime: true
  },
  {
    id: "str_7",
    creatorName: "Clutch_Queen",
    creatorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    title: "🎯 Ranking up to VALORANT Immortal or bust! 14 Hours Marathon!",
    category: "Gaming",
    viewers: 22800,
    tags: ["FPS", "Competitive", "SoloQueue", "Ranked"],
    duration: "08:12:14",
    isPrime: true
  },
  {
    id: "str_8",
    creatorName: "Astro_Astrof",
    creatorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    title: "🌌 Telescope streams: Capturing the Ring Nebula live from Chile desert",
    category: "Education",
    viewers: 9400,
    tags: ["Space", "Telescope", "Science", "Engaging"],
    duration: "05:33:12",
    isPrime: false
  }
];

export const CREATORS_DATA: Creator[] = [
  {
    id: "cre_1",
    name: "Aria_Code",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
    bio: "Full-stack software engineer specialized in low-level systems and graphics APIs. Streaming dynamic code exploration and engine engineering.",
    followers: 124000,
    subscribers: 4200,
    category: "Technology",
    views: 4200000,
    hoursStreamed: 1350,
    isPartner: true,
    tags: ["Rust", "WGPU", "TypeScript", "Linux"],
    socials: { twitter: "@aria_code", discord: "aria.code/discord", youtube: "@ariacodes" },
    schedule: [
      { day: "Monday", time: "18:00 UTC", title: "Rust Optimization Deep-Dive" },
      { day: "Wednesday", time: "18:00 UTC", title: "Developing a Custom UI Toolkit" },
      { day: "Friday", time: "20:00 UTC", title: "Retro Code Reconstruction Stream" }
    ]
  },
  {
    id: "cre_2",
    name: "Clutch_Queen",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    banner: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1000",
    bio: "Competitive FPS enthusiast. Redefining what high-level gameplay and strategic shooter analysis look like in the community.",
    followers: 480000,
    subscribers: 11200,
    category: "Gaming",
    views: 18400000,
    hoursStreamed: 3200,
    isPartner: true,
    tags: ["VALORANT", "ApexLegends", "FPS", "AimTraining"],
    socials: { twitter: "@clutch_q", discord: "clutchqueen", instagram: "@clutch_q" },
    schedule: [
      { day: "Tuesday", time: "16:00 UTC", title: "Immortal Rank Sprint" },
      { day: "Thursday", time: "16:00 UTC", title: "Subscriber Custom Tournaments" },
      { day: "Saturday", time: "14:00 UTC", title: "Apex Ranked Climbs" }
    ]
  },
  {
    id: "cre_3",
    name: "SynthWave_Max",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200",
    banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000",
    bio: "Ambient multi-instrumentalist fusing modular synths with algorithmic neon art. Relax, study, or write code with me.",
    followers: 82000,
    subscribers: 2800,
    category: "Music",
    views: 1100000,
    hoursStreamed: 890,
    isPartner: true,
    tags: ["Synthesizer", "Ambient", "Chill", "VisualArt"],
    socials: { twitter: "@synthwavematic", youtube: "@synthwave_max" },
    schedule: [
      { day: "Wednesday", time: "21:00 UTC", title: "Modular Synthesizer Building Block Jam" },
      { day: "Sunday", time: "20:00 UTC", title: "Late Night Chill Code Companion Soundtrack" }
    ]
  }
];

export const CATEGORIES_DATA: Category[] = [
  {
    id: "cat_1",
    name: "Gaming",
    icon: "Gamepad2",
    viewers: 642000,
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=500",
    color: "#8B5CF6", // Purple
    description: "Battle Royales, competitive shooters, RPGs, and indie speedruns."
  },
  {
    id: "cat_2",
    name: "Music",
    icon: "Music",
    viewers: 125000,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=500",
    color: "#EC4899", // Pink
    description: "Live sets, song engineering, modular synths, and jam sessions."
  },
  {
    id: "cat_3",
    name: "Sports",
    icon: "Trophy",
    viewers: 98000,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=500",
    color: "#3B82F6", // Blue
    description: "Esports tournaments, physical workout routines, and match analysis."
  },
  {
    id: "cat_4",
    name: "Podcasts",
    icon: "Radio",
    viewers: 184000,
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=500",
    color: "#10B981", // Emerald
    description: "Tech panels, casual chats, game dev interviews, and roundtables."
  },
  {
    id: "cat_5",
    name: "Education",
    icon: "BookOpen",
    viewers: 45000,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=500",
    color: "#F59E0B", // Amber
    description: "Science experiments, math breakdowns, celestial feeds, and history."
  },
  {
    id: "cat_6",
    name: "IRL",
    icon: "MapPin",
    viewers: 210000,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=500",
    color: "#6366F1", // Indigo
    description: "Outdoor expeditions, cooking sessions, real-life interactions, and vlogs."
  },
  {
    id: "cat_7",
    name: "Technology",
    icon: "Code",
    viewers: 89000,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=500",
    color: "#14B8A6", // Teal
    description: "Software engineering, game dev, cybersecurity hacking, and electronics."
  },
  {
    id: "cat_8",
    name: "Creative Arts",
    icon: "Palette",
    viewers: 54000,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=500",
    color: "#EF4444", // Red
    description: "Digital painting, clay sculpting, overlay design, and pixel crafting."
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "story_1",
    name: "AlphaCoder",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    subscribers: "14.2K Paid Member Subs",
    revenueGrowth: "+240% vs. Twitch",
    communityGrowth: "65,000 active Discord members",
    quote: "MADHOUSE literally saved my streaming career. On other portals, I was giving up 50% of subscriber revenue and receiving almost zero search exposure. MADHOUSE gives me a 90% split, built-in community bulletin boards, and actually serves my live feed to people looking for coding content.",
    banner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "story_2",
    name: "Clutch_Queen",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    subscribers: "28,500 Supporters",
    revenueGrowth: "6-figure sponsorships",
    communityGrowth: "Madhouse partner of the year",
    quote: "The interactive engagement widgets are a game changer. My audience isn't just watching me land headshots; they are triggers for live stream visual integrations, voice lines, and interactive alerts. Our community is 5 times as loyal and energetic as before.",
    banner: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "story_3",
    name: "SynthWave_Max",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200",
    subscribers: "8.1K Subs",
    revenueGrowth: "+180% Year on Year",
    communityGrowth: "Ambient chart leader",
    quote: "As a live musician, sound staging is vital. MADHOUSE's 320kbps high-fidelity audio codec allows my listeners to hear pure modular resonance, not compressed metallic artifacting. Tips and digital collectables integrations let me live off my art comfortably.",
    banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000"
  }
];

export const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: "Creator Sub Revenue Share Split",
    madhouse: "90% Creator / 10% Platform",
    twitch: "50% Creator / 50% Split",
    youtube: "70% Creator / 30% Split",
    kick: "95% Creator / 5% Split"
  },
  {
    feature: "Built-In Audience Analytics Feed",
    madhouse: "Advanced Real-Time & Predictive AI",
    twitch: "Basic Post-Stream Report",
    youtube: "Advanced but delayed 24 hours",
    kick: "Extremely simplified stats"
  },
  {
    feature: "Interactive Stream Widgets & Overlays",
    madhouse: "Native (Zero-Delay WebSocket Integration)",
    twitch: "Requires third-party API solutions",
    youtube: "Requires third-party overlays",
    kick: "No native widgets support"
  },
  {
    feature: "Direct-to-Viewer Channel Store Integration",
    madhouse: true,
    twitch: false,
    youtube: false,
    kick: false
  },
  {
    feature: "Payout Processing Frequency",
    madhouse: "Immediate (Under 24 Hours via Stripe/Crypto)",
    twitch: "Net-15 days processing delay",
    youtube: "Monthly billing frequency style",
    kick: "Net-15 days billing"
  },
  {
    feature: "Search Discovery Engine Support",
    madhouse: "Algorithmic recommendations optimized for smaller creators",
    twitch: "Highly saturated, winner-take-all scroll",
    youtube: "Over-reliant on pre-recorded video SEO",
    kick: "Standard viewers-high-to-low ranking list"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq_1",
    question: "What is the MADHOUSE subscription revenue share split?",
    answer: "MADHOUSE operates on a creator-first 90/10 revenue model. This means you retain exactly 90% of all paid subscription income, custom subscriber renewals, and tier badges, excluding payment processing network fees. Compared to traditional channels that capture 30% to 50% of your earnings, MADHOUSE maximizes your direct financial gains.",
    category: "creators"
  },
  {
    id: "faq_2",
    question: "What are the requirements to qualify for the MADHOUSE Partner Program?",
    answer: "We welcome passionate broadcasters. Our requirements focus on engagement rather than absolute numbers: average at least 25 concurrent viewers, broadcast for a minimum of 15 hours across 7 unique days in the last 30 days, and maintain a respectful, positive vibe in line with our Community Standards.",
    category: "creators"
  },
  {
    id: "faq_3",
    question: "When and how are payouts processed?",
    answer: "MADHOUSE supports Ultra-Fast Payout cycles. Verified creators can cash out their accrued subscriptions, tips, and digital merchandising earnings every single week once they cleared a nominal $20 safety limit. Payouts are directly wired into your linked account via Stripe Connect, local bank transfer, or stable crypto assets.",
    category: "payments"
  },
  {
    id: "faq_4",
    question: "How does MADHOUSE achieve ultra-low streaming latency?",
    answer: "Our globally distributed delivery framework utilizes optimized WebRTC and Low-Latency HLS protocols, reducing live-feed delivery times to a stunning 0.8s - 1.5s range. This achieves instant interaction between your spoken word and the viewer chat feed, boosting organic engagement levels.",
    category: "creators"
  },
  {
    id: "faq_5",
    question: "Is MADHOUSE free to sign up and view streams?",
    answer: "Yes, MADHOUSE is completely free for viewers. You can watch standard high-definition live feeds, chat with your favorite broadcasters, join public discussions, and earn Channel Points without any paid requirements.",
    category: "viewers"
  },
  {
    id: "faq_6",
    question: "Do you support casting to TV and mobile companion apps?",
    answer: "Absolutely! We offer dedicated, native client binaries for Apple iOS, Google Android, iPadOS, and smart Apple/Android TV dashboards, complete with responsive cross-screen audio casting and stream navigation presets.",
    category: "viewers"
  },
  {
    id: "faq_7",
    question: "How do tipping, bits, and cheer mechanics function?",
    answer: "MADHOUSE incorporates native tips called 'Sparks'. Broadcasters receive 100% of all digital Spark tips (minus normal Stripe or PayPal merchant card processing fees). You can customize interactive alert frames, audio alerts, and text-to-speech triggers linked directly to Spark values.",
    category: "payments"
  },
  {
    id: "faq_8",
    question: "What digital and physical merchandising integrations are available?",
    answer: "Our Creator Workspace provides seamless custom catalog sync hooks. You can link your Shopify, Fourthwall, or Printify stores to show custom hoodies, shirts, or digital keys on a dedicated storefront directly beneath the video player stream view.",
    category: "payments"
  },
  {
    id: "faq_9",
    question: "How are copyright, DMCA, and live music broadcast licenses handled?",
    answer: "MADHOUSE features a comprehensive licensing contract suite. We partner with multiple labels covering global musical portfolios, enabling our streamers to broadcast hundreds of thousands of approved ambient, pop, electronic, and retro sound tracks legally without fears of automated takedowns.",
    category: "rules"
  },
  {
    id: "faq_10",
    question: "What community moderation toolkits are integrated?",
    answer: "We offer advanced, custom automated moderator tools powered by AI and WebSockets. Creators can establish robust profanity, link, and toxicity filters, designate human moderators with custom dashboard roles, utilize temporary timeouts, and employ automated raid blockers.",
    category: "rules"
  },
  {
    id: "faq_11",
    question: "Does MADHOUSE offer cross-streaming capabilities?",
    answer: "Yes! MADHOUSE supports multi-streaming output profiles. Creators on our 'Creator Pro' or 'Studio' tier can stream simultaneously to MADHOUSE, YouTube Live, and other custom RTMP destinations directly from our cloud relays, lowering local CPU loads.",
    category: "creators"
  },
  {
    id: "faq_12",
    question: "How do subscriber tiers work, and can I customize subscriber rewards?",
    answer: "We support three traditional paid membership tiers: Tier 1 ($4.99), Tier 2 ($9.99), and Tier 3 ($24.99). Broadcasters can configure completely custom benefits for each tier, including ad-free streams, custom subscriber badges, private Discord threads, and direct entry into sub-only custom events.",
    category: "payments"
  },
  {
    id: "faq_13",
    question: "What is the MADHOUSE security protocol for viewer safety?",
    answer: "Viewer safety is critical. All chats are monitored by auto-moderators, we require active multi-factor authentication (MFA/2FA) for payment changes, and maintain end-to-end encryption on all client data profiles.",
    category: "rules"
  },
  {
    id: "faq_14",
    question: "Are there API keys and Webhook events for third-party developer integration?",
    answer: "Yes, MADHOUSE provides a robust, ultra-fast Developer API. You can programmatically subscribe to real-time events regarding sub alerts, tips, live status Changes, or chat packets using developer consoles, with latency under 20ms.",
    category: "creators"
  },
  {
    id: "faq_15",
    question: "Can I host collaborative streams or joint shows on MADHOUSE?",
    answer: "Yes! Our Co-Stream dashboard allows up to 4 partners to merge their audio/video feeds directly into a split-screen or picture-in-picture streaming feed, which viewers can watch interactively from a combined master chat.",
    category: "viewers"
  },
  {
    id: "faq_16",
    question: "What are 'Community Challenges' and how do they work?",
    answer: "Challenges are structured milestones set by creators (e.g. 'Complete sub-marathon 500 subscribers'). Viewers can pool their Channel Points or Spark Tips to complete the goal, instantly triggering randomized confetti, custom alerts, or sound effects.",
    category: "viewers"
  },
  {
    id: "faq_17",
    question: "Does MADHOUSE have regional server gateways worldwide?",
    answer: "Absolutely. We manage an ecosystem of WebRTC and RTMP server gateways across North America, South America, Europe, Asia, and Oceania. Broadcasters connect to their closest edge gateway for high bitrate uploads with near-zero packet drop rates.",
    category: "creators"
  },
  {
    id: "faq_18",
    question: "Can corporate organizations use MADHOUSE for white-labeled events?",
    answer: "Yes. Our Enterprise Solutions suite provides fully isolated, custom-branded streaming setups, password protected client portals, SSO signups, API keys, and custom billing designed for large esports, virtual lectures, and brand keys.",
    category: "payments"
  },
  {
    id: "faq_19",
    question: "How do I report copyright violations or inappropriate streams?",
    answer: "We support rapid enforcement workflows. Under every stream player, there is a dedicated 'Report' flag or report button. Reports are triaged by our human safety personnel on a 24/7 basis, with average intervention times under 4 minutes.",
    category: "rules"
  },
  {
    id: "faq_20",
    question: "Can I import my content history, vods, and community stats from Twitch?",
    answer: "Yes! Our onboarding wizard includes an incredibly fast Integration tool. By linking your Twitch or YouTube Live credential portfolio, we will migrate your banner, schedule calendar, avatar details, and can announce your debut stream using custom automated social webhooks.",
    category: "creators"
  }
];

export const CAREERS_DATA: CareerRole[] = [
  {
    id: "car_1",
    title: "Principal WebRTC Streaming Architect",
    department: "Core Engineering",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    salaryRange: "$210K - $260K + Equity"
  },
  {
    id: "car_2",
    title: "Senior Product Designer (Streaming UI)",
    department: "Design System Group",
    location: "London, UK / Remote",
    type: "Full-time",
    salaryRange: "£90K - £120K + Options"
  },
  {
    id: "car_3",
    title: "Manager, Creator Relations & Onboarding Strategy",
    department: "Community & Partnership",
    location: "New York, NY / Hybrid",
    type: "Full-time",
    salaryRange: "$105K - $140K"
  },
  {
    id: "car_4",
    title: "Full Stack Engineer (Real-Time Widgets & SDK)",
    department: "Core Engineering",
    location: "Remote-first (Global)",
    type: "Full-time",
    salaryRange: "$130K - $175K"
  }
];

export const BLOG_DATA: BlogPost[] = [
  {
    id: "blog_1",
    title: "Maximizing Your Earnings: Why 90/10 Splits Change Everything for Full-Time Streams",
    category: "Monetization",
    excerpt: "We analyze the financial difference between Twitch's 50/50 split models, YouTube's tier structures, and MADHOUSE's 90% creator retention system. The results are mind-blowing.",
    author: "Elena Petrova",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100",
    date: "June 08, 2026",
    readTime: "6 min read"
  },
  {
    id: "blog_2",
    title: "Mastering the Algorithm: How Small Streamers Are Finding 10x Discovery via Community Search",
    category: "Creator Growth",
    excerpt: "Unlike old models that prioritize giant profiles, MADHOUSE's discovery pipeline factors in chat velocity, community loyalty rates, and precise tag-matching systems.",
    author: "Dustin Sparks",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    date: "May 29, 2026",
    readTime: "8 min read"
  },
  {
    id: "blog_3",
    title: "Introducing StreamFlow 2.0: Ultra-low latency playback networks under 1 second",
    category: "Platform Updates",
    excerpt: "Our newest WebRTC infrastructure brings latency down to a fraction of a second globally. Here is how your chat can contribute to live gameplay interactively.",
    author: "Marcus Wu",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100",
    date: "April 15, 2026",
    readTime: "5 min read"
  }
];

export const MONETIZATION_CHANNELS: MonetizationChannel[] = [
  {
    id: "mon_1",
    title: "Paid Subscriptions Tiers",
    description: "Offer Tier 1 ($4.99), Tier 2 ($9.99), and Tier 3 ($24.99) memberships. Deliver custom badges, emojis, ad-free viewing, and exclusive chat access.",
    revenueShare: "90% Streamer Share",
    payoutTime: "Weekly",
    iconName: "ShieldAlert"
  },
  {
    id: "mon_2",
    title: "Spark Interactive Tips",
    description: "Direct fan tips that trigger dynamic visual cards and text-to-speech sound bites on the stream. No artificial token cuts or high processing deductions.",
    revenueShare: "100% Spark Value (minus standard card fee)",
    payoutTime: "Weekly (Every Friday)",
    iconName: "Sparkles"
  },
  {
    id: "mon_3",
    title: "Brand Deal Marketplace",
    description: "Opt-in to our algorithmically matched Sponsorship Portal. Host native banner integrations and secure brand sponsorships with full pricing transparency.",
    revenueShare: "85% Streamer Share",
    payoutTime: "Net-10 Post Campaign",
    iconName: "Flame"
  },
  {
    id: "mon_4",
    title: "Direct Storefront Merchandising",
    description: "Upload and display merchandise, technical gear lists, or custom gaming configurations beneath your player. Fully integrated with print-on-demand services.",
    revenueShare: "100% Storefront Profit Margin",
    payoutTime: "Real-time sync to your Shopify/Printify",
    iconName: "ShoppingBag"
  }
];
