import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Plane, X, Menu, Compass, Target, Download, User, Navigation, Crosshair, Users, Monitor, Briefcase, Globe, Filter, Play, Shield, Flag, Mic2, FileText, LayoutDashboard, Share2, BookOpen, Globe2, Code, Gamepad2, Map, Award, Linkedin, Github, Instagram, Mail, Cpu, ShieldAlert, CheckCircle, ArrowUp } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
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
const navLinks = [
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "EXPERIENCE", href: "#experience" },
  { name: "MUN & DIPLOMACY", href: "#mun" },
  { name: "EDUCATION", href: "#education" },
  { name: "CERTIFICATION", href: "#certifications" },
  { name: "INTERESTS", href: "#interests" },
  { name: "CONTACT", href: "#contact" }
];
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    navLinks.forEach((link) => {
      if (link.href.startsWith("#")) {
        const el = document.querySelector(link.href);
        if (el) observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);
  const handleNavClick = (e, href) => {
    e.preventDefault();
    playClickSound();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsxDEV(
    motion.nav,
    {
      initial: { y: -100 },
      animate: { y: 0 },
      transition: { duration: 0.5 },
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#020617]/90 backdrop-blur-md border-b border-cyan-900/30 py-4" : "bg-transparent py-6"}`,
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxDEV(
            "a",
            {
              href: "#home",
              onClick: (e) => handleNavClick(e, "#home"),
              onMouseEnter: playHoverSound,
              className: "flex items-center gap-3 group",
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 flex items-center justify-center border border-cyan-500/50 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors rounded-sm", children: /* @__PURE__ */ jsxDEV(Plane, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 82,
                  columnNumber: 13
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 81,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "font-space font-bold tracking-widest text-white uppercase text-sm", children: "A. Dawood" }, void 0, false, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 84,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 75,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "hidden lg:flex items-center gap-6", children: [
            navLinks.map((link) => /* @__PURE__ */ jsxDEV(
              "a",
              {
                href: link.href,
                onClick: (e) => handleNavClick(e, link.href),
                onMouseEnter: playHoverSound,
                className: `font-mono text-[10px] uppercase tracking-[0.2em] transition-all relative pb-1 ${activeSection === link.href ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] border-b-2 border-cyan-400" : "text-gray-400 hover:text-cyan-400"}`,
                children: link.name
              },
              link.name,
              false,
              {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 92,
                columnNumber: 13
              },
              this
            )),
            /* @__PURE__ */ jsxDEV(
              "a",
              {
                href: "/Abbas_Dawood_Resume.pdf",
                target: "_blank",
                rel: "noopener noreferrer",
                onClick: playClickSound,
                onMouseEnter: playHoverSound,
                className: "font-mono text-[10px] uppercase tracking-[0.2em] text-black bg-cyan-500 hover:bg-white px-4 py-2 rounded-sm transition-colors ml-2",
                children: "VIEW CV"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 107,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "a",
              {
                href: "/Abbas_Dawood_Resume.pdf",
                download: true,
                onClick: playClickSound,
                onMouseEnter: playHoverSound,
                className: "font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-500 border border-cyan-500 hover:bg-cyan-500/10 px-4 py-2 rounded-sm transition-colors ml-2",
                children: "DOWNLOAD"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 117,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 90,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              },
              className: "lg:hidden text-cyan-500",
              "aria-label": "Toggle navigation menu",
              children: mobileMenuOpen ? /* @__PURE__ */ jsxDEV(X, {}, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 134,
                columnNumber: 29
              }, this) : /* @__PURE__ */ jsxDEV(Menu, {}, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 134,
                columnNumber: 37
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 129,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 72,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(AnimatePresence, { children: mobileMenuOpen && /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            className: "lg:hidden bg-[#020617] border-b border-cyan-900/30 overflow-hidden",
            children: /* @__PURE__ */ jsxDEV("div", { className: "px-6 py-4 flex flex-col gap-4", children: [
              navLinks.map((link) => /* @__PURE__ */ jsxDEV(
                "a",
                {
                  href: link.href,
                  onClick: (e) => handleNavClick(e, link.href),
                  className: `font-mono text-xs uppercase tracking-[0.2em] transition-colors block py-2 border-b ${activeSection === link.href ? "text-cyan-400 border-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" : "text-gray-400 hover:text-cyan-400 border-cyan-900/20"}`,
                  children: link.name
                },
                link.name,
                false,
                {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 149,
                  columnNumber: 17
                },
                this
              )),
              /* @__PURE__ */ jsxDEV(
                "a",
                {
                  href: "/Abbas_Dawood_Resume.pdf",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: () => {
                    playClickSound();
                    setMobileMenuOpen(false);
                  },
                  className: "font-mono text-xs uppercase tracking-[0.2em] text-black bg-cyan-500 hover:bg-white text-center py-3 rounded-sm transition-colors mt-2",
                  children: "VIEW CV"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 162,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "a",
                {
                  href: "/Abbas_Dawood_Resume.pdf",
                  download: true,
                  onClick: () => {
                    playClickSound();
                    setMobileMenuOpen(false);
                  },
                  className: "font-mono text-xs uppercase tracking-[0.2em] text-cyan-500 border border-cyan-500 hover:bg-cyan-500/10 text-center py-3 rounded-sm transition-colors mt-2",
                  children: "DOWNLOAD CV"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 171,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 147,
              columnNumber: 13
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 141,
            columnNumber: 11
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 139,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 64,
      columnNumber: 5
    },
    this
  );
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
function Hero() {
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
              lineNumber: 27,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-xs tracking-[0.2em] text-cyan-400", children: "IDENTITY // VERIFIED" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 28,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/Hero.tsx",
          lineNumber: 21,
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
          className: "font-space text-5xl md:text-7xl font-bold leading-tight mb-4",
          children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-white", children: "Abbas" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 37,
              columnNumber: 13
            }, this),
            " ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-gray-300", children: "Dawood" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 38,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "sr-only", children: ", Future Commercial Pilot, MUN Leader & Technologist" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 39,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/Hero.tsx",
          lineNumber: 31,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.5 },
          className: "flex flex-wrap gap-3 mb-6",
          children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] md:text-xs text-amber-500 border border-amber-900/50 bg-amber-950/20 px-3 py-1 rounded-sm uppercase tracking-widest", children: "Aspiring Commercial Pilot" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 48,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] md:text-xs text-cyan-500 border border-cyan-900/50 bg-cyan-950/20 px-3 py-1 rounded-sm uppercase tracking-widest", children: "Student Leader" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 49,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] md:text-xs text-cyan-500 border border-cyan-900/50 bg-cyan-950/20 px-3 py-1 rounded-sm uppercase tracking-widest", children: "Technology Enthusiast" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 50,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/Hero.tsx",
          lineNumber: 42,
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
          className: "font-sans text-xl md:text-2xl text-gray-300 mb-12 font-light max-w-lg leading-relaxed",
          children: "Building a future between technology, creativity, diplomacy, and aviation."
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/Hero.tsx",
          lineNumber: 53,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.8 },
          className: "flex flex-wrap items-center gap-4 md:gap-6",
          children: [
            /* @__PURE__ */ jsxDEV(
              "a",
              {
                href: "/Abbas_Dawood_Resume.pdf",
                target: "_blank",
                rel: "noopener noreferrer",
                onClick: playClickSound,
                className: "group relative px-6 py-3 bg-cyan-500 text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-sm flex items-center gap-2",
                children: [
                  "View CV",
                  /* @__PURE__ */ jsxDEV(Compass, { className: "w-4 h-4 group-hover:rotate-45 transition-transform duration-300" }, void 0, false, {
                    fileName: "/app/applet/src/components/Hero.tsx",
                    lineNumber: 75,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Hero.tsx",
                lineNumber: 68,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleScroll("contact"),
                className: "group relative px-6 py-3 border border-cyan-500 text-cyan-500 font-bold tracking-widest uppercase text-xs hover:bg-cyan-500/10 transition-colors rounded-sm flex items-center gap-2",
                children: [
                  "Contact Me",
                  /* @__PURE__ */ jsxDEV(Target, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/Hero.tsx",
                    lineNumber: 83,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Hero.tsx",
                lineNumber: 78,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "a",
              {
                href: "/Abbas_Dawood_Resume.pdf",
                download: "Abbas_Dawood_Resume.pdf",
                onClick: playClickSound,
                className: "group flex items-center gap-2 px-6 py-3 border border-transparent text-gray-400 font-bold tracking-widest uppercase text-xs hover:text-white transition-colors cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4 group-hover:-translate-y-1 transition-transform" }, void 0, false, {
                    fileName: "/app/applet/src/components/Hero.tsx",
                    lineNumber: 92,
                    columnNumber: 15
                  }, this),
                  "Download CV"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Hero.tsx",
                lineNumber: 86,
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
          lineNumber: 62,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Hero.tsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1, delay: 0.6 },
        className: "relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center z-10",
        children: /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-md aspect-square rounded-full border-[0.5px] border-cyan-900/30 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_70%)]", children: [
          /* @__PURE__ */ jsxDEV(
            motion.svg,
            {
              className: "absolute inset-0 w-full h-full -rotate-90",
              animate: { rotate: 270 },
              transition: { duration: 40, repeat: Infinity, ease: "linear" },
              children: /* @__PURE__ */ jsxDEV("circle", { cx: "50%", cy: "50%", r: "45%", fill: "none", stroke: "rgba(6,182,212,0.2)", strokeWidth: "1", strokeDasharray: "4 8" }, void 0, false, {
                fileName: "/app/applet/src/components/Hero.tsx",
                lineNumber: 114,
                columnNumber: 16
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 109,
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
              children: /* @__PURE__ */ jsxDEV("circle", { cx: "50%", cy: "50%", r: "48%", fill: "none", stroke: "rgba(245,158,11,0.2)", strokeWidth: "0.5", strokeDasharray: "20 40 10 40" }, void 0, false, {
                fileName: "/app/applet/src/components/Hero.tsx",
                lineNumber: 123,
                columnNumber: 16
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 118,
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
                lineNumber: 132,
                columnNumber: 16
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 127,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-[15%] left-[15%] text-left", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[9px] text-cyan-600 tracking-widest", children: "TRAJECTORY" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 137,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-xs text-white", children: "SET" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 138,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Hero.tsx",
            lineNumber: 136,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-[15%] right-[15%] text-right bg-black/40 backdrop-blur-md px-3 py-1 border border-cyan-900/50 rounded-sm", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[9px] text-amber-400 mb-1 tracking-widest", children: "PHASE" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 142,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-space text-sm font-bold tracking-widest text-white whitespace-nowrap", children: "ASCENT" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 143,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Hero.tsx",
            lineNumber: 141,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-[20%] left-[10%] text-left bg-black/40 backdrop-blur-md px-3 py-1 border border-cyan-900/50 rounded-sm", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[9px] text-cyan-400 mb-1 tracking-widest", children: "SYSTEM" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 147,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-space text-sm font-bold tracking-widest text-white whitespace-nowrap", children: "NOMINAL" }, void 0, false, {
              fileName: "/app/applet/src/components/Hero.tsx",
              lineNumber: 148,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Hero.tsx",
            lineNumber: 146,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Hero.tsx",
          lineNumber: 106,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/Hero.tsx",
        lineNumber: 99,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Hero.tsx",
    lineNumber: 17,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/Hero.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}
function About() {
  return /* @__PURE__ */ jsxDEV("section", { id: "about", className: "relative py-16 md:py-24 bg-[#0B1121] border-y border-cyan-900/20 overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 relative z-10", children: [
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "mb-12",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsxDEV(User, { className: "text-cyan-500 w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/About.tsx",
              lineNumber: 16,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider", children: "Professional Summary" }, void 0, false, {
              fileName: "/app/applet/src/components/About.tsx",
              lineNumber: 17,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/About.tsx",
            lineNumber: 15,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-1 bg-cyan-500 mb-8" }, void 0, false, {
            fileName: "/app/applet/src/components/About.tsx",
            lineNumber: 21,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/About.tsx",
        lineNumber: 9,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-12", children: [
      /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "lg:col-span-8",
          children: /* @__PURE__ */ jsxDEV("div", { className: "bg-[#020617] border border-cyan-900/30 p-8 rounded-sm relative overflow-hidden", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: /* @__PURE__ */ jsxDEV(Navigation, { className: "w-24 h-24 text-cyan-500" }, void 0, false, {
              fileName: "/app/applet/src/components/About.tsx",
              lineNumber: 34,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/About.tsx",
              lineNumber: 33,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-lg text-gray-300 leading-relaxed font-light mb-6 relative z-10", children: "Disciplined and driven Senior Secondary student (Science: Physics, Chemistry, Mathematics) with a clear aspiration toward a career as a Commercial Pilot. Demonstrates strong situational awareness, structured problem-solving, and composure under pressure, cultivated through active participation in Model United Nations conferences and independent research initiatives." }, void 0, false, {
              fileName: "/app/applet/src/components/About.tsx",
              lineNumber: 36,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-lg text-gray-300 leading-relaxed font-light relative z-10", children: "Combines an analytical, safety-conscious mindset with proven adaptability and a growth-oriented approach to learning. Recognized for clear communication, sound decision-making, and a genuine passion for aviation, innovation, and cross-cultural diplomacy." }, void 0, false, {
              fileName: "/app/applet/src/components/About.tsx",
              lineNumber: 40,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/About.tsx",
            lineNumber: 32,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/About.tsx",
          lineNumber: 26,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "lg:col-span-4 flex flex-col gap-6",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-[#020617] border border-amber-900/30 p-6 rounded-sm", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 mb-4", children: [
                /* @__PURE__ */ jsxDEV(Crosshair, { className: "text-amber-500 w-5 h-5" }, void 0, false, {
                  fileName: "/app/applet/src/components/About.tsx",
                  lineNumber: 55,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-mono text-sm uppercase tracking-widest text-amber-500", children: "Career Focus" }, void 0, false, {
                  fileName: "/app/applet/src/components/About.tsx",
                  lineNumber: 56,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/About.tsx",
                lineNumber: 54,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "font-space text-xl font-bold text-white tracking-widest uppercase", children: "Commercial Aviation" }, void 0, false, {
                fileName: "/app/applet/src/components/About.tsx",
                lineNumber: 58,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-xs text-gray-500 mt-2 uppercase tracking-widest", children: "Trajectory Set" }, void 0, false, {
                fileName: "/app/applet/src/components/About.tsx",
                lineNumber: 61,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/About.tsx",
              lineNumber: 53,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-[#020617] border border-cyan-900/30 p-6 rounded-sm flex-1 flex flex-col justify-center", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[10px] text-cyan-600 mb-2 tracking-[0.2em] uppercase", children: "Current Coordinates" }, void 0, false, {
                fileName: "/app/applet/src/components/About.tsx",
                lineNumber: 67,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-gray-300 font-medium", children: "Udaipur, Rajasthan, India" }, void 0, false, {
                fileName: "/app/applet/src/components/About.tsx",
                lineNumber: 68,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/About.tsx",
              lineNumber: 66,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/About.tsx",
          lineNumber: 47,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/About.tsx",
      lineNumber: 24,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/About.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/About.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const skillCategories = [
  {
    id: "CORE",
    label: "CORE COMPETENCIES",
    icon: /* @__PURE__ */ jsxDEV(Target, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/Skills.tsx",
      lineNumber: 11,
      columnNumber: 11
    }, void 0),
    color: "text-amber-400",
    borderColor: "border-amber-500/50",
    bgColor: "bg-amber-950/20",
    skills: [
      { name: "Critical Thinking", status: "ACTIVE" },
      { name: "Decision-Making Under Pressure", status: "ACTIVE" },
      { name: "Structured Problem-Solving", status: "ACTIVE" },
      { name: "Analytical Mindset", status: "ACTIVE" },
      { name: "Situational Awareness", status: "ACTIVE" }
    ]
  },
  {
    id: "LEADERSHIP",
    label: "LEADERSHIP & COMMUNICATION",
    icon: /* @__PURE__ */ jsxDEV(Users, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/Skills.tsx",
      lineNumber: 26,
      columnNumber: 11
    }, void 0),
    color: "text-cyan-400",
    borderColor: "border-cyan-500/50",
    bgColor: "bg-cyan-950/20",
    skills: [
      { name: "Public Speaking", status: "ACTIVE" },
      { name: "International Diplomacy", status: "ACTIVE" },
      { name: "Team Collaboration", status: "ACTIVE" },
      { name: "Adaptability", status: "ACTIVE" }
    ]
  },
  {
    id: "DIGITAL",
    label: "DIGITAL & DESIGN TOOLS",
    icon: /* @__PURE__ */ jsxDEV(Monitor, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/Skills.tsx",
      lineNumber: 40,
      columnNumber: 11
    }, void 0),
    color: "text-emerald-400",
    borderColor: "border-emerald-500/50",
    bgColor: "bg-emerald-950/20",
    skills: [
      { name: "Figma", status: "WORKING" },
      { name: "Canva", status: "WORKING" },
      { name: "Video Editing", status: "WORKING" },
      { name: "Basic Coding & Web Dev", status: "EXPLORING" }
    ]
  }
];
function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const activeData = skillCategories.find((c) => c.id === activeCategory);
  return /* @__PURE__ */ jsxDEV("section", { id: "skills", className: "relative py-16 md:py-24 bg-[#0B1121] border-y border-cyan-900/20 overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: [
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "mb-16",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsxDEV(Compass, { className: "text-cyan-500 w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 69,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider", children: "Command Center" }, void 0, false, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 70,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Skills.tsx",
            lineNumber: 68,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-xs text-gray-400 max-w-2xl uppercase tracking-widest border-l-2 border-amber-500 pl-4 py-1", children: "System Capabilities & Core Loadout" }, void 0, false, {
            fileName: "/app/applet/src/components/Skills.tsx",
            lineNumber: 74,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/Skills.tsx",
        lineNumber: 62,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[400px]", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-4 flex flex-col gap-4", children: skillCategories.map((cat) => /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => {
            playClickSound();
            setActiveCategory(cat.id);
          },
          onMouseEnter: playHoverSound,
          className: cn(
            "relative flex items-center gap-4 p-5 text-left border rounded-sm transition-all duration-300 group",
            activeCategory === cat.id ? `bg-[#020617] ${cat.borderColor} shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]` : "bg-[#020617]/50 border-cyan-900/30 hover:border-cyan-500/50"
          ),
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: cn(
              "p-2 rounded-sm transition-colors",
              activeCategory === cat.id ? cat.bgColor + " " + cat.color : "bg-cyan-950/20 text-cyan-700 group-hover:text-cyan-400"
            ), children: cat.icon }, void 0, false, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 98,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: /* @__PURE__ */ jsxDEV("h3", { className: cn(
              "font-mono text-sm tracking-widest uppercase transition-colors",
              activeCategory === cat.id ? "text-white" : "text-gray-500 group-hover:text-gray-300"
            ), children: cat.label }, void 0, false, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 105,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/Skills.tsx",
              lineNumber: 104,
              columnNumber: 17
            }, this),
            activeCategory === cat.id && /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                layoutId: "active-indicator",
                className: cn("absolute right-0 top-0 bottom-0 w-1", cat.bgColor)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Skills.tsx",
                lineNumber: 115,
                columnNumber: 19
              },
              this
            )
          ]
        },
        cat.id,
        true,
        {
          fileName: "/app/applet/src/components/Skills.tsx",
          lineNumber: 84,
          columnNumber: 15
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/Skills.tsx",
        lineNumber: 82,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-8 bg-[#020617] border border-cyan-900/30 p-8 rounded-sm relative overflow-hidden flex flex-col", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" }, void 0, false, {
          fileName: "/app/applet/src/components/Skills.tsx",
          lineNumber: 128,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20 },
            transition: { duration: 0.3 },
            className: "relative z-10 flex-1 flex flex-col",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-8 pb-6 border-b border-cyan-900/30", children: [
                /* @__PURE__ */ jsxDEV("div", { className: cn("p-3 rounded-sm", activeData == null ? void 0 : activeData.bgColor, activeData == null ? void 0 : activeData.color), children: activeData == null ? void 0 : activeData.icon }, void 0, false, {
                  fileName: "/app/applet/src/components/Skills.tsx",
                  lineNumber: 140,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("h3", { className: "font-space text-2xl font-bold text-white uppercase tracking-wider", children: activeData == null ? void 0 : activeData.label }, void 0, false, {
                    fileName: "/app/applet/src/components/Skills.tsx",
                    lineNumber: 144,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-xs text-gray-500 uppercase tracking-widest mt-1", children: "STATUS: OPERATIONAL" }, void 0, false, {
                    fileName: "/app/applet/src/components/Skills.tsx",
                    lineNumber: 145,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Skills.tsx",
                  lineNumber: 143,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Skills.tsx",
                lineNumber: 139,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max flex-1", children: activeData == null ? void 0 : activeData.skills.map((skill, index) => /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.3, delay: index * 0.1 },
                  className: "flex items-center justify-between p-4 bg-black/40 border border-cyan-900/30 rounded-sm hover:border-cyan-500/30 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "font-sans text-gray-200 font-medium", children: skill.name }, void 0, false, {
                      fileName: "/app/applet/src/components/Skills.tsx",
                      lineNumber: 158,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: cn(
                      "font-mono text-[10px] px-2 py-1 rounded-sm uppercase tracking-widest",
                      skill.status === "ACTIVE" ? "bg-amber-950/30 text-amber-500 border border-amber-900/50" : skill.status === "WORKING" ? "bg-cyan-950/30 text-cyan-400 border border-cyan-900/50" : "bg-gray-900/50 text-gray-400 border border-gray-700"
                    ), children: skill.status }, void 0, false, {
                      fileName: "/app/applet/src/components/Skills.tsx",
                      lineNumber: 159,
                      columnNumber: 23
                    }, this)
                  ]
                },
                skill.name,
                true,
                {
                  fileName: "/app/applet/src/components/Skills.tsx",
                  lineNumber: 151,
                  columnNumber: 21
                },
                this
              )) }, void 0, false, {
                fileName: "/app/applet/src/components/Skills.tsx",
                lineNumber: 149,
                columnNumber: 17
              }, this)
            ]
          },
          activeCategory,
          true,
          {
            fileName: "/app/applet/src/components/Skills.tsx",
            lineNumber: 131,
            columnNumber: 15
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/Skills.tsx",
          lineNumber: 130,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Skills.tsx",
        lineNumber: 125,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Skills.tsx",
      lineNumber: 79,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Skills.tsx",
    lineNumber: 60,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/Skills.tsx",
    lineNumber: 59,
    columnNumber: 5
  }, this);
}
const experienceData = [
  {
    role: "Model United Nations (MUN) Participant",
    company: "Various MUN Conferences",
    location: "Udaipur, Rajasthan",
    date: "November 2022 – Present",
    bullets: [
      "Represented assigned nations in structured multilateral debates on global diplomacy and policy issues, sharpening critical thinking under time pressure",
      "Cultivated advanced public speaking, negotiation, and persuasive communication skills across multiple conference settings",
      "Practiced composed, rational decision-making while navigating high-pressure debate scenarios and shifting positions",
      "Strengthened leadership presence and cross-cultural collaboration by engaging respectfully with diverse viewpoints"
    ]
  },
  {
    role: "Independent Technology & Innovation Initiative",
    company: "Self-Directed",
    location: "Udaipur, Rajasthan",
    date: "April 2021 – Present",
    bullets: [
      "Spearheaded independent research into emerging technologies, digital tools, and innovation trends to build practical, real-world knowledge",
      "Managed self-directed learning projects end-to-end, applying structured problem-solving to translate concepts into working outcomes",
      "Analyzed startup ecosystems and “Make-in-India” innovation themes, developing a foundational understanding of entrepreneurial thinking",
      "Applied design tools (Figma, Canva) and video editing to independently plan and produce creative digital projects"
    ]
  }
];
function Experience() {
  return /* @__PURE__ */ jsxDEV("section", { id: "experience", className: "relative py-16 md:py-24 bg-[#0B1121] border-t border-cyan-900/20", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: [
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "mb-16",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsxDEV(Briefcase, { className: "text-cyan-500 w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/Experience.tsx",
              lineNumber: 42,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider", children: "Experience & Leadership" }, void 0, false, {
              fileName: "/app/applet/src/components/Experience.tsx",
              lineNumber: 43,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Experience.tsx",
            lineNumber: 41,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-1 bg-cyan-500 mb-8" }, void 0, false, {
            fileName: "/app/applet/src/components/Experience.tsx",
            lineNumber: 47,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/Experience.tsx",
        lineNumber: 35,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "relative border-l border-cyan-900/30 pl-8 md:pl-12 space-y-16", children: experienceData.map((exp, index) => /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, x: -20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.2 },
        className: "relative",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute -left-[37px] md:-left-[53px] top-1 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" }, void 0, false, {
            fileName: "/app/applet/src/components/Experience.tsx",
            lineNumber: 61,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute -left-[45px] md:-left-[61px] top-[1px] w-7 h-7 border border-cyan-500/30 rounded-full" }, void 0, false, {
            fileName: "/app/applet/src/components/Experience.tsx",
            lineNumber: 62,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "font-space text-xl font-bold text-white mb-2", children: exp.role }, void 0, false, {
                fileName: "/app/applet/src/components/Experience.tsx",
                lineNumber: 66,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-xs text-cyan-400 uppercase tracking-widest", children: exp.company }, void 0, false, {
                fileName: "/app/applet/src/components/Experience.tsx",
                lineNumber: 67,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Experience.tsx",
              lineNumber: 65,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-start lg:items-end gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-xs text-cyan-400 bg-cyan-950/20 border border-cyan-900/30 px-3 py-1 rounded-sm w-max", children: exp.date }, void 0, false, {
                fileName: "/app/applet/src/components/Experience.tsx",
                lineNumber: 70,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] text-gray-500 uppercase tracking-widest", children: exp.location }, void 0, false, {
                fileName: "/app/applet/src/components/Experience.tsx",
                lineNumber: 73,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Experience.tsx",
              lineNumber: 69,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Experience.tsx",
            lineNumber: 64,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("ul", { className: "space-y-3 ml-2 lg:ml-6", children: exp.bullets.map((bullet, idx) => /* @__PURE__ */ jsxDEV("li", { className: "flex items-start gap-3 text-gray-400 font-sans font-light leading-relaxed", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "mt-2 w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/Experience.tsx",
              lineNumber: 80,
              columnNumber: 21
            }, this),
            bullet
          ] }, idx, true, {
            fileName: "/app/applet/src/components/Experience.tsx",
            lineNumber: 79,
            columnNumber: 19
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/Experience.tsx",
            lineNumber: 77,
            columnNumber: 15
          }, this)
        ]
      },
      index,
      true,
      {
        fileName: "/app/applet/src/components/Experience.tsx",
        lineNumber: 52,
        columnNumber: 13
      },
      this
    )) }, void 0, false, {
      fileName: "/app/applet/src/components/Experience.tsx",
      lineNumber: 50,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Experience.tsx",
    lineNumber: 34,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/Experience.tsx",
    lineNumber: 33,
    columnNumber: 5
  }, this);
}
const munData = [
  {
    id: "sassy26",
    role: "Executive Board Member / Rapporteur",
    event: "SASSY'26",
    mission: "St. Anthony's Students Summit by YUVA, Udaipur.",
    committee: "Education Ministry of India (Senior)",
    category: "EXECUTIVE BOARD",
    icon: /* @__PURE__ */ jsxDEV(Shield, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
      lineNumber: 15,
      columnNumber: 11
    }, void 0)
  },
  {
    id: "idc26",
    role: "Organizer",
    event: "IDC MUN 2026 — Chapter 1",
    mission: "Organised and coordinated Chapter 1 of IDC MUN in Jaipur.",
    committee: "Core Organizing Committee",
    category: "ORGANIZER",
    icon: /* @__PURE__ */ jsxDEV(Flag, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
      lineNumber: 24,
      columnNumber: 11
    }, void 0)
  },
  {
    id: "sangam26",
    role: "Participant",
    event: "Sangam MUN 2026",
    mission: "Active participation in parliamentary procedures.",
    committee: "Lok Sabha",
    category: "PARTICIPANT",
    icon: /* @__PURE__ */ jsxDEV(Mic2, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
      lineNumber: 33,
      columnNumber: 11
    }, void 0)
  },
  {
    id: "iit25",
    role: "Participant",
    event: "IIT Bombay 2025",
    mission: "Advanced level debate and structural discussions.",
    committee: "AIIMP",
    category: "PARTICIPANT",
    icon: /* @__PURE__ */ jsxDEV(Globe, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
      lineNumber: 42,
      columnNumber: 11
    }, void 0)
  },
  {
    id: "ryc25",
    role: "Participant",
    event: "RYCMUN 2025",
    mission: "National policy formulation and debate.",
    committee: "Lok Sabha",
    category: "PARTICIPANT",
    icon: /* @__PURE__ */ jsxDEV(Mic2, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
      lineNumber: 51,
      columnNumber: 11
    }, void 0)
  },
  {
    id: "sangam25",
    role: "Participant",
    event: "Sangam MUN 2025",
    mission: "Crisis committee navigation and strategy.",
    committee: "CCC",
    category: "PARTICIPANT",
    icon: /* @__PURE__ */ jsxDEV(Mic2, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
      lineNumber: 60,
      columnNumber: 11
    }, void 0)
  },
  {
    id: "dps24",
    role: "OC Member",
    event: "DPS MUN 2024",
    mission: "Facilitated logistics and core operations.",
    committee: "Organizing Committee",
    category: "OC",
    icon: /* @__PURE__ */ jsxDEV(Users, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
      lineNumber: 69,
      columnNumber: 11
    }, void 0)
  },
  {
    id: "dps-ud",
    role: "IP Member",
    event: "DPS Udaipur MUN",
    mission: "Journalism and reporting within the MUN framework.",
    committee: "International Press",
    category: "PARTICIPANT",
    icon: /* @__PURE__ */ jsxDEV(FileText, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
      lineNumber: 78,
      columnNumber: 11
    }, void 0)
  },
  {
    id: "imun",
    role: "Participant",
    event: "IMUN, India",
    mission: "International Model United Nations.",
    committee: "General Assembly",
    category: "PARTICIPANT",
    icon: /* @__PURE__ */ jsxDEV(Globe, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
      lineNumber: 87,
      columnNumber: 11
    }, void 0)
  },
  {
    id: "mock",
    role: "Participant",
    event: "Mock Parliament, Jaipur",
    mission: "Indian parliamentary simulation.",
    committee: "Parliament",
    category: "PARTICIPANT",
    icon: /* @__PURE__ */ jsxDEV(Mic2, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
      lineNumber: 96,
      columnNumber: 11
    }, void 0)
  },
  {
    id: "mumbai",
    role: "Delegate",
    event: "Mumbai MUN Circuit",
    mission: "Attended multiple competitive MUN conferences across the Mumbai circuit.",
    committee: "Multiple Committees",
    category: "PARTICIPANT",
    icon: /* @__PURE__ */ jsxDEV(Globe, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
      lineNumber: 105,
      columnNumber: 11
    }, void 0)
  },
  {
    id: "online",
    role: "Delegate",
    event: "Online MUN Experiences",
    mission: "Participated in diverse online committee simulations.",
    committee: "UNGA, UNHRC, IPL",
    category: "ONLINE",
    icon: /* @__PURE__ */ jsxDEV(Monitor, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
      lineNumber: 114,
      columnNumber: 11
    }, void 0)
  },
  {
    id: "debate",
    role: "Speaker",
    event: "Debate & Parliamentary",
    mission: "Extensive involvement in school debates and structured parliamentary formats.",
    committee: "Tark Vitrak, IDC, Baithke, Charchaaar",
    category: "PARTICIPANT",
    icon: /* @__PURE__ */ jsxDEV(Mic2, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
      lineNumber: 123,
      columnNumber: 11
    }, void 0)
  }
];
const filters = ["ALL", "EXECUTIVE BOARD", "ORGANIZER", "OC", "PARTICIPANT", "ONLINE"];
function MunDiplomacy() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedId, setSelectedId] = useState(munData[0].id);
  const filteredData = useMemo(() => {
    return munData.filter((item) => activeFilter === "ALL" || item.category === activeFilter);
  }, [activeFilter]);
  useMemo(() => {
    if (filteredData.length > 0 && !filteredData.find((item) => item.id === selectedId)) {
      setSelectedId(filteredData[0].id);
    }
  }, [filteredData, selectedId]);
  const activeItem = useMemo(() => {
    return munData.find((item) => item.id === selectedId) || filteredData[0];
  }, [selectedId, filteredData]);
  return /* @__PURE__ */ jsxDEV("section", { id: "mun", className: "relative py-16 md:py-24 bg-[#0B1121] border-y border-cyan-900/20 overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 relative z-10", children: [
      /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "mb-12",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-4", children: [
              /* @__PURE__ */ jsxDEV(Globe, { className: "text-cyan-500 w-6 h-6" }, void 0, false, {
                fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                lineNumber: 158,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("h2", { className: "font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider", children: "MUN & Diplomacy" }, void 0, false, {
                fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                lineNumber: 159,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MunDiplomacy.tsx",
              lineNumber: 157,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-1 bg-cyan-500 mb-8" }, void 0, false, {
              fileName: "/app/applet/src/components/MunDiplomacy.tsx",
              lineNumber: 163,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/MunDiplomacy.tsx",
          lineNumber: 151,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2 mb-8", children: [
        /* @__PURE__ */ jsxDEV(Filter, { className: "w-4 h-4 text-cyan-500 mr-2" }, void 0, false, {
          fileName: "/app/applet/src/components/MunDiplomacy.tsx",
          lineNumber: 168,
          columnNumber: 11
        }, this),
        filters.map((filter) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              playClickSound();
              setActiveFilter(filter);
            },
            onMouseEnter: playHoverSound,
            className: cn(
              "font-mono text-[10px] px-3 py-1.5 rounded-sm uppercase tracking-widest transition-colors border",
              activeFilter === filter ? "bg-cyan-500 text-black border-cyan-500" : "bg-[#020617] text-gray-400 border-cyan-900/30 hover:border-cyan-500/50 hover:text-cyan-400"
            ),
            children: filter
          },
          filter,
          false,
          {
            fileName: "/app/applet/src/components/MunDiplomacy.tsx",
            lineNumber: 170,
            columnNumber: 13
          },
          this
        ))
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MunDiplomacy.tsx",
        lineNumber: 167,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[500px]", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar", children: [
          /* @__PURE__ */ jsxDEV(AnimatePresence, { children: filteredData.map((item, idx) => /* @__PURE__ */ jsxDEV(
            motion.button,
            {
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, scale: 0.95 },
              transition: { delay: idx * 0.05 },
              onClick: () => {
                playClickSound();
                setSelectedId(item.id);
              },
              onMouseEnter: playHoverSound,
              className: cn(
                "flex flex-col text-left p-4 border rounded-sm transition-all duration-300 relative group",
                selectedId === item.id ? "bg-[#020617] border-cyan-400 shadow-[inset_0_0_15px_rgba(6,182,212,0.2)]" : "bg-[#020617]/50 border-cyan-900/30 hover:border-cyan-500/50"
              ),
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-start mb-2", children: [
                  /* @__PURE__ */ jsxDEV("h3", { className: cn(
                    "font-space text-base font-bold transition-colors",
                    selectedId === item.id ? "text-cyan-400" : "text-gray-300 group-hover:text-white"
                  ), children: item.event }, void 0, false, {
                    fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                    lineNumber: 208,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] text-amber-500 border border-amber-900/30 bg-amber-950/20 px-2 py-0.5 rounded-sm uppercase tracking-widest shrink-0 ml-2", children: item.category }, void 0, false, {
                    fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                    lineNumber: 214,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                  lineNumber: 207,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[10px] text-gray-500 uppercase tracking-widest line-clamp-1", children: item.role }, void 0, false, {
                  fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                  lineNumber: 218,
                  columnNumber: 19
                }, this)
              ]
            },
            item.id,
            true,
            {
              fileName: "/app/applet/src/components/MunDiplomacy.tsx",
              lineNumber: 192,
              columnNumber: 17
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/MunDiplomacy.tsx",
            lineNumber: 190,
            columnNumber: 13
          }, this),
          filteredData.length === 0 && /* @__PURE__ */ jsxDEV("div", { className: "text-center p-8 border border-dashed border-cyan-900/30 rounded-sm", children: /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-xs text-gray-500 uppercase tracking-widest", children: "No records found for this filter." }, void 0, false, {
            fileName: "/app/applet/src/components/MunDiplomacy.tsx",
            lineNumber: 224,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/MunDiplomacy.tsx",
            lineNumber: 223,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MunDiplomacy.tsx",
          lineNumber: 189,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 bg-[#020617] border border-cyan-900/30 p-8 rounded-sm relative overflow-hidden flex flex-col", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" }, void 0, false, {
            fileName: "/app/applet/src/components/MunDiplomacy.tsx",
            lineNumber: 231,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(AnimatePresence, { mode: "wait", children: activeItem && /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
              transition: { duration: 0.3 },
              className: "relative z-10 flex-1 flex flex-col",
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-4 mb-8 pb-6 border-b border-cyan-900/30", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-cyan-950/20 text-cyan-500 border border-cyan-900/30 rounded-sm shrink-0", children: activeItem.icon }, void 0, false, {
                    fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                    lineNumber: 244,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("h3", { className: "font-space text-2xl md:text-3xl font-bold text-white mb-2 leading-tight", children: activeItem.event }, void 0, false, {
                      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                      lineNumber: 248,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-xs text-cyan-400 bg-cyan-950/30 border border-cyan-900/50 px-3 py-1 rounded-sm uppercase tracking-widest", children: activeItem.role }, void 0, false, {
                      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                      lineNumber: 250,
                      columnNumber: 25
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                      lineNumber: 249,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                    lineNumber: 247,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                  lineNumber: 243,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 flex-1", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "bg-[#0B1121] p-6 rounded-sm border border-cyan-900/20", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-3", children: [
                      /* @__PURE__ */ jsxDEV(Users, { className: "w-4 h-4 text-gray-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                        lineNumber: 260,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("h4", { className: "font-mono text-[10px] text-gray-500 uppercase tracking-widest", children: "Committee / Format" }, void 0, false, {
                        fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                        lineNumber: 261,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                      lineNumber: 259,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-sm text-gray-200 leading-relaxed font-medium", children: activeItem.committee }, void 0, false, {
                      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                      lineNumber: 263,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                    lineNumber: 258,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "bg-[#0B1121] p-6 rounded-sm border border-cyan-900/20", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-3", children: [
                      /* @__PURE__ */ jsxDEV(Play, { className: "w-4 h-4 text-gray-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                        lineNumber: 268,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("h4", { className: "font-mono text-[10px] text-gray-500 uppercase tracking-widest", children: "Mission Log / Description" }, void 0, false, {
                        fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                        lineNumber: 269,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                      lineNumber: 267,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-sm text-gray-300 leading-relaxed font-light", children: activeItem.mission }, void 0, false, {
                      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                      lineNumber: 271,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                    lineNumber: 266,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MunDiplomacy.tsx",
                  lineNumber: 257,
                  columnNumber: 19
                }, this)
              ]
            },
            activeItem.id,
            true,
            {
              fileName: "/app/applet/src/components/MunDiplomacy.tsx",
              lineNumber: 235,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/MunDiplomacy.tsx",
            lineNumber: 233,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MunDiplomacy.tsx",
          lineNumber: 230,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MunDiplomacy.tsx",
        lineNumber: 186,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
      lineNumber: 150,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("style", { dangerouslySetInnerHTML: { __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(2, 6, 23, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.6);
        }
      ` } }, void 0, false, {
      fileName: "/app/applet/src/components/MunDiplomacy.tsx",
      lineNumber: 283,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/MunDiplomacy.tsx",
    lineNumber: 149,
    columnNumber: 5
  }, this);
}
const leadershipData = [
  {
    role: "Executive Board Member / Rapporteur",
    event: "SASSY'26",
    organization: "St. Anthony's Students Summit by YUVA, Udaipur.",
    committee: "Education Ministry of India (Senior)",
    date: "August 2026",
    icon: /* @__PURE__ */ jsxDEV(Shield, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/Leadership.tsx",
      lineNumber: 11,
      columnNumber: 11
    }, void 0)
  },
  {
    role: "Organizer",
    event: "IDC MUN 2026 — Chapter 1",
    organization: "Core Organizing Committee",
    committee: "Core Organizing Committee",
    mission: "Organised and coordinated Chapter 1 of IDC MUN in Jaipur.",
    date: "2026",
    icon: /* @__PURE__ */ jsxDEV(Flag, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/Leadership.tsx",
      lineNumber: 20,
      columnNumber: 11
    }, void 0)
  },
  {
    role: "OC Member",
    event: "DPS MUN 2024",
    organization: "Organizing Committee",
    committee: "Organizing Committee",
    mission: "Facilitated logistics and core operations.",
    date: "2024",
    icon: /* @__PURE__ */ jsxDEV(LayoutDashboard, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/Leadership.tsx",
      lineNumber: 29,
      columnNumber: 11
    }, void 0)
  },
  {
    role: "Campus Ambassador & Social Media Marketing Internship",
    event: "IMUN",
    organization: "International Model United Nations",
    committee: "Campus Ambassador",
    mission: "Executed social media marketing campaigns, contributed to business development, and represented IMUN as a Campus Ambassador.",
    icon: /* @__PURE__ */ jsxDEV(Share2, { className: "w-5 h-5" }, void 0, false, {
      fileName: "/app/applet/src/components/Leadership.tsx",
      lineNumber: 37,
      columnNumber: 11
    }, void 0)
  }
];
function Leadership() {
  return /* @__PURE__ */ jsxDEV("section", { id: "leadership", className: "relative py-16 md:py-24 bg-[#0B1121] border-y border-cyan-900/20", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 relative z-10", children: [
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "mb-16",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsxDEV(Shield, { className: "text-amber-500 w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/Leadership.tsx",
              lineNumber: 52,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider", children: "Leadership & Organizing" }, void 0, false, {
              fileName: "/app/applet/src/components/Leadership.tsx",
              lineNumber: 53,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Leadership.tsx",
            lineNumber: 51,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-1 bg-amber-500 mb-8" }, void 0, false, {
            fileName: "/app/applet/src/components/Leadership.tsx",
            lineNumber: 57,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/Leadership.tsx",
        lineNumber: 45,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: leadershipData.map((item, index) => /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.1 },
        className: "bg-[#020617] border border-cyan-900/30 p-8 rounded-sm hover:border-amber-500/50 transition-colors relative group flex flex-col h-full",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-start mb-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-amber-500 bg-amber-950/30 p-3 rounded-sm group-hover:bg-amber-500 group-hover:text-black transition-colors", children: item.icon }, void 0, false, {
              fileName: "/app/applet/src/components/Leadership.tsx",
              lineNumber: 71,
              columnNumber: 17
            }, this),
            item.date && /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] text-gray-400 border border-gray-800 bg-gray-900/50 px-3 py-1 rounded-sm uppercase tracking-widest", children: item.date }, void 0, false, {
              fileName: "/app/applet/src/components/Leadership.tsx",
              lineNumber: 75,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Leadership.tsx",
            lineNumber: 70,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "font-space text-xl font-bold text-white mb-2", children: item.event }, void 0, false, {
              fileName: "/app/applet/src/components/Leadership.tsx",
              lineNumber: 82,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-xs text-cyan-400 font-bold mb-4 uppercase tracking-wide", children: item.role }, void 0, false, {
              fileName: "/app/applet/src/components/Leadership.tsx",
              lineNumber: 83,
              columnNumber: 17
            }, this),
            item.organization && /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-sm text-gray-400 font-light leading-relaxed mb-2", children: [
              /* @__PURE__ */ jsxDEV("strong", { className: "text-gray-300", children: "Organization:" }, void 0, false, {
                fileName: "/app/applet/src/components/Leadership.tsx",
                lineNumber: 87,
                columnNumber: 21
              }, this),
              " ",
              item.organization
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Leadership.tsx",
              lineNumber: 86,
              columnNumber: 19
            }, this),
            item.committee && /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-sm text-gray-400 font-light leading-relaxed mb-4", children: [
              /* @__PURE__ */ jsxDEV("strong", { className: "text-gray-300", children: "Role/Format:" }, void 0, false, {
                fileName: "/app/applet/src/components/Leadership.tsx",
                lineNumber: 92,
                columnNumber: 21
              }, this),
              " ",
              item.committee
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Leadership.tsx",
              lineNumber: 91,
              columnNumber: 19
            }, this),
            item.mission && /* @__PURE__ */ jsxDEV("div", { className: "mt-4 pt-4 border-t border-cyan-900/30", children: /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-sm text-gray-300 font-light leading-relaxed", children: item.mission }, void 0, false, {
              fileName: "/app/applet/src/components/Leadership.tsx",
              lineNumber: 97,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/Leadership.tsx",
              lineNumber: 96,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Leadership.tsx",
            lineNumber: 81,
            columnNumber: 15
          }, this)
        ]
      },
      index,
      true,
      {
        fileName: "/app/applet/src/components/Leadership.tsx",
        lineNumber: 62,
        columnNumber: 13
      },
      this
    )) }, void 0, false, {
      fileName: "/app/applet/src/components/Leadership.tsx",
      lineNumber: 60,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Leadership.tsx",
    lineNumber: 44,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/Leadership.tsx",
    lineNumber: 43,
    columnNumber: 5
  }, this);
}
const educationData = [
  {
    institution: "National Institute of Open Schooling (NIOS)",
    location: "Udaipur, Rajasthan",
    date: "Expected May 2027",
    degree: "Senior Secondary Education — Physics, Chemistry, Mathematics (PCM)",
    bullets: [
      "Pursuing a rigorous PCM curriculum, building strong analytical and quantitative reasoning skills essential for flight training and technical decision-making",
      "Balances demanding academics with active extracurricular leadership through MUN participation",
      "Cultivates disciplined, self-directed study habits reflective of the structure required in aviation training environments"
    ]
  },
  {
    institution: "Delhi Public School (DPS)",
    location: "Udaipur, Rajasthan",
    date: "March 2020 – March 2026",
    degree: "Secondary Education, PCM Stream",
    bullets: [
      "Completed foundational schooling (Class 6–11) across Physics, Chemistry, Mathematics, and Computer Science",
      "Developed core analytical thinking and teamwork skills through collaborative academic projects",
      "Engaged consistently in extracurricular activities, including Model United Nations, alongside core studies"
    ]
  }
];
function Education() {
  return /* @__PURE__ */ jsxDEV("section", { id: "education", className: "relative py-16 md:py-24 bg-[#020617]", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: [
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "mb-16",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsxDEV(BookOpen, { className: "text-cyan-500 w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/Education.tsx",
              lineNumber: 40,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider", children: "Education" }, void 0, false, {
              fileName: "/app/applet/src/components/Education.tsx",
              lineNumber: 41,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Education.tsx",
            lineNumber: 39,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-1 bg-cyan-500 mb-8" }, void 0, false, {
            fileName: "/app/applet/src/components/Education.tsx",
            lineNumber: 45,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/Education.tsx",
        lineNumber: 33,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "relative border-l border-cyan-900/30 pl-8 md:pl-12 space-y-16", children: educationData.map((edu, index) => /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, x: -20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.2 },
        className: "relative",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute -left-[37px] md:-left-[53px] top-1 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" }, void 0, false, {
            fileName: "/app/applet/src/components/Education.tsx",
            lineNumber: 59,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute -left-[45px] md:-left-[61px] top-[1px] w-7 h-7 border border-cyan-500/30 rounded-full" }, void 0, false, {
            fileName: "/app/applet/src/components/Education.tsx",
            lineNumber: 60,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "font-space text-xl font-bold text-white mb-2", children: edu.institution }, void 0, false, {
                fileName: "/app/applet/src/components/Education.tsx",
                lineNumber: 64,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-xs text-cyan-400 uppercase tracking-widest", children: edu.degree }, void 0, false, {
                fileName: "/app/applet/src/components/Education.tsx",
                lineNumber: 65,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Education.tsx",
              lineNumber: 63,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-start lg:items-end gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-xs text-amber-500 bg-amber-950/20 border border-amber-900/30 px-3 py-1 rounded-sm w-max", children: edu.date }, void 0, false, {
                fileName: "/app/applet/src/components/Education.tsx",
                lineNumber: 68,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] text-gray-500 uppercase tracking-widest", children: edu.location }, void 0, false, {
                fileName: "/app/applet/src/components/Education.tsx",
                lineNumber: 71,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Education.tsx",
              lineNumber: 67,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Education.tsx",
            lineNumber: 62,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("ul", { className: "space-y-3 ml-2 lg:ml-6", children: edu.bullets.map((bullet, idx) => /* @__PURE__ */ jsxDEV("li", { className: "flex items-start gap-3 text-gray-400 font-sans font-light leading-relaxed", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "mt-2 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/Education.tsx",
              lineNumber: 78,
              columnNumber: 21
            }, this),
            bullet
          ] }, idx, true, {
            fileName: "/app/applet/src/components/Education.tsx",
            lineNumber: 77,
            columnNumber: 19
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/Education.tsx",
            lineNumber: 75,
            columnNumber: 15
          }, this)
        ]
      },
      index,
      true,
      {
        fileName: "/app/applet/src/components/Education.tsx",
        lineNumber: 50,
        columnNumber: 13
      },
      this
    )) }, void 0, false, {
      fileName: "/app/applet/src/components/Education.tsx",
      lineNumber: 48,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Education.tsx",
    lineNumber: 32,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/Education.tsx",
    lineNumber: 31,
    columnNumber: 5
  }, this);
}
const hobbies = [
  { name: "Aviation Tracking & Flight Mechanics Analysis", icon: /* @__PURE__ */ jsxDEV(Compass, { className: "w-5 h-5" }, void 0, false, {
    fileName: "/app/applet/src/components/Hobbies.tsx",
    lineNumber: 5,
    columnNumber: 66
  }, void 0) },
  { name: "Basic Coding & Web Development (Self-Learning Phase)", icon: /* @__PURE__ */ jsxDEV(Code, { className: "w-5 h-5" }, void 0, false, {
    fileName: "/app/applet/src/components/Hobbies.tsx",
    lineNumber: 6,
    columnNumber: 73
  }, void 0) },
  { name: "Strategic Gaming Mechanics Analysis", icon: /* @__PURE__ */ jsxDEV(Gamepad2, { className: "w-5 h-5" }, void 0, false, {
    fileName: "/app/applet/src/components/Hobbies.tsx",
    lineNumber: 7,
    columnNumber: 56
  }, void 0) },
  { name: "Public Speaking & Debates", icon: /* @__PURE__ */ jsxDEV(Mic2, { className: "w-5 h-5" }, void 0, false, {
    fileName: "/app/applet/src/components/Hobbies.tsx",
    lineNumber: 8,
    columnNumber: 46
  }, void 0) },
  { name: "Traveling & Exploring New Places", icon: /* @__PURE__ */ jsxDEV(Map, { className: "w-5 h-5" }, void 0, false, {
    fileName: "/app/applet/src/components/Hobbies.tsx",
    lineNumber: 9,
    columnNumber: 53
  }, void 0) }
];
function Hobbies() {
  return /* @__PURE__ */ jsxDEV("section", { id: "interests", className: "relative py-16 md:py-24 bg-[#020617] overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 relative z-10", children: [
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "mb-16",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsxDEV(Globe2, { className: "text-cyan-500 w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/Hobbies.tsx",
              lineNumber: 23,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider", children: "Hobbies & Interests" }, void 0, false, {
              fileName: "/app/applet/src/components/Hobbies.tsx",
              lineNumber: 24,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Hobbies.tsx",
            lineNumber: 22,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-1 bg-cyan-500 mb-8" }, void 0, false, {
            fileName: "/app/applet/src/components/Hobbies.tsx",
            lineNumber: 28,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/Hobbies.tsx",
        lineNumber: 16,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
      hobbies.map((hobby, index) => /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: index * 0.1 },
          className: "flex items-start gap-4 p-6 bg-[#0B1121] border border-cyan-900/30 rounded-sm hover:border-cyan-500/50 transition-colors group",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-cyan-500 bg-cyan-950/30 p-3 rounded-sm group-hover:bg-cyan-500 group-hover:text-black transition-colors", children: hobby.icon }, void 0, false, {
              fileName: "/app/applet/src/components/Hobbies.tsx",
              lineNumber: 41,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-gray-300 leading-relaxed font-light mt-1", children: hobby.name }, void 0, false, {
              fileName: "/app/applet/src/components/Hobbies.tsx",
              lineNumber: 44,
              columnNumber: 15
            }, this)
          ]
        },
        index,
        true,
        {
          fileName: "/app/applet/src/components/Hobbies.tsx",
          lineNumber: 33,
          columnNumber: 13
        },
        this
      )),
      /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: hobbies.length * 0.1 },
          className: "flex items-start gap-4 p-6 bg-[#0B1121] border border-amber-900/30 rounded-sm hover:border-amber-500/50 transition-colors group",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-amber-500 bg-amber-950/30 p-3 rounded-sm group-hover:bg-amber-500 group-hover:text-black transition-colors flex items-center justify-center font-bold font-mono", children: "A/A" }, void 0, false, {
              fileName: "/app/applet/src/components/Hobbies.tsx",
              lineNumber: 56,
              columnNumber: 14
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[10px] text-amber-500 uppercase tracking-widest mb-1", children: "Languages" }, void 0, false, {
                fileName: "/app/applet/src/components/Hobbies.tsx",
                lineNumber: 60,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-gray-300 leading-relaxed font-light mt-1", children: "English, Hindi" }, void 0, false, {
                fileName: "/app/applet/src/components/Hobbies.tsx",
                lineNumber: 61,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Hobbies.tsx",
              lineNumber: 59,
              columnNumber: 14
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/Hobbies.tsx",
          lineNumber: 49,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Hobbies.tsx",
      lineNumber: 31,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Hobbies.tsx",
    lineNumber: 15,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/Hobbies.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}
const certifications = [
  {
    title: "Eureka! Junior 2025 — Entrepreneurship Program",
    issuer: "E-Cell, IIT Bombay",
    date: "December 2025",
    bullets: [
      "Selected as a participant in a national-level entrepreneurship program among a competitive applicant pool",
      "Cultivated problem-solving, idea validation, and entrepreneurial thinking through exposure to real startup ecosystems",
      "Analyzed business fundamentals and innovation frameworks, strengthening structured decision-making abilities"
    ]
  }
];
function Certifications() {
  return /* @__PURE__ */ jsxDEV("section", { id: "certifications", className: "relative py-16 md:py-24 bg-[#0B1121] border-y border-cyan-900/20", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: [
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "mb-16",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsxDEV(Award, { className: "text-cyan-500 w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/Certifications.tsx",
              lineNumber: 28,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider", children: "Certification" }, void 0, false, {
              fileName: "/app/applet/src/components/Certifications.tsx",
              lineNumber: 29,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Certifications.tsx",
            lineNumber: 27,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-1 bg-cyan-500 mb-8" }, void 0, false, {
            fileName: "/app/applet/src/components/Certifications.tsx",
            lineNumber: 33,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/Certifications.tsx",
        lineNumber: 21,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 gap-8", children: certifications.map((cert, index) => /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.1 },
        className: "bg-[#020617] border border-cyan-900/30 p-8 rounded-sm hover:border-cyan-500/50 transition-colors",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "font-space text-xl font-bold text-white mb-2", children: cert.title }, void 0, false, {
                fileName: "/app/applet/src/components/Certifications.tsx",
                lineNumber: 48,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-xs text-amber-500 uppercase tracking-widest", children: [
                "Issued by: ",
                cert.issuer
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Certifications.tsx",
                lineNumber: 49,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Certifications.tsx",
              lineNumber: 47,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "shrink-0", children: /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-xs text-gray-400 border border-gray-800 bg-gray-900/50 px-3 py-1 rounded-sm uppercase tracking-widest block text-center", children: cert.date }, void 0, false, {
              fileName: "/app/applet/src/components/Certifications.tsx",
              lineNumber: 52,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/Certifications.tsx",
              lineNumber: 51,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Certifications.tsx",
            lineNumber: 46,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("ul", { className: "space-y-3", children: cert.bullets.map((bullet, idx) => /* @__PURE__ */ jsxDEV("li", { className: "flex items-start gap-3 text-gray-400 font-sans font-light leading-relaxed", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "mt-2 w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/Certifications.tsx",
              lineNumber: 60,
              columnNumber: 21
            }, this),
            bullet
          ] }, idx, true, {
            fileName: "/app/applet/src/components/Certifications.tsx",
            lineNumber: 59,
            columnNumber: 19
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/Certifications.tsx",
            lineNumber: 57,
            columnNumber: 15
          }, this)
        ]
      },
      index,
      true,
      {
        fileName: "/app/applet/src/components/Certifications.tsx",
        lineNumber: 38,
        columnNumber: 13
      },
      this
    )) }, void 0, false, {
      fileName: "/app/applet/src/components/Certifications.tsx",
      lineNumber: 36,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Certifications.tsx",
    lineNumber: 20,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/Certifications.tsx",
    lineNumber: 19,
    columnNumber: 5
  }, this);
}
function SocialLinks({ layout = "row", showLabels = false }) {
  const socials = [
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/abbas-dawood/" },
    { name: "GitHub", icon: Github, url: "https://github.com/abbas-dawood" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/abbasdawood_07/" }
  ];
  return /* @__PURE__ */ jsxDEV("div", { className: `flex ${layout === "column" ? "flex-col gap-3" : "flex-row gap-4"}`, children: socials.map((social) => {
    const Icon = social.icon;
    return /* @__PURE__ */ jsxDEV(
      "a",
      {
        href: social.url,
        target: "_blank",
        rel: "noopener noreferrer",
        onClick: playClickSound,
        "aria-label": `Visit my ${social.name} profile`,
        className: "group flex items-center gap-3 p-3 border border-cyan-900/30 bg-cyan-950/5 hover:bg-cyan-950/20 hover:border-cyan-500/50 transition-all rounded-sm",
        children: [
          /* @__PURE__ */ jsxDEV(Icon, { className: "w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" }, void 0, false, {
            fileName: "/app/applet/src/components/SocialLinks.tsx",
            lineNumber: 30,
            columnNumber: 13
          }, this),
          showLabels && /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-xs uppercase tracking-widest text-gray-400 group-hover:text-cyan-400 transition-colors", children: social.name }, void 0, false, {
            fileName: "/app/applet/src/components/SocialLinks.tsx",
            lineNumber: 32,
            columnNumber: 15
          }, this)
        ]
      },
      social.name,
      true,
      {
        fileName: "/app/applet/src/components/SocialLinks.tsx",
        lineNumber: 21,
        columnNumber: 11
      },
      this
    );
  }) }, void 0, false, {
    fileName: "/app/applet/src/components/SocialLinks.tsx",
    lineNumber: 17,
    columnNumber: 5
  }, this);
}
function Contact() {
  const [step, setStep] = useState("IDLE");
  const [transmissionId, setTransmissionId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "",
    message: "",
    hidden: ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step !== "IDLE" && step !== "FAILED") return;
    playClickSound();
    const sequence = async () => {
      setStep("VALIDATING");
      await new Promise((r) => setTimeout(r, 600));
      setStep("AUTHENTICATING");
      await new Promise((r) => setTimeout(r, 600));
      setStep("ENCRYPTING");
      await new Promise((r) => setTimeout(r, 600));
      setStep("TRANSMITTING");
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok && data.success) {
          setTransmissionId(data.transmissionId || `AD-${Math.floor(Math.random() * 1e4)}`);
          setStep("RECEIVED");
          setFormData({ name: "", email: "", purpose: "", message: "", hidden: "" });
        } else {
          setErrorMessage(data.message || "Transmission blocked by firewall.");
          setStep("FAILED");
        }
      } catch (error) {
        setErrorMessage("Signal lost. Connection timed out.");
        setStep("FAILED");
      }
    };
    sequence();
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const renderSubmitText = () => {
    switch (step) {
      case "IDLE":
        return "Initiate Transmission";
      case "VALIDATING":
        return "Validating...";
      case "AUTHENTICATING":
        return "Authenticating...";
      case "ENCRYPTING":
        return "Encrypting...";
      case "TRANSMITTING":
        return "Transmitting...";
      case "RECEIVED":
        return "Transmission Sent";
      case "FAILED":
        return "Retry Transmission";
      default:
        return "Initiate Transmission";
    }
  };
  return /* @__PURE__ */ jsxDEV("section", { id: "contact", className: "relative py-32 bg-[#020617]", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-5xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col", children: /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-6", children: [
              /* @__PURE__ */ jsxDEV(Mail, { className: "text-cyan-500 w-8 h-8" }, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 99,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("h2", { className: "font-space text-4xl md:text-5xl font-bold text-white uppercase tracking-wider", children: "Comms Link" }, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 100,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Contact.tsx",
              lineNumber: 98,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-gray-400 font-light text-lg mb-8 max-w-md", children: "Secure a direct channel. Whether for collaboration, diplomacy, or technical inquiries—my comms are open." }, void 0, false, {
              fileName: "/app/applet/src/components/Contact.tsx",
              lineNumber: 104,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: cn(
                "flex items-center gap-4 p-4 border transition-colors rounded-sm",
                step === "RECEIVED" ? "border-green-900/30 bg-green-950/10" : step === "FAILED" ? "border-red-900/30 bg-red-950/10" : "border-cyan-900/30 bg-cyan-950/10"
              ), children: [
                /* @__PURE__ */ jsxDEV(Cpu, { className: cn(
                  "w-5 h-5",
                  step === "RECEIVED" ? "text-green-500" : step === "FAILED" ? "text-red-500" : "text-cyan-500"
                ) }, void 0, false, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 114,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1", children: "Status" }, void 0, false, {
                    fileName: "/app/applet/src/components/Contact.tsx",
                    lineNumber: 120,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: cn(
                    "font-mono text-sm font-bold",
                    step === "RECEIVED" ? "text-green-400" : step === "FAILED" ? "text-red-400" : "text-cyan-400"
                  ), children: step === "IDLE" || step === "VALIDATING" || step === "AUTHENTICATING" || step === "ENCRYPTING" || step === "TRANSMITTING" ? "CHANNEL OPEN" : step === "RECEIVED" ? "TRANSMISSION CONFIRMED" : "TRANSMISSION FAILED" }, void 0, false, {
                    fileName: "/app/applet/src/components/Contact.tsx",
                    lineNumber: 121,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 119,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 109,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "mt-8", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4", children: "Direct Contact" }, void 0, false, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 133,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3 mb-8", children: [
                  /* @__PURE__ */ jsxDEV("a", { href: "mailto:abbassaifee43@gmail.com", className: "flex items-center gap-4 p-3 border border-cyan-900/30 bg-cyan-950/5 hover:bg-cyan-950/20 transition-colors rounded-sm group", children: [
                    /* @__PURE__ */ jsxDEV(Mail, { className: "w-4 h-4 text-gray-400 group-hover:text-cyan-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/Contact.tsx",
                      lineNumber: 136,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "font-sans text-sm text-gray-300 group-hover:text-white transition-colors", children: "abbassaifee43@gmail.com" }, void 0, false, {
                      fileName: "/app/applet/src/components/Contact.tsx",
                      lineNumber: 137,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/Contact.tsx",
                    lineNumber: 135,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("a", { href: "tel:+919024328122", className: "flex items-center gap-4 p-3 border border-cyan-900/30 bg-cyan-950/5 hover:bg-cyan-950/20 transition-colors rounded-sm group", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 flex items-center justify-center text-gray-400 group-hover:text-cyan-400 font-mono text-xs", children: "#" }, void 0, false, {
                      fileName: "/app/applet/src/components/Contact.tsx",
                      lineNumber: 140,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "font-sans text-sm text-gray-300 group-hover:text-white transition-colors", children: "+91 90243 28122" }, void 0, false, {
                      fileName: "/app/applet/src/components/Contact.tsx",
                      lineNumber: 141,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/Contact.tsx",
                    lineNumber: 139,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 134,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4", children: "External Profiles" }, void 0, false, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 144,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(SocialLinks, { layout: "row", showLabels: true }, void 0, false, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 145,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 132,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Contact.tsx",
              lineNumber: 108,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/Contact.tsx",
          lineNumber: 93,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/Contact.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          className: "bg-[#0B1121] border border-cyan-900/40 p-8 rounded-sm relative overflow-hidden",
          children: [
            /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                className: "absolute inset-x-0 h-[1px] bg-cyan-400/30 shadow-[0_0_10px_rgba(6,182,212,0.5)] z-20 pointer-events-none",
                animate: { top: ["0%", "100%"] },
                transition: { duration: 3, repeat: Infinity, ease: "linear" }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 158,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "relative z-10 flex flex-col gap-6", children: [
              /* @__PURE__ */ jsxDEV("input", { type: "text", name: "hidden", value: formData.hidden, onChange: handleChange, className: "hidden", tabIndex: -1, autoComplete: "off" }, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 165,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxDEV("label", { htmlFor: "name", className: "font-mono text-[10px] text-cyan-500 tracking-widest uppercase", children: "Identity" }, void 0, false, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 168,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    id: "name",
                    name: "name",
                    value: formData.name,
                    onChange: handleChange,
                    required: true,
                    className: "bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/Contact.tsx",
                    lineNumber: 169,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 167,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxDEV("label", { htmlFor: "email", className: "font-mono text-[10px] text-cyan-500 tracking-widest uppercase", children: "Return Channel (Email)" }, void 0, false, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 181,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "email",
                    id: "email",
                    name: "email",
                    value: formData.email,
                    onChange: handleChange,
                    required: true,
                    className: "bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/Contact.tsx",
                    lineNumber: 182,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 180,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxDEV("label", { htmlFor: "purpose", className: "font-mono text-[10px] text-cyan-500 tracking-widest uppercase", children: "Transmission Purpose" }, void 0, false, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 193,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "select",
                  {
                    id: "purpose",
                    name: "purpose",
                    value: formData.purpose,
                    onChange: handleChange,
                    required: true,
                    className: "bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm appearance-none cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxDEV("option", { value: "", disabled: true, className: "bg-[#020617] text-gray-500", children: "Select purpose..." }, void 0, false, {
                        fileName: "/app/applet/src/components/Contact.tsx",
                        lineNumber: 202,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "Collaboration", className: "bg-[#020617] text-white", children: "Collaboration" }, void 0, false, {
                        fileName: "/app/applet/src/components/Contact.tsx",
                        lineNumber: 203,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "Business Inquiry", className: "bg-[#020617] text-white", children: "Business Inquiry" }, void 0, false, {
                        fileName: "/app/applet/src/components/Contact.tsx",
                        lineNumber: 204,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "Project Inquiry", className: "bg-[#020617] text-white", children: "Project Inquiry" }, void 0, false, {
                        fileName: "/app/applet/src/components/Contact.tsx",
                        lineNumber: 205,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "MUN / Diplomacy", className: "bg-[#020617] text-white", children: "MUN / Diplomacy" }, void 0, false, {
                        fileName: "/app/applet/src/components/Contact.tsx",
                        lineNumber: 206,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "Speaking / Event", className: "bg-[#020617] text-white", children: "Speaking / Event" }, void 0, false, {
                        fileName: "/app/applet/src/components/Contact.tsx",
                        lineNumber: 207,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "Internship / Opportunity", className: "bg-[#020617] text-white", children: "Internship / Opportunity" }, void 0, false, {
                        fileName: "/app/applet/src/components/Contact.tsx",
                        lineNumber: 208,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "Technical Inquiry", className: "bg-[#020617] text-white", children: "Technical Inquiry" }, void 0, false, {
                        fileName: "/app/applet/src/components/Contact.tsx",
                        lineNumber: 209,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "General Inquiry", className: "bg-[#020617] text-white", children: "General Inquiry" }, void 0, false, {
                        fileName: "/app/applet/src/components/Contact.tsx",
                        lineNumber: 210,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "Other", className: "bg-[#020617] text-white", children: "Other" }, void 0, false, {
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
                    lineNumber: 194,
                    columnNumber: 15
                  },
                  this
                ),
                formData.purpose === "Other" && /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    name: "purpose",
                    placeholder: "Please specify...",
                    onChange: handleChange,
                    required: true,
                    className: "mt-2 bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/Contact.tsx",
                    lineNumber: 214,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 192,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxDEV("label", { htmlFor: "message", className: "font-mono text-[10px] text-cyan-500 tracking-widest uppercase", children: "Transmission Payload" }, void 0, false, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 226,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "textarea",
                  {
                    id: "message",
                    name: "message",
                    value: formData.message,
                    onChange: handleChange,
                    rows: 4,
                    required: true,
                    className: "bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm resize-none"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/Contact.tsx",
                    lineNumber: 227,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 225,
                columnNumber: 13
              }, this),
              step === "FAILED" && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-red-400 text-sm font-mono mt-2 bg-red-950/20 border border-red-900/50 p-3 rounded-sm", children: [
                /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 240,
                  columnNumber: 17
                }, this),
                errorMessage
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 239,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  type: "submit",
                  disabled: step !== "IDLE" && step !== "FAILED",
                  className: cn(
                    "group relative mt-4 px-8 py-4 font-space font-bold tracking-widest uppercase text-sm w-full transition-colors cursor-pointer flex items-center justify-center gap-2 rounded-sm",
                    step === "IDLE" || step === "FAILED" ? "bg-cyan-500 text-black hover:bg-white" : "",
                    step !== "IDLE" && step !== "FAILED" && step !== "RECEIVED" ? "bg-amber-500 text-black cursor-wait" : "",
                    step === "RECEIVED" ? "bg-green-500 text-green-950" : ""
                  ),
                  children: renderSubmitText()
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 245,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Contact.tsx",
              lineNumber: 164,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/Contact.tsx",
          lineNumber: 151,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Contact.tsx",
      lineNumber: 90,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: step === "RECEIVED" && /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-6",
        children: /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            initial: { scale: 0.9, y: 20 },
            animate: { scale: 1, y: 0 },
            exit: { scale: 0.9, y: 20 },
            className: "bg-[#020617] border border-green-500/50 p-12 max-w-md w-full text-center rounded-sm shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsxDEV(CheckCircle, { className: "w-16 h-16 text-green-500 mx-auto mb-6" }, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 275,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { className: "font-space text-2xl font-bold text-white mb-2", children: "Transmission Successful" }, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 276,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-sm text-gray-300 mb-6", children: "Your message has securely reached my systems. An automated reply has been dispatched to your return channel." }, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 277,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "bg-green-950/20 border border-green-900/50 p-4 rounded-sm text-left mb-8 flex flex-col gap-2", children: /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-green-500/70 font-mono text-[10px] uppercase", children: "Transmission ID" }, void 0, false, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 281,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-white font-mono text-xs", children: transmissionId }, void 0, false, {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 282,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 280,
                columnNumber: 18
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/Contact.tsx",
                lineNumber: 279,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    playClickSound();
                    setStep("IDLE");
                  },
                  className: "text-green-500 font-mono text-xs tracking-widest uppercase hover:text-white transition-colors border-b border-green-500/30 pb-1 cursor-pointer",
                  children: "Close Connection"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/Contact.tsx",
                  lineNumber: 286,
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
            lineNumber: 269,
            columnNumber: 13
          },
          this
        )
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/Contact.tsx",
        lineNumber: 263,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/components/Contact.tsx",
      lineNumber: 261,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Contact.tsx",
    lineNumber: 89,
    columnNumber: 5
  }, this);
}
function Footer() {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxDEV("footer", { className: "relative py-12 bg-[#020617] border-t border-cyan-900/30", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: scrollToTop,
          className: "w-10 h-10 border border-cyan-900/50 flex items-center justify-center text-cyan-500 hover:bg-cyan-500 hover:text-black transition-colors rounded-sm",
          children: /* @__PURE__ */ jsxDEV(ArrowUp, { className: "w-4 h-4" }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 21,
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
      ),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("p", { className: "font-space font-bold text-white uppercase", children: "Abbas Dawood" }, void 0, false, {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 24,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[10px] text-gray-500 tracking-widest uppercase", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " All Rights Reserved"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 25,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Footer.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Footer.tsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(SocialLinks, { showLabels: false }, void 0, false, {
      fileName: "/app/applet/src/components/Footer.tsx",
      lineNumber: 29,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Footer.tsx",
    lineNumber: 14,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/Footer.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}
function BootSequence({ onComplete }) {
  const [hasStarted, setHasStarted] = useState(true);
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
    if (!hasPlayedSound.current) {
      playBootSound();
      hasPlayedSound.current = true;
    }
  }, []);
  useEffect(() => {
    if (!hasStarted) return;
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);
      const logIndex = Math.floor(currentProgress / 100 * bootLogs.length);
      setLogs(bootLogs.slice(0, logIndex + 1));
      if (currentProgress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 800);
        }, 500);
      }
    }, 60);
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
          lineNumber: 80,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]" }, void 0, false, {
          fileName: "/app/applet/src/components/BootSequence.tsx",
          lineNumber: 81,
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
            lineNumber: 85,
            columnNumber: 15
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/BootSequence.tsx",
          lineNumber: 84,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 w-full max-w-2xl px-6 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxDEV(
            motion.div,
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
              lineNumber: 96,
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
                  lineNumber: 108,
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
                  lineNumber: 113,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BootSequence.tsx",
              lineNumber: 107,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute flex flex-col items-center", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-4xl font-bold tracking-wider", children: [
                Math.round(progress),
                /* @__PURE__ */ jsxDEV("span", { className: "text-xl", children: "%" }, void 0, false, {
                  fileName: "/app/applet/src/components/BootSequence.tsx",
                  lineNumber: 124,
                  columnNumber: 41
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/BootSequence.tsx",
                lineNumber: 123,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-cyan-600 tracking-widest mt-1", children: "SYS LOAD" }, void 0, false, {
                fileName: "/app/applet/src/components/BootSequence.tsx",
                lineNumber: 126,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BootSequence.tsx",
              lineNumber: 122,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BootSequence.tsx",
            lineNumber: 106,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-cyan-950/20 border border-cyan-800/50 p-4 rounded bg-clip-padding backdrop-filter backdrop-blur-sm h-40 overflow-hidden relative", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-cyan-500/20 to-transparent" }, void 0, false, {
              fileName: "/app/applet/src/components/BootSequence.tsx",
              lineNumber: 132,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-[#020617] to-transparent z-10" }, void 0, false, {
              fileName: "/app/applet/src/components/BootSequence.tsx",
              lineNumber: 133,
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
                      lineNumber: 142,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: cn(i === logs.length - 1 ? "text-white" : "text-cyan-600 drop-shadow-[0_0_2px_rgba(6,182,212,0.4)]"), children: log }, void 0, false, {
                      fileName: "/app/applet/src/components/BootSequence.tsx",
                      lineNumber: 143,
                      columnNumber: 21
                    }, this)
                  ]
                },
                i,
                true,
                {
                  fileName: "/app/applet/src/components/BootSequence.tsx",
                  lineNumber: 136,
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
                      lineNumber: 154,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "w-3 h-4 bg-cyan-500 block" }, void 0, false, {
                      fileName: "/app/applet/src/components/BootSequence.tsx",
                      lineNumber: 154,
                      columnNumber: 39
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/BootSequence.tsx",
                  lineNumber: 149,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BootSequence.tsx",
              lineNumber: 134,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BootSequence.tsx",
            lineNumber: 131,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "mt-8 text-cyan-600/60 text-xs tracking-[0.3em] flex gap-8", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "LAT: 24.5854° N" }, void 0, false, {
              fileName: "/app/applet/src/components/BootSequence.tsx",
              lineNumber: 161,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "LON: 73.7125° E" }, void 0, false, {
              fileName: "/app/applet/src/components/BootSequence.tsx",
              lineNumber: 162,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BootSequence.tsx",
            lineNumber: 160,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/BootSequence.tsx",
          lineNumber: 95,
          columnNumber: 11
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/BootSequence.tsx",
      lineNumber: 72,
      columnNumber: 9
    },
    this
  ) }, void 0, false, {
    fileName: "/app/applet/src/components/BootSequence.tsx",
    lineNumber: 70,
    columnNumber: 5
  }, this);
}
function Portfolio() {
  const [bootComplete, setBootComplete] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 1e-3
  });
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden", children: [
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: !bootComplete && /* @__PURE__ */ jsxDEV(BootSequence, { onComplete: () => setBootComplete(true) }, void 0, false, {
      fileName: "/app/applet/src/components/Portfolio.tsx",
      lineNumber: 33,
      columnNumber: 27
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/Portfolio.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: bootComplete ? 1 : 0 },
        transition: { duration: 1 },
        style: { pointerEvents: bootComplete ? "auto" : "none", height: bootComplete ? "auto" : "100vh", overflow: bootComplete ? "visible" : "hidden" },
        children: [
          /* @__PURE__ */ jsxDEV(CustomCursor, {}, void 0, false, {
            fileName: "/app/applet/src/components/Portfolio.tsx",
            lineNumber: 42,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(Background, {}, void 0, false, {
            fileName: "/app/applet/src/components/Portfolio.tsx",
            lineNumber: 43,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(HUDOverlay, {}, void 0, false, {
            fileName: "/app/applet/src/components/Portfolio.tsx",
            lineNumber: 44,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              className: "fixed top-0 left-0 right-0 h-[2px] bg-cyan-500 origin-left z-50 shadow-[0_0_10px_rgba(6,182,212,0.5)]",
              style: { scaleX }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/Portfolio.tsx",
              lineNumber: 47,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(Navbar, {}, void 0, false, {
            fileName: "/app/applet/src/components/Portfolio.tsx",
            lineNumber: 52,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("main", { children: [
            /* @__PURE__ */ jsxDEV(Hero, {}, void 0, false, {
              fileName: "/app/applet/src/components/Portfolio.tsx",
              lineNumber: 54,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(About, {}, void 0, false, {
              fileName: "/app/applet/src/components/Portfolio.tsx",
              lineNumber: 55,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(Skills, {}, void 0, false, {
              fileName: "/app/applet/src/components/Portfolio.tsx",
              lineNumber: 56,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(Experience, {}, void 0, false, {
              fileName: "/app/applet/src/components/Portfolio.tsx",
              lineNumber: 57,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(MunDiplomacy, {}, void 0, false, {
              fileName: "/app/applet/src/components/Portfolio.tsx",
              lineNumber: 58,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(Leadership, {}, void 0, false, {
              fileName: "/app/applet/src/components/Portfolio.tsx",
              lineNumber: 59,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(Education, {}, void 0, false, {
              fileName: "/app/applet/src/components/Portfolio.tsx",
              lineNumber: 60,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(Certifications, {}, void 0, false, {
              fileName: "/app/applet/src/components/Portfolio.tsx",
              lineNumber: 61,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(Hobbies, {}, void 0, false, {
              fileName: "/app/applet/src/components/Portfolio.tsx",
              lineNumber: 62,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(Contact, {}, void 0, false, {
              fileName: "/app/applet/src/components/Portfolio.tsx",
              lineNumber: 63,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Portfolio.tsx",
            lineNumber: 53,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(Footer, {}, void 0, false, {
            fileName: "/app/applet/src/components/Portfolio.tsx",
            lineNumber: 65,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/Portfolio.tsx",
        lineNumber: 36,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Portfolio.tsx",
    lineNumber: 31,
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
