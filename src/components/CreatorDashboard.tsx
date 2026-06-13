import React, { useState, useEffect, useRef } from "react";
import { 
  Video, 
  Play, 
  Square, 
  Settings, 
  Send, 
  Users, 
  Sparkles, 
  Plus, 
  Calendar, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Shield, 
  Camera, 
  Volume2, 
  Mic, 
  Eye,
  TrendingUp,
  BarChart2,
  Tv
} from "lucide-react";

interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  title: string;
}

export default function CreatorDashboard() {
  const [isLive, setIsLive] = useState(false);
  const [webcamActive, setWebcamActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  
  // Chat simulator state
  const [chatMessages, setChatMessages] = useState([
    { id: "1", user: "GamerPro42", text: "Nice stream overlays! Very crisp definition.", time: "10:02" },
    { id: "2", user: "CodeNinja", text: "Is that latency really under 1 second? Unreal.", time: "10:02" },
    { id: "3", user: "Sora_N", text: "Let's goooo! Madhouse split ratio is insane", time: "10:03" }
  ]);
  const [typedMessage, setTypedMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Scheduler state
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    { id: "sch_1", day: "Monday", time: "18:00 UTC", title: "Game Engine Physics Optimization Flow" },
    { id: "sch_2", day: "Wednesday", time: "19:30 UTC", title: "AMA with Esports Champion" }
  ]);
  const [newSlotTitle, setNewSlotTitle] = useState("");
  const [newSlotTime, setNewSlotTime] = useState("20:00 UTC");
  const [newSlotDay, setNewSlotDay] = useState("Friday");
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  // Stream Configuration
  const [streamBitrate, setStreamBitrate] = useState("6500 Kbps");
  const [streamResolution, setStreamResolution] = useState("1080p 60fps");

  // Bot response pool
  const BOT_RESPONSES = [
    "This WebRTC frame is super stable!",
    "Madhouse UI feels ahead of its time.",
    "PogChamp! That was an amazing play.",
    "Can you share your keyboard layout details?",
    "Are we getting a sponsor segment today?",
    "Subscribed with Tier 3! Best value ever.",
    "The audio quality is crystal clear today Max!",
    "Can we spawn a custom alert on stream?",
    "Madhouse split is 90/10, Twitch has 2 hours to explain",
    "Did you rewrite the shader pipeline for this?"
  ];

  const BOT_NAMES = [
    "AstroExplorer", "BinaryBolt", "CherryMuffin", "CyberPunk_9", 
    "DriftKing", "EchoWave", "FallenAngel", "GigaCoder", "HypeTrainMaster"
  ];

  // Auto-scrolling chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Chat message simulator logic when stream is live
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLive) {
      interval = setInterval(() => {
        const randomBot = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
        const randomText = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
        const date = new Date();
        const timeStr = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
        
        setChatMessages(prev => [
          ...prev, 
          { id: Math.random().toString(), user: randomBot, text: randomText, time: timeStr }
        ].slice(-30)); // Keep last 30 to avoid overhead
        
        // Viewer ticker increases slowly
        setViewerCount(prev => Math.min(prev + Math.floor(Math.random() * 15) + 5, 2480));
      }, 3500);
    } else {
      setViewerCount(0);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  // Start webcam feed helper
  const handleToggleBroadcast = async () => {
    if (isLive) {
      // Stopping stream
      setIsLive(false);
      setWebcamActive(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    } else {
      // Launching stream
      setIsLive(true);
      setViewerCount(14); // Initial bots
      setCameraError(false);
      
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: true
        });
        streamRef.current = mediaStream;
        setWebcamActive(true);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(err => console.log("Video auto play error", err));
        }
      } catch (err) {
        console.warn("Camera hardware access denied or not accessible", err);
        setCameraError(true);
        setWebcamActive(false);
      }
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const date = new Date();
    const timeStr = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    
    // User message
    const userMsg = {
      id: Math.random().toString(),
      user: "You (Broadcaster)",
      text: typedMessage,
      time: timeStr
    };

    setChatMessages(prev => [...prev, userMsg]);
    setTypedMessage("");

    // Trigger mock viewer reply after 1.5 seconds if live
    if (isLive) {
      setTimeout(() => {
        const reply = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
        setChatMessages(prev => [
          ...prev,
          {
            id: Math.random().toString(),
            user: "ModBot_01",
            text: `Replied to Broadcaster: ${reply}`,
            time: timeStr
          }
        ]);
      }, 1500);
    }
  };

  const handleScheduleSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotTitle.trim()) return;

    const newItem: ScheduleItem = {
      id: `sch_${Date.now()}`,
      day: newSlotDay,
      time: newSlotTime,
      title: newSlotTitle
    };

    setSchedules(prev => [...prev, newItem]);
    setNewSlotTitle("");
    setScheduleSuccess(true);
    setTimeout(() => setScheduleSuccess(false), 3000);
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-8">
      
      {/* Title & Status Indicator */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-white">
            Creator Dashboard
          </h2>
          <p className="text-sm text-gray-400">
            Monitor real-time streaming health, subscriber splits, and broadcast controls.
          </p>
        </div>

        {/* Live / Offline Badge */}
        <div className={`flex items-center gap-3 rounded-full border px-4 py-2 text-xs font-mono font-semibold tracking-wider uppercase ${
          isLive 
            ? "bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_12px_rgba(239,68,68,0.2)]" 
            : "bg-gray-500/10 text-gray-400 border-white/10"
        }`}>
          <div className={`h-2.5 w-2.5 rounded-full ${isLive ? "bg-red-500 animate-pulse" : "bg-gray-500"}`} />
          <span>STATUS: {isLive ? "BROADCAST LIVE" : "OFFLINE SYSTEM"}</span>
        </div>
      </div>

      {/* Main Stream Matrix Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        
        {/* Left Column: Video monitor & Stream Configuration Controls */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Monitor Card */}
          <div className="relative aspect-video rounded-3xl border border-white/10 bg-black overflow-hidden group shadow-2xl">
            
            {/* Camera Output feed */}
            {webcamActive ? (
              <video 
                ref={videoRef} 
                className="h-full w-full object-cover scale-x-[-1]" 
                playsInline 
                muted 
              />
            ) : (
              /* Abstract Matrix looping artwork when static */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0F172A] to-[#07070A] relative">
                
                {/* Cyber grid overlays */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
                
                {cameraError ? (
                  <div className="z-10 bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/20 max-w-md space-y-3">
                    <AlertTriangle className="h-10 w-10 text-yellow-500 mx-auto" />
                    <h4 className="font-semibold text-white">Camera Hardware Offline</h4>
                    <p className="text-xs text-gray-300">
                      We couldn't access a hardware webcam. But do not worry! We have initiated our <span className="text-primary font-bold">Virtual Neon Generator</span> mock system. Test streaming functions normally!
                    </p>
                  </div>
                ) : (
                  <div className="z-10 space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                      <Tv className="h-8 w-8 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-bold text-white">Ready for transmission</h4>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
                        Select bitrate settings, check audio sliders and hit "Go Live Studio" to test real WebRTC broadcasts.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Simulated Live Overlays (Only when live) */}
            {isLive && (
              <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none z-10 font-mono text-xs text-white">
                
                {/* Top Overlay HUD */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded bg-red-600 px-2 py-1 text-[10px] font-bold uppercase animate-pulse-live">
                    LIVE
                  </div>
                  <div className="flex items-center gap-2 rounded bg-black/70 px-2.5 py-1 text-[10px] backdrop-blur-md font-bold">
                    <Eye className="h-3 w-3 text-secondary inline" />
                    <span>{viewerCount.toLocaleString()} VIEWERS</span>
                  </div>
                </div>

                {/* Bottom Overlay HUD */}
                <div className="flex items-center justify-between">
                  <div className="flex items-col gap-1 items-start bg-black/60 p-2 rounded backdrop-blur-md">
                    <span className="text-accent font-bold">BITRATE: {streamBitrate}</span>
                    <span className="text-[10px] text-gray-300">RES: {streamResolution}</span>
                  </div>
                  <div className="rounded bg-black/60 pl-2.5 pr-2 py-1 backdrop-blur-md flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-green-400 rounded-full" />
                    <span className="text-[10px]">FPS: 60.0 • PACKETS DROP: 0%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Broadcast Console Controls Toggles */}
          <div className="rounded-3xl border border-white/10 bg-dark-card p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            <div className="md:col-span-5 flex flex-col">
              <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">Input Node Controller</span>
              <h4 className="font-display font-bold text-white text-base">Broadcast Deck</h4>
            </div>

            <div className="md:col-span-7 flex flex-wrap gap-2.5 justify-end">
              
              {/* Bitrate Dropdown Config */}
              <div className="flex flex-col gap-1">
                <select 
                  id="bitrate-select"
                  value={streamBitrate} 
                  onChange={(e) => setStreamBitrate(e.target.value)}
                  className="rounded-lg bg-black text-xs text-gray-300 border border-white/10 p-1.5 outline-none outline-transparent cursor-pointer"
                >
                  <option value="8500 Kbps">8500 Kbps (HDR)</option>
                  <option value="6500 Kbps">6500 Kbps (1080p Standard)</option>
                  <option value="4500 Kbps">4500 Kbps (Medium)</option>
                  <option value="2500 Kbps">2500 Kbps (Mobile Core)</option>
                </select>
              </div>

              {/* Resolution Dropdown */}
              <div className="flex flex-col gap-1 font-mono">
                <select 
                  id="resolution-select"
                  value={streamResolution} 
                  onChange={(e) => setStreamResolution(e.target.value)}
                  className="rounded-lg bg-black text-xs text-gray-300 border border-white/10 p-1.5 outline-none outline-transparent cursor-pointer"
                >
                  <option value="1080p 60fps">1080p 60fps</option>
                  <option value="720p 60fps">720p 60fps</option>
                  <option value="1080p 30fps">1080p 30fps</option>
                </select>
              </div>

              {/* Broadcast Trigger Button */}
              <button
                id="toggle-broadcast-btn"
                onClick={handleToggleBroadcast}
                className={`flex items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold uppercase transition-all shrink-0 cursor-pointer ${
                  isLive 
                    ? "bg-red-600 text-white hover:bg-red-700 shadow-md animate-pulse" 
                    : "bg-primary text-white hover:bg-opacity-90 shadow-[0_4px_12px_rgba(139,92,246,0.3)]"
                }`}
              >
                {isLive ? (
                  <>
                    <Square className="h-3.5 w-3.5" />
                    Stop Stream
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" />
                    Go Live Simulator
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Analytics Spark Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-1">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-[10px] font-mono tracking-wider uppercase">Today's Earnings</span>
                <DollarSign className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="font-display text-lg font-bold text-white">$448.50</div>
              <p className="text-[9px] text-green-400 font-mono">+12.4% vs last week</p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-1">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-[10px] font-mono tracking-wider uppercase">Active Subs</span>
                <Users className="h-3.5 w-3.5 text-accent" />
              </div>
              <div className="font-display text-lg font-bold text-white">440</div>
              <p className="text-[9px] text-green-400 font-mono">+42 new today</p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-1">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-[10px] font-mono tracking-wider uppercase">Average CCU</span>
                <Eye className="h-3.5 w-3.5 text-secondary" />
              </div>
              <div className="font-display text-lg font-bold text-white">185</div>
              <p className="text-[9px] text-gray-500 font-mono">Stream stabilized</p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-1">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-[10px] font-mono tracking-wider uppercase">Server Ping</span>
                <TrendingUp className="h-3.5 w-3.5 text-green-400" />
              </div>
              <div className="font-display text-lg font-bold text-white">8ms</div>
              <p className="text-[9px] text-green-400 font-mono">WebRTC Edge Connected</p>
            </div>
          </div>
        </div>

        {/* Right Column: Live Chat simulator & Scheduler widget */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          
          {/* Chat Simulator Box */}
          <div className="rounded-3xl border border-white/10 bg-dark-card p-4 flex flex-col justify-between h-[420px]">
            <div className="border-b border-white/5 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                <h4 className="font-display text-sm font-bold text-white uppercase">Live Chat Feed</h4>
              </div>
              <span className="text-[10px] font-mono text-gray-400">Channel Mode</span>
            </div>

            {/* Scrollable chat messages container */}
            <div className="flex-1 overflow-y-auto my-3 space-y-2.5 pr-1 max-h-[290px]">
              {chatMessages.map((msg) => {
                const isBroadcaster = msg.user.includes("Broadcaster");
                const isMod = msg.user.includes("ModBot");
                return (
                  <div key={msg.id} className="text-xs shrink-0 block leading-relaxed break-words">
                    <span className="font-mono text-[9px] text-gray-500 mr-1.5">{msg.time}</span>
                    <span className={`font-semibold mr-1.5 px-1 py-0.5 rounded text-[11px] ${
                      isBroadcaster 
                        ? "bg-accent/20 text-accent font-extrabold" 
                        : isMod 
                        ? "bg-secondary/20 text-secondary" 
                        : "text-gray-300"
                    }`}>
                      {msg.user}
                    </span>
                    <span className="text-gray-300 text-xs">{msg.text}</span>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Inline message sender form */}
            <form onSubmit={handleSendChat} className="flex gap-1.5 border-t border-white/5 pt-3">
              <input
                type="text"
                id="chat-send-input"
                placeholder={isLive ? "Type stream message..." : "Stream must be live to simulate..."}
                disabled={!isLive}
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="flex-1 rounded-xl bg-black border border-white/10 px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-accent"
              />
              <button
                type="submit"
                id="chat-send-submit"
                disabled={!isLive}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-white hover:opacity-90 transition-all shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

          {/* Broadcast Scheduler widget */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-dark-card to-black p-5 space-y-4">
            <div className="flex items-center gap-1.5 text-sm font-bold text-white uppercase border-b border-white/5 pb-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Broadcast Scheduler</span>
            </div>

            {/* List current scheduled blocks */}
            <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
              {schedules.map((sch) => (
                <div key={sch.id} className="flex items-center justify-between rounded-xl bg-white/5 p-2.5 border border-white/5 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-white truncate max-w-[180px]">{sch.title}</div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400">
                      <Clock className="h-3.5 w-3.5 text-secondary" />
                      <span>{sch.day} @ {sch.time}</span>
                    </div>
                  </div>
                  <button
                    id={`delete-sch-${sch.id}`}
                    onClick={() => handleDeleteSchedule(sch.id)}
                    className="text-[10px] text-gray-500 hover:text-red-400 cursor-pointer font-bold border-none"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {/* Add schedule form */}
            <form onSubmit={handleScheduleSlot} className="space-y-2.5 border-t border-white/5 pt-3">
              <div className="grid grid-cols-2 gap-2">
                <select
                  id="schedule-day-select"
                  value={newSlotDay}
                  onChange={(e) => setNewSlotDay(e.target.value)}
                  className="rounded bg-black text-xs text-gray-300 border border-white/10 p-1.5 outline-none cursor-pointer"
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
                <input
                  type="text"
                  id="schedule-time-input"
                  value={newSlotTime}
                  onChange={(e) => setNewSlotTime(e.target.value)}
                  placeholder="e.g. 19:00 UTC"
                  className="rounded bg-black text-xs text-gray-300 border border-white/10 p-1.5 outline-none"
                />
              </div>

              <div className="flex gap-1">
                <input
                  type="text"
                  id="schedule-title-input"
                  required
                  placeholder="Broadcast show title..."
                  value={newSlotTitle}
                  onChange={(e) => setNewSlotTitle(e.target.value)}
                  className="flex-1 rounded bg-black text-xs text-white border border-white/10 px-2.5 py-1.5 outline-none"
                />
                <button
                  type="submit"
                  id="submit-schedule-btn"
                  className="rounded bg-primary px-3 text-xs font-semibold text-white hover:bg-opacity-90 flex items-center justify-center cursor-pointer shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {scheduleSuccess && (
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-green-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Topic scheduled successfully!</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}
