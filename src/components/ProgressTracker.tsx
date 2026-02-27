import { useStore } from '../store/useStore';
import { Sprout, Bone, HeartHandshake, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';

export function ProgressTracker() {
    const { completedSessions } = useStore();

    const totalCycles = 4;
    const currentCycle = completedSessions % totalCycles;

    const rewards = [
        { icon: Bone, label: "1 Kg Mama bağışı", desc: "Sıradaki: Barınağa Mama Bağışı" },
        { icon: Sprout, label: "Adınıza Fidan bağışı", desc: "Sıradaki: Fidan Dikimi" },
        { icon: HeartHandshake, label: "Seçtiğiniz bir kuruma 500 TL bağış", desc: "Sıradaki: 500 TL Yardım" },
        { icon: GraduationCap, label: "Bir öğrenciye eğitim bağışı", desc: "Sıradaki: Öğrenci İhtiyaçları" }
    ];

    return (
        <div className="flex flex-col items-center gap-4 p-6 glass-card rounded-3xl w-full max-w-md mx-auto relative overflow-hidden">
            <div className="flex flex-col gap-3 w-full z-10">
                {rewards.map((Reward, i) => {
                    const isCompleted = i < currentCycle;
                    const isCurrent = i === currentCycle;
                    const Icon = Reward.icon;
                    return (
                        <div
                            key={i}
                            className={cn(
                                "relative w-full p-4 rounded-2xl transition-all duration-700 flex items-center gap-4 border",
                                isCompleted
                                    ? "bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-emerald-400"
                                    : isCurrent
                                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                                        : "bg-slate-800/50 border-white/5 text-slate-600"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl flex items-center justify-center",
                                isCompleted ? "bg-emerald-500/20" : isCurrent ? "bg-emerald-500/10" : "bg-slate-800"
                            )}>
                                <Icon size={24} strokeWidth={isCompleted || isCurrent ? 2.5 : 2} className={cn(
                                    "transition-all duration-700",
                                    isCompleted ? "scale-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" :
                                        isCurrent ? "scale-100 animate-pulse" : "scale-90"
                                )} />
                            </div>
                            <span className={cn(
                                "text-sm font-bold tracking-wider uppercase transition-opacity flex-1 text-left",
                                isCompleted || isCurrent ? "opacity-100" : "opacity-40"
                            )}>{Reward.label}</span>

                            {isCompleted && (
                                <div className="ml-auto flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                    Tamamlandı
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center justify-between w-full px-2 z-10">
                <p className="text-sm text-slate-400 font-medium">
                    {rewards[currentCycle]?.desc || "Döngü Tamamlandı!"}
                </p>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-900/50 px-3 py-1 rounded-full border border-white/5">
                    Döngü {Math.floor(completedSessions / 4) + 1}
                </div>
            </div>
        </div>
    );
}
