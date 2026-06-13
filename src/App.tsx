import React, { useState, useEffect, useRef } from "react";
import { 
  Tv, 
  Users, 
  Laptop, 
  Activity, 
  Gamepad2, 
  Trophy, 
  Coins, 
  Smartphone, 
  HelpCircle, 
  Code, 
  Award, 
  Sparkles, 
  Flame, 
  Plus, 
  Search, 
  Shield, 
  Music, 
  Video, 
  User, 
  Check, 
  Eye, 
  BarChart2, 
  Star, 
  Radio, 
  MapPin, 
  Palette, 
  Mail, 
  MessageSquare, 
  Download, 
  Play, 
  Quote, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  ChevronDown
} from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EarningsCalculator from "./components/EarningsCalculator";
import CreatorDashboard from "./components/CreatorDashboard";
import OnboardingFlow from "./components/OnboardingFlow";
import ExitIntentModal from "./components/ExitIntentModal";
import LiveActivityFeed from "./components/LiveActivityFeed";

// Data
import { 
  STREAMS_DATA, 
  CREATORS_DATA, 
  CATEGORIES_DATA, 
  SUCCESS_STORIES, 
  COMPARISON_DATA, 
  FAQ_DATA, 
  CAREERS_DATA, 
  BLOG_DATA,
  MONETIZATION_CHANNELS
} from "./data";
import { Stream, Creator, Category,FAQItem } from "./types";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Auth / Onboarding states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Logged in as creator for dashboard preview demo
  const [currentUser, setCurrentUser] = useState<string>("Max Broadcaster");
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  
  // Custom interactive state triggers
  const [activeStream, setActiveStream] = useState<Stream | null>(null);
  const [activeCreator, setActiveCreator] = useState<Creator | null>(null);

  // FAQ Page Category state
  const [faqCategory, setFaqCategory] = useState<string>("all");
  const [faqExpanded, setFaqExpanded] = useState<Record<string, boolean>>({});

  // Stream Player feedback simulations (when watching a stream)
  const [watcherChat, setWatcherChat] = useState<{ id: string; user: string; text: string; subTier?: string }[]>([
    { id: "1", user: "GamerKnight", text: "Nice movement on screen!", subTier: "Tier 1" },
    { id: "2", user: "Sophia_Rust", text: "I tried typing Rust on other channels and got banned lol, happy to be in the Madhouse", subTier: "Tier 2" },
    { id: "3", user: "MorpheusCode", text: "Tipped 50 sparks earlier, loving development speed" }
  ]);
  const [watcherInput, setWatcherInput] = useState("");
  const [sparksTipped, setSparksTipped] = useState(0);
  const [showAlertToast, setShowAlertToast] = useState<string | null>(null);

  // Forms state
  const [partnerApplied, setPartnerApplied] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [careerAppliedId, setCareerAppliedId] = useState<string | null>(null);

  // Setup sample scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, activeStream, activeCreator]);

  // Handle stream list search & filter tags
  const filteredStreams = STREAMS_DATA.filter(stream => {
    const matchesSearch = stream.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          stream.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          stream.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory ? stream.category.toLowerCase() === selectedCategory.toLowerCase() : true;
    return matchesSearch && matchesCategory;
  });

  // Watcher chat simulated replies
  useEffect(() => {
    let watchInterval: NodeJS.Timeout;
    if (activeStream) {
      watchInterval = setInterval(() => {
        const simulatedViewers = [
          { user: "OmegaGamer", text: "Wow, standard resolution is outstanding here.", subTier: "Tier 1" },
          { user: "WGPU_Master", text: "What frame duration are we calculating?", subTier: "Tier 3" },
          { user: "SynthChill", text: "This channel is super comfy." },
          { user: "LiveDev9", text: "Is there an open API endpoints map for this metadata?" }
        ];
        const randomMsg = simulatedViewers[Math.floor(Math.random() * simulatedViewers.length)];
        setWatcherChat(prev => [...prev, { id: Math.random().toString(), ...randomMsg }].slice(-20));
      }, 5000);
    }
    return () => clearInterval(watchInterval);
  }, [activeStream]);

  // Handle simulation of tipping Sparks
  const handleSparkTipping = (amount: number) => {
    setSparksTipped(prev => prev + amount);
    setShowAlertToast(`🎉 You cheered @${activeStream?.creatorName} with ${amount} Sparks!`);
    
    // Add event inside stream chat
    setWatcherChat(prev => [
      ...prev, 
      { id: Math.random().toString(), user: "You (Member)", text: `🌟 TIPPED ${amount} SPARKS: "Incredible broadcast today!"` }
    ]);

    setTimeout(() => {
      setShowAlertToast(null);
    }, 4500);
  };

  // Handle stream subscription cheer emulation
  const handleEmulatedSubscribe = (tier: string) => {
    setShowAlertToast(`🔮 Registered as ${tier} Subscriber with @${activeStream?.creatorName}! (Madhouse 90/10 Split active)`);
    setWatcherChat(prev => [
      ...prev,
      { id: Math.random().toString(), user: "SystemBot", text: `⭐ @You Subscribed for ${tier}! 90% goes straight to creator!` }
    ]);
    setTimeout(() => setShowAlertToast(null), 4500);
  };

  const handleWatcherChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!watcherInput.trim()) return;

    setWatcherChat(prev => [
      ...prev,
      { id: Date.now().toString(), user: "You (Viewer)", text: watcherInput, subTier: "Top Sponsor" }
    ]);
    setWatcherInput("");

    // Simulate creator saying thank you after 1.5 seconds
    setTimeout(() => {
      setWatcherChat(prev => [
        ...prev,
        { id: Date.now().toString(), user: activeStream?.creatorName || "Broadcaster", text: "Thanks for the chat support! Welcome to the Madhouse crew." }
      ]);
    }, 1500);
  };

  // Onboarding registration completion callback
  const handleOnboardingComplete = (name: string, persona: "creator" | "viewer") => {
    setCurrentUser(name);
    setIsLoggedIn(true);
    setShowSignUp(false);
    
    if (persona === "creator") {
      setCurrentPage("dashboard");
    } else {
      setCurrentPage("browse");
    }
    
    setShowAlertToast(`🚀 Welcome @${name}! Your profile was successfully initialized.`);
    setTimeout(() => setShowAlertToast(null), 5000);
  };

  const handlePartnerApply = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerApplied(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const handleCareerApply = (id: string) => {
    setCareerAppliedId(id);
    setTimeout(() => {
      setCareerAppliedId(null);
      alert("Application successfully filed under security code MH-342A. Our recruitment council will review details in 3 days.");
    }, 2000);
  };

  const toggleAccordion = (id: string) => {
    setFaqExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getLucideIcon = (name: string) => {
    switch (name) {
      case "Gamepad2": return <Gamepad2 className="h-5 w-5" />;
      case "Music": return <Music className="h-5 w-5" />;
      case "Trophy": return <Trophy className="h-5 w-5" />;
      case "Radio": return <Radio className="h-5 w-5" />;
      case "BookOpen": return <Laptop className="h-5 w-5" />; // placeholder
      case "MapPin": return <MapPin className="h-5 w-5" />;
      case "Code": return <Code className="h-5 w-5" />;
      case "Palette": return <Palette className="h-5 w-5" />;
      default: return <Tv className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#07070A] text-[#CBD5E1] flex flex-col font-sans selection:bg-[#8B5CF6] selection:text-white">
      
      {/* Dynamic alert feedback bar */}
      {showAlertToast && (
        <div className="fixed top-20 right-6 z-50 max-w-sm rounded-xl border border-green-500/20 bg-green-500/10 p-4 shadow-xl backdrop-blur-md animate-fade-in flex items-center gap-2.5">
          <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />
          <span className="text-xs font-bold text-white">{showAlertToast}</span>
        </div>
      )}

      {/* Global Navbar */}
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setActiveStream(null);
          setActiveCreator(null);
          setCurrentPage(page);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        onOpenSignUp={() => setShowSignUp(true)}
        onOpenLogin={() => setShowLogin(true)}
      />

      {/* Main Core View Router Wrapper */}
      <main className="flex-1">

        {/* 1. WATCH PLAYER OVERLAY VIEW (If actively watching a live stream card) */}
        {activeStream ? (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            
            {/* Back to Discovery Navigation */}
            <button 
              id="stream-player-back-btn"
              onClick={() => setActiveStream(null)}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-white mb-6 uppercase tracking-wider font-semibold cursor-pointer pb-2"
            >
              <ArrowLeft className="h-4 w-4 text-primary" />
              <span>Back to Discover Index</span>
            </button>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              
              {/* Stream Screen & Details (Left col) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Simulated Stream Frame */}
                <div className="relative aspect-video rounded-3xl border border-white/10 bg-black overflow-hidden shadow-2xl">
                  
                  {/* Cyber grid loop illustration */}
                  <div className="absolute inset-0 bg-radial-gradient from-primary/10 via-black to-black opacity-80" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px]" />
                  
                  {/* Abstract broadcast graphic */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-primary to-accent p-1 animate-spin-slow">
                      <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
                        <Tv className="h-8 w-8 text-white scale-[0.8] animate-pulse" />
                      </div>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-accent tracking-widest font-extrabold animate-pulse-live">
                        ULTRA-LATENCY TRANSMISSION • 0.8s
                      </span>
                      <h3 className="font-display text-lg font-bold text-white mt-1">@ {activeStream.creatorName}'s Live Interface</h3>
                      <p className="text-xs text-gray-400">Stream synchronized successfully. Live chat triggered.</p>
                    </div>
                  </div>

                  {/* Player controls dashboard frame overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-gray-300 bg-black/70 backdrop-blur-md p-3 rounded-xl pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      <span>LIVE</span>
                      <span>•</span>
                      <span>{activeStream.duration} elapsed</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>FPS: 60fps</span>
                      <span>BITRATE: 6800 Kbps</span>
                      <span>RESOLUTION: 1080p SOURCE</span>
                    </div>
                  </div>
                </div>

                {/* Creator Profile and Broadcast Description details */}
                <div className="rounded-3xl border border-white/10 bg-dark-card p-6 space-y-4 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    
                    <div className="flex items-center gap-4">
                      <img 
                        src={activeStream.creatorAvatar} 
                        alt={activeStream.creatorName} 
                        className="h-14 w-14 rounded-full border-2 border-primary object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display text-lg font-extrabold text-white">@{activeStream.creatorName}</h4>
                          <span className="rounded-full bg-primary/20 border border-primary/25 px-2 py-0.5 text-[9px] font-bold text-primary uppercase font-mono tracking-wider">
                            Verified Streamer
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 font-medium leading-relaxed">
                          {activeStream.title}
                        </p>
                      </div>
                    </div>

                    {/* View/Follow metadata metrics */}
                    <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                      <div className="flex flex-col items-center rounded-xl bg-white/5 border border-white/5 p-2.5">
                        <span className="text-gray-500 font-bold uppercase text-[9px]">Viewers</span>
                        <span className="text-white font-extrabold text-sm">{activeStream.viewers.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col items-center rounded-xl bg-white/5 border border-white/5 p-2.5">
                        <span className="text-gray-500 font-bold uppercase text-[9px]">Category</span>
                        <span className="text-accent font-extrabold text-sm text-center">{activeStream.category}</span>
                      </div>
                    </div>

                  </div>

                  {/* Interactive Subscriber benefits selectors */}
                  <div className="border-t border-white/5 pt-5 space-y-4">
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase font-mono tracking-wider text-primary font-bold">Support Creator Directly</h5>
                      <p className="text-xs text-gray-300">Choose custom premium subscription tiers. Keep exactly <span className="text-white font-semibold underline decoration-accent decoration-2 underline-offset-2">90% of your pledge</span> in the streamer's control.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { title: "Tier 1 Support", price: "$4.99", color: "border-primary/20 hover:border-primary/50" },
                        { title: "Tier 2 Supporter", price: "$9.99", color: "border-secondary/20 hover:border-secondary/50" },
                        { title: "Tier 3 Grand Patron", price: "$24.99", color: "border-accent/20 hover:border-accent/100" }
                      ].map((sub, idx) => (
                        <button
                          key={idx}
                          id={`test-sub-tier-${idx}`}
                          onClick={() => handleEmulatedSubscribe(sub.title)}
                          className={`rounded-2xl border bg-black/40 p-4 text-left cursor-pointer transition-all ${sub.color}`}
                        >
                          <div className="text-xs font-mono font-bold text-gray-500">MADHOUSE SECURE</div>
                          <div className="font-bold text-white text-sm mt-1">{sub.title}</div>
                          <div className="font-mono text-sm font-extrabold text-primary mt-0.5">{sub.price} <span className="text-[10px] font-normal text-gray-500">/ mo</span></div>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Live Chat & sparks cheering panel (Right col) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Streaming sparks cheer panel */}
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-dark-card to-black p-5 space-y-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider pb-1">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span>Madhouse Sparks tipping Deck</span>
                  </div>
                  <p className="text-xs text-gray-450 leading-relaxed text-gray-400">
                    Sparks are native microtips. Broadcasters receive <span className="text-green-400 font-bold">100% of the Spark value</span> instantly into their banking network.
                  </p>

                  <div className="grid grid-cols-4 gap-2">
                    {[100, 250, 500, 1000].map((amount) => (
                      <button
                        key={amount}
                        id={`tip-sparks-${amount}`}
                        onClick={() => handleSparkTipping(amount)}
                        className="rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 py-2.5 font-mono text-xs text-center text-white font-bold tracking-tight cursor-pointer hover:border-accent/30 transition-all active:scale-95 flex flex-col items-center gap-0.5"
                      >
                        <Flame className="h-3.5 w-3.5 text-accent" />
                        <span>+{amount}</span>
                      </button>
                    ))}
                  </div>

                  {sparksTipped > 0 && (
                    <div className="rounded-xl bg-accent/10 border border-accent/25 p-3 text-center text-xs font-mono text-accent">
                      Total Spurred Sparks This Session: <span className="font-extrabold">{sparksTipped} Sparks</span>
                    </div>
                  )}
                </div>

                {/* Simulated Viewer Chat box */}
                <div className="rounded-3xl border border-white/10 bg-dark-card p-4 flex flex-col justify-between h-[380px] shadow-sm">
                  <div className="border-b border-white/5 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                      <h5 className="font-display text-xs font-bold text-white uppercase tracking-wider">Live Viewer chat</h5>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">Latency: 0.8s</span>
                  </div>

                  {/* Scroller chats */}
                  <div className="flex-1 overflow-y-auto my-3 space-y-2 pr-1 max-h-[250px]">
                    {watcherChat.map((msg) => (
                      <div key={msg.id} className="text-xs leading-relaxed break-words block">
                        {msg.subTier && (
                          <span className="font-mono text-[8px] bg-primary/25 border border-primary/20 text-primary px-1 py-0.5 rounded mr-1">
                            {msg.subTier}
                          </span>
                        )}
                        <span className="font-bold text-gray-300 mr-1 rounded bg-white/5 px-1">{msg.user}</span>
                        <span className="text-gray-400 text-xs">{msg.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sender box */}
                  <form onSubmit={handleWatcherChatSubmit} className="flex gap-2 border-t border-white/5 pt-3">
                    <input
                      type="text"
                      id="watcher-chat-input"
                      required
                      placeholder="Comment on live feed..."
                      value={watcherInput}
                      onChange={(e) => setWatcherInput(e.target.value)}
                      className="flex-1 rounded-xl bg-black border border-white/10 px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      id="watcher-chat-submit"
                      className="rounded-xl bg-primary text-white hover:opacity-90 transition-all px-4 py-2 text-xs font-bold cursor-pointer uppercase tracking-wider"
                    >
                      Chat
                    </button>
                  </form>
                </div>

              </div>

            </div>

          </div>
        ) : (
          /* Normal pages path routing */
          <>
            {/* RENDER VIEW: HOME PAGE */}
            {currentPage === "home" && (
              <div className="space-y-24 pb-20">
                
                {/* Hero section */}
                <section className="relative overflow-hidden pt-20 pb-16">
                  {/* Glowing background circles for modern technology platform feel */}
                  <div className="absolute top-1/4 left-1/3 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-[150px] animate-pulse" />
                  <div className="absolute top-1/3 right-1/4 -z-10 h-80 w-80 rounded-full bg-accent/15 blur-[120px]" />

                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
                    
                    {/* Launch counter ticker badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[11px] text-gray-300 tracking-wide uppercase">
                      <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                      <span>Next-Gen Streaming Technology Is Live</span>
                      <span className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                      <span className="text-green-400">0.8s Latency</span>
                    </div>

                    <div className="space-y-4 max-w-4xl mx-auto">
                      <h1 className="font-display text-5xl font-black text-white leading-none tracking-tighter sm:text-7xl uppercase">
                        Streaming
                        <span className="block mt-2 bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#3B82F6] bg-clip-text text-transparent">
                          WITHOUT LIMITS.
                        </span>
                      </h1>
                      
                      <p className="text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-relaxed pt-2">
                        Broadcast live in stunning definition, build loyal communities, and turn your dedicated audience into a thriving franchise with ultra-low latency and our creator-first <span className="text-[#8B5CF6] font-bold">90/10 split protocol</span>.
                      </p>
                    </div>

                    {/* Core Landing CTAs */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <button
                        id="hero-cta-signup"
                        onClick={() => setShowSignUp(true)}
                        className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#8B5CF6]/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                      >
                        Start Streaming
                      </button>
                      <button
                        id="hero-cta-browse"
                        onClick={() => setCurrentPage("browse")}
                        className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[#CBD5E1] hover:text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                      >
                        Browse Channels
                      </button>
                    </div>

                    {/* Simple live counters ticker */}
                    <div className="grid grid-cols-2 gap-4 pt-10 sm:grid-cols-4 max-w-5xl mx-auto border-t border-white/5">
                      <div className="space-y-1">
                        <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">150K+</div>
                        <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Creators Online</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-display text-2xl sm:text-3xl font-extrabold text-accent">20M+</div>
                        <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Monthly Viewers</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-display text-2xl sm:text-3xl font-extrabold text-secondary">1B+</div>
                        <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Hours Watched</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-display text-2xl sm:text-3xl font-extrabold text-green-400">90%</div>
                        <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Creator Sub Split</div>
                      </div>
                    </div>

                  </div>
                </section>

                {/* Section: Why Madhouse (Features core three column) */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="space-y-12">
                    
                    <div className="text-center space-y-2 max-w-2xl mx-auto">
                      <span className="font-mono text-[11px] font-bold text-accent uppercase tracking-widest">Built From Scratch For Speed</span>
                      <h2 className="font-display text-3xl font-bold tracking-tight text-white m-0">
                        Designed for High-Performing Streamers
                      </h2>
                      <p className="text-gray-400 text-xs">
                        Traditional companies operate blocky streaming services based on standard web codecs. We deliver direct edge server WebRTC channels.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      
                      {/* Col 1 */}
                      <div className="rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-8 space-y-4 hover:border-primary/20 transition-all">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                          <Coins className="h-6 w-6" />
                        </div>
                        <h4 className="font-display text-lg font-bold text-white">Radical 90/10 Splits</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          We believe streamers are the heart of web entertainment. Retain 90% of sub revenues, sub gifts, and tier levels. Tips go 100% to your account.
                        </p>
                      </div>

                      {/* Col 2 */}
                      <div className="rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-8 space-y-4 hover:border-accent/20 transition-all">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent border border-accent/20">
                          <Users className="h-6 w-6" />
                        </div>
                        <h4 className="font-display text-lg font-bold text-white">Gamified Alerts</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          Synchronize overlays, triggers, confetti, and sound bites straight from chat WebSockets. Build immersive spaces where viewers feel like part of the broadcast.
                        </p>
                      </div>

                      {/* Col 3 */}
                      <div className="rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-8 space-y-4 hover:border-secondary/20 transition-all">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary border border-secondary/20">
                          <Laptop className="h-6 w-6" />
                        </div>
                        <h4 className="font-display text-lg font-bold text-white">0.8s Streaming Playback</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          Zero metallic voice lag. Standard latency is under 1 second worldwide, reducing chat drag and multiplying stream comments substantially.
                        </p>
                      </div>

                    </div>

                  </div>
                </section>

                {/* Section: Featured Streamers lists (Live streamers preview cards) */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="space-y-8">
                    
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div className="space-y-1">
                        <span className="font-mono text-xs uppercase text-primary font-bold font-semibold tracking-wider">Top Streamer Nodes</span>
                        <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                          Trending Live Broadcasts
                        </h3>
                      </div>
                      <button 
                        id="view-all-streams-btn"
                        onClick={() => setCurrentPage("browse")}
                        className="text-xs font-bold uppercase tracking-wider text-accent hover:text-white flex items-center gap-1.5 cursor-pointer border-none"
                      >
                        <span>Expore All Streams</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Streamer cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {STREAMS_DATA.slice(0, 4).map((stream) => (
                        <div 
                          key={stream.id}
                          onClick={() => {
                            setActiveStream(stream);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="group rounded-2xl border border-white/5 bg-dark-card overflow-hidden hover:border-primary/30 transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/5 text-left"
                        >
                          <div className="relative aspect-video bg-black/60 overflow-hidden">
                            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80" />
                            
                            {/* Live Badge and viewer indicators */}
                            <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-2">
                              <span className="rounded bg-red-600 px-1.5 py-0.5 font-mono text-[9px] font-bold text-white uppercase animate-pulse-live">
                                LIVE
                              </span>
                              <span className="rounded bg-black/75 px-1.5 py-0.5 font-mono text-[9px] text-gray-300">
                                {stream.viewers >= 1000 ? `${(stream.viewers / 1000).toFixed(1)}k` : stream.viewers} Viewers
                              </span>
                            </div>

                            {/* Hover overlay play sign inside stream card */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 z-10">
                              <Play className="h-10 w-10 text-white fill-white scale-90 group-hover:scale-100 transition-transform" />
                            </div>

                            {/* Abstract placeholder thumbnail */}
                            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center p-3 text-center">
                              <Tv className="h-8 w-8 text-white/5 animate-pulse" />
                            </div>

                          </div>

                          <div className="p-4 space-y-3">
                            <div className="flex items-center gap-2.5">
                              <img src={stream.creatorAvatar} alt={stream.creatorName} className="h-8 w-8 rounded-full border border-primary/40 object-cover" referrerPolicy="no-referrer" />
                              <div className="overflow-hidden">
                                <h5 className="font-display text-xs font-bold text-white truncate">@{stream.creatorName}</h5>
                                <span className="font-mono text-[9px] text-gray-500">{stream.category}</span>
                              </div>
                            </div>
                            
                            <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                              {stream.title}
                            </p>

                            <div className="flex flex-wrap gap-1">
                              {stream.tags.slice(0, 2).map((t) => (
                                <span key={t} className="rounded bg-white/5 border border-white/5 px-1.5 py-0.5 font-mono text-[9px] text-gray-400">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </section>

                {/* Section: Category Explore grids */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="space-y-8">
                    
                    <div className="space-y-1">
                      <span className="font-mono text-xs uppercase text-primary font-bold tracking-wider">Unleash Your Passion</span>
                      <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                        Discover Live Communities
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {CATEGORIES_DATA.map((cat) => (
                        <div
                          key={cat.id}
                          id={`cat-card-${cat.id}`}
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            setCurrentPage("browse");
                          }}
                          className="group rounded-2xl border border-white/5 bg-dark-card hover:border-accent/40 transition-all cursor-pointer p-5 relative overflow-hidden text-left"
                        >
                          <div className="absolute right-0 bottom-0 top-0 w-20 bg-gradient-to-l from-white/5 to-transparent z-10 pointer-events-none" />
                          
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl text-white shrink-0" style={{ backgroundColor: `${cat.color}20`, border: `1px solid ${cat.color}35`, color: cat.color }}>
                              {getLucideIcon(cat.icon)}
                            </div>
                            <div>
                              <h5 className="font-display text-sm font-extrabold text-white group-hover:text-accent transition-colors">{cat.name}</h5>
                              <span className="font-mono text-[10px] text-gray-400">{(cat.viewers / 1000).toFixed(0)}k Concurrents</span>
                            </div>
                          </div>
                          
                          <p className="text-[11px] text-gray-400 mt-3 leading-normal line-clamp-2">
                            {cat.description}
                          </p>
                        </div>
                      ))}
                    </div>

                  </div>
                </section>

                {/* Section: Interactive Earnings Estimator */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <EarningsCalculator />
                </section>

                {/* Section: Head-to-Head Competitor Platform Comparison */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="space-y-10">
                    
                    <div className="text-center space-y-2 max-w-xl mx-auto">
                      <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">Pure Factual Comparison</span>
                      <h3 className="font-display text-2xl font-extrabold text-white">The Competitive Advantage</h3>
                      <p className="text-gray-400 text-xs">
                        Compare direct payout splits, analytics feed architectures, and live WebRTC streaming tools logically.
                      </p>
                    </div>

                    {/* SaaS-style comparison table */}
                    <div className="rounded-3xl border border-white/10 bg-dark-card overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full font-sans text-left text-sm border-collapse min-w-[700px]">
                          <thead>
                            <tr className="border-b border-white/10 bg-black/60 font-display text-[11px] text-gray-400 tracking-wider uppercase">
                              <th className="p-4 sm:p-5 font-bold">Feature Metric</th>
                              <th className="p-4 text-primary font-extrabold text-center">MADHOUSE</th>
                              <th className="p-4 text-center font-medium">Twitch Live</th>
                              <th className="p-4 text-center font-medium">YouTube Live</th>
                              <th className="p-4 text-center font-medium">Kick Platform</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {COMPARISON_DATA.map((row, idx) => (
                              <tr key={idx} className="hover:bg-white/[0.02]">
                                <td className="p-4 sm:p-5 font-semibold text-white text-xs">{row.feature}</td>
                                <td className="p-4 text-center font-bold text-xs text-primary bg-primary/5 border-l border-r border-primary/20">
                                  {typeof row.madhouse === "boolean" ? (row.madhouse ? <Check className="h-5 w-5 text-green-400 mx-auto" /> : "No") : row.madhouse}
                                </td>
                                <td className="p-4 text-center text-xs text-gray-400">
                                  {typeof row.twitch === "boolean" ? (row.twitch ? <Check className="h-5 w-5 text-gray-300 mx-auto" /> : "No") : row.twitch}
                                </td>
                                <td className="p-4 text-center text-xs text-gray-400">
                                  {typeof row.youtube === "boolean" ? (row.youtube ? <Check className="h-5 w-5 text-gray-300 mx-auto" /> : "No") : row.youtube}
                                </td>
                                <td className="p-4 text-center text-xs text-gray-400">
                                  {typeof row.kick === "boolean" ? (row.kick ? <Check className="h-5 w-5 text-gray-300 mx-auto" /> : "No") : row.kick}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                </section>

                {/* Section: Creator Success Stories (Carousel case study cards) */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="space-y-12">
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="font-mono text-xs uppercase text-primary font-bold tracking-wider">Success Stories</span>
                      <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                        Creators Scaling Business
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {SUCCESS_STORIES.map((story) => (
                        <div 
                          key={story.id}
                          className="rounded-3xl border border-white/5 bg-[#0F172A] p-6 lg:p-8 space-y-6 relative overflow-hidden flex flex-col justify-between"
                        >
                          <div className="space-y-4">
                            <Quote className="h-8 w-8 text-primary opacity-40 shrink-0" />
                            <p className="text-xs text-gray-300 leading-relaxed italic">
                              "{story.quote}"
                            </p>
                          </div>

                          <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img src={story.avatar} alt={story.name} className="h-10 w-10 rounded-full border border-primary object-cover overflow-hidden" referrerPolicy="no-referrer" />
                              <div>
                                <h5 className="font-bold text-xs text-white">@{story.name}</h5>
                                <span className="font-mono text-[9px] text-gray-500">{story.subscribers}</span>
                              </div>
                            </div>

                            <div className="text-right font-mono text-[10px]">
                              <span className="text-green-400 font-extrabold">{story.revenueGrowth}</span>
                              <div className="text-gray-500 font-normal">Income gains</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </section>

                {/* Section: Mobile App Preview Callout */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="rounded-3xl bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20 border border-white/10 p-8 sm:p-12 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    <div className="lg:col-span-7 space-y-6">
                      <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">Mobile Companions</span>
                      <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                        Steam Anywhere. Interact Anytime.
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
                        Our native companion applications for Apple iOS, iPadOS and Google Android synchronize your creator dashboard alerts programmatically with smart on-device alerts. Monitor chat metrics, stream resolutions, and chat overlays.
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <button 
                          id="dl-appstore-btn"
                          onClick={() => alert("Launching App Store direct download... MADhouse-Mobile Client MH-4.5.ipa")}
                          className="rounded-xl bg-white text-black font-bold text-xs px-5 py-3 flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-all uppercase"
                        >
                          <Smartphone className="h-4 w-4" />
                          App Store Direct
                        </button>
                        <button 
                          id="dl-playstore-btn"
                          onClick={() => alert("Launching Play Store direct download... MADhouse-Mobile Client MH-4.5.apk")}
                          className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs px-5 py-3 flex items-center gap-2 cursor-pointer transition-all uppercase"
                        >
                          <Download className="h-4 w-4 text-primary" />
                          Google Play
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center relative">
                      {/* Abstract app mock illustrative block */}
                      <div className="w-[240px] h-[440px] rounded-[36px] bg-[#07070a] border-8 border-gray-800 shadow-2xl relative overflow-hidden p-3 space-y-3 font-mono text-[9px] text-gray-500 z-10">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="font-bold text-white text-[10px]">MADHOUSE</span>
                          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        </div>

                        {/* Stream preview simulation */}
                        <div className="relative aspect-video rounded-xl bg-gradient-to-tr from-primary to-accent overflow-hidden flex items-center justify-center p-2">
                          <Play className="h-5 w-5 text-white fill-white" />
                        </div>

                        {/* Text and stats */}
                        <div className="space-y-1">
                          <div className="font-semibold text-white">VALORANT Immortal Run</div>
                          <div>Viewers: 14,244</div>
                        </div>

                        {/* Chats roll */}
                        <div className="space-y-1.5 scrollbar-thin max-h-[140px] overflow-hidden">
                          <p><span className="text-secondary font-bold">@Alpha:</span> Incredible audio quality!</p>
                          <p><span className="text-accent font-bold">@Clive:</span> Subscribed on Tier 3 links</p>
                          <p><span className="text-primary font-bold">@Max:</span> Absolute master WebRTC splits</p>
                        </div>
                      </div>
                      <div className="absolute h-60 w-60 rounded-full bg-primary/20 blur-[60px] top-1/4 -z-10 animate-pulse" />
                    </div>

                  </div>
                </section>

                {/* Section: Final Converting Landing Banner CTA */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="relative rounded-3xl bg-gradient-to-tr from-[#8B5CF6]/35 to-black border border-white/10 p-8 sm:p-16 text-center space-y-6 overflow-hidden">
                    
                    {/* Glow bubbles */}
                    <div className="absolute top-[-100px] left-[-100px] -z-10 h-60 w-60 rounded-full bg-primary/10 blur-[80px]" />
                    <div className="absolute bottom-[-100px] right-[-100px] -z-10 h-60 w-60 rounded-full bg-accent/10 blur-[80px]" />

                    <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white">Your Community Is Waiting.</h3>
                    <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
                      Do not forfeit half your subscription rewards to platform directories. Launch your secure Madhouse channel in under 3 minutes for absolute revenue and control optimization.
                    </p>

                    <div className="pt-2">
                      <button
                        id="final-cta-btn"
                        onClick={() => setShowSignUp(true)}
                        className="rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-95 px-8 py-4 text-xs tracking-wider uppercase font-extrabold text-white shadow-xl shadow-primary/30 cursor-pointer"
                      >
                        Start Streaming Today
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-[10px] text-gray-500 font-mono uppercase">
                      <span>✓ No credit card required</span>
                      <span>✓ Auto-migrate Twitch history</span>
                      <span>✓ Instantly secure splits</span>
                    </div>

                  </div>
                </section>

              </div>
            )}

            {/* RENDER VIEW: BROWSE STREAMS PAGE */}
            {currentPage === "browse" && (
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 text-left">
                
                <div className="space-y-2">
                  <h2 className="font-display text-3xl font-extrabold text-white">Browse Live Channels</h2>
                  <p className="text-xs text-gray-400">Discover and cheer on high-latency streamer feeds globally or search tags.</p>
                </div>

                {/* Category filtering selector tag bullets */}
                <div className="flex flex-wrap gap-2 border-b border-white/5 pb-6">
                  <button
                    id="cat-filter-all"
                    onClick={() => setSelectedCategory(null)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === null 
                        ? "bg-primary text-white" 
                        : "bg-white/5 border border-white/5 text-gray-300 hover:text-white"
                    }`}
                  >
                    All Channels
                  </button>
                  {["Gaming", "Music", "Sports", "Podcasts", "Education", "IRL", "Technology", "Creative Arts"].map((cat) => (
                    <button
                      key={cat}
                      id={`cat-filter-${cat.toLowerCase()}`}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedCategory === cat 
                          ? "bg-accent text-white" 
                          : "bg-white/5 border border-white/5 text-gray-300 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Active streams grid */}
                {filteredStreams.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredStreams.map((stream) => (
                      <div 
                        key={stream.id}
                        id={`browse-stream-card-${stream.id}`}
                        onClick={() => {
                          setActiveStream(stream);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="group rounded-2xl border border-white/5 bg-dark-card overflow-hidden hover:border-primary/30 transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/5 text-left"
                      >
                        <div className="relative aspect-video bg-black/60 overflow-hidden">
                          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80" />
                          
                          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-2">
                            <span className="rounded bg-red-600 px-1.5 py-0.5 font-mono text-[9px] font-bold text-white uppercase animate-pulse-live">
                              LIVE
                            </span>
                            <span className="rounded bg-black/75 px-1.5 py-0.5 font-mono text-[9px] text-gray-300">
                              {stream.viewers >= 1000 ? `${(stream.viewers / 1000).toFixed(1)}k` : stream.viewers} Viewers
                            </span>
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 z-10">
                            <Play className="h-10 w-10 text-white fill-white scale-90 group-hover:scale-100 transition-transform" />
                          </div>

                          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center" />
                        </div>

                        <div className="p-4 space-y-3">
                          <div className="flex items-center gap-2.5">
                            <img src={stream.creatorAvatar} alt={stream.creatorName} className="h-8 w-8 rounded-full border border-primary/40 object-cover" referrerPolicy="no-referrer" />
                            <div className="overflow-hidden">
                              <h5 className="font-display text-xs font-bold text-white truncate">@{stream.creatorName}</h5>
                              <span className="font-mono text-[9px] text-gray-500">{stream.category}</span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-350 line-clamp-2 leading-relaxed">
                            {stream.title}
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {stream.tags.map((t) => (
                              <span key={t} className="rounded bg-white/5 border border-white/5 px-1.5 py-0.5 font-mono text-[9px] text-gray-400">
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 border border-white/5 bg-white/[0.01] rounded-3xl space-y-3 max-w-xl mx-auto">
                    <p className="text-sm font-semibold text-gray-300">No active channels matching your criteria.</p>
                    <p className="text-xs text-gray-500">Try checking other tags or clearing search configurations.</p>
                    <button 
                      id="clear-browse-filters"
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery("");
                      }}
                      className="rounded-lg bg-white/5 px-4 py-2 text-xs border border-white/10"
                    >
                      Reset Filter
                    </button>
                  </div>
                )}

              </div>
            )}

            {/* RENDER VIEW: CATEGORIES GRID */}
            {currentPage === "categories" && (
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 text-left">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl font-extrabold text-white">Streaming Categories</h2>
                  <p className="text-xs text-gray-400">Filer active chats and streamers via structured live category communities.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CATEGORIES_DATA.map((cat) => (
                    <div 
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setCurrentPage("browse");
                      }}
                      className="group rounded-3xl border border-white/5 bg-dark-card overflow-hidden hover:border-primary/40 transition-all cursor-pointer shadow-lg text-left"
                    >
                      <div className="aspect-video relative bg-black/60 overflow-hidden">
                        <img src={cat.image} alt={cat.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform opacity-60" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md" style={{ backgroundColor: cat.color }}>
                          {getLucideIcon(cat.icon)}
                        </div>
                      </div>

                      <div className="p-5 space-y-2.5">
                        <h4 className="font-display text-lg font-bold text-white group-hover:text-accent transition-colors">
                          {cat.name}
                        </h4>
                        <div className="flex items-center gap-1.5 font-mono text-xs text-gray-400">
                          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse-live" />
                          <span>{(cat.viewers / 1005).toFixed(0)}k Streamers active</span>
                        </div>
                        <p className="text-xs text-gray-450 leading-relaxed text-gray-400">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RENDER VIEW: CREATORS */}
            {currentPage === "creators" && (
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 text-left">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl font-extrabold text-white">Highlighted Streamers</h2>
                  <p className="text-xs text-gray-400">Meet the pioneers operating their audience networks directly via our 90/10 split protocol.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {CREATORS_DATA.map((cre) => (
                    <div 
                      key={cre.id}
                      className="rounded-3xl border border-white/5 bg-[#0F172A] overflow-hidden flex flex-col justify-between hover:border-primary/20 transition-all"
                    >
                      {/* Banner and Avatar block */}
                      <div className="relative h-28 bg-gradient-to-tr from-[#1E293B] to-[#3B82F6]">
                        {cre.banner && (
                          <img src={cre.banner} alt={`${cre.name} banner`} className="h-full w-full object-cover opacity-40" referrerPolicy="no-referrer" />
                        )}
                        <img 
                          src={cre.avatar} 
                          alt={cre.name} 
                          className="absolute bottom-[-24px] left-6 h-16 w-16 rounded-full border-4 border-[#0F172A] object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="p-6 pt-8 space-y-5 flex-1 flex flex-col justify-between">
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-display text-lg font-bold text-white">@{cre.name}</h4>
                            <span className="rounded bg-primary/25 border border-primary/20 px-2 py-0.5 font-mono text-[9px] font-bold text-primary">
                              PARTNERED
                            </span>
                          </div>
                          
                          <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                            {cre.bio}
                          </p>

                          {/* Stats parameters */}
                          <div className="grid grid-cols-3 gap-2 bg-black/40 border border-white/5 rounded-xl p-3 text-center font-mono text-[10px]">
                            <div>
                              <div className="text-accent font-extrabold">{(cre.followers / 1000).toFixed(0)}k</div>
                              <div className="text-gray-500 font-normal">Followers</div>
                            </div>
                            <div>
                              <div className="text-primary font-bold">{cre.schedule.length}</div>
                              <div className="text-gray-500 font-normal">Weekly Shows</div>
                            </div>
                            <div>
                              <div className="text-secondary font-bold">{(cre.views / 1000000).toFixed(1)}M</div>
                              <div className="text-gray-500 font-normal">Views</div>
                            </div>
                          </div>
                        </div>

                        {/* Schedule detail highlights */}
                        <div className="space-y-2 border-t border-white/5 pt-4">
                          <h5 className="font-mono text-[9px] uppercase tracking-wider text-primary font-semibold">Weekly Live Timeline</h5>
                          <div className="space-y-1 text-[11px] text-gray-300">
                            {cre.schedule.slice(0, 2).map((sch, sIdx) => (
                              <div key={sIdx} className="flex justify-between">
                                <span className="font-medium text-white">{sch.day}:</span>
                                <span className="text-gray-400 truncate max-w-[130px]">{sch.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button 
                          id={`watch-cre-${cre.id}`}
                          onClick={() => {
                            const foundStream = STREAMS_DATA.find(s => s.creatorName === cre.name);
                            if (foundStream) {
                              setActiveStream(foundStream);
                            } else {
                              alert("Broadcaster is currently configuring gear offline. Try tuning to active channels on browse grid!");
                            }
                          }}
                          className="w-full rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs py-2.5 mt-4 transition-all uppercase tracking-wider border border-white/10"
                        >
                          Tune to Stream channel
                        </button>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RENDER VIEW: PARTNER PROGRAM */}
            {currentPage === "partner" && (
              <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 text-left">
                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase text-primary font-bold tracking-widest">Build Streaming Careers</span>
                  <h2 className="font-display text-3xl font-extrabold text-white">Madhouse Partner Program</h2>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                    Get access to premium overlays, custom sub badges, multi-stream cloud routing triggers, and an optimized 90/10 lifetime revenue share. We believe developers and broadcasters deserve better.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Step criteria parameters */}
                  <div className="rounded-3xl border border-white/10 bg-dark-card p-6 space-y-6">
                    <h3 className="font-display text-lg font-bold text-white border-b border-white/5 pb-2">Qualification Milestones</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 text-xs leading-relaxed">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 border border-primary/20">1</div>
                        <div>
                          <h4 className="font-bold text-white mb-0.5">Stream Duration Tally</h4>
                          <p className="text-gray-400">Broadcast for at least 15 hours across 7 unique calendar days in the trailing 30 days.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-xs leading-relaxed">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0 border border-accent/20">2</div>
                        <div>
                          <h4 className="font-bold text-white mb-0.5">Average Concurrents (CCU)</h4>
                          <p className="text-gray-400">Maintain an average of 25 concurrent viewers without utilizing botting mechanisms.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-xs leading-relaxed">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary/10 text-secondary shrink-0 border border-secondary/20">3</div>
                        <div>
                          <h4 className="font-bold text-white mb-0.5">Community Standard Code</h4>
                          <p className="text-gray-400">Abide strictly by community moderation rules, safe DMCA rules, and respect panel guides.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Application wizard form */}
                  <div className="rounded-3xl border border-white/10 bg-dark-card p-6 space-y-5">
                    <h3 className="font-display text-lg font-bold text-white border-b border-white/5 pb-2">File Partner Request</h3>
                    
                    {partnerApplied ? (
                      <div className="text-center py-8 space-y-3">
                        <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
                        <h4 className="font-bold text-white">Application Recorded</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          Your profile stats are now actively audited by our gateway relays. Average review cycles process inside 72 hours.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handlePartnerApply} className="space-y-3 text-xs">
                        <div className="space-y-1">
                          <label htmlFor="partner-name-input" className="text-gray-400">Personal Legal / Broadcaster Name</label>
                          <input required id="partner-name-input" type="text" placeholder="e.g. Max Broadcaster" className="w-full rounded bg-black py-2 px-3 text-white border border-white/10 outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="partner-twitch-input" className="text-gray-400">External Channel (Twitch/YouTube link)</label>
                          <input required id="partner-twitch-input" type="text" placeholder="https://twitch.tv/my_channel" className="w-full rounded bg-black py-2 px-3 text-white border border-white/10 outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="partner-category-select" className="text-gray-400">Streaming Focus Category</label>
                          <select id="partner-category-select" className="w-full rounded bg-black py-2 px-3 text-gray-300 border border-white/10 outline-none">
                            <option value="gaming">Gaming & esports</option>
                            <option value="tech">Coding / Technology</option>
                            <option value="music">Live Modular Music</option>
                            <option value="other">Outdoor IRL & Podcasts</option>
                          </select>
                        </div>
                        <button type="submit" className="w-full rounded bg-primary py-2.5 font-bold uppercase hover:bg-opacity-95 text-xs text-white shadow shadow-primary/20">
                          Submit Credentials For Audit
                        </button>
                      </form>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* RENDER VIEW: MONETIZATION SECTION */}
            {currentPage === "monetization" && (
              <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 text-left">
                <div className="space-y-3 text-center sm:text-left">
                  <span className="font-mono text-xs uppercase text-primary font-bold tracking-widest font-semibold">Creator Revenue Channels</span>
                  <h2 className="font-display text-4xl font-extrabold text-white">How Monetization Works</h2>
                  <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
                    Unlike standard platforms claiming up to half of member revenue, Madhouse applies direct stripe connect networks giving 90% of sub actions to creators.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                  {MONETIZATION_CHANNELS.map((ch) => (
                    <div 
                      key={ch.id}
                      className="rounded-3xl border border-white/5 bg-dark-card p-6 space-y-3 hover:border-primary/20 transition-all text-left flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="h-6 w-6 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold font-mono">✓</span>
                          <h4 className="font-display text-base font-bold text-white">{ch.title}</h4>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {ch.description}
                        </p>
                      </div>

                      <div className="border-t border-white/5 pt-3 flex items-center justify-between font-mono text-[10px]">
                        <span className="text-gray-500 uppercase">Settlement frequency</span>
                        <span className="text-primary font-bold">{ch.payoutTime}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <EarningsCalculator />
              </div>
            )}

            {/* RENDER VIEW: MOBILE APP MOCKUPS */}
            {currentPage === "mobile" && (
              <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 text-left space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <span className="font-mono text-xs uppercase text-accent font-bold tracking-widest">Global Clients</span>
                    <h2 className="font-display text-4xl font-extrabold text-white">Madhouse Everywhere</h2>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      Download our high fidelity clients on Apple Mobile App Store or Google Play Store. Synchronize push notifications, interact with alerts, cast standard high-format screens to TV systems, or manage overlay dashboards directly inside your pocket.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-white/5 bg-white/5 p-4 rounded-2xl space-y-1.5">
                        <h4 className="font-bold text-white text-xs">Dynamic Companion Alerts Noises</h4>
                        <p className="text-[11px] text-gray-400 leading-normal">Triggers notifications programmatically linked to sub events.</p>
                      </div>
                      <div className="border border-white/5 bg-white/5 p-4 rounded-2xl space-y-1.5">
                        <h4 className="font-bold text-white text-xs">Low consumption battery codec</h4>
                        <p className="text-[11px] text-gray-400 leading-normal">Using native hardware acceleration layers for optimal lifetimes.</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => alert("Downloading iOS binary package...")} className="rounded-xl bg-white text-black text-xs font-bold px-5 py-3 uppercase cursor-pointer">
                        App Store Direct
                      </button>
                      <button onClick={() => alert("Downloading Android apk file...")} className="rounded-xl bg-white/5 text-white text-xs font-semibold px-5 py-3 border border-white/10 uppercase cursor-pointer">
                        Google Play Store
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex justify-center relative">
                    <div className="w-[200px] h-[360px] rounded-[32px] bg-black border-4 border-gray-700 p-2 text-[9px] text-gray-500 space-y-2 font-mono relative shadow-2xl">
                      <span className="text-white font-bold block border-b border-white/10 pb-1">@MadhouseMobile</span>
                      <div className="aspect-video bg-[#0f172a] rounded flex items-center justify-center text-xs">📽️</div>
                      <p className="text-gray-400">Streaming details: VALORANT immortal sprint</p>
                      <p className="text-[8px] text-accent animate-pulse">● Recipient WebRTC gateway sync</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* RENDER VIEW: COMMUNITY PAGE */}
            {currentPage === "community" && (
              <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 text-left space-y-12">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl font-extrabold text-white">Community & Challenges</h2>
                  <p className="text-xs text-gray-400 font-medium">Join public chatrooms, Discord links, and complete platform challenges programmatically.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Current Active challenges */}
                  <div className="rounded-3xl border border-white/10 bg-dark-card p-6 space-y-4">
                    <h4 className="font-display font-bold text-white text-base">Monthly Stream Challenges</h4>
                    
                    <div className="space-y-3">
                      <div className="bg-black/40 border border-white/5 rounded-2xl p-4 space-y-2.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-white">Milestone: 200 Sub Goals</span>
                          <span className="text-[10px] text-accent font-semibold font-mono">Sponsor Rewards</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "75%" }} />
                        </div>
                        <div className="flex justify-between font-mono text-[9px] text-gray-500">
                          <span>150 Completed</span>
                          <span>200 Sub Goal</span>
                        </div>
                      </div>

                      <div className="bg-black/40 border border-white/5 rounded-2xl p-4 space-y-2.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-white">Live Marathon: 30 Hours Cumulative</span>
                          <span className="text-[10px] text-secondary font-semibold font-mono">Elite Avatar Badge</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded overflow-hidden">
                          <div className="h-full bg-accent" style={{ width: "42%" }} />
                        </div>
                        <div className="flex justify-between font-mono text-[9px] text-gray-500">
                          <span>12.5 Hours Streamed</span>
                          <span>30 Hour Sprint</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Discord and Meetups */}
                  <div className="rounded-3xl border border-white/10 bg-dark-card p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <h4 className="font-display font-bold text-white text-base">Discord & Forums Synchronization</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Authorize your Discord server credentials to map sub badging structures automatically. When someone subscribes on Madhouse, they instantly receive appropriate partner roles inside corresponding discord chats.
                      </p>
                    </div>

                    <button onClick={() => alert("Directing to Discord gateway authorization...")} className="w-full text-center rounded-xl bg-[#5865F2] hover:bg-opacity-95 text-white text-xs font-bold py-3 uppercase tracking-wider mt-4 cursor-pointer">
                      Link Discord Account
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* RENDER VIEW: PRICING SECTION */}
            {currentPage === "pricing" && (
              <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 text-left space-y-12">
                
                <div className="text-center space-y-2 max-w-xl mx-auto">
                  <span className="font-mono text-xs uppercase text-primary font-bold tracking-widest font-semibold">Transparent Plans</span>
                  <h3 className="font-display text-4xl font-extrabold text-white">Streamer Pricing Tiers</h3>
                  <p className="text-xs text-gray-400">
                    Madhouses provides absolute transparency. No hidden gateway fees, no artificial routing subtractions.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Starter card */}
                  <div className="rounded-3xl border border-white/5 bg-dark-card p-6 space-y-5 text-left flex flex-col justify-between hover:border-primary/25 transition-all">
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">Standard</span>
                      <h4 className="font-display text-lg font-bold text-white">Starter Node</h4>
                      <p className="text-xs text-gray-450 leading-relaxed text-gray-400">Ideal for amateur streamers scaling concurrent viewers and testing microtip modules.</p>
                      <div className="font-display text-3xl font-extrabold text-white">Free</div>
                    </div>

                    <ul className="space-y-2 text-xs text-gray-300 border-t border-white/5 pt-4">
                      <li className="flex items-center gap-2">✓ Standard 1080p source encoding</li>
                      <li className="flex items-center gap-2">✓ 90/10 Tier sub revenue split</li>
                      <li className="flex items-center gap-2">✓ 100% Spark tips payout (direct debit)</li>
                      <li className="flex items-center gap-2">✓ Basic chat moderation bot</li>
                    </ul>
                  </div>

                  {/* Pro card */}
                  <div className="rounded-3xl border border-primary bg-primary/5 p-6 space-y-5 text-left flex flex-col justify-between relative overflow-hidden shadow-2xl">
                    <div className="absolute top-2 right-2 rounded bg-primary px-1.5 py-0.5 font-mono text-[9px] text-white">RECOMMENDED</div>
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] text-primary uppercase tracking-widest font-extrabold">Professional</span>
                      <h4 className="font-display text-lg font-bold text-white">Creator Pro</h4>
                      <p className="text-xs text-gray-450 leading-relaxed text-gray-300">Perfect for daily streamers requiring advanced analytical feedback and multihost controls.</p>
                      <div className="font-display text-3xl font-extrabold text-white">$19 / mo</div>
                    </div>

                    <ul className="space-y-2 text-xs text-gray-200 border-t border-primary/20 pt-4">
                      <li className="flex items-center gap-2 text-primary font-semibold">✓ Multi-stream cloud relay (RTMP)</li>
                      <li className="flex items-center gap-2">✓ Advanced analytical panels</li>
                      <li className="flex items-center gap-2">✓ Custom subscriber emojis & badge packs</li>
                      <li className="flex items-center gap-2">✓ Dedicated discord synchronization bot</li>
                    </ul>
                  </div>

                  {/* Elite card */}
                  <div className="rounded-3xl border border-white/5 bg-dark-card p-6 space-y-5 text-left flex flex-col justify-between hover:border-accent/25 transition-all">
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] text-accent uppercase tracking-widest font-bold font-semibold">Enterprise</span>
                      <h4 className="font-display text-lg font-bold text-white">Studio Elite</h4>
                      <p className="text-xs text-gray-450 leading-relaxed text-gray-400">Suitable for streaming houses, labels, agencies, and large-scale interactive broadcasts.</p>
                      <div className="font-display text-3xl font-extrabold text-white">Custom / Quote</div>
                    </div>

                    <ul className="space-y-2 text-xs text-gray-300 border-t border-white/5 pt-4">
                      <li className="flex items-center gap-2">✓ White-labeled custom viewing sites</li>
                      <li className="flex items-center gap-2">✓ API endpoint configuration parameters</li>
                      <li className="flex items-center gap-2">✓ 24/7 dedicated telephone hotline</li>
                      <li className="flex items-center gap-2">✓ Fully customized billing & taxes metrics</li>
                    </ul>
                  </div>

                </div>
              </div>
            )}

            {/* RENDER VIEW: ENTERPRISE solutions */}
            {currentPage === "enterprise" && (
              <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-left space-y-12">
                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase text-primary tracking-widest font-bold">API & Broadcasters</span>
                  <h2 className="font-display text-4xl font-extrabold text-white">Enterprise Streaming Solutions</h2>
                  <p className="text-xs sm:text-sm text-gray-350 leading-relaxed">
                    We provision isolated WebRTC broadcast channels, dedicated transcoders, API keys, and custom webhooks for esports leagues, collegiate sports, virtual conferences, and enterprise brands needing premium media delivery.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
                  <div className="border border-white/5 bg-white/5 p-5 rounded-2xl space-y-2">
                    <h4 className="font-bold text-white text-sm">Full White-Labeling Setup</h4>
                    <p className="text-gray-400">Host live feeds on your custom enterprise domains, fully branded to client aesthetics with zero Madhouse mentions.</p>
                  </div>
                  <div className="border border-white/5 bg-white/5 p-5 rounded-2xl space-y-2">
                    <h4 className="font-bold text-white text-sm">High security SSO Gateway</h4>
                    <p className="text-gray-400">Incorporate SAML SSO, Active Directory permissions, and dedicated client PIN keys securely.</p>
                  </div>
                  <div className="border border-white/5 bg-white/5 p-5 rounded-2xl space-y-2">
                    <h4 className="font-bold text-white text-sm">Dedicated SLA Transcoder</h4>
                    <p className="text-gray-400">Guaranteed 4K transcoding relays with 99.997% server operational timelines and custom support.</p>
                  </div>
                </div>
              </div>
            )}

            {/* RENDER VIEW: CAREERS */}
            {currentPage === "careers" && (
              <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 text-left">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl font-extrabold text-white">Join Core Engineering</h2>
                  <p className="text-xs text-gray-400">We are a remote-first group developing next-generation video delivery architectures.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {CAREERS_DATA.map((job) => (
                    <div 
                      key={job.id}
                      className="rounded-2xl border border-white/5 bg-dark-card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-primary/20 transition-all"
                    >
                      <div className="space-y-1.5">
                        <h4 className="font-display text-base font-bold text-white">{job.title}</h4>
                        <div className="flex flex-wrap gap-3 font-mono text-[10px] text-gray-500 uppercase tracking-tight">
                          <span>📍 {job.location}</span>
                          <span>•</span>
                          <span>📂 {job.department}</span>
                          <span>•</span>
                          <span>⏱️ {job.type}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                        <span className="font-mono text-xs text-primary font-bold">{job.salaryRange}</span>
                        <button 
                          id={`apply-job-${job.id}`}
                          onClick={() => handleCareerApply(job.id)}
                          className="rounded-lg bg-primary hover:opacity-90 px-4 py-2 text-[10px] font-bold text-white uppercase tracking-wider cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RENDER VIEW: BLOG */}
            {currentPage === "blog" && (
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 text-left">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl font-extrabold text-white">The Creator Blog</h2>
                  <p className="text-xs text-gray-400">Insights, optimization tricks, algorithms, and updates from key engineering groups.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {BLOG_DATA.map((post) => (
                    <div 
                      key={post.id}
                      className="rounded-3xl border border-white/5 bg-dark-card overflow-hidden hover:border-primary/25 transition-all text-left flex flex-col justify-between"
                    >
                      <div className="p-6 space-y-3">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-bold px-1.5 py-0.5 rounded bg-accent/15 border border-accent/10">
                          {post.category}
                        </span>
                        <h4 className="font-display text-base font-bold text-white leading-normal pt-1.5">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="p-6 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-gray-500">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RENDER VIEW: SUPPORT CENTER / FAQ (20+ conversion-focused FAQs categorize-able) */}
            {currentPage === "support" && (
              <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 text-left">
                
                <div className="text-center space-y-3 max-w-xl mx-auto">
                  <span className="font-mono text-xs uppercase text-primary font-bold tracking-widest font-semibold">Knowledge Database</span>
                  <h2 className="font-display text-3xl font-extrabold text-white">Support Center</h2>
                  <p className="text-xs text-gray-400">
                    Search exactly 20+ detailed, conversion-focused entries covering stream bitrates, splits, DMCA, and latency mechanics.
                  </p>
                </div>

                {/* FAQ categories toggler and search indicators */}
                <div className="flex flex-wrap gap-2 justify-center border-b border-white/5 pb-6">
                  {["all", "creators", "viewers", "payments", "rules"].map((cat) => (
                    <button
                      key={cat}
                      id={`faq-cat-filter-${cat}`}
                      onClick={() => setFaqCategory(cat)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        faqCategory === cat 
                          ? "bg-primary text-white" 
                          : "bg-white/5 border border-white/5 text-gray-300 hover:text-white"
                      }`}
                    >
                      {cat === "all" ? "All questions" : cat}
                    </button>
                  ))}
                </div>

                {/* Accordion Questions loop */}
                <div className="space-y-3">
                  {FAQ_DATA.filter(f => faqCategory === "all" ? true : f.category === faqCategory).map((item) => {
                    const isOpen = !!faqExpanded[item.id];
                    return (
                      <div 
                        key={item.id}
                        id={`faq-item-comp-${item.id}`}
                        className="rounded-2xl border border-white/5 bg-[#0F172A] overflow-hidden transition-all text-left"
                      >
                        <button
                          id={`faq-toggle-trigger-${item.id}`}
                          onClick={() => toggleAccordion(item.id)}
                          className="w-full flex items-center justify-between p-5 text-xs text-white font-bold leading-normal text-left cursor-pointer"
                        >
                          <span>{item.question}</span>
                          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`} />
                        </button>
                        
                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-xs text-gray-300 leading-relaxed border-t border-white/5 bg-black/30 font-medium">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Contact and Help Desk option */}
                <div className="rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-white/10 p-6 text-center space-y-3">
                  <h4 className="font-display font-semibold text-white">Can't find answer to specific broadcast queries?</h4>
                  <p className="text-xs text-gray-450 text-gray-400">Our customer safety personnel are online 24 hours a day, 7 days a week.</p>
                  <button onClick={() => setCurrentPage("contact")} className="rounded-xl bg-primary px-5 py-2.5 text-xs font-bold uppercase text-white shadow-sm cursor-pointer">
                    Contact Partnerships Desk
                  </button>
                </div>

              </div>
            )}

            {/* RENDER VIEW: CONTACT */}
            {currentPage === "contact" && (
              <div className="mx-auto max-w-lg px-4 py-12 sm:px-6 lg:px-8 space-y-8 text-left">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl font-extrabold text-white">Contact Partnerships</h2>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Have questions about the Partner program? Want to execute white-labeled tournaments? Send details down our security relay channels.
                  </p>
                </div>

                {contactSubmitted ? (
                  <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-6 text-center space-y-3">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
                    <h4 className="font-bold text-white">Relay Transmission Succeeded</h4>
                    <p className="text-xs text-gray-300">
                      Your details are logged. A partnership manager will wire replies securely within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-sans">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-sender-name" className="text-gray-400">FullName / Identity</label>
                      <input required id="contact-sender-name" type="text" placeholder="e.g. Liam Wu" className="w-full rounded bg-black border border-white/10 px-3.5 py-2.5 text-white outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-sender-email" className="text-gray-400">Email Address</label>
                      <input required id="contact-sender-email" type="email" placeholder="you@domain.com" className="w-full rounded bg-black border border-white/10 px-3.5 py-2.5 text-white outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-message-body" className="text-gray-400">Message details / Pitch</label>
                      <textarea required id="contact-message-body" rows={4} placeholder="I want to discuss partner programs for my Twitch community of 10k viewers..." className="w-full rounded bg-black border border-white/10 px-3.5 py-2.5 text-white outline-none" />
                    </div>
                    <button type="submit" className="w-full rounded bg-primary hover:bg-opacity-95 py-3 font-bold uppercase text-xs text-white shadow shadow-primary/25 cursor-pointer">
                      Send Secure Message
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* RENDER VIEW: CREATOR DASHBOARD WORKSPACE */}
            {currentPage === "dashboard" && (
              <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <CreatorDashboard />
              </div>
            )}
          </>
        )}

      </main>

      {/* Global Onboarding & modal wrappers (Max registration options) */}
      {showSignUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowSignUp(false)} />
          <div className="relative z-10 w-full max-w-xl">
            <OnboardingFlow 
              onComplete={handleOnboardingComplete}
              onCancel={() => setShowSignUp(false)}
            />
          </div>
        </div>
      )}

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowLogin(false)} />
          <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#0F172A] p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-1.5">
              <h4 className="font-display text-xl font-bold text-white">Welcome Back Creator</h4>
              <p className="text-gray-400 text-xs text-shor">Sign in to initialize standard multi-host WebRTC gateways.</p>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              setShowLogin(false);
              setIsLoggedIn(true);
              setCurrentUser("Max Broadcaster");
              setCurrentPage("dashboard");
            }} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label htmlFor="login-email-input" className="text-gray-400">Email Address</label>
                <input required id="login-email-input" type="email" placeholder="broadcaster@madhouse.com" className="w-full bg-black rounded p-2.5 text-white border border-white/10 outline-none" />
              </div>
              <div className="space-y-1">
                <label htmlFor="login-pwd-input" className="text-gray-400">Passcode</label>
                <input required id="login-pwd-input" type="password" placeholder="••••••••" className="w-full bg-black rounded p-2.5 text-white border border-white/10 outline-none" />
              </div>
              <button type="submit" className="w-full rounded bg-primary py-3 font-semibold uppercase text-xs text-white hover:opacity-95 cursor-pointer">
                Unlock Node Panel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Conversion Optimizing Overlays */}
      <ExitIntentModal onOpenSignUp={() => setShowSignUp(true)} />
      <LiveActivityFeed />

      {/* Global Footer */}
      <Footer setCurrentPage={setCurrentPage} />

    </div>
  );
}
