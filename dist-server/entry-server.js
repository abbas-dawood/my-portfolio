import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
import React, { useState, useRef, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Plane, X, Target, Crosshair, User, Compass, Eye, Users, PenTool, Code, Download, Send, CheckCircle, Mail, Linkedin, Github, Instagram, MapPin, ArrowUp } from "lucide-react";
import { getFirestore, getDoc, doc, serverTimestamp, addDoc, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const playHoverSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const tempCtx = new AudioContext();
    const osc = tempCtx.createOscillator();
    const gain = tempCtx.createGain();
    osc.connect(gain);
    gain.connect(tempCtx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(400, tempCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, tempCtx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.04, tempCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(1e-3, tempCtx.currentTime + 0.05);
    osc.start(tempCtx.currentTime);
    osc.stop(tempCtx.currentTime + 0.05);
  } catch (e) {
  }
};
const playClickSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.05);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.warn("Audio playback failed", e);
  }
};
const playBootSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const baseOsc = ctx.createOscillator();
    const baseGain = ctx.createGain();
    baseOsc.connect(baseGain);
    baseGain.connect(ctx.destination);
    baseOsc.type = "sawtooth";
    baseOsc.frequency.setValueAtTime(40, ctx.currentTime);
    baseOsc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 5);
    baseGain.gain.setValueAtTime(0.01, ctx.currentTime);
    baseGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 2);
    baseGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 6);
    baseOsc.start(ctx.currentTime);
    baseOsc.stop(ctx.currentTime + 6);
    const whineOsc = ctx.createOscillator();
    const whineGain = ctx.createGain();
    whineOsc.connect(whineGain);
    whineGain.connect(ctx.destination);
    whineOsc.type = "sine";
    whineOsc.frequency.setValueAtTime(800, ctx.currentTime);
    whineOsc.frequency.exponentialRampToValueAtTime(2500, ctx.currentTime + 5);
    whineGain.gain.setValueAtTime(0, ctx.currentTime);
    whineGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 3);
    whineGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 6);
    whineOsc.start(ctx.currentTime);
    whineOsc.stop(ctx.currentTime + 6);
    const beepOsc = ctx.createOscillator();
    const beepGain = ctx.createGain();
    beepOsc.connect(beepGain);
    beepGain.connect(ctx.destination);
    beepOsc.type = "square";
    beepOsc.frequency.setValueAtTime(1200, ctx.currentTime);
    beepOsc.frequency.setValueAtTime(1800, ctx.currentTime + 0.1);
    beepGain.gain.setValueAtTime(0, ctx.currentTime);
    beepGain.gain.setValueAtTime(0.1, ctx.currentTime + 0.01);
    beepGain.gain.setValueAtTime(0, ctx.currentTime + 0.2);
    beepOsc.start(ctx.currentTime);
    beepOsc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.warn("Boot audio playback failed / or blocked by browser", e);
  }
};
function BootSequence({ onComplete }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [logs, setLogs] = useState([]);
  const hasPlayedSound = useRef(false);
  const bootLogs = [
    "INITIALIZING AVIONICS...",
    "LOADING CORE SYSTEMS [OK]",
    "ESTABLISHING SECURE CONNECTION...",
    "CALIBRATING NAVIGATION SENSORS...",
    "FLIGHT CONTROL SYSTEMS ONLINE.",
    "USER IDENTITY VERIFIED: ABBAS DAWOOD",
    "ALTITUDE SYSTEM READY."
  ];
  const startBootProcess = () => {
    setHasStarted(true);
    if (!hasPlayedSound.current) {
      playClickSound();
      playBootSound();
      hasPlayedSound.current = true;
    }
  };
  useEffect(() => {
    if (!hasStarted) return;
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 8;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);
      const logIndex = Math.floor(currentProgress / 100 * bootLogs.length);
      setLogs(bootLogs.slice(0, logIndex + 1));
      if (currentProgress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 1500);
        }, 800);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [hasStarted, onComplete]);
  return /* @__PURE__ */ jsxDEV(AnimatePresence, { children: !isExiting && /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      initial: { opacity: 1 },
      exit: { opacity: 0, scale: 1.05, filter: "blur(10px)" },
      transition: { duration: 1.2, ease: "easeInOut" },
      className: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617] text-cyan-500 font-mono overflow-hidden",
      onClick: !hasStarted ? startBootProcess : void 0,
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-grid-cyan opacity-20" }, void 0, false, {
          fileName: "/app/applet/src/components/BootSequence.tsx",
          lineNumber: 71,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]" }, void 0, false, {
          fileName: "/app/applet/src/components/BootSequence.tsx",
          lineNumber: 72,
          columnNumber: 11
        }, this),
        !hasStarted && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 z-50 flex items-center justify-center cursor-pointer bg-black/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            animate: { opacity: [0.5, 1, 0.5] },
            transition: { repeat: Infinity, duration: 2 },
            className: "text-cyan-400 tracking-[0.3em] text-sm md:text-base border border-cyan-500/50 px-8 py-4 rounded-sm bg-[#020617]/80",
            children: "[ TAP ANYWHERE TO INITIALIZE SYSTEM ]"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/BootSequence.tsx",
            lineNumber: 76,
            columnNumber: 15
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/BootSequence.tsx",
          lineNumber: 75,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 w-full max-w-2xl px-6 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxDEV(
            motion.h2,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              className: "text-2xl md:text-4xl font-bold tracking-[0.2em] mb-12 text-center mt-20",
              style: { fontFamily: "Space Grotesk, sans-serif" },
              children: "ABBAS ALTITUDE SYSTEM BOOT"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/BootSequence.tsx",
              lineNumber: 87,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "relative w-48 h-48 flex items-center justify-center mb-12", children: [
            /* @__PURE__ */ jsxDEV("svg", { className: "w-full h-full -rotate-90", children: [
              /* @__PURE__ */ jsxDEV(
                "circle",
                {
                  cx: "96",
                  cy: "96",
                  r: "88",
                  className: "stroke-cyan-900/40 fill-none",
                  strokeWidth: "2"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/BootSequence.tsx",
                  lineNumber: 99,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                motion.circle,
                {
                  cx: "96",
                  cy: "96",
                  r: "88",
                  className: "stroke-cyan-500 fill-none drop-shadow-[0_0_8px_#06b6d4]",
                  strokeWidth: "4",
                  strokeDasharray: "552.92",
                  strokeDashoffset: 552.92 - 552.92 * progress / 100,
                  strokeLinecap: "round"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/BootSequence.tsx",
                  lineNumber: 104,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BootSequence.tsx",
              lineNumber: 98,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute flex flex-col items-center", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-4xl font-bold tracking-wider", children: [
                Math.round(progress),
                /* @__PURE__ */ jsxDEV("span", { className: "text-xl", children: "%" }, void 0, false, {
                  fileName: "/app/applet/src/components/BootSequence.tsx",
                  lineNumber: 115,
                  columnNumber: 41
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/BootSequence.tsx",
                lineNumber: 114,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-cyan-600 tracking-widest mt-1", children: "SYS LOAD" }, void 0, false, {
                fileName: "/app/applet/src/components/BootSequence.tsx",
                lineNumber: 117,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BootSequence.tsx",
              lineNumber: 113,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BootSequence.tsx",
            lineNumber: 97,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-cyan-950/20 border border-cyan-800/50 p-4 rounded bg-clip-padding backdrop-filter backdrop-blur-sm h-40 overflow-hidden relative", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-cyan-500/20 to-transparent" }, void 0, false, {
              fileName: "/app/applet/src/components/BootSequence.tsx",
              lineNumber: 123,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-[#020617] to-transparent z-10" }, void 0, false, {
              fileName: "/app/applet/src/components/BootSequence.tsx",
              lineNumber: 124,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col space-y-2 justify-end h-full text-sm", children: [
              logs.map((log, i) => /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  initial: { opacity: 0, x: -10 },
                  animate: { opacity: 1, x: 0 },
                  className: "flex items-center space-x-2",
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-500", children: ">" }, void 0, false, {
                      fileName: "/app/applet/src/components/BootSequence.tsx",
                      lineNumber: 133,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: cn(i === logs.length - 1 ? "text-white" : "text-cyan-600 drop-shadow-[0_0_2px_rgba(6,182,212,0.4)]"), children: log }, void 0, false, {
                      fileName: "/app/applet/src/components/BootSequence.tsx",
                      lineNumber: 134,
                      columnNumber: 21
                    }, this)
                  ]
                },
                i,
                true,
                {
                  fileName: "/app/applet/src/components/BootSequence.tsx",
                  lineNumber: 127,
                  columnNumber: 19
                },
                this
              )),
              progress < 100 && /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  animate: { opacity: [1, 0] },
                  transition: { repeat: Infinity, duration: 0.8 },
                  className: "flex items-center space-x-2 text-cyan-500 mt-2",
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { children: ">" }, void 0, false, {
                      fileName: "/app/applet/src/components/BootSequence.tsx",
                      lineNumber: 145,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "w-3 h-4 bg-cyan-500 block" }, void 0, false, {
                      fileName: "/app/applet/src/components/BootSequence.tsx",
                      lineNumber: 145,
                      columnNumber: 39
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/BootSequence.tsx",
                  lineNumber: 140,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BootSequence.tsx",
              lineNumber: 125,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BootSequence.tsx",
            lineNumber: 122,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "mt-8 text-cyan-600/60 text-xs tracking-[0.3em] flex gap-8", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "LAT: 24.5854° N" }, void 0, false, {
              fileName: "/app/applet/src/components/BootSequence.tsx",
              lineNumber: 152,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "LON: 73.7125° E" }, void 0, false, {
              fileName: "/app/applet/src/components/BootSequence.tsx",
              lineNumber: 153,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BootSequence.tsx",
            lineNumber: 151,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/BootSequence.tsx",
          lineNumber: 86,
          columnNumber: 11
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/BootSequence.tsx",
      lineNumber: 63,
      columnNumber: 9
    },
    this
  ) }, void 0, false, {
    fileName: "/app/applet/src/components/BootSequence.tsx",
    lineNumber: 61,
    columnNumber: 5
  }, this);
}
function Background() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    const particles = [];
    const particleCount = 100;
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.isHUDTarget = Math.random() > 0.95;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        if (this.isHUDTarget && this.opacity > 0.4) {
          ctx.strokeStyle = `rgba(6, 182, 212, ${this.opacity * 0.5})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      ctx.strokeStyle = "rgba(14, 116, 144, 0.2)";
      ctx.lineWidth = 1;
      const centerY = height / 2;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen isolate", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-x-0 h-[2px] bg-cyan-500 opacity-20 blur-[1px] animate-scan", style: { top: "0%" } }, void 0, false, {
      fileName: "/app/applet/src/components/Background.tsx",
      lineNumber: 113,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("canvas", { ref: canvasRef, className: "absolute inset-0" }, void 0, false, {
      fileName: "/app/applet/src/components/Background.tsx",
      lineNumber: 114,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-radial from-transparent to-[#020617] opacity-60" }, void 0, false, {
      fileName: "/app/applet/src/components/Background.tsx",
      lineNumber: 116,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Background.tsx",
    lineNumber: 111,
    columnNumber: 5
  }, this);
}
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    document.body.style.cursor = "none";
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e) => {
      const target = e.target;
      if (window.getComputedStyle(target).cursor === "pointer" || target.tagName.toLowerCase() === "a" || target.tagName.toLowerCase() === "button") {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        className: "fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-500 mix-blend-screen pointer-events-none z-[100] drop-shadow-[0_0_4px_#06b6d4]",
        animate: {
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1
        },
        transition: { type: "tween", ease: "backOut", duration: 0.1 }
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/CustomCursor.tsx",
        lineNumber: 45,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        className: "fixed top-0 left-0 w-10 h-10 rounded-full border border-cyan-500 pointer-events-none z-[99] flex items-center justify-center mix-blend-screen",
        animate: {
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
          backgroundColor: isHovering ? "rgba(6,182,212,0.1)" : "rgba(6,182,212,0)"
        },
        transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
        children: isHovering && /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            className: "w-1 h-1 bg-cyan-500 rounded-full drop-shadow-[0_0_6px_#06b6d4]"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/CustomCursor.tsx",
            lineNumber: 66,
            columnNumber: 12
          },
          this
        )
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/CustomCursor.tsx",
        lineNumber: 54,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/CustomCursor.tsx",
    lineNumber: 44,
    columnNumber: 5
  }, this);
}
function Navbar({ activeSection }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = ["Home", "About", "Skills", "Resume", "Contact"];
  const handleScroll = (id) => {
    playClickSound();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(
      motion.nav,
      {
        initial: { y: -100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay: 0.5, duration: 0.8 },
        className: "fixed top-0 inset-x-0 z-[60] h-20 bg-[#020617]/50 backdrop-blur-sm border-b border-cyan-900/30 px-6",
        children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto h-full flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 cursor-pointer", onClick: () => handleScroll("home"), children: [
            /* @__PURE__ */ jsxDEV("div", { className: "relative w-10 h-10 flex items-center justify-center border border-cyan-500/30 rounded bg-cyan-950/20", children: [
              /* @__PURE__ */ jsxDEV(Plane, { className: "w-5 h-5 text-cyan-400 rotate-45" }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 47,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  className: "absolute inset-0 border border-cyan-400 rounded",
                  animate: { rotate: 360, scale: [1, 1.1, 1] },
                  transition: { duration: 10, repeat: Infinity, ease: "linear" }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 48,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 46,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-space text-lg font-bold tracking-widest text-white", children: "ABBAS" }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 55,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] tracking-[0.2em] text-cyan-500 uppercase", children: "Aviation • Digital Identity" }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 56,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 54,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 45,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "hidden md:flex items-center gap-8", children: navItems.map((item) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleScroll(item),
              className: "group relative font-mono text-xs tracking-widest uppercase py-2 cursor-pointer transition-colors",
              children: [
                /* @__PURE__ */ jsxDEV("span", { className: cn(
                  "transition-colors duration-300",
                  activeSection === item.toLowerCase() ? "text-cyan-400" : "text-gray-400 group-hover:text-white"
                ), children: item }, void 0, false, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 68,
                  columnNumber: 18
                }, this),
                activeSection === item.toLowerCase() && /* @__PURE__ */ jsxDEV(
                  motion.div,
                  {
                    layoutId: "nav-indicator",
                    className: "absolute -bottom-1 left-0 right-0 h-[1px] bg-cyan-400",
                    initial: false,
                    transition: { type: "spring", stiffness: 300, damping: 30 }
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/Navbar.tsx",
                    lineNumber: 75,
                    columnNumber: 20
                  },
                  this
                )
              ]
            },
            item,
            true,
            {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 63,
              columnNumber: 16
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 61,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                playClickSound();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              },
              className: "md:hidden flex items-center justify-center w-10 h-10 focus:outline-none z-[60]",
              children: isMobileMenuOpen ? /* @__PURE__ */ jsxDEV(X, { className: "w-6 h-6 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 95,
                columnNumber: 15
              }, this) : /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1.5 w-6", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-full h-[1px] bg-cyan-500 block" }, void 0, false, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 98,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-[1px] bg-cyan-500 block ml-auto" }, void 0, false, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 99,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "w-full h-[1px] bg-cyan-500 block" }, void 0, false, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 100,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 97,
                columnNumber: 15
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 87,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 42,
          columnNumber: 9
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 36,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: isMobileMenuOpen && /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        className: "fixed inset-0 z-50 bg-[#020617]/95 backdrop-blur-md pt-24 px-6 md:hidden flex flex-col items-center justify-center border-b border-cyan-900/50",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-8 w-full max-w-sm", children: navItems.map((item, index) => /* @__PURE__ */ jsxDEV(
            motion.button,
            {
              custom: index,
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: index * 0.1 },
              onClick: () => handleScroll(item),
              className: "relative group w-full flex flex-col items-center py-4",
              children: [
                /* @__PURE__ */ jsxDEV("span", { className: cn(
                  "font-space text-2xl tracking-widest uppercase transition-colors duration-300",
                  activeSection === item.toLowerCase() ? "text-cyan-400 font-bold" : "text-gray-400 group-hover:text-white"
                ), children: item }, void 0, false, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 128,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] text-cyan-800 mt-1 uppercase", children: [
                  "// ",
                  String(index + 1).padStart(2, "0")
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 134,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: cn(
                  "h-[1px] bg-cyan-500/50 transition-all duration-300 mt-2",
                  activeSection === item.toLowerCase() ? "w-1/2" : "w-0 group-hover:w-1/4"
                ) }, void 0, false, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 137,
                  columnNumber: 19
                }, this)
              ]
            },
            item,
            true,
            {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 119,
              columnNumber: 17
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 117,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "mt-auto pb-12 opacity-30 flex gap-4 pointer-events-none", children: [
            /* @__PURE__ */ jsxDEV("svg", { width: "40", height: "40", children: [
              /* @__PURE__ */ jsxDEV("rect", { x: "0", y: "0", width: "40", height: "40", fill: "none", stroke: "currentColor", className: "text-cyan-500", strokeWidth: "1", strokeDasharray: "2 4" }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 148,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("rect", { x: "10", y: "10", width: "20", height: "20", fill: "currentColor", className: "text-cyan-500", opacity: "0.5" }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 149,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 147,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[10px] text-cyan-500 flex items-end", children: /* @__PURE__ */ jsxDEV("span", { children: "STATUS: READY" }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 152,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 151,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 146,
            columnNumber: 13
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 111,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 109,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Navbar.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, this);
}
function HUDOverlay() {
  const [time, setTime] = useState(/* @__PURE__ */ new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(timer);
  }, []);
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 pointer-events-none z-40", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-8 left-8 text-cyan-500/60 text-[10px] font-mono tracking-widest hidden md:block", children: [
      /* @__PURE__ */ jsxDEV("p", { children: "SYS.01 // ONLINE" }, void 0, false, {
        fileName: "/app/applet/src/components/HUDOverlay.tsx",
        lineNumber: 16,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { children: [
        "SYNC: ",
        time.getUTCHours().toString().padStart(2, "0"),
        time.getUTCMinutes().toString().padStart(2, "0"),
        "Z"
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/HUDOverlay.tsx",
        lineNumber: 17,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/HUDOverlay.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-8 right-8 text-cyan-500/60 text-[10px] font-mono tracking-widest text-right hidden md:block", children: [
      /* @__PURE__ */ jsxDEV("p", { children: "ALTITUDE LOG" }, void 0, false, {
        fileName: "/app/applet/src/components/HUDOverlay.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        motion.p,
        {
          animate: { opacity: [1, 0.5, 1] },
          transition: { duration: 2, repeat: Infinity },
          children: "REC [●]"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/HUDOverlay.tsx",
          lineNumber: 23,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/HUDOverlay.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-8 left-8 text-cyan-500/60 text-[10px] font-mono tracking-widest hidden md:block", children: [
      /* @__PURE__ */ jsxDEV("p", { children: "A.DAWOOD" }, void 0, false, {
        fileName: "/app/applet/src/components/HUDOverlay.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { children: "ID: 90243-28122-UDZ" }, void 0, false, {
        fileName: "/app/applet/src/components/HUDOverlay.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/HUDOverlay.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-8 right-8 text-cyan-500/60 text-[10px] font-mono tracking-widest text-right hidden md:block", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end gap-1 mt-1", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          className: "w-1 h-3 bg-cyan-700/40",
          animate: { height: [`${Math.random() * 100}%`, "100%", `${Math.random() * 100}%`] },
          transition: { duration: 0.5 + Math.random(), repeat: Infinity }
        },
        i,
        false,
        {
          fileName: "/app/applet/src/components/HUDOverlay.tsx",
          lineNumber: 41,
          columnNumber: 14
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/HUDOverlay.tsx",
        lineNumber: 39,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "mt-1", children: "COMMS SECURE" }, void 0, false, {
        fileName: "/app/applet/src/components/HUDOverlay.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/HUDOverlay.tsx",
      lineNumber: 38,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/HUDOverlay.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}
const projectId = "gen-lang-client-0123150725";
const appId = "1:545974822284:web:d96633a02b97c46e9922a9";
const apiKey = "AIzaSyBDtkNwoS6hlSzCiqv5BUBZNjvi702NKqM";
const authDomain = "gen-lang-client-0123150725.firebaseapp.com";
const firestoreDatabaseId = "ai-studio-a05e1c22-f274-4c22-a752-69c0c4f3daaf";
const storageBucket = "gen-lang-client-0123150725.firebasestorage.app";
const messagingSenderId = "545974822284";
const measurementId = "";
const firebaseConfig = {
  projectId,
  appId,
  apiKey,
  authDomain,
  firestoreDatabaseId,
  storageBucket,
  messagingSenderId,
  measurementId
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
const auth = getAuth(app);
function Hero() {
  const [headline, setHeadline] = useState("");
  const [resumeUrl, setResumeUrl] = useState("/Abbas_Dawood_Resume.pdf");
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docHead = await getDoc(doc(db, "settings", "HOME_HEADLINE"));
        const docRes = await getDoc(doc(db, "settings", "RESUME_URL"));
        if (docHead.exists() && docHead.data().value) {
          setHeadline(docHead.data().value);
        }
        if (docRes.exists() && docRes.data().value) {
          setResumeUrl(docRes.data().value);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchSettings();
  }, []);
  const handleScroll = (id) => {
    playClickSound();
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsxDEV("section", { id: "home", className: "relative min-h-screen pt-20 flex items-center", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "z-10 flex flex-col items-start pt-12 lg:pt-0", children: [
      /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.8, delay: 0.2 },
          className: "flex items-center gap-3 mb-6",
          children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-8 h-[1px] bg-cyan-500 block" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 51,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-xs tracking-[0.2em] text-cyan-400", children: "SYS.ON // READY" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 52,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/Hero.tsx",
          lineNumber: 45,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        motion.h1,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.4 },
          className: "font-space text-5xl md:text-7xl font-bold leading-tight mb-6",
          children: [
            /* @__PURE__ */ jsxDEV("span", { className: "glitch-text inline-block mr-4", "data-text": "Abbas", children: "Abbas" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 61,
              columnNumber: 13
            }, this),
            " ",
            /* @__PURE__ */ jsxDEV("span", { className: "glitch-text inline-block text-gray-300", "data-text": "Dawood", children: "Dawood" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 62,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "sr-only", children: " — Pilot & Software Developer" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 63,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/Hero.tsx",
          lineNumber: 55,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        motion.p,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.6 },
          className: "font-sans text-xl md:text-2xl text-gray-300 mb-6 font-light h-8",
          children: headline || "Building a future between technology, creativity, and aviation."
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/Hero.tsx",
          lineNumber: 66,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        motion.p,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.8, delay: 0.8 },
          className: "font-mono text-xs md:text-sm text-gray-500 leading-relaxed mb-12 max-w-lg border-l border-white/10 pl-4 py-1",
          children: "A cinematic digital identity designed to reflect ambition, curiosity, and a future shaped by discipline, creativity, and flight."
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/Hero.tsx",
          lineNumber: 75,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 1 },
          className: "flex flex-wrap items-center gap-6",
          children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleScroll("contact"),
                className: "group relative px-8 py-4 bg-cyan-500 text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all transform hover:scale-105 active:scale-95",
                children: /* @__PURE__ */ jsxDEV("span", { className: "relative z-10 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Initiate Contact" }, void 0, false, {
                    fileName: "/app/applet/src/components/Hero.tsx",
                    lineNumber: 95,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV(Target, { className: "w-4 h-4 group-hover:rotate-90 transition-transform duration-300" }, void 0, false, {
                    fileName: "/app/applet/src/components/Hero.tsx",
                    lineNumber: 96,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Hero.tsx",
                  lineNumber: 94,
                  columnNumber: 15
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Hero.tsx",
                lineNumber: 90,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "a",
              {
                href: resumeUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                onClick: playClickSound,
                className: "group flex items-center gap-3 px-8 py-4 border border-cyan-500 text-cyan-500 font-bold tracking-widest uppercase text-xs hover:bg-cyan-500/10 transition-colors cursor-pointer",
                children: "Retrieve CV"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Hero.tsx",
                lineNumber: 100,
                columnNumber: 13
              },
              this
            )
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/Hero.tsx",
          lineNumber: 84,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Hero.tsx",
      lineNumber: 44,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1, delay: 0.6 },
        className: "relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center z-10",
        children: /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-md aspect-square rounded-full border-[0.5px] border-cyan-900/30 flex items-center justify-center bg-radial from-cyan-900/10 to-transparent", children: [
          /* @__PURE__ */ jsxDEV(
            motion.svg,
            {
              className: "absolute inset-0 w-full h-full -rotate-90",
              animate: { rotate: 270 },
              transition: { duration: 40, repeat: Infinity, ease: "linear" },
              children: /* @__PURE__ */ jsxDEV("circle", { cx: "50%", cy: "50%", r: "45%", fill: "none", stroke: "rgba(6,182,212,0.2)", strokeWidth: "1", strokeDasharray: "4 8" }, void 0, false, {
                fileName: "/app/applet/src/components/Hero.tsx",
                lineNumber: 127,
                columnNumber: 16
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 122,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            motion.svg,
            {
              className: "absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] rotate-90",
              animate: { rotate: -270 },
              transition: { duration: 25, repeat: Infinity, ease: "linear" },
              children: /* @__PURE__ */ jsxDEV("circle", { cx: "50%", cy: "50%", r: "48%", fill: "none", stroke: "rgba(0,100,255,0.3)", strokeWidth: "0.5", strokeDasharray: "20 40 10 40" }, void 0, false, {
                fileName: "/app/applet/src/components/Hero.tsx",
                lineNumber: 136,
                columnNumber: 16
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 131,
              columnNumber: 14
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              className: "absolute top-[50%] left-[50%] w-[50%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-cyan-400 origin-left",
              animate: { rotate: 360 },
              transition: { duration: 4, repeat: Infinity, ease: "linear" },
              children: /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-24 h-24 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(6,182,212,0.2)_90deg,transparent_90deg)] opacity-50 origin-bottom-left -translate-y-full -translate-x-full rotate-90" }, void 0, false, {
                fileName: "/app/applet/src/components/Hero.tsx",
                lineNumber: 145,
                columnNumber: 16
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 140,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-12 h-12 text-cyan-500/80 absolute z-20", strokeWidth: 1 }, void 0, false, {
            fileName: "/app/applet/src/components/Hero.tsx",
            lineNumber: 149,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-[15%] left-[20%] text-left", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[9px] text-cyan-600", children: "PITCH" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 153,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-xs text-white", children: "0.05" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 154,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Hero.tsx",
            lineNumber: 152,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-[15%] right-[20%] text-right bg-black/40 backdrop-blur-md px-3 py-1 border border-cyan-900/50 rounded-sm", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[9px] text-cyan-400 mb-1", children: "ROLE [01]" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 158,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-space text-sm font-bold tracking-widest text-white whitespace-nowrap", children: "TECH" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 159,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-space text-sm font-bold tracking-widest text-white whitespace-nowrap", children: "ENTHUSIAST" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 160,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Hero.tsx",
            lineNumber: 157,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-[20%] left-[10%] text-left bg-black/40 backdrop-blur-md px-3 py-1 border border-cyan-900/50 rounded-sm", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[9px] text-cyan-400 mb-1", children: "ROLE [02]" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 164,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-space text-sm font-bold tracking-widest text-white whitespace-nowrap", children: "ASPIRING" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 165,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-space text-sm font-bold tracking-widest text-white whitespace-nowrap", children: "PILOT" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 166,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Hero.tsx",
            lineNumber: 163,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-[10%] right-[30%] text-right", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[9px] text-cyan-600", children: "YAW" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 170,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-xs text-white", children: "-1.2" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 171,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Hero.tsx",
            lineNumber: 169,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Hero.tsx",
          lineNumber: 120,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/Hero.tsx",
        lineNumber: 113,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Hero.tsx",
    lineNumber: 41,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/Hero.tsx",
    lineNumber: 40,
    columnNumber: 5
  }, this);
}
function About() {
  const [aboutMeText, setAboutMeText] = useState("I am a motivated student pursuing senior secondary education in Science (PCM) with a profound interest in technology, innovation, and aviation. I thrive on self-learning, experimentation, and research.");
  const [myDirection, setMyDirection] = useState("While actively exploring web technologies (HTML, CSS, JavaScript, React) and Python, I am simultaneously pursuing my dream of becoming a Commercial Pilot. I believe in blending technical acumen with strict discipline.");
  const [futureVision, setFutureVision] = useState("I am passionate about emerging systems, startup ecosystems, and 'Make-in-India' innovation. Through leadership in MUN and hands-on projects, I am building the analytical foundation needed to create meaningful impact.");
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const docAbout = await getDoc(doc(db, "settings", "ABOUT_ME"));
        const docDirection = await getDoc(doc(db, "settings", "MY_DIRECTION"));
        const docVision = await getDoc(doc(db, "settings", "FUTURE_VISION"));
        if (docAbout.exists() && docAbout.data().value) {
          setAboutMeText(docAbout.data().value);
        }
        if (docDirection.exists() && docDirection.data().value) {
          setMyDirection(docDirection.data().value);
        }
        if (docVision.exists() && docVision.data().value) {
          setFutureVision(docVision.data().value);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchAbout();
  }, []);
  const cards = [
    {
      title: "Who I Am",
      icon: User,
      content: aboutMeText
    },
    {
      title: "My Direction",
      icon: Compass,
      content: myDirection
    },
    {
      title: "Future Vision",
      icon: Eye,
      content: futureVision
    }
  ];
  return /* @__PURE__ */ jsxDEV("section", { id: "about", className: "relative min-h-[80vh] py-24 flex flex-col justify-center border-t border-cyan-900/30", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" }, void 0, false, {
      fileName: "/app/applet/src/components/About.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 w-full z-10", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "mb-16", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "font-space text-3xl md:text-5xl font-bold mb-4", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-500", children: "01. " }, void 0, false, {
            fileName: "/app/applet/src/components/About.tsx",
            lineNumber: 62,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "glitch-text", "data-text": "More Than Just A Portfolio", children: "More Than Just A Portfolio" }, void 0, false, {
            fileName: "/app/applet/src/components/About.tsx",
            lineNumber: 63,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/About.tsx",
          lineNumber: 61,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-sm text-cyan-400 tracking-widest uppercase", children: "// Identity • Motivation • Trajectory" }, void 0, false, {
          fileName: "/app/applet/src/components/About.tsx",
          lineNumber: 65,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/About.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: cards.map((card, index) => /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 0.6, delay: index * 0.2 },
          whileHover: { y: -5 },
          onMouseEnter: playHoverSound,
          onClick: playClickSound,
          className: "group relative cursor-pointer block h-full",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute -inset-0.5 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/20 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur" }, void 0, false, {
              fileName: "/app/applet/src/components/About.tsx",
              lineNumber: 84,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative h-full p-8 bg-black/40 border border-cyan-500/30 rounded-sm shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.15),inset_0_0_30px_rgba(6,182,212,0.1)] transition-all duration-500 backdrop-blur-md overflow-hidden flex flex-col", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors duration-500" }, void 0, false, {
                fileName: "/app/applet/src/components/About.tsx",
                lineNumber: 88,
                columnNumber: 18
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }, void 0, false, {
                fileName: "/app/applet/src/components/About.tsx",
                lineNumber: 91,
                columnNumber: 18
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "mb-8 p-3 bg-cyan-950/40 rounded-sm inline-block w-fit border border-cyan-500/30 text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all flex-shrink-0", children: /* @__PURE__ */ jsxDEV(card.icon, { className: "w-6 h-6" }, void 0, false, {
                fileName: "/app/applet/src/components/About.tsx",
                lineNumber: 94,
                columnNumber: 20
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/About.tsx",
                lineNumber: 93,
                columnNumber: 18
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { className: "font-space text-xl font-medium mb-4 text-white flex-shrink-0", children: card.title }, void 0, false, {
                fileName: "/app/applet/src/components/About.tsx",
                lineNumber: 97,
                columnNumber: 18
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-sm text-gray-400 leading-relaxed font-light grow whitespace-pre-wrap h-full flex-grow", children: card.content }, void 0, false, {
                fileName: "/app/applet/src/components/About.tsx",
                lineNumber: 99,
                columnNumber: 18
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "w-full h-[1px] bg-cyan-900/50 mt-8 relative overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  className: "absolute top-0 left-0 h-full bg-cyan-500 w-1/3",
                  initial: { x: "-100%" },
                  whileHover: { x: "300%" },
                  transition: { duration: 1, ease: "easeInOut" }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/About.tsx",
                  lineNumber: 105,
                  columnNumber: 20
                },
                this
              ) }, void 0, false, {
                fileName: "/app/applet/src/components/About.tsx",
                lineNumber: 104,
                columnNumber: 18
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/About.tsx",
              lineNumber: 87,
              columnNumber: 16
            }, this)
          ]
        },
        index,
        true,
        {
          fileName: "/app/applet/src/components/About.tsx",
          lineNumber: 72,
          columnNumber: 14
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/About.tsx",
        lineNumber: 70,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/About.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/About.tsx",
    lineNumber: 55,
    columnNumber: 5
  }, this);
}
function Skills() {
  const skillCategories = [
    {
      title: "Core Abilities",
      icon: /* @__PURE__ */ jsxDEV(Users, { className: "w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" }, void 0, false, {
        fileName: "/app/applet/src/components/Skills.tsx",
        lineNumber: 9,
        columnNumber: 13
      }, this),
      skills: ["Critical Thinking", "Decision-Making", "Problem-Solving", "Analytical Mindset", "Situational Awareness"]
    },
    {
      title: "Leadership & Comm.",
      icon: /* @__PURE__ */ jsxDEV(Users, { className: "w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" }, void 0, false, {
        fileName: "/app/applet/src/components/Skills.tsx",
        lineNumber: 14,
        columnNumber: 13
      }, this),
      skills: ["Public Speaking", "International Diplomacy", "Team Collaboration", "Adaptability"]
    },
    {
      title: "Digital Tools",
      icon: /* @__PURE__ */ jsxDEV(PenTool, { className: "w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" }, void 0, false, {
        fileName: "/app/applet/src/components/Skills.tsx",
        lineNumber: 19,
        columnNumber: 13
      }, this),
      skills: ["Figma", "Canva", "Video Editing", "Basic Coding", "Web Development"]
    },
    {
      title: "Interests & Hobbies",
      icon: /* @__PURE__ */ jsxDEV(Code, { className: "w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" }, void 0, false, {
        fileName: "/app/applet/src/components/Skills.tsx",
        lineNumber: 24,
        columnNumber: 13
      }, this),
      skills: ["Aviation Tracking", "Flight Mechanics", "Strategic Gaming", "Traveling", "Debates"]
    }
  ];
  return /* @__PURE__ */ jsxDEV("section", { id: "skills", className: "relative min-h-screen py-24 border-t border-cyan-900/30", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-cyan-900/5 blur-[100px] pointer-events-none rounded-full" }, void 0, false, {
      fileName: "/app/applet/src/components/Skills.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 relative", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "font-space text-3xl md:text-5xl font-bold mb-4", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-500", children: "02. " }, void 0, false, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 38,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "glitch-text", "data-text": "Skills & Expertise", children: "Skills & Expertise" }, void 0, false, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 39,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Skills.tsx",
            lineNumber: 37,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-sm text-cyan-400 tracking-widest uppercase flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 bg-cyan-400 rounded-full animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 42,
              columnNumber: 15
            }, this),
            "Active Modules"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Skills.tsx",
            lineNumber: 41,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Skills.tsx",
          lineNumber: 36,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "hidden md:flex gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[10px] text-gray-500 text-right", children: [
            /* @__PURE__ */ jsxDEV("p", { children: "SYS.CAPABILITIES" }, void 0, false, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 50,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { children: "VER: 2.0.4" }, void 0, false, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 51,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Skills.tsx",
            lineNumber: 49,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("svg", { width: "40", height: "40", className: "opacity-30", children: [
            /* @__PURE__ */ jsxDEV("rect", { x: "0", y: "0", width: "40", height: "40", fill: "none", stroke: "currentColor", strokeWidth: "1", strokeDasharray: "2 4" }, void 0, false, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 54,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("rect", { x: "10", y: "10", width: "20", height: "20", fill: "currentColor", opacity: "0.5" }, void 0, false, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 55,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Skills.tsx",
            lineNumber: 53,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Skills.tsx",
          lineNumber: 47,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Skills.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: skillCategories.map((category, index) => /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-50px" },
          transition: { duration: 0.5, delay: index * 0.1 },
          whileHover: { y: -5 },
          onClick: playClickSound,
          onMouseEnter: playHoverSound,
          className: "group relative p-8 bg-[#0B1121] border border-cyan-500/30 rounded-sm shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.15),inset_0_0_30px_rgba(6,182,212,0.1)] transition-all duration-500 overflow-hidden",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" }, void 0, false, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 74,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                className: "absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent z-0 blur-[1px]",
                animate: { top: ["-10%", "110%"] },
                transition: { duration: 3 + Math.random(), repeat: Infinity, ease: "linear" }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Skills.tsx",
                lineNumber: 77,
                columnNumber: 16
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-8", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-bold", children: category.icon }, void 0, false, {
                  fileName: "/app/applet/src/components/Skills.tsx",
                  lineNumber: 86,
                  columnNumber: 20
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-space text-2xl font-bold text-gray-200 group-hover:text-white transition-colors", children: category.title }, void 0, false, {
                  fileName: "/app/applet/src/components/Skills.tsx",
                  lineNumber: 89,
                  columnNumber: 20
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Skills.tsx",
                lineNumber: 85,
                columnNumber: 18
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-3", children: category.skills.map((skill, skillIndex) => /* @__PURE__ */ jsxDEV(
                "span",
                {
                  className: "font-mono text-sm px-4 py-2 bg-cyan-950/20 border border-cyan-900/50 text-cyan-300 rounded-full group-hover:border-cyan-500/50 hover:bg-cyan-900/40 transition-all cursor-default",
                  children: skill
                },
                skillIndex,
                false,
                {
                  fileName: "/app/applet/src/components/Skills.tsx",
                  lineNumber: 97,
                  columnNumber: 22
                },
                this
              )) }, void 0, false, {
                fileName: "/app/applet/src/components/Skills.tsx",
                lineNumber: 95,
                columnNumber: 18
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 83,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors" }, void 0, false, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 108,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors" }, void 0, false, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 109,
              columnNumber: 16
            }, this)
          ]
        },
        category.title,
        true,
        {
          fileName: "/app/applet/src/components/Skills.tsx",
          lineNumber: 62,
          columnNumber: 14
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/Skills.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Skills.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Skills.tsx",
    lineNumber: 30,
    columnNumber: 5
  }, this);
}
function Resume() {
  const experiences = [
    {
      id: "EXP_01",
      role: "Participant & Debater",
      org: "Model United Nations",
      date: "November 2022 – Present",
      points: [
        "Represented assigned nations in structured multilateral debates on global diplomacy and policy issues, sharpening critical thinking under time pressure.",
        "Cultivated advanced public speaking, negotiation, and persuasive communication skills across multiple conference settings.",
        "Practiced composed, rational decision-making while navigating high-pressure debate scenarios and shifting positions.",
        "Strengthened leadership presence and cross-cultural collaboration by engaging respectfully with diverse viewpoints."
      ]
    },
    {
      id: "EXP_02",
      role: "Independent Tech & Innovation Initiative",
      org: "Self-Directed",
      date: "April 2021 – Present",
      points: [
        "Spearheaded independent research into emerging technologies, digital tools, and innovation trends to build practical, real-world knowledge.",
        "Managed self-directed learning projects end-to-end, applying structured problem-solving to translate concepts into working outcomes.",
        "Analyzed startup ecosystems and “Make-in-India” innovation themes, developing a foundational understanding of entrepreneurial thinking.",
        "Applied design tools (Figma, Canva) and video editing to independently plan and produce creative digital projects."
      ]
    }
  ];
  const education = [
    {
      id: "EDU_01",
      role: "Senior Secondary (PCM)",
      org: "National Institute of Open Schooling (NIOS)",
      date: "Expected May 2027",
      points: [
        "Pursuing a rigorous PCM curriculum, building strong analytical and quantitative reasoning skills essential for flight training and technical decision-making.",
        "Balances demanding academics with active extracurricular leadership through MUN participation.",
        "Cultivates disciplined, self-directed study habits reflective of the structure required in aviation training environments."
      ]
    },
    {
      id: "EDU_02",
      role: "Secondary Education (PCM)",
      org: "Delhi Public School (DPS)",
      date: "March 2020 – March 2026",
      points: [
        "Completed foundational schooling (Class 6–11) across Physics, Chemistry, Mathematics, and Computer Science.",
        "Developed core analytical thinking and teamwork skills through collaborative academic projects.",
        "Engaged consistently in extracurricular activities, including Model United Nations, alongside core studies."
      ]
    },
    {
      id: "CERT_01",
      role: "Eureka! Junior 2025 - Entrepreneurship",
      org: "E-Cell, IIT Bombay",
      date: "December 2025",
      points: [
        "Selected as a participant in a national-level entrepreneurship program among a competitive applicant pool.",
        "Cultivated problem-solving, idea validation, and entrepreneurial thinking through exposure to real startup ecosystems.",
        "Analyzed business fundamentals and innovation frameworks, strengthening structured decision-making abilities."
      ]
    }
  ];
  return /* @__PURE__ */ jsxDEV("section", { id: "resume", className: "relative min-h-screen py-24 border-t border-cyan-900/30", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute left-1/2 md:left-[20%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-900/40 to-transparent -translate-x-1/2" }, void 0, false, {
      fileName: "/app/applet/src/components/Resume.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 relative", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "font-space text-3xl md:text-5xl font-bold mb-4", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-500", children: "03. " }, void 0, false, {
              fileName: "/app/applet/src/components/Resume.tsx",
              lineNumber: 77,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "glitch-text", "data-text": "A Snapshot Of My Journey", children: "A Snapshot Of My Journey" }, void 0, false, {
              fileName: "/app/applet/src/components/Resume.tsx",
              lineNumber: 78,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Resume.tsx",
            lineNumber: 76,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-sm text-cyan-400 tracking-widest uppercase", children: "// Timeline • Milestones • Education" }, void 0, false, {
            fileName: "/app/applet/src/components/Resume.tsx",
            lineNumber: 80,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Resume.tsx",
          lineNumber: 75,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "a",
          {
            href: "/Abbas_Dawood_Resume.pdf",
            target: "_blank",
            onClick: playClickSound,
            rel: "noopener noreferrer",
            className: "group relative flex items-center gap-3 px-8 py-4 bg-black/20 border border-cyan-500 text-cyan-500 font-bold uppercase tracking-widest text-xs hover:bg-cyan-500/10 transition-colors cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4 group-hover:-translate-y-1 transition-transform" }, void 0, false, {
                fileName: "/app/applet/src/components/Resume.tsx",
                lineNumber: 92,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "RETRIEVE CV" }, void 0, false, {
                fileName: "/app/applet/src/components/Resume.tsx",
                lineNumber: 93,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/Resume.tsx",
            lineNumber: 85,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Resume.tsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative pl-8 md:pl-0", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-16 mt-12 md:pl-32", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-mono text-xl text-white tracking-widest flex items-center gap-4 relative", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "absolute -left-8 md:-left-32 w-4 h-4 rounded-full bg-[#020617] border-2 border-cyan-500 z-10" }, void 0, false, {
              fileName: "/app/applet/src/components/Resume.tsx",
              lineNumber: 102,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-500 font-bold", children: "///" }, void 0, false, {
              fileName: "/app/applet/src/components/Resume.tsx",
              lineNumber: 103,
              columnNumber: 16
            }, this),
            " Experience"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Resume.tsx",
            lineNumber: 101,
            columnNumber: 13
          }, this),
          experiences.map((exp, index) => /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute -left-8 md:-left-[8.5rem] top-10 w-2 h-2 rounded-full border border-cyan-500 bg-[#020617] z-10 group-hover:bg-cyan-400 transition-colors" }, void 0, false, {
              fileName: "/app/applet/src/components/Resume.tsx",
              lineNumber: 109,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute -left-6 md:-left-[8rem] top-10 w-6 md:w-[8rem] h-[1px] bg-cyan-900/50 group-hover:bg-cyan-500/50 transition-colors" }, void 0, false, {
              fileName: "/app/applet/src/components/Resume.tsx",
              lineNumber: 110,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                initial: { opacity: 0, x: 20 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.6, delay: index * 0.2 },
                onMouseEnter: playHoverSound,
                onClick: playClickSound,
                className: "relative group p-6 sm:p-8 mb-12 bg-[#0B1121] border border-cyan-500/30 rounded-sm shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.15),inset_0_0_30px_rgba(6,182,212,0.1)] transition-all duration-500 overflow-hidden cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" }, void 0, false, {
                    fileName: "/app/applet/src/components/Resume.tsx",
                    lineNumber: 121,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "relative z-20", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-cyan-900/30 pb-4", children: [
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("h4", { className: "font-space text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors", children: exp.role }, void 0, false, {
                          fileName: "/app/applet/src/components/Resume.tsx",
                          lineNumber: 126,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-xs sm:text-sm text-gray-500 tracking-wider uppercase mt-1", children: exp.org }, void 0, false, {
                          fileName: "/app/applet/src/components/Resume.tsx",
                          lineNumber: 127,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/Resume.tsx",
                        lineNumber: 125,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-xs text-cyan-500 bg-cyan-950/30 px-3 py-1 rounded-sm border border-cyan-900/50 w-fit", children: exp.date }, void 0, false, {
                        fileName: "/app/applet/src/components/Resume.tsx",
                        lineNumber: 129,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/Resume.tsx",
                      lineNumber: 124,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("ul", { className: "space-y-3", children: exp.points.map((point, i) => /* @__PURE__ */ jsxDEV("li", { className: "font-sans text-sm text-gray-400/80 font-light flex items-start gap-3", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-500/50 mt-1 text-[10px]", children: "▹" }, void 0, false, {
                        fileName: "/app/applet/src/components/Resume.tsx",
                        lineNumber: 135,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: point }, void 0, false, {
                        fileName: "/app/applet/src/components/Resume.tsx",
                        lineNumber: 136,
                        columnNumber: 27
                      }, this)
                    ] }, i, true, {
                      fileName: "/app/applet/src/components/Resume.tsx",
                      lineNumber: 134,
                      columnNumber: 25
                    }, this)) }, void 0, false, {
                      fileName: "/app/applet/src/components/Resume.tsx",
                      lineNumber: 132,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/Resume.tsx",
                    lineNumber: 123,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Resume.tsx",
                lineNumber: 112,
                columnNumber: 17
              },
              this
            )
          ] }, exp.id, true, {
            fileName: "/app/applet/src/components/Resume.tsx",
            lineNumber: 107,
            columnNumber: 15
          }, this))
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Resume.tsx",
          lineNumber: 100,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-16 mt-12 md:pl-16", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-mono text-xl text-white tracking-widest flex items-center gap-4 relative", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "absolute -left-8 md:-left-[4.5rem] w-4 h-4 rounded-full bg-[#020617] border-2 border-cyan-500 z-10 hidden md:block" }, void 0, false, {
              fileName: "/app/applet/src/components/Resume.tsx",
              lineNumber: 149,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-500 font-bold", children: "///" }, void 0, false, {
              fileName: "/app/applet/src/components/Resume.tsx",
              lineNumber: 150,
              columnNumber: 16
            }, this),
            " Education"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Resume.tsx",
            lineNumber: 148,
            columnNumber: 13
          }, this),
          education.map((edu, index) => /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute -left-8 md:-left-[4.5rem] top-10 w-2 h-2 rounded-full border border-cyan-500 bg-[#020617] z-10 group-hover:bg-cyan-400 transition-colors hidden md:block" }, void 0, false, {
              fileName: "/app/applet/src/components/Resume.tsx",
              lineNumber: 156,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute -left-6 md:-left-[4rem] top-10 w-6 md:w-[4rem] h-[1px] bg-cyan-900/50 group-hover:bg-cyan-500/50 transition-colors hidden md:block" }, void 0, false, {
              fileName: "/app/applet/src/components/Resume.tsx",
              lineNumber: 157,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                initial: { opacity: 0, x: 20 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.6, delay: index * 0.2 },
                onMouseEnter: playHoverSound,
                onClick: playClickSound,
                className: "relative group p-6 sm:p-8 mb-12 bg-[#0B1121] border border-cyan-500/30 rounded-sm shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.15),inset_0_0_30px_rgba(6,182,212,0.1)] transition-all duration-500 overflow-hidden cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" }, void 0, false, {
                    fileName: "/app/applet/src/components/Resume.tsx",
                    lineNumber: 168,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "relative z-20", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-cyan-900/30 pb-4", children: [
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("h4", { className: "font-space text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors", children: edu.role }, void 0, false, {
                          fileName: "/app/applet/src/components/Resume.tsx",
                          lineNumber: 173,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-xs sm:text-sm text-gray-500 tracking-wider uppercase mt-1", children: edu.org }, void 0, false, {
                          fileName: "/app/applet/src/components/Resume.tsx",
                          lineNumber: 174,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/Resume.tsx",
                        lineNumber: 172,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-xs text-cyan-500 bg-cyan-950/30 px-3 py-1 rounded-sm border border-cyan-900/50 w-fit", children: edu.date }, void 0, false, {
                        fileName: "/app/applet/src/components/Resume.tsx",
                        lineNumber: 176,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/Resume.tsx",
                      lineNumber: 171,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("ul", { className: "space-y-3", children: edu.points.map((point, i) => /* @__PURE__ */ jsxDEV("li", { className: "font-sans text-sm text-gray-400/80 font-light flex items-start gap-3", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-500/50 mt-1 text-[10px]", children: "▹" }, void 0, false, {
                        fileName: "/app/applet/src/components/Resume.tsx",
                        lineNumber: 182,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: point }, void 0, false, {
                        fileName: "/app/applet/src/components/Resume.tsx",
                        lineNumber: 183,
                        columnNumber: 27
                      }, this)
                    ] }, i, true, {
                      fileName: "/app/applet/src/components/Resume.tsx",
                      lineNumber: 181,
                      columnNumber: 25
                    }, this)) }, void 0, false, {
                      fileName: "/app/applet/src/components/Resume.tsx",
                      lineNumber: 179,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/Resume.tsx",
                    lineNumber: 170,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Resume.tsx",
                lineNumber: 159,
                columnNumber: 17
              },
              this
            )
          ] }, edu.id, true, {
            fileName: "/app/applet/src/components/Resume.tsx",
            lineNumber: 154,
            columnNumber: 15
          }, this))
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Resume.tsx",
          lineNumber: 147,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Resume.tsx",
        lineNumber: 97,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Resume.tsx",
      lineNumber: 73,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Resume.tsx",
    lineNumber: 70,
    columnNumber: 5
  }, this);
}
var OperationType = /* @__PURE__ */ ((OperationType2) => {
  OperationType2["CREATE"] = "create";
  OperationType2["UPDATE"] = "update";
  OperationType2["DELETE"] = "delete";
  OperationType2["LIST"] = "list";
  OperationType2["GET"] = "get";
  OperationType2["WRITE"] = "write";
  return OperationType2;
})(OperationType || {});
function handleFirestoreError(error, operationType, path) {
  var _a, _b;
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: (_a = auth.currentUser) == null ? void 0 : _a.uid,
      email: (_b = auth.currentUser) == null ? void 0 : _b.email
    },
    operationType,
    path
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      try {
        const contactData = {
          name: data.name,
          email: data.email,
          subject: "Form Submission",
          body: data.message,
          read: false,
          createdAt: serverTimestamp()
        };
        if (data.phone) {
          contactData.phone = data.phone;
        }
        await addDoc(collection(db, "contacts"), contactData);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, "contacts");
      }
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to send email via API:", errorData);
        alert(`Failed to send email: ${errorData.error || "Server Error"}
Please verify your Vercel Environment Variables are set.`);
        return;
      }
      setShowSuccess(true);
      e.target.reset();
      setTimeout(() => {
        setShowSuccess(false);
      }, 5e3);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const socialLinks = [
    { icon: /* @__PURE__ */ jsxDEV(Mail, { className: "w-6 h-6" }, void 0, false, {
      fileName: "/app/applet/src/components/Contact.tsx",
      lineNumber: 73,
      columnNumber: 13
    }, this), name: "Email", label: "TERMINAL [EMAIL]", value: "abbassaifee43\n@gmail.com", href: "mailto:abbassaifee43@gmail.com" },
    { icon: /* @__PURE__ */ jsxDEV(Linkedin, { className: "w-6 h-6" }, void 0, false, {
      fileName: "/app/applet/src/components/Contact.tsx",
      lineNumber: 74,
      columnNumber: 13
    }, this), name: "LinkedIn", label: "TERMINAL [NETWORK]", value: "@abbas-dawood", href: "https://www.linkedin.com/in/abbas-dawood/" },
    { icon: /* @__PURE__ */ jsxDEV(Github, { className: "w-6 h-6" }, void 0, false, {
      fileName: "/app/applet/src/components/Contact.tsx",
      lineNumber: 75,
      columnNumber: 13
    }, this), name: "GitHub", label: "TERMINAL [NETWORK]", value: "@abbasdawood", href: "https://github.com/abbas-dawood" },
    { icon: /* @__PURE__ */ jsxDEV(Instagram, { className: "w-6 h-6" }, void 0, false, {
      fileName: "/app/applet/src/components/Contact.tsx",
      lineNumber: 76,
      columnNumber: 13
    }, this), name: "Instagram", label: "TERMINAL [NETWORK]", value: "@abbasdawood_07", href: "https://www.instagram.com/abbasdawood_07/" },
    { icon: /* @__PURE__ */ jsxDEV(MapPin, { className: "w-6 h-6" }, void 0, false, {
      fileName: "/app/applet/src/components/Contact.tsx",
      lineNumber: 77,
      columnNumber: 13
    }, this), name: "Location", label: "TERMINAL [LOCATION]", value: "Udaipur,\nRajasthan", href: void 0 }
  ];
  return /* @__PURE__ */ jsxDEV("section", { id: "contact", className: "relative min-h-screen py-24 border-t border-cyan-900/30", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 relative", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "mb-16 flex flex-col md:flex-row justify-between items-end gap-8", children: /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "font-space text-3xl md:text-5xl font-bold mb-4", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-500", children: "04. " }, void 0, false, {
            fileName: "/app/applet/src/components/Contact.tsx",
            lineNumber: 86,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "glitch-text", "data-text": "Get In Touch", children: "Get In Touch" }, void 0, false, {
            fileName: "/app/applet/src/components/Contact.tsx",
            lineNumber: 87,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Contact.tsx",
          lineNumber: 85,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-sm text-cyan-400 tracking-widest uppercase", children: "// Secure Channel • Open For Opportunities" }, void 0, false, {
          fileName: "/app/applet/src/components/Contact.tsx",
          lineNumber: 89,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Contact.tsx",
        lineNumber: 84,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/Contact.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20", children: [
        /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            initial: { opacity: 0, x: -30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.8 },
            className: "flex flex-col",
            children: [
              /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-xl text-gray-300 mb-8 font-light leading-relaxed", children: "Whether you want to collaborate on a project, discuss ideas, or just say hello, feel free to reach out!" }, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 105,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "relative flex h-3 w-3", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" }, void 0, false, {
                    fileName: "/app/applet/src/components/Contact.tsx",
                    lineNumber: 111,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "relative inline-flex rounded-full h-3 w-3 bg-cyan-500" }, void 0, false, {
                    fileName: "/app/applet/src/components/Contact.tsx",
                    lineNumber: 112,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 110,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-sm text-cyan-400 tracking-widest", children: "STATUS: ONLINE" }, void 0, false, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 114,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 109,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/Contact.tsx",
            lineNumber: 98,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            initial: { opacity: 0, x: 30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.8 },
            className: "relative",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[#0B1121] border border-cyan-500/30 rounded-sm shadow-[0_0_15px_rgba(6,182,212,0.1),inset_0_0_20px_rgba(6,182,212,0.05)] transition-all duration-500" }, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 126,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" }, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 127,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "relative p-8 flex flex-col gap-6", children: [
                /* @__PURE__ */ jsxDEV("input", { type: "text", name: "hidden", className: "hidden" }, void 0, false, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 130,
                  columnNumber: 15
                }, this),
                " ",
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2", children: [
                  /* @__PURE__ */ jsxDEV("label", { htmlFor: "name", className: "font-mono text-[10px] text-cyan-500 tracking-widest uppercase", children: "Your Name" }, void 0, false, {
                    fileName: "/app/applet/src/components/Contact.tsx",
                    lineNumber: 133,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: "text",
                      id: "name",
                      name: "name",
                      required: true,
                      className: "bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/Contact.tsx",
                      lineNumber: 134,
                      columnNumber: 17
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 132,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2", children: [
                  /* @__PURE__ */ jsxDEV("label", { htmlFor: "email", className: "font-mono text-[10px] text-cyan-500 tracking-widest uppercase", children: "Your Email" }, void 0, false, {
                    fileName: "/app/applet/src/components/Contact.tsx",
                    lineNumber: 144,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: "email",
                      id: "email",
                      name: "email",
                      required: true,
                      className: "bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/Contact.tsx",
                      lineNumber: 145,
                      columnNumber: 17
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 143,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2", children: [
                  /* @__PURE__ */ jsxDEV("label", { htmlFor: "phone", className: "font-mono text-[10px] text-cyan-500 tracking-widest uppercase", children: "Your Phone (Optional)" }, void 0, false, {
                    fileName: "/app/applet/src/components/Contact.tsx",
                    lineNumber: 155,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: "tel",
                      id: "phone",
                      name: "phone",
                      className: "bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/Contact.tsx",
                      lineNumber: 156,
                      columnNumber: 17
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 154,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2", children: [
                  /* @__PURE__ */ jsxDEV("label", { htmlFor: "message", className: "font-mono text-[10px] text-cyan-500 tracking-widest uppercase", children: "Your Message" }, void 0, false, {
                    fileName: "/app/applet/src/components/Contact.tsx",
                    lineNumber: 165,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "textarea",
                    {
                      id: "message",
                      name: "message",
                      rows: 4,
                      required: true,
                      className: "bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm resize-none"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/Contact.tsx",
                      lineNumber: 166,
                      columnNumber: 17
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 164,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    type: "submit",
                    disabled: isSubmitting,
                    onClick: playClickSound,
                    className: "group relative mt-4 px-8 py-3 bg-amber-500 text-black font-space font-bold tracking-widest uppercase text-sm w-max hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 rounded-sm",
                    children: [
                      /* @__PURE__ */ jsxDEV("span", { children: isSubmitting ? "Sending..." : "Send Message" }, void 0, false, {
                        fileName: "/app/applet/src/components/Contact.tsx",
                        lineNumber: 181,
                        columnNumber: 17
                      }, this),
                      !isSubmitting && /* @__PURE__ */ jsxDEV(Send, { className: "w-4 h-4 ml-1" }, void 0, false, {
                        fileName: "/app/applet/src/components/Contact.tsx",
                        lineNumber: 182,
                        columnNumber: 35
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/Contact.tsx",
                    lineNumber: 175,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 129,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/Contact.tsx",
            lineNumber: 119,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Contact.tsx",
        lineNumber: 95,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: socialLinks.map((link, index) => {
        const Content = () => /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: index * 0.1 },
            whileHover: { y: -5 },
            onClick: link.href ? playClickSound : void 0,
            onMouseEnter: playHoverSound,
            className: cn(
              "flex items-center gap-6 p-6 bg-[#0B1121] border border-cyan-500/30 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] rounded-sm overflow-hidden relative group transition-all duration-500",
              link.href && "hover:border-amber-500/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.2),inset_0_0_30px_rgba(245,158,11,0.1)] cursor-pointer"
            ),
            children: [
              link.href && /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" }, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 207,
                columnNumber: 31
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform", children: link.icon }, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 208,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("h4", { className: "text-gray-400 text-sm mb-1", children: link.label }, void 0, false, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 212,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-gray-200 font-bold whitespace-pre-line group-hover:text-amber-400 transition-colors", children: link.value }, void 0, false, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 213,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 211,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/Contact.tsx",
            lineNumber: 193,
            columnNumber: 15
          },
          this
        );
        if (link.href) {
          return /* @__PURE__ */ jsxDEV(
            "a",
            {
              href: link.href,
              target: link.href.startsWith("http") ? "_blank" : void 0,
              rel: link.href.startsWith("http") ? "noopener noreferrer" : void 0,
              "aria-label": link.name,
              children: /* @__PURE__ */ jsxDEV(Content, {}, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 229,
                columnNumber: 19
              }, this)
            },
            index,
            false,
            {
              fileName: "/app/applet/src/components/Contact.tsx",
              lineNumber: 222,
              columnNumber: 17
            },
            this
          );
        }
        return /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV(Content, {}, void 0, false, {
          fileName: "/app/applet/src/components/Contact.tsx",
          lineNumber: 236,
          columnNumber: 17
        }, this) }, index, false, {
          fileName: "/app/applet/src/components/Contact.tsx",
          lineNumber: 235,
          columnNumber: 15
        }, this);
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/Contact.tsx",
        lineNumber: 190,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Contact.tsx",
      lineNumber: 82,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: showSuccess && /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md",
        children: /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            initial: { scale: 0.9, y: 20 },
            animate: { scale: 1, y: 0 },
            exit: { scale: 0.9, y: 20 },
            className: "bg-[#020617] border border-amber-500/50 p-12 max-w-md text-center rounded-sm shadow-[0_0_50px_rgba(245,158,11,0.1)] relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  className: "absolute inset-x-0 h-[2px] bg-amber-400/50 blur-[1px]",
                  animate: { top: ["-10%", "110%"] },
                  transition: { duration: 2, repeat: Infinity, ease: "linear" }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 259,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(CheckCircle, { className: "w-16 h-16 text-amber-400 mx-auto mb-6" }, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 265,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { className: "font-space text-2xl font-bold text-white mb-2", children: "Message Sent" }, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 266,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-sm text-gray-400", children: "Your message has been delivered to Abbas Dawood." }, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 267,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    playClickSound();
                    setShowSuccess(false);
                  },
                  className: "mt-8 text-amber-500 font-mono text-xs tracking-widest uppercase hover:text-white transition-colors border-b border-amber-500/30 pb-1 cursor-pointer",
                  children: "Close Connection"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 269,
                  columnNumber: 15
                },
                this
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/Contact.tsx",
            lineNumber: 252,
            columnNumber: 13
          },
          this
        )
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/Contact.tsx",
        lineNumber: 246,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/components/Contact.tsx",
      lineNumber: 244,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Contact.tsx",
    lineNumber: 81,
    columnNumber: 5
  }, this);
}
function Footer() {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxDEV("footer", { className: "relative bg-[#020617] border-t border-cyan-900/30 py-8 lg:py-12 mt-12", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "order-2 md:order-1 flex-shrink-0", children: /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: scrollToTop,
        className: "w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center text-white cursor-pointer transition-colors",
        "aria-label": "Back to top",
        children: /* @__PURE__ */ jsxDEV(ArrowUp, { className: "w-6 h-6" }, void 0, false, {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 22,
          columnNumber: 13
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/Footer.tsx",
        lineNumber: 17,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/components/Footer.tsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "order-3 md:order-2 flex flex-col items-center text-center space-y-2", children: [
      /* @__PURE__ */ jsxDEV("p", { className: "text-gray-400 font-sans text-sm", children: "© 2026 Abbas Dawood. Built with passion for innovation." }, void 0, false, {
        fileName: "/app/applet/src/components/Footer.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500 font-serif italic text-sm", children: '"The best way to predict the future is to create it."' }, void 0, false, {
        fileName: "/app/applet/src/components/Footer.tsx",
        lineNumber: 31,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Footer.tsx",
      lineNumber: 27,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "order-1 md:order-3 flex items-center gap-4 flex-shrink-0", children: [
      /* @__PURE__ */ jsxDEV(
        "a",
        {
          href: "https://github.com/abbas-dawood",
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: playClickSound,
          "aria-label": "GitHub",
          className: "w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors cursor-pointer",
          children: /* @__PURE__ */ jsxDEV(Github, { className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 46,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 38,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "a",
        {
          href: "https://www.linkedin.com/in/abbas-dawood/",
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: playClickSound,
          "aria-label": "LinkedIn",
          className: "w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors cursor-pointer",
          children: /* @__PURE__ */ jsxDEV(Linkedin, { className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 56,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 48,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "a",
        {
          href: "https://www.instagram.com/abbasdawood_07/",
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: playClickSound,
          "aria-label": "Instagram",
          className: "w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors cursor-pointer",
          children: /* @__PURE__ */ jsxDEV(Instagram, { className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 66,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 58,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Footer.tsx",
      lineNumber: 37,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Footer.tsx",
    lineNumber: 13,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/Footer.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}
function Portfolio() {
  const [bootComplete, setBootComplete] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "resume", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    if (bootComplete) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [bootComplete]);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(CustomCursor, {}, void 0, false, {
      fileName: "/app/applet/src/components/Portfolio.tsx",
      lineNumber: 39,
      columnNumber: 7
    }, this),
    !bootComplete && /* @__PURE__ */ jsxDEV(BootSequence, { onComplete: () => setBootComplete(true) }, void 0, false, {
      fileName: "/app/applet/src/components/Portfolio.tsx",
      lineNumber: 42,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: `relative text-white selection:bg-cyan-500/30 font-sans transition-opacity duration-1000 ${bootComplete ? "opacity-100" : "opacity-0 h-0 overflow-hidden pointer-events-none"}`, children: [
      /* @__PURE__ */ jsxDEV(Background, {}, void 0, false, {
        fileName: "/app/applet/src/components/Portfolio.tsx",
        lineNumber: 46,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(HUDOverlay, {}, void 0, false, {
        fileName: "/app/applet/src/components/Portfolio.tsx",
        lineNumber: 47,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Navbar, { activeSection }, void 0, false, {
        fileName: "/app/applet/src/components/Portfolio.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("main", { className: "relative z-10 w-full overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV(Hero, {}, void 0, false, {
          fileName: "/app/applet/src/components/Portfolio.tsx",
          lineNumber: 51,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(About, {}, void 0, false, {
          fileName: "/app/applet/src/components/Portfolio.tsx",
          lineNumber: 52,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(Skills, {}, void 0, false, {
          fileName: "/app/applet/src/components/Portfolio.tsx",
          lineNumber: 53,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(Resume, {}, void 0, false, {
          fileName: "/app/applet/src/components/Portfolio.tsx",
          lineNumber: 54,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(Contact, {}, void 0, false, {
          fileName: "/app/applet/src/components/Portfolio.tsx",
          lineNumber: 55,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Portfolio.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Footer, {}, void 0, false, {
        fileName: "/app/applet/src/components/Portfolio.tsx",
        lineNumber: 58,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Portfolio.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Portfolio.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
}
function AppRoutes() {
  return /* @__PURE__ */ jsxDEV(Routes, { children: /* @__PURE__ */ jsxDEV(Route, { path: "/", element: /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: "min-h-screen w-full overflow-hidden relative border-[6px] md:border-8 border-slate-900 flex flex-col items-stretch text-slate-300 font-mono select-none",
      style: { backgroundImage: "radial-gradient(circle at 50% 50%, #0c1e33 0%, #020617 100%)" },
      children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "fixed inset-0 pointer-events-none opacity-[0.15]",
            style: { backgroundImage: "repeating-linear-gradient(0deg, #06b6d4 0px, transparent 1px, transparent 2px)", backgroundSize: "100% 3px" }
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 17,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "fixed top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 m-4 md:m-6 pointer-events-none z-[100]" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 21,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "fixed top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 m-4 md:m-6 pointer-events-none z-[100]" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 22,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "fixed bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50 m-4 md:m-6 pointer-events-none z-[100]" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 23,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "fixed bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 m-4 md:m-6 pointer-events-none z-[100]" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 24,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(Portfolio, {}, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 26,
          columnNumber: 11
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 13,
      columnNumber: 9
    },
    this
  ) }, void 0, false, {
    fileName: "/app/applet/src/App.tsx",
    lineNumber: 12,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/App.tsx",
    lineNumber: 11,
    columnNumber: 5
  }, this);
}
function render(url) {
  return renderToString(
    /* @__PURE__ */ jsxDEV(React.StrictMode, { children: /* @__PURE__ */ jsxDEV(StaticRouter, { location: url, children: /* @__PURE__ */ jsxDEV(AppRoutes, {}, void 0, false, {
      fileName: "/app/applet/src/entry-server.tsx",
      lineNumber: 10,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/entry-server.tsx",
      lineNumber: 9,
      columnNumber: 7
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/entry-server.tsx",
      lineNumber: 8,
      columnNumber: 5
    }, this)
  );
}
export {
  render
};
