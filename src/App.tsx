import { FocusTimer } from './components/FocusTimer';
import { ProgressTracker } from './components/ProgressTracker';
import { FocusTracker } from './components/FocusTracker';
import { SponsorModal } from './components/SponsorModal';
import { Dashboard } from './components/Dashboard';
import { RewardInfoCard } from './components/RewardInfoCard';
import { Timer, HeartHandshake } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center p-6 lg:p-10 relative overflow-hidden font-sans selection:bg-emerald-500/30">
      <FocusTracker />
      <SponsorModal />

      {/* Premium Background Mesh Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-emerald-600/10 blur-[140px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-teal-600/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      {/* Soft floating Turkish mottos scattered across the FULL screen */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

        {/* --- LEFT SIDE MOTTOS --- */}
        <div className="absolute top-[8%] left-[5%] text-slate-500/10 text-2xl md:text-3xl lg:text-5xl font-extrabold max-w-xs rotate-[15deg] tracking-tight mix-blend-overlay">
          "Küçük adımlar, <br className="hidden lg:block" /> büyük izler bırakır."
        </div>

        <div className="absolute top-[35%] left-[3%] text-emerald-400/5 text-2xl md:text-3xl font-black max-w-xs rotate-[8deg] tracking-wider hidden lg:block">
          BİR FİDAN <br /> BİR UMUT
        </div>

        <div className="absolute top-[65%] left-[10%] text-indigo-400/5 text-base md:text-lg lg:text-xl font-medium max-w-xs -rotate-2 tracking-widest hidden md:block">
          Kendini yendiğinde, dünyayı değiştirirsin.
        </div>

        <div className="absolute top-[80%] left-[5%] text-emerald-500/10 text-xl md:text-2xl lg:text-4xl font-extrabold max-w-sm rotate-6 tracking-tighter mix-blend-overlay">
          Zamanı <br /> iyiliğe dönüştür.
        </div>

        <div className="absolute bottom-[2%] left-[20%] text-lime-400/10 text-lg md:text-xl lg:text-2xl font-bold max-w-sm rotate-[10deg] tracking-tight hidden md:block mix-blend-overlay">
          Her saniye <br /> bir geleceği aydınlatır.
        </div>

        {/* --- RIGHT SIDE MOTTOS --- */}
        <div className="absolute top-[12%] right-[25%] text-fuchsia-500/5 text-xl md:text-2xl font-black max-w-xs rotate-[5deg] tracking-widest hidden lg:block mix-blend-screen">
          HAYATA DOKUN
        </div>

        <div className="absolute top-[20%] right-[10%] text-blue-400/5 text-lg md:text-2xl lg:text-3xl font-bold max-w-xs -rotate-[12deg] tracking-wide mix-blend-screen hidden sm:block">
          "Dikkatin <br /> en değerli para birimin."
        </div>

        <div className="absolute top-[45%] right-[2%] text-teal-600/10 text-xl md:text-3xl lg:text-4xl font-black max-w-sm -rotate-6 tracking-tighter mix-blend-color-dodge">
          Odaklan. <br /> Büyüt. <br /> Yaşat.
        </div>

        <div className="absolute top-[60%] right-[18%] text-amber-500/5 text-base md:text-xl lg:text-2xl font-medium max-w-xs -rotate-[8deg] tracking-wide hidden xl:block">
          Zihnini topla, <br /> dünyayı besle.
        </div>

        <div className="absolute top-[75%] right-[25%] text-sky-400/10 text-xl font-extrabold max-w-xs rotate-[3deg] tracking-widest hidden lg:block mix-blend-color-dodge">
          Gücün odağında saklı.
        </div>

        <div className="absolute bottom-[8%] right-[5%] text-white/10 text-lg md:text-xl lg:text-2xl font-bold max-w-md -rotate-3 tracking-widest uppercase mix-blend-color-dodge">
          GERÇEK ETKİ YARAT
        </div>
      </div>

      <header className="fixed top-4 left-4 right-4 sm:left-auto sm:right-auto sm:w-full max-w-5xl z-50 py-3 px-6 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[4px] group cursor-pointer">
            <div className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12 w-10 h-10">
              {/* Harici/Dış İkon: Saat */}
              <Timer
                className="absolute text-emerald-400/80 w-10 h-10 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                strokeWidth={1.5}
              />
              {/* Dahili/İç İkon: Bağış/Kalp Tokalaşma */}
              <HeartHandshake
                className="relative text-emerald-300 w-5 h-5 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] z-10 translate-y-1"
                strokeWidth={2.5}
              />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white/90 group-hover:text-emerald-50 transition-colors">
              Focussaid<span className="text-emerald-400">.</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl flex flex-col items-center z-10 w-full relative pt-28 sm:pt-36">

        <div className="text-center space-y-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-sm pb-2">
            Derin odaklanmayla <br className="sm:hidden" /> Yardımlar gerçekleştir.
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl max-w-xl mx-auto font-medium">
            Dikkatini dağıtma. Artan üretkenliğin, gerçek dünyada iyiliğe dönüşsün.
          </p>
        </div>

        <FocusTimer />

        <div className="mt-16 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <ProgressTracker />
          <RewardInfoCard />
        </div>

        <div className="mt-12 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
          <Dashboard />
        </div>
      </main>

    </div>
  );
}

export default App;
