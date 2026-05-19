export const playHoverSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    // Create temporary context for the quick UI beep
    const tempCtx = new AudioContext();
    const osc = tempCtx.createOscillator();
    const gain = tempCtx.createGain();
    
    osc.connect(gain);
    gain.connect(tempCtx.destination);
    
    // Very subtle, short tick
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, tempCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, tempCtx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.04, tempCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, tempCtx.currentTime + 0.05);
    
    osc.start(tempCtx.currentTime);
    osc.stop(tempCtx.currentTime + 0.05);
  } catch (e) {
    // Ignore
  }
};

export const playClickSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    // Low, quick "tech" chirp
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.warn('Audio playback failed', e);
  }
};

export const playBootSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // 1. Base Engine Spool-up (Low frequency rumble ramping up)
    const baseOsc = ctx.createOscillator();
    const baseGain = ctx.createGain();
    baseOsc.connect(baseGain);
    baseGain.connect(ctx.destination);
    
    baseOsc.type = 'sawtooth';
    baseOsc.frequency.setValueAtTime(40, ctx.currentTime);
    baseOsc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 5); // Ramp up over 5s
    
    baseGain.gain.setValueAtTime(0.01, ctx.currentTime);
    baseGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 2); // Fade in
    baseGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 6); // Fade out just after 6s
    
    baseOsc.start(ctx.currentTime);
    baseOsc.stop(ctx.currentTime + 6);

    // 2. High-Tech System Whine (Higher frequency whine matching the spool up)
    const whineOsc = ctx.createOscillator();
    const whineGain = ctx.createGain();
    whineOsc.connect(whineGain);
    whineGain.connect(ctx.destination);
    
    whineOsc.type = 'sine';
    whineOsc.frequency.setValueAtTime(800, ctx.currentTime);
    whineOsc.frequency.exponentialRampToValueAtTime(2500, ctx.currentTime + 5);
    
    whineGain.gain.setValueAtTime(0, ctx.currentTime);
    whineGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 3);
    whineGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 6);
    
    whineOsc.start(ctx.currentTime);
    whineOsc.stop(ctx.currentTime + 6);

    // 3. Initial Boot Sequence beep (System on)
    const beepOsc = ctx.createOscillator();
    const beepGain = ctx.createGain();
    beepOsc.connect(beepGain);
    beepGain.connect(ctx.destination);
    
    beepOsc.type = 'square';
    beepOsc.frequency.setValueAtTime(1200, ctx.currentTime);
    beepOsc.frequency.setValueAtTime(1800, ctx.currentTime + 0.1);
    
    beepGain.gain.setValueAtTime(0, ctx.currentTime);
    beepGain.gain.setValueAtTime(0.1, ctx.currentTime + 0.01);
    beepGain.gain.setValueAtTime(0, ctx.currentTime + 0.2);
    
    beepOsc.start(ctx.currentTime);
    beepOsc.stop(ctx.currentTime + 0.2);

  } catch (e) {
    console.warn('Boot audio playback failed / or blocked by browser', e);
  }
};
