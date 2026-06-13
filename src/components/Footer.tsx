import React, { useState } from "react";
import { Tv, Flame, Smartphone, Heart, Sparkles, Send, Check } from "lucide-react";

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNav = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 4000);
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#07070A] py-16 text-gray-400">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-accent/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          
          {/* Logo Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNav("home")}>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent p-0.5 text-white">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-black">
                  <span className="font-display text-lg font-bold tracking-tighter text-white">M</span>
                </div>
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-primary">
                MADHOUSE
              </span>
            </div>
            
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Madhouse is the world's premier streaming infrastructure. Rebuilding the creator economy with optimized 0.8s ultra-low latency playback systems and a radical 90/10 subscription split.
            </p>

            {/* Newsletter form */}
            <div className="space-y-3">
              <h5 className="font-display text-xs font-semibold uppercase tracking-wider text-white">
                Subscribe to Creator Insights
              </h5>
              <form onSubmit={handleNewsletter} className="flex max-w-sm rounded-lg border border-white/10 bg-white/5 p-1 transition-all focus-within:border-primary/50">
                <input
                  type="email"
                  id="newsletter-email-input"
                  required
                  placeholder="Enter email for tips & news"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder-gray-500 outline-none"
                />
                <button
                  type="submit"
                  id="newsletter-submit-btn"
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white transition-all hover:bg-opacity-90 active:scale-95 shrink-0"
                >
                  {submitted ? <Check className="h-4 w-4" /> : <Send className="h-4.5 w-4.5" />}
                </button>
              </form>
              {submitted && (
                <p className="text-[11px] font-mono text-green-400">
                  Awesome! You've been added to our secret insights feed.
                </p>
              )}
            </div>
          </div>

          {/* Quick Links Group */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            
            {/* Discover column */}
            <div className="space-y-4">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
                Discover
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => handleNav("browse")} className="hover:text-primary transition-colors text-left text-xs bg-transparent border-none py-0 cursor-pointer">
                    Live Broadcasts
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("categories")} className="hover:text-primary transition-colors text-left text-xs bg-transparent border-none py-0 cursor-pointer">
                    Categories Grid
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("creators")} className="hover:text-primary transition-colors text-left text-xs bg-transparent border-none py-0 cursor-pointer">
                    Streamer Highlights
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("community")} className="hover:text-primary transition-colors text-left text-xs bg-transparent border-none py-0 cursor-pointer">
                    Creator Challenges
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("mobile")} className="hover:text-primary transition-colors text-left text-xs bg-transparent border-none py-0 cursor-pointer flex items-center gap-1.5">
                    <Smartphone className="h-3 w-3 text-accent" />
                    Mobile Apps
                  </button>
                </li>
              </ul>
            </div>

            {/* Program & Tech Column */}
            <div className="space-y-4">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
                Features
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => handleNav("partner")} className="hover:text-primary transition-colors text-left text-xs bg-transparent border-none py-0 cursor-pointer">
                    Partner Program Guidelines
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("monetization")} className="hover:text-primary transition-colors text-left text-xs bg-transparent border-none py-0 cursor-pointer">
                    Monetization Guide
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("pricing")} className="hover:text-primary transition-colors text-left text-xs bg-transparent border-none py-0 cursor-pointer flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-secondary" />
                    Pricing Tiers
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("enterprise")} className="hover:text-primary transition-colors text-left text-xs bg-transparent border-none py-0 cursor-pointer">
                    Enterprise Broadcasts
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("dashboard")} className="hover:text-primary transition-colors text-left text-xs bg-transparent border-none py-0 cursor-pointer">
                    Live Simulator Console
                  </button>
                </li>
              </ul>
            </div>

            {/* Careers & Docs Column */}
            <div className="space-y-4">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
                Resources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => handleNav("about")} className="hover:text-primary transition-colors text-left text-xs bg-transparent border-none py-0 cursor-pointer">
                    About Madhouse
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("careers")} className="hover:text-primary transition-colors text-left text-xs bg-transparent border-none py-0 cursor-pointer">
                    Careers <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[9px] font-bold text-accent font-mono">Hiring</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("blog")} className="hover:text-primary transition-colors text-left text-xs bg-transparent border-none py-0 cursor-pointer">
                    Engineering Blog
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("support")} className="hover:text-primary transition-colors text-left text-xs bg-transparent border-none py-0 cursor-pointer">
                    Support Center (FAQ)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("contact")} className="hover:text-primary transition-colors text-left text-xs bg-transparent border-none py-0 cursor-pointer">
                    Contact Partnerships
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <hr className="my-10 border-white/5" />

        {/* Lower Banner Footer */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-gray-500 font-mono">
              &copy; {currentYear} MADHOUSE Inc. All streaming rights are securely verified.
            </span>
            <div className="flex flex-wrap gap-4 text-[11px] text-gray-500 font-sans">
              <button onClick={() => handleNav("support")} className="hover:text-gray-300">Terms of Live Broadcast</button>
              <span>•</span>
              <button onClick={() => handleNav("support")} className="hover:text-gray-300">Privacy Policy Code</button>
              <span>•</span>
              <button onClick={() => handleNav("support")} className="hover:text-gray-300">DMCA Guidelines & Safe Harbors</button>
            </div>
          </div>

          {/* Infrastructure Health Status */}
          <div className="flex items-center gap-2 rounded-full border border-green-500/10 bg-green-500/5 px-3 py-1 font-mono text-[10px] text-green-400 tracking-tight shrink-0 self-start sm:self-center">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>ALL PLAYBACK ENDPOINTS OPERATIONAL: 99.997%</span>
          </div>
        </div>

        {/* Craft credit */}
        <p className="mt-8 text-center text-[10px] text-gray-600 leading-relaxed max-w-3xl mx-auto flex items-center justify-center gap-1">
          Made with <Heart className="h-3 w-3 text-accent fill-accent" /> for streaming content creators in modern browsers • Proudly powered by ultra-low-latency CDN networks.
        </p>

      </div>
    </footer>
  );
}
