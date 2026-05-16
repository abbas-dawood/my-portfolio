import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function HUDOverlay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Top Left Corner */}
      <div className="absolute top-8 left-8 text-cyan-500/60 text-[10px] font-mono tracking-widest hidden md:block">
        <p>SYS.01 // ONLINE</p>
        <p>SYNC: {time.getUTCHours().toString().padStart(2, '0')}{time.getUTCMinutes().toString().padStart(2, '0')}Z</p>
      </div>

      {/* Top Right Corner */}
      <div className="absolute top-8 right-8 text-cyan-500/60 text-[10px] font-mono tracking-widest text-right hidden md:block">
        <p>ALTITUDE LOG</p>
        <motion.p
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          REC [●]
        </motion.p>
      </div>

      {/* Bottom Left Corner */}
      <div className="absolute bottom-8 left-8 text-cyan-500/60 text-[10px] font-mono tracking-widest hidden md:block">
        <p>A.DAWOOD</p>
        <p>ID: 90243-28122-UDZ</p>
      </div>

      {/* Bottom Right Corner */}
      <div className="absolute bottom-8 right-8 text-cyan-500/60 text-[10px] font-mono tracking-widest text-right hidden md:block">
        <div className="flex justify-end gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
             <motion.div 
               key={i}
               className="w-1 h-3 bg-cyan-700/40"
               animate={{ height: [`${Math.random() * 100}%`, '100%', `${Math.random() * 100}%`] }}
               transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
             />
          ))}
        </div>
        <p className="mt-1">COMMS SECURE</p>
      </div>
    </div>
  );
}
