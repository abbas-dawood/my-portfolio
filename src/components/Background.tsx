import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
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
    window.addEventListener('resize', setCanvasSize);

    const particles: Particle[] = [];
    const particleCount = 100; // Dense starfield/particles

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      isHUDTarget: boolean;

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

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw subtle horizon line/grid lines occasionally to simulate HUD
      ctx.strokeStyle = 'rgba(14, 116, 144, 0.2)';
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
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen isolate">
      {/* HUD scanning overlay */}
      <div className="absolute inset-x-0 h-[2px] bg-cyan-500 opacity-20 blur-[1px] animate-scan" style={{ top: '0%' }} />
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent to-[#020617] opacity-60" />
    </div>
  );
}
