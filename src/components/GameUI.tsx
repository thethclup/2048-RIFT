"use client";

import { useGameStore } from "@/lib/store/useGameStore";
import { RiftBoard } from "@/components/RiftBoard";
import { useSwipe } from "@/hooks/useSwipe";
import { motion } from "framer-motion";
import { ArrowLeftRight, RotateCcw, Trophy, Wallet, Sun } from "lucide-react";
import { useAccount, useSignMessage, useSendTransaction } from "wagmi";
import { generateAttributionPayload } from "@/lib/erc8021";
import { Providers } from "@/components/Providers";

export default function GameUI() {
  return (
    <Providers>
      <GameUIContent />
    </Providers>
  );
}

function GameUIContent() {
  useSwipe();
  const { rifts, activeRiftId, setActiveRift, score, bestScore, status, startGame, mergeRifts, spinActiveRift } = useGameStore();
  
  const { address, isConnected } = useAccount();
  const { signMessage } = useSignMessage();
  const { sendTransactionAsync } = useSendTransaction();

  const handleRecordOnChain = () => {
    if (!address) return alert("Please connect wallet first!");
    const payload = generateAttributionPayload("RECORD_RIFT_SCORE", { score, activeDimensions: rifts.length });
    
    signMessage({
      message: `I recorded a score of ${score} in 2048 RIFT. \nPayload: ${JSON.stringify(payload)}`,
    }, {
      onSuccess: () => alert("Score recorded on-chain successfully! (Mocked via SIWE)"),
      onError: (err) => alert("Failed to record: " + err.message)
    });
  };

  const sendGMTransaction = async () => {
    if (!address) return alert("Please connect wallet first!");
    try {
      const hash = await sendTransactionAsync({
        to: '0xc35B9997B63B1CE14f8F513f7eddD9a7ABbB33d7',
        value: BigInt(0),
      });
      alert("GM Transaction sent! Hash: " + hash);
    } catch (err: any) {
      alert("Failed to send GM: " + err.message);
    }
  };

  if (status === 'menu') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-32 h-32 mb-8 relative">
           <div className="absolute inset-0 border-4 border-fuchsia-500 rounded-xl transform rotate-45 opacity-50"></div>
           <div className="absolute inset-0 border-4 border-cyan-500 rounded-xl transform opacity-80"></div>
        </motion.div>
        
        <h1 className="text-6xl font-black mb-4 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          2048 RIFT
        </h1>
        <p className="text-slate-400 mb-12 max-w-sm">Manage multiple interconnected dimensions. Swipe to move. Merge dimensions to create chain reactions.</p>
        
        <button 
          onClick={startGame}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-900/20 rounded-xl font-bold tracking-widest text-white transition-all transform hover:scale-105"
        >
          ENTER THE RIFT
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto w-full p-4 safe-area-pt">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 p-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl relative">
        {isConnected && (
           <div className="absolute -top-12 right-0">
             <button 
                onClick={sendGMTransaction}
                className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
             >
                <Sun className="w-4 h-4" /> Say GM
             </button>
           </div>
        )}
        <div>
          <div className="text-[10px] text-slate-400 tracking-widest font-bold uppercase mb-1">Score</div>
          <div className="text-2xl font-mono font-black text-cyan-400">{score}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-400 tracking-widest font-bold uppercase mb-1 flex items-center justify-end gap-1">
            <Trophy className="w-3 h-3" /> Best
          </div>
          <div className="text-2xl font-mono font-bold text-fuchsia-400">{Math.max(score, bestScore)}</div>
        </div>
      </div>

      {/* Rifts Arena */}
      <div className="flex-1 flex flex-col justify-center gap-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(157,0,255,0.1),transparent_50%)] pointer-events-none" />
        
        {/* Render Inactive Rifts First (Smaller, at top) */}
        <div className="flex justify-center gap-4 px-4 overflow-x-auto pb-4">
            {rifts.map((rift) => (
              rift.id !== activeRiftId && (
                <div key={rift.id} className="w-1/2 flex-shrink-0">
                  <RiftBoard 
                    rift={rift} 
                    isActive={false} 
                    onClick={() => setActiveRift(rift.id)} 
                  />
                </div>
              )
            ))}
        </div>

        {/* Render Active Rift (Large, centered) */}
        {rifts.map((rift) => (
          rift.id === activeRiftId && (
            <div key={rift.id} className="w-full">
              <RiftBoard rift={rift} isActive={true} />
            </div>
          )
        ))}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center gap-4 pb-8">
        <button 
          onClick={mergeRifts}
          className="flex-1 p-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
        >
          <ArrowLeftRight className="text-cyan-400 w-5 h-5" />
          <span className="font-bold text-slate-300 text-sm uppercase tracking-wider">Merge Rifts</span>
        </button>
        <button 
          onClick={spinActiveRift}
          className="p-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="text-slate-300 w-5 h-5" />
        </button>
      </div>

      {/* Game Over Screen */}
      {status === 'gameover' && (
        <div className="absolute inset-0 z-50 bg-[#05070a]/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-5xl font-black text-fuchsia-500 mb-2 drop-shadow-[0_0_20px_rgba(217,70,239,0.5)] italic">RIFT COLLAPSE</h2>
          <p className="text-slate-400 mb-8">All dimensions have destabilized.</p>
          
          <div className="text-5xl font-mono font-black text-cyan-400 mb-12">{score}</div>

          <div className="flex flex-col gap-4 w-full max-w-sm">
            {isConnected && (
              <button 
                onClick={sendGMTransaction}
                className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center justify-center gap-2 font-['Cinzel'] text-xs font-bold w-full"
              >
                <Sun className="w-4 h-4" /> Say GM
              </button>
            )}
            <button 
              onClick={handleRecordOnChain}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-blue-900/20 text-white tracking-widest text-sm"
            >
                <Wallet className="w-5 h-5" />
                Record This Rift Run on-chain
              </button>
            <button 
              onClick={startGame}
              className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xl rounded-xl font-bold transition-colors text-slate-300 tracking-widest text-sm"
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
