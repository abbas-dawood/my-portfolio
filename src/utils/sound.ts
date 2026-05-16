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
