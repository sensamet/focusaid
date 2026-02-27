import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

export function FocusTimer() {
    const {
        timeLeft,
        isRunning,
        sessionType,
        startTimer,
        pauseTimer,
        resetTimer,
        tick,
        completeSession,
        triggerDemo
    } = useStore();

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (isRunning) {
            interval = setInterval(() => {
                tick();
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, tick]);

    useEffect(() => {
        if (timeLeft <= 0) {
            completeSession();
        }
    }, [timeLeft, completeSession]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const progressPercentage = sessionType === 'FOCUS'
        ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
        : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

    return (
        <div className="relative group mx-auto w-full max-w-md">
            {/* Outer Glow Ring */}
            <div
                className={cn(
                    "absolute -inset-1 rounded-[3rem] blur-xl opacity-20 transition-all duration-1000",
                    isRunning ? "bg-emerald-500 opacity-40" : "bg-teal-700 opacity-10"
                )}
            />

            <div className="relative glass-panel rounded-[3rem] p-10 flex flex-col items-center justify-center border-t border-l border-white/20 overflow-hidden isolate">

                {/* Animated Progress Ring (SVG) */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                    <circle
                        cx="50" cy="50" r="48"
                        fill="none"
                        stroke="rgba(255,255,255,0.03)"
                        strokeWidth="1"
                    />
                    <circle
                        cx="50" cy="50" r="48"
                        fill="none"
                        className="text-emerald-500 transition-all duration-1000 ease-linear"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray={`${progressPercentage * 3.01} 301`}
                        strokeLinecap="round"
                    />
                </svg>

                <div className="text-xs font-bold tracking-[0.3em] text-emerald-400/90 uppercase mb-6 drop-shadow-sm">
                    {sessionType === 'FOCUS' ? 'Derin Odak' : 'Mola Zamanı'}
                </div>

                <div className="text-8xl font-extrabold tracking-tighter text-white tabular-nums mb-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    {timeString}
                </div>

                <div className="flex items-center justify-between w-[320px] z-10 relative">
                    <div className="flex flex-1 justify-end pr-4">
                        <button
                            onClick={resetTimer}
                            className="p-4 rounded-full bg-slate-800/50 hover:bg-slate-700/80 text-slate-400 hover:text-white transition-all backdrop-blur-md"
                            title="Sıfırla"
                        >
                            <RotateCcw size={24} />
                        </button>
                    </div>

                    <button
                        onClick={isRunning ? pauseTimer : startTimer}
                        className={cn(
                            "p-6 rounded-full text-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center backdrop-blur-md shadow-2xl relative shrink-0",
                            isRunning
                                ? "bg-rose-500/90 hover:bg-rose-500 shadow-rose-500/20 border border-rose-400/50"
                                : "bg-emerald-500/90 hover:bg-emerald-500 shadow-emerald-500/30 border border-emerald-400/50"
                        )}
                    >
                        {isRunning ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-2" />}
                    </button>

                    <div className="flex flex-1 justify-start pl-4">
                        <button
                            onClick={triggerDemo}
                            className="px-2 py-3 rounded-full bg-slate-800/50 hover:bg-slate-700/80 text-red-400 hover:text-red-300 font-bold transition-all backdrop-blur-md border border-red-500/20 whitespace-nowrap"
                        >
                            Demo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
