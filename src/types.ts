export interface Stream {
  id: string;
  creatorName: string;
  creatorAvatar: string;
  title: string;
  category: string;
  viewers: number;
  tags: string[];
  duration: string;
  isPrime: boolean;
  streamUrl?: string; // For simulation
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  bio: string;
  followers: number;
  subscribers: number;
  category: string;
  views: number;
  hoursStreamed: number;
  isPartner: boolean;
  tags: string[];
  socials: {
    twitter?: string;
    youtube?: string;
    discord?: string;
    instagram?: string;
  };
  schedule: { day: string; time: string; title: string }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon reference
  viewers: number;
  image: string;
  color: string;
  description: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  avatar: string;
  subscribers: string;
  revenueGrowth: string;
  communityGrowth: string;
  quote: string;
  banner: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "creators" | "viewers" | "payments" | "rules";
}

export interface CareerRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salaryRange: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: "Creator Growth" | "Monetization" | "Platform Updates" | "Industry News" | "Community Stories";
  excerpt: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
}

export interface MonetizationChannel {
  id: string;
  title: string;
  description: string;
  revenueShare: string;
  payoutTime: string;
  iconName: string;
}

export interface ComparisonRow {
  feature: string;
  madhouse: string | boolean;
  twitch: string | boolean;
  youtube: string | boolean;
  kick: string | boolean;
}
