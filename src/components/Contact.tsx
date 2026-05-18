import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { Send, CheckCircle, Mail, Linkedin, Github, Instagram, MapPin } from 'lucide-react';
import { cn } from '../utils/cn';
import { playClickSound, playHoverSound } from '../utils/sound';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { OperationType, handleFirestoreError } from '../utils/firestore-errors';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // 1. Save to Firestore
      try {
        await addDoc(collection(db, 'contact_messages'), {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          message: data.message,
          createdAt: serverTimestamp()
        });
      } catch (err: any) {
        handleFirestoreError(err, OperationType.CREATE, 'contact_messages');
      }

      // 2. Send Email via our Express API
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Failed to send email via API:', errorData);
        alert(`Failed to send email: ${errorData.error || 'Server Error'}\nPlease verify your Vercel Environment Variables are set.`);
        return; // Don't show success message if it failed
      }
      
      setShowSuccess(true);
      (e.target as HTMLFormElement).reset();
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: <Mail className="w-6 h-6" />, label: "TERMINAL [EMAIL]", value: "abbassaifee43\n@gmail.com", href: "mailto:abbassaifee43@gmail.com" },
    { icon: <Linkedin className="w-6 h-6" />, label: "TERMINAL [NETWORK]", value: "@abbas-dawood", href: "https://www.linkedin.com/in/abbas-dawood/" },
    { icon: <Github className="w-6 h-6" />, label: "TERMINAL [NETWORK]", value: "@abbasdawood", href: "https://github.com/abbas-dawood" },
    { icon: <Instagram className="w-6 h-6" />, label: "TERMINAL [NETWORK]", value: "@abbasdawood_07", href: "https://www.instagram.com/abbasdawood_07/" },
    { icon: <MapPin className="w-6 h-6" />, label: "TERMINAL [LOCATION]", value: "Udaipur,\nRajasthan", href: undefined },
  ];

  return (
    <section id="contact" className="relative min-h-screen py-24 border-t border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 relative">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h2 className="font-space text-3xl md:text-5xl font-bold mb-4">
              <span className="text-cyan-500">04. </span>
              <span className="glitch-text" data-text="Get In Touch">Get In Touch</span>
            </h2>
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase">
              // Secure Channel • Open For Opportunities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* Left Panel - Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <p className="font-sans text-xl text-gray-300 mb-8 font-light leading-relaxed">
              Whether you want to collaborate on a project, discuss ideas, or just say hello, feel free to reach out!
            </p>
            
            <div className="flex items-center gap-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="font-mono text-sm text-cyan-400 tracking-widest">STATUS: ONLINE</span>
            </div>
          </motion.div>

          {/* Right Panel - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#0B1121] border border-cyan-500/30 rounded-sm shadow-[0_0_15px_rgba(6,182,212,0.1),inset_0_0_20px_rgba(6,182,212,0.05)] transition-all duration-500" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
            
            <form onSubmit={handleSubmit} className="relative p-8 flex flex-col gap-6">
              <input type="text" name="hidden" className="hidden" /> {/* Honeypot for spam */}
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-mono text-[10px] text-cyan-500 tracking-widest uppercase">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  className="bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-[10px] text-cyan-500 tracking-widest uppercase">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  className="bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="font-mono text-[10px] text-cyan-500 tracking-widest uppercase">Your Phone (Optional)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-[10px] text-cyan-500 tracking-widest uppercase">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4}
                  required
                  className="bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                onClick={playClickSound}
                className="group relative mt-4 px-8 py-3 bg-amber-500 text-black font-space font-bold tracking-widest uppercase text-sm w-max hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 rounded-sm"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                {!isSubmitting && <Send className="w-4 h-4 ml-1" />}
              </button>
            </form>
          </motion.div>

        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialLinks.map((link, index) => {
            const Content = () => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={link.href ? playClickSound : undefined}
                onMouseEnter={playHoverSound}
                className={cn(
                  "flex items-center gap-6 p-6 bg-[#0B1121] border border-cyan-500/30 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] rounded-sm overflow-hidden relative group transition-all duration-500",
                  link.href && "hover:border-amber-500/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.2),inset_0_0_30px_rgba(245,158,11,0.1)] cursor-pointer"
                )}
              >
                {/* Top highlight */}
                {link.href && <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />}
                <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">{link.label}</h4>
                  <p className="text-gray-200 font-bold whitespace-pre-line group-hover:text-amber-400 transition-colors">
                    {link.value}
                  </p>
                </div>
              </motion.div>
            );

            if (link.href) {
              return (
                <a 
                  key={index} 
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <Content />
                </a>
              );
            }

            return (
              <div key={index}>
                <Content />
              </div>
            );
          })}
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#020617] border border-amber-500/50 p-12 max-w-md text-center rounded-sm shadow-[0_0_50px_rgba(245,158,11,0.1)] relative overflow-hidden"
            >
              {/* Scanline effect */}
              <motion.div 
                 className="absolute inset-x-0 h-[2px] bg-amber-400/50 blur-[1px]"
                 animate={{ top: ['-10%', '110%'] }}
                 transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              
              <CheckCircle className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <h3 className="font-space text-2xl font-bold text-white mb-2">Message Sent</h3>
              <p className="font-mono text-sm text-gray-400">Your message has been delivered to Abbas Dawood.</p>
              
              <button 
                onClick={() => {
                  playClickSound();
                  setShowSuccess(false);
                }}
                className="mt-8 text-amber-500 font-mono text-xs tracking-widest uppercase hover:text-white transition-colors border-b border-amber-500/30 pb-1 cursor-pointer"
              >
                Close Connection
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
