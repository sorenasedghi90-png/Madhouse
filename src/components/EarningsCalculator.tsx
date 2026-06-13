import React, { useState, useEffect } from "react";
import { Coins, Flame, Laptop, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

export default function EarningsCalculator() {
  const [subscribers, setSubscribers] = useState(500);
  const [sparkTips, setSparkTips] = useState(250); // Monthly Sparks
  const [avgViewers, setAvgViewers] = useState(150);

  // Computed values
  const [madhouseSubsRevenue, setMadhouseSubsRevenue] = useState(0);
  const [competitorSubsRevenue, setCompetitorSubsRevenue] = useState(0);
  
  const [madhouseTipsRevenue, setMadhouseTipsRevenue] = useState(0);
  const [competitorTipsRevenue, setCompetitorTipsRevenue] = useState(0);

  const [madhouseTotal, setMadhouseTotal] = useState(0);
  const [competitorTotal, setCompetitorTotal] = useState(0);
  const [extraEarnings, setExtraEarnings] = useState(0);

  useEffect(() => {
    // Sub cost averages to $4.99 per level
    const avgSubCost = 4.99;
    
    // Madhouse: 90% (0.90) split on Subs
    const mhSubs = subscribers * avgSubCost * 0.90;
    // Twitch: 50% (0.50) split on standard Subs
    const compSubs = subscribers * avgSubCost * 0.50;

    // Tips: Sparks (Madhouse) grants 100% minus standard Stripe card processing (~2.9% + $0.30, avg tip is $5, so ~90% actual net)
    const mhTips = sparkTips * 0.95; 
    // Competitors: Twitch bits or YouTube super chats usually take a 30% cut (retailing at 1.4 cents per bit or outright 30%)
    const compTips = sparkTips * 0.70;

    const mhTotal = mhSubs + mhTips;
    const compTotal = compSubs + compTips;

    setMadhouseSubsRevenue(Math.round(mhSubs));
    setCompetitorSubsRevenue(Math.round(compSubs));
    setMadhouseTipsRevenue(Math.round(mhTips));
    setCompetitorTipsRevenue(Math.round(compTips));
    setMadhouseTotal(Math.round(mhTotal));
    setCompetitorTotal(Math.round(compTotal));
    setExtraEarnings(Math.round(mhTotal - compTotal));
  }, [subscribers, sparkTips, avgViewers]);

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-dark-card to-black p-6 md:p-8 shadow-2xl relative overflow-hidden">
      
      {/* Decorative cyber line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Sliders Area */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
              Predictive Revenue Models
            </span>
            <h3 className="font-display text-2xl font-bold text-white">
              Creator Income Estimator
            </h3>
            <p className="text-sm text-gray-405 text-gray-400">
              Drag the sliders below to configure your typical streaming stats and preview direct payouts.
            </p>
          </div>

          {/* Slider 1: Active Subscribers */}
          <div className="space-y-2 rounded-2xl bg-white/5 p-4 border border-white/5">
            <div className="flex items-center justify-between">
              <label htmlFor="range-subscribers" className="flex items-center gap-1.5 text-xs font-semibold uppercase text-gray-300">
                <Laptop className="h-4 w-4 text-primary" />
                Active Monthly Subscribers
              </label>
              <span className="font-mono text-sm font-bold text-primary">
                {subscribers.toLocaleString()} <span className="text-[10px] text-gray-400">({(subscribers * 4.99).toLocaleString("en-US", { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} gross)</span>
              </span>
            </div>
            <input
              type="range"
              id="range-subscribers"
              min="50"
              max="10000"
              step="50"
              value={subscribers}
              onChange={(e) => setSubscribers(parseInt(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-primary"
            />
            <div className="flex justify-between font-mono text-[9px] text-gray-500">
              <span>50 Subs</span>
              <span>2,500</span>
              <span>5,000</span>
              <span>10,000+ Subs</span>
            </div>
          </div>

          {/* Slider 2: Monthly Tips / Sparks */}
          <div className="space-y-2 rounded-2xl bg-white/5 p-4 border border-white/5">
            <div className="flex items-center justify-between">
              <label htmlFor="range-tips" className="flex items-center gap-1.5 text-xs font-semibold uppercase text-gray-300">
                <Coins className="h-4 w-4 text-accent" />
                Average Monthly Tips ($)
              </label>
              <span className="font-mono text-sm font-bold text-accent">
                ${sparkTips.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              id="range-tips"
              min="10"
              max="5000"
              step="50"
              value={sparkTips}
              onChange={(e) => setSparkTips(parseInt(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-accent"
            />
            <div className="flex justify-between font-mono text-[9px] text-gray-500">
              <span>$10</span>
              <span>$1,250</span>
              <span>$2,500</span>
              <span>$5,000+ Tips</span>
            </div>
          </div>

          {/* Slider 3: Average Concurrent Viewers */}
          <div className="space-y-2 rounded-2xl bg-white/5 p-4 border border-white/5">
            <div className="flex items-center justify-between">
              <label htmlFor="range-viewers" className="flex items-center gap-1.5 text-xs font-semibold uppercase text-gray-300">
                <TrendingUp className="h-4 w-4 text-secondary" />
                Average Live Viewership (CCU)
              </label>
              <span className="font-mono text-sm font-bold text-secondary">
                {avgViewers.toLocaleString()} CCU
              </span>
            </div>
            <input
              type="range"
              id="range-viewers"
              min="10"
              max="1500"
              step="10"
              value={avgViewers}
              onChange={(e) => setAvgViewers(parseInt(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-secondary"
            />
            <div className="flex justify-between font-mono text-[9px] text-gray-500">
              <span>10 CCU</span>
              <span>500</span>
              <span>1,000</span>
              <span>1,500+ CCU</span>
            </div>
          </div>

          {/* Security and Integrity Indicators */}
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-green-400" />
              <span>Full payout transparency</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>Includes average ad revenue share</span>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-5 flex flex-col justify-between border-t border-white/10 pt-6 lg:border-t-0 lg:border-l lg:border-white/10 lg:pt-0 lg:pl-10">
          <div className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-primary/15 to-accent/5 p-5 border border-primary/25 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 top-0 w-24 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                MADHOUSE Net Payout
              </span>
              <div className="font-display text-4xl font-extrabold tracking-tight text-white mt-1">
                ${madhouseTotal.toLocaleString()}
                <span className="text-xs font-normal text-gray-300"> / month</span>
              </div>
              <p className="text-xs text-gray-300 mt-2">
                Based on <span className="text-white font-medium">90/10 tier sub shares</span> & direct Stripe processing integrations.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs">
                <span className="text-gray-400 font-medium">Twitch Split (50/50 Sub Share)</span>
                <span className="font-mono text-gray-300 font-bold">${competitorTotal.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs">
                <span className="text-gray-400 font-medium">Additional Madhouse Profit Margin</span>
                <span className="font-mono text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Flame className="h-3 w-3 inline" />
                  +${extraEarnings.toLocaleString()} / mo
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-xs text-gray-400 space-y-1.5 mt-4">
            <h4 className="font-semibold text-white">How is this possible?</h4>
            <p className="leading-relaxed">
              Traditional broadcast companies operate on heavy operational hierarchies, resulting in massive overhead. Our decentralized WebRTC delivery framework significantly lowers server-routing costs, passing <span className="text-primary font-bold">90% of sub value</span> directly to your bank account.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
