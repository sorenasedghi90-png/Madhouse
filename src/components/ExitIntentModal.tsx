import React, { useState, useEffect } from "react";
import { X, Sparkles, Flame, ShieldAlert, Award } from "lucide-react";

interface ExitIntentModalProps {
  onOpenSignUp: () => void;
}

export default function ExitIntentModal({ onOpenSignUp }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if mouse leaves viewport to the top (where tab navigation is usually located)
      if (e.clientY < 30 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasTriggered]);

  const handleCTA = () => {
    setIsOpen(false);
    onOpenSignUp();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#0F172A] p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Glow circle background */}
        <div className="absolute top-[-50px] right-[-50px] -z-10 h-36 w-36 rounded-full bg-primary/25 blur-3xl animate-pulse" />
        
        {/* Close Button */}
        <button
          id="exit-modal-close-btn"
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <Flame className="h-8 w-8 animate-pulse text-accent" />
          </div>

          <div className="space-y-2">
            <h4 className="font-display text-xl font-extrabold text-white">
              Don't Stream Into Empty Voids!
            </h4>
            <p className="text-gray-300 text-xs leading-relaxed max-w-sm mx-auto">
              Other platforms grab 50% of your hard-earned subscription revenues. Join <span className="text-primary font-bold">150,000+ active creators</span> at Madhouse and keep exactly <span className="text-green-400 font-extrabold">90% of sub gains</span> today.
            </p>
          </div>

          {/* Core high-converting metrics highlights */}
          <div className="grid grid-cols-2 gap-3 bg-black/30 border border-white/5 rounded-2xl p-4 text-left">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-gray-500 uppercase">Latency Ratio</span>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <span>0.8s - 1.2s</span>
              </div>
            </div>
            
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-gray-500 uppercase">Creator Split</span>
              <div className="text-sm font-bold text-accent">90% Retained</div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              id="exit-modal-cta"
              onClick={handleCTA}
              className="w-full rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/20 cursor-pointer"
            >
              Start Streaming Free Today
            </button>
            <button
              id="exit-modal-secondary-cta"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white text-xs font-semibold uppercase tracking-wider"
            >
              Continue Exploring Website
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
