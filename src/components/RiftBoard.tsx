"use client";
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Rift } from '@/lib/store/useGameStore';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const colors: Record<number, string> = {
  2: 'bg-white/5 text-slate-300 font-bold',
  4: 'bg-white/10 text-slate-200 font-bold',
  8: 'bg-white/10 text-white font-bold text-lg',
  16: 'bg-white/20 text-white font-bold text-lg',
  32: 'bg-white/20 text-white font-bold text-xl',
  64: 'bg-cyan-500/60 text-white font-black text-xl',
  128: 'bg-cyan-500/80 text-white font-black text-2xl shadow-[0_0_15px_rgba(6,182,212,0.6)]',
  256: 'bg-blue-500/80 text-white font-black text-3xl shadow-[0_0_15px_rgba(59,130,246,0.6)]',
  512: 'bg-indigo-500/80 text-white font-black text-3xl shadow-[0_0_15px_rgba(99,102,241,0.6)]',
  1024: 'bg-fuchsia-500/80 text-white font-black text-4xl shadow-[0_0_15px_rgba(217,70,239,0.8)]',
  2048: 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white text-4xl shadow-[0_0_20px_rgba(6,182,212,0.8)] border border-cyan-400/50 font-black',
};

export function RiftBoard({ rift, isActive, onClick }: { rift: Rift; isActive: boolean; onClick?: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      animate={{
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.6,
        y: isActive ? 0 : -20,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative p-3 rounded-2xl bg-white/5 backdrop-blur-xl border",
        isActive ? "border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.2)] z-10" : "border-white/10 cursor-pointer hover:border-white/30 z-0 opacity-80",
        rift.status === 'collapsed' && "grayscale opacity-30 border-red-500/50"
      )}
    >
      {rift.status === 'collapsed' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 rounded-xl backdrop-blur-sm">
          <span className="text-red-500 font-bold text-2xl tracking-widest uppercase">Collapsed</span>
        </div>
      )}
      
      <div className="grid grid-cols-4 gap-2 w-full max-w-sm mx-auto aspect-square">
        {rift.grid.map((row, rIdx) => 
          row.map((val, cIdx) => (
            <div key={`${rIdx}-${cIdx}`} className="bg-cell-bg rounded-lg relative overflow-hidden flex items-center justify-center">
              {val > 0 && (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={cn(
                    "absolute inset-0 flex items-center justify-center rounded-lg font-mono",
                    colors[val] || colors[2048]
                  )}
                >
                  {val}
                </motion.div>
              )}
            </div>
          ))
        )}
      </div>
      
      {isActive && (
        <motion.div 
          layoutId="active-rift-outline" 
          className="absolute inset-0 border-2 border-cyan-400 rounded-2xl pointer-events-none"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  );
}
