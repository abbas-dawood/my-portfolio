import React, { useState } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle, ShieldAlert, Cpu } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/sound';
import { cn } from '../utils/cn';
import SocialLinks from './SocialLinks';
import { db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

type TransmissionState = 'IDLE' | 'VALIDATING' | 'AUTHENTICATING' | 'ENCRYPTING' | 'TRANSMITTING' | 'RECEIVED' | 'FAILED';

export default function Contact() {
  const [step, setStep] = useState<TransmissionState>('IDLE');
  const [transmissionId, setTransmissionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isOtherPurpose, setIsOtherPurpose] = useState(false);
  const [customPurpose, setCustomPurpose] = useState('');
  
  // Start empty
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: '',
    message: '',
    hidden: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 'IDLE' && step !== 'FAILED') return;
    
    playClickSound();

    const finalPurpose = isOtherPurpose ? (customPurpose.trim() || 'Other') : formData.purpose;
    const finalPayload = {
      ...formData,
      purpose: finalPurpose
    };

    // Sequence stages for cinematic effect
    const sequence = async () => {
      setStep('VALIDATING');
      await new Promise(r => setTimeout(r, 300));
      setStep('AUTHENTICATING');
      await new Promise(r => setTimeout(r, 300));
      setStep('ENCRYPTING');
      await new Promise(r => setTimeout(r, 300));
      setStep('TRANSMITTING');

      let transmissionRecorded = false;
      const generatedId = `AD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalPayload),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          transmissionRecorded = true;
          setTransmissionId(data.transmissionId || generatedId);
          setStep('RECEIVED');
          setFormData({ name: '', email: '', purpose: '', message: '', hidden: '' });
          setIsOtherPurpose(false);
          setCustomPurpose('');
          return;
        }
      } catch (networkError) {
        console.warn("API route inaccessible, falling back to direct Firestore link...", networkError);
      }

      // Resilient fallback: Save directly to Firestore database
      if (!transmissionRecorded) {
        try {
          await setDoc(doc(db, 'contacts', generatedId), {
            name: finalPayload.name.trim(),
            email: finalPayload.email.trim(),
            subject: finalPurpose,
            purpose: finalPurpose,
            body: finalPayload.message.trim(),
            transmissionId: generatedId,
            read: false,
            createdAt: serverTimestamp()
          });

          setTransmissionId(generatedId);
          setStep('RECEIVED');
          setFormData({ name: '', email: '', purpose: '', message: '', hidden: '' });
          setIsOtherPurpose(false);
          setCustomPurpose('');
        } catch (dbError) {
          console.error("Direct database transmission error:", dbError);
          setErrorMessage('Signal lost. Please reach out directly via email.');
          setStep('FAILED');
        }
      }
    };

    sequence();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePurposeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'Other') {
      setIsOtherPurpose(true);
      setFormData(prev => ({ ...prev, purpose: customPurpose.trim() || 'Other' }));
    } else {
      setIsOtherPurpose(false);
      setFormData(prev => ({ ...prev, purpose: val }));
    }
  };

  const handleCustomPurpose = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomPurpose(val);
    setFormData(prev => ({ ...prev, purpose: val.trim() || 'Other' }));
  };

  const renderSubmitText = () => {
    switch (step) {
      case 'IDLE': return 'Initiate Transmission';
      case 'VALIDATING': return 'Validating...';
      case 'AUTHENTICATING': return 'Authenticating...';
      case 'ENCRYPTING': return 'Encrypting...';
      case 'TRANSMITTING': return 'Transmitting...';
      case 'RECEIVED': return 'Transmission Sent';
      case 'FAILED': return 'Retry Transmission';
      default: return 'Initiate Transmission';
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-[#020617]">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Mail className="text-cyan-500 w-8 h-8" />
              <h2 className="font-space text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">
                Comms Link
              </h2>
            </div>
            <p className="font-sans text-gray-400 font-light text-lg mb-8 max-w-md">
              Secure a direct channel. Whether for collaboration, diplomacy, or technical inquiries—my comms are open.
            </p>

            <div className="flex flex-col gap-4">
              <div className={cn("flex items-center gap-4 p-4 border transition-colors rounded-sm", 
                step === 'RECEIVED' ? "border-green-900/30 bg-green-950/10" : 
                step === 'FAILED' ? "border-red-900/30 bg-red-950/10" : 
                "border-cyan-900/30 bg-cyan-950/10"
              )}>
                <Cpu className={cn("w-5 h-5", 
                  step === 'RECEIVED' ? "text-green-500" : 
                  step === 'FAILED' ? "text-red-500" : 
                  "text-cyan-500"
                )} />
                <div>
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Status</p>
                  <p className={cn("font-mono text-sm font-bold", 
                    step === 'RECEIVED' ? "text-green-400" : 
                    step === 'FAILED' ? "text-red-400" : 
                    "text-cyan-400"
                  )}>
                    {step === 'IDLE' || step === 'VALIDATING' || step === 'AUTHENTICATING' || step === 'ENCRYPTING' || step === 'TRANSMITTING' ? 'CHANNEL OPEN' : 
                     step === 'RECEIVED' ? 'TRANSMISSION CONFIRMED' : 'TRANSMISSION FAILED'}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4">Direct Contact</p>
                <div className="flex flex-col gap-3 mb-8">
                  <a href="mailto:abbassaifee43@gmail.com" className="flex items-center gap-4 p-3 border border-cyan-900/30 bg-cyan-950/5 hover:bg-cyan-950/20 transition-colors rounded-sm group">
                    <Mail className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                    <span className="font-sans text-sm text-gray-300 group-hover:text-white transition-colors">abbassaifee43@gmail.com</span>
                  </a>
                  <a href="tel:+919024328122" className="flex items-center gap-4 p-3 border border-cyan-900/30 bg-cyan-950/5 hover:bg-cyan-950/20 transition-colors rounded-sm group">
                    <span className="w-4 h-4 flex items-center justify-center text-gray-400 group-hover:text-cyan-400 font-mono text-xs">#</span>
                    <span className="font-sans text-sm text-gray-300 group-hover:text-white transition-colors">+91 90243 28122</span>
                  </a>
                </div>
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4">External Profiles</p>
                <SocialLinks layout="row" showLabels={true} />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#0B1121] border border-cyan-900/40 p-8 rounded-sm relative overflow-hidden"
        >
          {/* Scanline */}
          <motion.div
            className="absolute inset-x-0 h-[1px] bg-cyan-400/30 shadow-[0_0_10px_rgba(6,182,212,0.5)] z-20 pointer-events-none"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
            <input type="text" name="hidden" value={formData.hidden} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />
            
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-[10px] text-cyan-500 tracking-widest uppercase">Identity</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-[10px] text-cyan-500 tracking-widest uppercase">Return Channel (Email)</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="purpose" className="font-mono text-[10px] text-cyan-500 tracking-widest uppercase">Transmission Purpose</label>
              <select
                id="purpose"
                name="purposeSelect"
                value={isOtherPurpose ? 'Other' : formData.purpose}
                onChange={handlePurposeSelect}
                required
                className="bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-[#020617] text-gray-500">Select purpose...</option>
                <option value="Collaboration" className="bg-[#020617] text-white">Collaboration</option>
                <option value="Business Inquiry" className="bg-[#020617] text-white">Business Inquiry</option>
                <option value="Project Inquiry" className="bg-[#020617] text-white">Project Inquiry</option>
                <option value="MUN / Diplomacy" className="bg-[#020617] text-white">MUN / Diplomacy</option>
                <option value="Speaking / Event" className="bg-[#020617] text-white">Speaking / Event</option>
                <option value="Internship / Opportunity" className="bg-[#020617] text-white">Internship / Opportunity</option>
                <option value="Technical Inquiry" className="bg-[#020617] text-white">Technical Inquiry</option>
                <option value="General Inquiry" className="bg-[#020617] text-white">General Inquiry</option>
                <option value="Other" className="bg-[#020617] text-white">Other</option>
              </select>
              {isOtherPurpose && (
                <input
                  type="text"
                  name="customPurpose"
                  placeholder="Please specify purpose..."
                  value={customPurpose}
                  onChange={handleCustomPurpose}
                  required
                  className="mt-2 bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-mono text-[10px] text-cyan-500 tracking-widest uppercase">Transmission Payload</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm resize-none"
              />
            </div>

            {step === 'FAILED' && (
              <div className="flex items-center gap-2 text-red-400 text-sm font-mono mt-2 bg-red-950/20 border border-red-900/50 p-3 rounded-sm">
                <ShieldAlert className="w-4 h-4" />
                {errorMessage}
              </div>
            )}

            <button 
              type="submit" 
              disabled={step !== 'IDLE' && step !== 'FAILED'}
              className={cn(
                "group relative mt-4 px-8 py-4 font-space font-bold tracking-widest uppercase text-sm w-full transition-colors cursor-pointer flex items-center justify-center gap-2 rounded-sm",
                (step === 'IDLE' || step === 'FAILED') ? "bg-cyan-500 text-black hover:bg-white" : "",
                (step !== 'IDLE' && step !== 'FAILED' && step !== 'RECEIVED') ? "bg-amber-500 text-black cursor-wait" : "",
                step === 'RECEIVED' ? "bg-green-500 text-green-950" : ""
              )}
            >
              {renderSubmitText()}
            </button>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {step === 'RECEIVED' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#020617] border border-green-500/50 p-12 max-w-md w-full text-center rounded-sm shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h3 className="font-space text-2xl font-bold text-white mb-2">Transmission Successful</h3>
              <p className="font-sans text-sm text-gray-300 mb-6">Your message has securely reached my systems. An automated reply has been dispatched to your return channel.</p>
              
              <div className="bg-green-950/20 border border-green-900/50 p-4 rounded-sm text-left mb-8 flex flex-col gap-2">
                 <div className="flex justify-between items-center">
                    <span className="text-green-500/70 font-mono text-[10px] uppercase">Transmission ID</span>
                    <span className="text-white font-mono text-xs">{transmissionId}</span>
                 </div>
              </div>

              <button 
                onClick={() => { playClickSound(); setStep('IDLE'); }}
                className="text-green-500 font-mono text-xs tracking-widest uppercase hover:text-white transition-colors border-b border-green-500/30 pb-1 cursor-pointer"
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
