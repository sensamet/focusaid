import { Bone, Sprout, HeartHandshake, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';
import { useStore } from '../store/useStore';

export function RewardInfoCard() {
    const { completedSessions } = useStore();
    const currentCycle = completedSessions % 4;

    const stages = [
        {
            icon: Bone,
            title: "1 Kg Mama",
            desc: "1. Seansı tamamla, yerel bir barınağa 1 Kg mama bağışla.",
            color: "emerald"
        },
        {
            icon: Sprout,
            title: "Fidan Dikimi",
            desc: "2. Seansı tamamla, senin adına doğaya fidan dikilsin.",
            color: "green"
        },
        {
            icon: HeartHandshake,
            title: "500 TL Yardım",
            desc: "3. Seansı tamamla, seçtiğiniz bir kuruluşa 500 TL bağış yap.",
            color: "blue"
        },
        {
            icon: GraduationCap,
            title: "Eğitim Desteği",
            desc: "4. Seansı tamamla, bir öğrencinin ihtiyaçlarını karşıla.",
            color: "purple"
        }
    ];

    return (
        <div className="flex flex-col gap-4 p-6 glass-card rounded-3xl w-full max-w-md mx-auto sticky top-6">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Bağış Döngüsü
            </h3>

            <div className="space-y-4">
                {stages.map((stage, i) => {
                    const Icon = stage.icon;
                    const isPassed = i < currentCycle;
                    const isCurrent = i === currentCycle;

                    return (
                        <div
                            key={i}
                            className={cn(
                                "flex gap-4 items-start p-3 rounded-2xl transition-all duration-500",
                                isCurrent ? "bg-slate-800/80 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "bg-transparent hover:bg-slate-800/40"
                            )}
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all",
                                isPassed ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" :
                                    isCurrent ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30" :
                                        "bg-slate-800 text-slate-500 border border-white/5"
                            )}>
                                <Icon size={20} className={cn(
                                    isCurrent && "animate-pulse",
                                    isPassed && "drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                                )} />
                            </div>

                            <div className="flex flex-col gap-0.5 pt-0.5">
                                <span className={cn(
                                    "font-bold text-sm tracking-wide",
                                    isPassed ? "text-slate-300 line-through decoration-emerald-500/50" :
                                        isCurrent ? "text-emerald-400" :
                                            "text-slate-400"
                                )}>
                                    {stage.title}
                                </span>
                                <span className={cn(
                                    "text-xs leading-relaxed",
                                    isPassed ? "text-slate-500" :
                                        isCurrent ? "text-slate-300" :
                                            "text-slate-500"
                                )}>
                                    {stage.desc}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
