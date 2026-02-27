import { useStore } from '../store/useStore';
import { Clock, HeartHandshake, Flag } from 'lucide-react';

export function Dashboard() {
    const { totalFocusTime, mealsDonated, completedSessions } = useStore();

    const hoursFocused = Math.floor(totalFocusTime / 3600);
    const minutesFocused = Math.floor((totalFocusTime % 3600) / 60);

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 flex flex-col items-center">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {/* Time Focused Card */}
                <div className="glass-card rounded-[2rem] p-6 flex flex-col group relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors duration-500">
                        <Clock size={160} />
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center mb-6 shadow-Inner">
                        <Clock className="text-emerald-400" size={24} />
                    </div>
                    <p className="text-4xl font-extrabold tabular-nums text-white drop-shadow-sm mb-1">
                        {hoursFocused}<span className="text-xl text-slate-400 font-semibold ml-1 mr-2">h</span>
                        {minutesFocused}<span className="text-xl text-slate-400 font-semibold ml-1">m</span>
                    </p>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Odaklanılan Süre</p>
                </div>

                {/* Donations Card */}
                <div className="glass-card rounded-[2rem] p-6 flex flex-col group relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 text-teal-500/5 group-hover:text-teal-500/10 transition-colors duration-500">
                        <HeartHandshake size={160} />
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center mb-6 shadow-Inner">
                        <HeartHandshake className="text-teal-400" size={24} />
                    </div>
                    <p className="text-4xl font-extrabold tabular-nums text-white drop-shadow-sm mb-1">
                        {mealsDonated}
                    </p>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Sponsorlu Bağış</p>
                </div>

                {/* Completion Card */}
                <div className="glass-card rounded-[2rem] p-6 flex flex-col group relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 text-blue-500/5 group-hover:text-blue-500/10 transition-colors duration-500">
                        <Flag size={160} />
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center mb-6 shadow-Inner">
                        <Flag className="text-blue-400" size={24} />
                    </div>
                    <p className="text-4xl font-extrabold tabular-nums text-white drop-shadow-sm mb-1">
                        {completedSessions}
                    </p>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Tamamlanan Seans</p>
                </div>
            </div>
        </div>
    );
}
