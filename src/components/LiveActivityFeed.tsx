import React, { useState, useEffect } from "react";
import { Sparkles, Trophy, Users, ShieldAlert, Heart, Coins } from "lucide-react";

interface ActivityNotification {
  id: string;
  type: "sub" | "partner" | "tip" | "join";
  message: string;
  username: string;
  detail: string;
}

export default function LiveActivityFeed() {
  const [notification, setNotification] = useState<ActivityNotification | null>(null);

  const notificationsPool: Omit<ActivityNotification, "id">[] = [
    { type: "sub", username: "AlphaGamer", message: "just subscribed to Clutch_Queen at Tier 3!", detail: "90% split applied" },
    { type: "join", username: "Aria_Code", message: "just launched custom modular stream overlays!", detail: "Latency: 0.8s" },
    { type: "tip", username: "Sora_N", message: "tipped 1,500 Sparks to SynthWave_Max!", detail: "+$15.00 net tips" },
    { type: "partner", username: "Vortex_Gaming", message: "just unlocked Premium Partner Tier!", detail: "250 subscribers reached" },
    { type: "sub", username: "RustDeveloper", message: "just subscribed to Aria_Code", detail: "Tier 1 membership" },
    { type: "join", username: "Neon_Chef", message: "just hosted a live multi-stream broadcast!", detail: "Obs Studio Integrated" }
  ];

  useEffect(() => {
    // Show a toast notification every 14 seconds, keep visible for 5.5 seconds
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * notificationsPool.length);
      const data = notificationsPool[idx];
      setNotification({
        id: Math.random().toString(),
        ...data
      });

      // Clear after 5.5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5500);

    }, 14000);

    // Initial delay trigger
    const initialDelay = setTimeout(() => {
      setNotification({
        id: "initial",
        type: "tip",
        username: "Alex_P",
        message: "tipped 500 Sparks to SynthWave_Max",
        detail: "100% tip split"
      });
      setTimeout(() => setNotification(null), 5500);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialDelay);
    };
  }, []);

  if (!notification) return null;

  const renderIcon = () => {
    switch (notification.type) {
      case "sub":
        return <Heart className="h-4 w-4 text-accent fill-accent" />;
      case "partner":
        return <Trophy className="h-4 w-4 text-yellow-400" />;
      case "tip":
        return <Coins className="h-4 w-4 text-green-400" />;
      case "join":
        return <Sparkles className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm rounded-2xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-md animate-fade-in flex items-start gap-3 border-l-4 border-l-primary/80">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5">
        {renderIcon()}
      </div>
      <div className="flex-1 space-y-0.5">
        <div className="text-xs text-white leading-relaxed font-sans">
          <span className="font-bold text-primary">@{notification.username}</span> {notification.message}
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase tracking-tight">
          <span>{notification.detail}</span>
          <span className="text-[9px] text-accent font-semibold animate-pulse-live">● Live Activity</span>
        </div>
      </div>
    </div>
  );
}
