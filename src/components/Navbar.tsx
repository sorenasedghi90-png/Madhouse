import React, { useState } from "react";
import { 
  Tv, 
  Search, 
  Menu, 
  X, 
  User, 
  TrendingUp, 
  Award, 
  Smartphone, 
  Coins, 
  HelpCircle, 
  Layers, 
  Code,
  Sparkles,
  ChevronDown
} from "lucide-react";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (login: boolean) => void;
  onOpenSignUp: () => void;
  onOpenLogin: () => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  searchQuery,
  setSearchQuery,
  isLoggedIn,
  setIsLoggedIn,
  onOpenSignUp,
  onOpenLogin,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  // Helper to change page and close menus
  const handleNav = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    { id: "browse", name: "Browse Live", icon: Tv },
    { id: "categories", name: "Categories", icon: Layers },
    { id: "creators", name: "Creators", icon: User },
    { id: "partner", name: "Partner Program", icon: Award },
    { id: "monetization", name: "Monetization", icon: Coins },
    { id: "pricing", name: "Pricing", icon: Sparkles },
  ];

  const megaMenuItems = [
    { title: "Apps & Tech", items: [
      { id: "mobile", name: "Mobile & TV Apps", desc: "Download native iOS & Android binaries", icon: Smartphone },
      { id: "enterprise", name: "Enterprise Broadcast", desc: "Custom white-label esports solutions", icon: Code },
    ]},
    { title: "Company", items: [
      { id: "about", name: "About Madhouse", desc: "Our 90/10 mission & culture", icon: Tv },
      { id: "careers", name: "Careers", desc: "Remote-first roles & benefits", icon: TrendingUp },
      { id: "blog", name: "Creator Blog", desc: "Growth, algorithms, and tech updates", icon: Layers },
    ]},
    { title: "Support", items: [
      { id: "support", name: "Support Center", desc: "24/7 technical documentation & FAQs", icon: HelpCircle },
      { id: "contact", name: "Contact & Sales", desc: "Partner negotiations and enterprise inquiries", icon: User },
    ]}
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0F172A]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNav("home")}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] p-0.5 text-white transition-transform group-hover:scale-105">
              <div className="flex h-4 w-4 rotate-45 items-center justify-center rounded-sm bg-white">
                <div className="h-1 w-1 rounded-full bg-[#07070A]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-black tracking-tighter uppercase italic text-white transition-colors group-hover:text-[#8B5CF6]">
                MADHOUSE
              </span>
              <span className="font-mono text-[8px] tracking-widest text-[#3B82F6] uppercase animate-pulse-live">
                Live Server Hub
              </span>
            </div>
          </div>

          {/* Desktop Core Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive 
                      ? "bg-white/10 text-white border border-white/10" 
                      : "text-[#CBD5E1] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.name}
                </button>
              );
            })}

            {/* Platform Dropdown Toggle */}
            <div className="relative">
              <button
                id="mega-menu-trigger"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <span>Platform</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${megaMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {megaMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMegaMenuOpen(false)} />
                  <div className="absolute right-0 top-11 z-20 w-[640px] rounded-2xl border border-white/10 bg-[#07070A]/95 p-6 shadow-2xl backdrop-blur-xl animate-fade-in">
                    <div className="grid grid-cols-3 gap-6">
                      {megaMenuItems.map((cat, idx) => (
                        <div key={idx} className="flex flex-col gap-4">
                          <h4 className="font-display text-xs font-semibold tracking-wider text-[#8B5CF6] uppercase">
                            {cat.title}
                          </h4>
                          <div className="flex flex-col gap-2">
                            {cat.items.map((subItem) => {
                              const SubIcon = subItem.icon;
                              return (
                                <button
                                  key={subItem.id}
                                  id={`mega-sub-${subItem.id}`}
                                  onClick={() => handleNav(subItem.id)}
                                  className="group/item flex flex-col gap-0.5 rounded-lg p-2 text-left transition-colors hover:bg-white/5"
                                >
                                  <div className="flex items-center gap-1.5 text-sm font-medium text-white group-hover/item:text-[#EC4899]">
                                    <SubIcon className="h-4 w-4 text-[#3B82F6] group-hover/item:text-[#8B5CF6]" />
                                    <span>{subItem.name}</span>
                                  </div>
                                  <span className="text-[11px] text-white/50 group-hover/item:text-[#CBD5E1] leading-tight">
                                    {subItem.desc}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Search Box - Only visible on browse/categories/home */}
          <div className="flex-1 max-w-[220px] md:max-w-[320px] relative hidden sm:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-3.5 w-3.5 text-white/30" />
            </div>
            <input
              type="text"
              id="global-search-input"
              placeholder="Search channels, creators, games..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // If query starts typing and they aren't on browse, we should transition to browse page for optimal discovery UX
                if (currentPage !== "browse" && currentPage !== "dashboard") {
                  setCurrentPage("browse");
                }
              }}
              className="w-full bg-[#07070A] border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-[#CBD5E1] placeholder-white/30 outline-none transition-all focus:border-[#8B5CF6]/55 focus:ring-0"
            />
          </div>

          {/* User / Sign In Actions */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  id="navbar-dashboard-btn"
                  onClick={() => handleNav("dashboard")}
                  className={`hidden sm:flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${
                    currentPage === "dashboard"
                      ? "bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white shadow-lg shadow-[#EC4899]/20"
                      : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  Creator Dashboard
                </button>
                <div 
                  onClick={() => handleNav("dashboard")}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:opacity-80"
                >
                  <User className="h-4 w-4 text-[#8B5CF6]" />
                </div>
                <button
                  id="navbar-logout-btn"
                  onClick={() => {
                    setIsLoggedIn(false);
                    handleNav("home");
                  }}
                  className="text-xs font-bold uppercase tracking-widest text-[#CBD5E1] hover:text-white transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  id="navbar-login-btn"
                  onClick={onOpenLogin}
                  className="text-xs font-bold uppercase tracking-widest text-[#CBD5E1] hover:text-white transition-colors"
                >
                  Log In
                </button>
                <button
                  id="navbar-signup-btn"
                  onClick={onOpenSignUp}
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#8B5CF6]/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  Start Streaming
                </button>
              </div>
            )}

            {/* Mobile Menu Icon */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-1.5 text-gray-400 hover:text-white hover:bg-white/5 lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-black/95 px-4 py-4 md:px-8 space-y-4 lg:hidden">
          {/* Core Menu */}
          <div className="grid grid-cols-2 gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`nav-mob-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 rounded-lg p-2.5 text-left text-xs font-medium ${
                    currentPage === item.id 
                      ? "bg-primary/20 text-primary border border-primary/20" 
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </button>
              );
            })}
          </div>

          <hr className="border-white/10" />

          {/* Sub menu lists */}
          <div className="space-y-3">
            <h5 className="font-display text-[10px] font-semibold tracking-wider text-secondary uppercase px-1">
              Platforms & Corporate
            </h5>
            <div className="grid grid-cols-1 gap-1 pl-1">
              {megaMenuItems.flatMap(m => m.items).map((subItem) => (
                <button
                  key={subItem.id}
                  id={`nav-mob-sub-${subItem.id}`}
                  onClick={() => handleNav(subItem.id)}
                  className="flex items-center gap-2 rounded-md py-1 text-xs text-gray-400 hover:text-white text-left transition-colors"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                  <span>{subItem.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Creator button */}
          {isLoggedIn && (
            <button
              id="nav-mob-dashboard-btn"
              onClick={() => handleNav("dashboard")}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white shadow-md cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              Creator Panel
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
