import { useEffect, useState, useRef } from 'react';
import { useStore } from '../store/useStore';
import { AlertCircle } from 'lucide-react';

export function FocusTracker() {
    const { isRunning, sessionType, resetTimer } = useStore();
    const [warningSeconds, setWarningSeconds] = useState<number | 'BURNT' | null>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startWarningTimer = () => {
        // Only warn during active FOCUS sessions
        if (!isRunning || sessionType !== 'FOCUS') return;

        setWarningSeconds(1); // 1 seconds grace period

        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setWarningSeconds((prev) => {
                if (prev === null || prev === 'BURNT') return prev;
                if (prev <= 1) {
                    // Time is up, burn the session
                    clearInterval(timerRef.current!);
                    resetTimer();
                    return 'BURNT'; // Show 'burnt' message
                }
                return prev - 1;
            });
        }, 1000);
    };

    const clearWarningTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setWarningSeconds((prev) => prev === 'BURNT' ? 'BURNT' : null);
    };

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (warningSeconds !== 'BURNT') startWarningTimer();
            } else {
                if (warningSeconds !== 'BURNT') clearWarningTimer();
            }
        };

        const handleBlur = () => {
            if (warningSeconds !== 'BURNT') startWarningTimer();
        };
        const handleFocus = () => {
            if (warningSeconds !== 'BURNT') clearWarningTimer();
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleBlur);
        window.addEventListener("focus", handleFocus);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("focus", handleFocus);

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isRunning, sessionType, warningSeconds]);

    if (warningSeconds === null) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4 animate-in fade-in duration-300">
            <div className="max-w-lg w-full glass-panel border border-rose-500/30 p-12 rounded-[3rem] text-center shadow-[0_0_80px_rgba(244,63,94,0.15)] flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-rose-500/20" />
                {warningSeconds !== 'BURNT' && (
                    <div className="absolute top-0 left-0 h-1 bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.8)] transition-all duration-1000 ease-linear" style={{ width: `${(warningSeconds / 1) * 100}%` }} />
                )}

                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-20 animate-pulse" />
                    <div className="bg-rose-500/10 border border-rose-500/20 w-24 h-24 rounded-3xl flex flex-col items-center justify-center relative z-10">
                        <AlertCircle size={48} className="text-rose-500 mb-1" />
                    </div>
                </div>

                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600 mb-4 tracking-tight">Odak Bozuldu!</h2>

                {warningSeconds === 'BURNT' ? (
                    <>
                        <p className="text-slate-300 mb-8 text-xl font-medium leading-relaxed">
                            Uygulamadan ayrıldığın için mevcut odaklanma seansın iptal edildi ve ilerlemen yandı.
                        </p>
                        <button
                            onClick={() => setWarningSeconds(null)}
                            className="w-full py-4 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-white rounded-2xl font-bold text-lg transition-all"
                        >
                            Anladım
                        </button>
                    </>
                ) : (
                    <p className="text-slate-300 mb-8 text-xl font-medium leading-relaxed">
                        Lütfen <strong className="text-white text-3xl mx-2 font-bold bg-rose-500/20 px-3 py-1 rounded-lg border border-rose-500/30">{warningSeconds}s</strong> içinde odaklanma seansına geri dön, aksi takdirde ilerlemen yanacak!
                    </p>
                )}
            </div>
        </div>
    );
}
