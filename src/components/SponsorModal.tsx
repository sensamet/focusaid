import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import confetti from 'canvas-confetti';
import { X, Bone, Sprout, HeartHandshake, GraduationCap } from 'lucide-react';

const REWARDS = [
    {
        name: "PetFood A.Ş.",
        message: "Harika! Odaklanman sayesinde yerel bir barınaktaki can dostlarımıza 1 Kg mama bağışında bulunduk!",
        title: "Mama Bağışı Gerçekleşti!",
        icon: Bone
    },
    {
        name: "GreenEarth Vakfı",
        message: "Odağını koruduğun için senin adına doğaya nefes olacak bir fidan dikildi!",
        title: "Fidan Dikimi Başarılı!",
        icon: Sprout
    },
    {
        name: "Umut Vakfı",
        message: "Kararlılığın sayesinde bir yardım kuruluşuna senin adına tam 500 TL destek sağlandı!",
        title: "500 TL Bağış Yapıldı!",
        icon: HeartHandshake
    },
    {
        name: "Eğitim Gönüllüleri",
        message: "Müthiş! Durumu olmayan bir öğrencinin okul ihtiyaçlarını karşıladık. Detaylar ve sertifikan yakında mailine iletilecek!",
        title: "Öğrenciye Eğitim Desteği!",
        icon: GraduationCap
    }
];

export function SponsorModal() {
    const { showRewardModal, closeRewardModal, completedSessions } = useStore();

    useEffect(() => {
        if (showRewardModal) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

            const interval: ReturnType<typeof setInterval> = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: Math.random(), y: Math.random() - 0.2 }
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [showRewardModal]);

    const { demoClicks } = useStore();

    if (!showRewardModal) return null;

    const targetIndex = (completedSessions - 1) % 4;
    const reward = REWARDS[targetIndex >= 0 ? targetIndex : 0];
    const Icon = reward.icon;
    const isDemoEnd = demoClicks > 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="relative max-w-lg w-full glass-panel border border-emerald-500/30 p-10 rounded-[2.5rem] text-center shadow-[0_0_50px_rgba(16,185,129,0.1)] flex flex-col items-center zoom-in-95 duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />

                <button
                    onClick={closeRewardModal}
                    className="absolute top-6 right-6 p-3 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all z-10"
                >
                    <X size={24} />
                </button>

                <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl rotate-3 flex items-center justify-center mb-8 shadow-inner relative">
                    <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-20" />
                    <Icon size={48} className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-pulse relative z-10" />
                </div>

                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400 mb-3 drop-shadow-sm leading-tight pb-2">
                    {reward.title}
                </h2>

                <p className="text-xl text-slate-300 mb-8 font-medium">
                    {completedSessions}. Seans Başarıyla Tamamlandı
                </p>

                <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl w-full border border-white/5 mb-8 shadow-inner">
                    <p className="text-xs text-emerald-400 uppercase font-bold tracking-[0.2em] mb-3">
                        Sponsor: {reward.name}
                    </p>
                    <p className="text-white/90 text-lg leading-relaxed font-medium">
                        "{reward.message}"
                    </p>
                </div>

                {isDemoEnd && (
                    <div className="w-full bg-red-500/10 border border-red-500/30 p-4 rounded-2xl mb-8 animate-in fade-in zoom-in duration-500 text-left relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                        <h3 className="font-bold text-red-400 mb-1 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                            Bu bir denemeydi!
                        </h3>
                        <p className="text-sm text-red-100/80">
                            Başlamak istiyorsan deneme butonuyla zaman kaybetme.
                        </p>
                    </div>
                )}

                <button
                    onClick={closeRewardModal}
                    className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all active:scale-95"
                >
                    Gelişmeye Devam Et
                </button>
            </div>
        </div>
    );
}
