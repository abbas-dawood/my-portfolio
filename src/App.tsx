/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Portfolio from './components/Portfolio';

export default function App() {
  return (
    <div 
      className="min-h-screen w-full overflow-hidden relative border-[6px] md:border-8 border-slate-900 flex flex-col items-stretch text-slate-300 font-mono select-none"
      style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #0c1e33 0%, #020617 100%)' }}
    >
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.15]" 
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, #06b6d4 0px, transparent 1px, transparent 2px)', backgroundSize: '100% 3px' }}
      />
      <div className="fixed top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 m-4 md:m-6 pointer-events-none z-[100]" />
      <div className="fixed top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 m-4 md:m-6 pointer-events-none z-[100]" />
      <div className="fixed bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50 m-4 md:m-6 pointer-events-none z-[100]" />
      <div className="fixed bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 m-4 md:m-6 pointer-events-none z-[100]" />
      
      <Portfolio />
    </div>
  );
}
