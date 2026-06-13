import React, { useState } from "react";
import { 
  Users, 
  Tv, 
  Gamepad2, 
  Music, 
  Trophy, 
  Check, 
  Lock, 
  Sparkles, 
  Smartphone, 
  Palette, 
  UserPlus, 
  ArrowRight,
  ShieldAlert,
  Award
} from "lucide-react";

interface OnboardingFlowProps {
  onComplete: (username: string, choice: "creator" | "viewer") => void;
  onCancel: () => void;
}

export default function OnboardingFlow({ onComplete, onCancel }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  
  // Registration data state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [persona, setPersona] = useState<"creator" | "viewer">("creator");
  const [interests, setInterests] = useState<string[]>([]);
  const [themeColor, setThemeColor] = useState("purple");
  const [avatarIndex, setAvatarIndex] = useState(0);

  const interestOptions = [
    { name: "Gaming Campaigns", icon: Gamepad2, id: "gaming" },
    { name: "Music Production", icon: Music, id: "music" },
    { name: "Live Software Coding", icon: Trophy, id: "tech" },
    { name: "Talk Shows & Podcasts", icon: Users, id: "pods" },
    { name: "Outdoor IRL streams", icon: Tv, id: "irl" },
    { name: "Esports tournaments", icon: Award, id: "sports" }
  ];

  const avatars = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
  ];

  const toggleInterest = (id: string) => {
    if (interests.includes(id)) {
      setInterests(prev => prev.filter(i => i !== id));
    } else {
      setInterests(prev => [...prev, id]);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!username || !email || !password) {
        alert("Please complete all registration fields.");
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleFinish = () => {
    onComplete(username || "StreamerHero", persona);
  };

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-[#0F172A] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      
      {/* Visual cyber decorations */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
      <div className="absolute bottom-[-150px] right-[-150px] -z-10 h-72 w-72 rounded-full bg-accent/15 blur-[100px]" />
      <div className="absolute top-[-150px] left-[-150px] -z-10 h-72 w-72 rounded-full bg-primary/15 blur-[100px]" />

      {/* Progress Steppers Indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex-1 flex items-center">
            <div className={`h-8 w-8 rounded-full font-mono text-xs font-bold flex items-center justify-center transition-all ${
              step >= s 
                ? "bg-primary text-white shadow-[0_0_12px_rgba(139,92,246,0.5)] scale-105" 
                : "bg-white/5 border border-white/10 text-gray-400"
            }`}>
              {step > s ? <Check className="h-4 w-4" /> : s}
            </div>
            {s < 5 && (
              <div className={`h-[2px] flex-1 mx-2 transition-all ${
                step > s ? "bg-primary" : "bg-white/5"
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* STEP 1: Account Creation fields */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-xs text-primary font-bold tracking-wider uppercase">Step 01 / 05</span>
            <h3 className="font-display text-2xl font-bold text-white">Create Your Identity</h3>
            <p className="text-gray-400 text-xs">Fill in your login credentials to initialize your stream credentials.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="onboarding-username" className="text-xs uppercase font-mono text-gray-300 font-semibold tracking-wider">Username</label>
              <input
                type="text"
                id="onboarding-username"
                required
                placeholder="e.g. Aria_Code"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="onboarding-email" className="text-xs uppercase font-mono text-gray-300 font-semibold tracking-wider">Email Address</label>
              <input
                type="email"
                id="onboarding-email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="onboarding-password" className="text-xs uppercase font-mono text-gray-300 font-semibold tracking-wider flex items-center justify-between">
                <span>Password</span>
                <span className="text-[10px] text-gray-400 font-light flex items-center gap-1">
                  <Lock className="h-3 w-3" /> Encrypted Net Node
                </span>
              </label>
              <input
                type="password"
                id="onboarding-password"
                required
                placeholder="🔒 SuperSecure123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 justify-end pt-4">
            <button
              id="onboarding-cancel-btn"
              onClick={onCancel}
              className="text-gray-400 hover:text-white text-xs px-4 py-2"
            >
              Cancel
            </button>
            <button
              id="onboarding-step1-next"
              onClick={handleNextStep}
              className="flex items-center gap-1.5 rounded-xl bg-primary hover:opacity-90 px-5 py-2.5 text-xs font-bold uppercase text-white shadow-md cursor-pointer"
            >
              Next Step
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Persona Selection (Creator or Viewer) */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-xs text-primary font-bold tracking-wider uppercase">Step 02 / 05</span>
            <h3 className="font-display text-2xl font-bold text-white">Choose Your Persona</h3>
            <p className="text-gray-400 text-xs">How do you intend to unleash the Madhouse live stream systems?</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Viewer persona */}
            <div 
              id="persona-viewer-btn"
              onClick={() => setPersona("viewer")}
              className={`rounded-2xl border p-5 cursor-pointer text-left transition-all space-y-3 relative overflow-hidden ${
                persona === "viewer"
                  ? "bg-secondary/15 border-secondary shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  : "bg-black/40 border-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                <Tv className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-white">Active Viewer</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Discover streams, gift Sparks, interact with automated overlays, and unlock exclusive channel points systems.
                </p>
              </div>
              {persona === "viewer" && (
                <div className="absolute right-3 top-3 h-5 w-5 rounded-full bg-secondary text-white flex items-center justify-center">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </div>

            {/* Creator persona */}
            <div 
              id="persona-creator-btn"
              onClick={() => setPersona("creator")}
              className={`rounded-2xl border p-5 cursor-pointer text-left transition-all space-y-3 relative overflow-hidden ${
                persona === "creator"
                  ? "bg-primary/15 border-primary shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  : "bg-black/40 border-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-white">Broadcaster / Creator</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Broadcast at 1080p, integrate custom widgets, earn through 90/10 sub splits, and manage schedule cards.
                </p>
              </div>
              {persona === "creator" && (
                <div className="absolute right-3 top-3 h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </div>

          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              id="onboarding-step2-prev"
              onClick={handlePrevStep}
              className="text-gray-400 hover:text-white text-xs font-semibold uppercase tracking-wider"
            >
              Back
            </button>
            <button
              id="onboarding-step2-next"
              onClick={handleNextStep}
              className="flex items-center gap-1.5 rounded-xl bg-primary hover:opacity-90 px-5 py-2.5 text-xs font-bold uppercase text-white shadow-md cursor-pointer"
            >
              Next Step
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Interests Tags Selection */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-xs text-primary font-bold tracking-wider uppercase">Step 03 / 05</span>
            <h3 className="font-display text-2xl font-bold text-white">Select Interests</h3>
            <p className="text-gray-400 text-xs">Help customized stream dashboards filter corresponding channel tags.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {interestOptions.map((opt) => {
              const OptIcon = opt.icon;
              const isSelected = interests.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  id={`interest-opt-${opt.id}`}
                  onClick={() => toggleInterest(opt.id)}
                  className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-accent/15 border-accent text-white shadow-sm" 
                      : "bg-black/30 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${isSelected ? "bg-accent/20 text-accent" : "bg-white/5"}`}>
                    <OptIcon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold">{opt.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              id="onboarding-step3-prev"
              onClick={handlePrevStep}
              className="text-gray-400 hover:text-white text-xs font-semibold uppercase tracking-wider"
            >
              Back
            </button>
            <button
              id="onboarding-step3-next"
              onClick={handleNextStep}
              className="flex items-center gap-1.5 rounded-xl bg-primary hover:opacity-90 px-5 py-2.5 text-xs font-bold uppercase text-white shadow-md cursor-pointer"
            >
              Next Step
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Personalization and Avatars */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-xs text-primary font-bold tracking-wider uppercase">Step 04 / 05</span>
            <h3 className="font-display text-2xl font-bold text-white">Customize Appearance</h3>
            <p className="text-gray-400 text-xs text-shor">Select an operational avatar identity and layout accent details.</p>
          </div>

          <div className="space-y-5">
            
            {/* Avatar Selectors */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-mono text-gray-400 font-bold">Pick an Avatar</label>
              <div className="flex items-center gap-3">
                {avatars.map((url, idx) => (
                  <button
                    key={idx}
                    id={`avatar-opt-${idx}`}
                    onClick={() => setAvatarIndex(idx)}
                    className={`h-14 w-14 rounded-full overflow-hidden transition-all relative cursor-pointer border-2 ${
                      avatarIndex === idx ? "border-primary scale-105" : "border-transparent opacity-60"
                    }`}
                  >
                    <img src={url} alt={`Avatar option ${idx}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    {avatarIndex === idx && (
                      <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Theme Selection */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-mono text-gray-400 font-bold">Select Streaming Color Accent</label>
              <div className="flex items-center gap-3">
                {[
                  { id: "purple", color: "bg-primary" },
                  { id: "blue", color: "bg-secondary" },
                  { id: "pink", color: "bg-accent" }
                ].map((th) => (
                  <button
                    key={th.id}
                    id={`onboard-theme-${th.id}`}
                    onClick={() => setThemeColor(th.id)}
                    className={`h-9 w-9 rounded-xl ${th.color} transition-all relative cursor-pointer ${
                      themeColor === th.id ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-105" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    {themeColor === th.id && (
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              id="onboarding-step4-prev"
              onClick={handlePrevStep}
              className="text-gray-400 hover:text-white text-xs font-semibold uppercase tracking-wider"
            >
              Back
            </button>
            <button
              id="onboarding-step4-next"
              onClick={handleNextStep}
              className="flex items-center gap-1.5 rounded-xl bg-primary hover:opacity-90 px-5 py-2.5 text-xs font-bold uppercase text-white shadow-md cursor-pointer"
            >
              Generate Welcome Card
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Welcome Confirmation Card */}
      {step === 5 && (
        <div className="space-y-6 text-center py-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)] animate-bounce">
            <Sparkles className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs text-green-400 font-bold tracking-wider uppercase">Step 05 / 05</span>
            <h3 className="font-display text-2xl font-extrabold text-white">You're Inside the Madhouse!</h3>
            <p className="text-gray-300 text-sm max-w-sm mx-auto leading-relaxed">
              Welcome, <span className="text-primary font-bold">{username}</span>! Your {persona === "creator" ? "creator portal" : "viewer console"} is initialized on our global WebRTC servers.
            </p>
          </div>

          {/* Setup review panel */}
          <div className="rounded-2xl border border-white/5 bg-black/40 p-4 max-w-xs mx-auto text-left space-y-2.5">
            <div className="flex items-center gap-3">
              <img src={avatars[avatarIndex]} alt={username} className="h-10 w-10 rounded-full border border-primary object-cover" referrerPolicy="no-referrer" />
              <div>
                <div className="font-bold text-xs text-white">@{username}</div>
                <div className="text-[10px] text-gray-400 font-mono">Role: {persona.toUpperCase()}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 font-mono text-[9px] text-gray-500">
              {interests.map(i => (
                <span key={i} className="bg-white/5 text-gray-300 px-1.5 py-0.5 rounded">#{i}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 pt-4">
            <button
              id="onboarding-welcome-submit"
              onClick={handleFinish}
              className="w-full rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 py-3 text-xs font-bold tracking-wider uppercase text-white shadow-lg shadow-primary/20 cursor-pointer"
            >
              Enter Dashboard Portal
            </button>
            <p className="text-[10px] text-gray-500">
              Direct and anonymous encryption in compliance with DMCA guidelines.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
