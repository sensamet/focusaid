import { create } from 'zustand';

interface FocusState {
    // Timer state
    timeLeft: number;
    isRunning: boolean;
    isPaused: boolean;
    sessionType: 'FOCUS' | 'BREAK';

    // Progression
    completedSessions: number;

    // Donation Stats
    totalFocusTime: number; // in seconds
    mealsDonated: number;

    // Sponsor Modal
    showRewardModal: boolean;

    // Demo Mode
    demoClicks: number;
    showDemoMessage: boolean;

    // Actions
    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
    tick: () => void;
    completeSession: () => void;
    closeRewardModal: () => void;

    // Demo Actions
    triggerDemo: () => void;
    closeDemoMessage: () => void;
}

const POMODORO_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

export const useStore = create<FocusState>((set, get) => ({
    timeLeft: POMODORO_TIME,
    isRunning: false,
    isPaused: false,
    sessionType: 'FOCUS',

    completedSessions: 0,

    totalFocusTime: 0,
    mealsDonated: 0,
    showRewardModal: false,

    demoClicks: 0,
    showDemoMessage: false,

    startTimer: () => set({ isRunning: true, isPaused: false }),
    pauseTimer: () => set({ isPaused: true, isRunning: false }),
    resetTimer: () => set({
        timeLeft: get().sessionType === 'FOCUS' ? POMODORO_TIME : BREAK_TIME,
        isRunning: false,
        isPaused: false,
    }),

    tick: () => {
        const { isRunning, timeLeft, sessionType } = get();
        if (!isRunning || timeLeft <= 0) return;

        set({ timeLeft: timeLeft - 1 });

        if (sessionType === 'FOCUS') {
            set((state) => ({ totalFocusTime: state.totalFocusTime + 1 }));
        }
    },

    completeSession: () => {
        const { sessionType, completedSessions } = get();

        if (sessionType === 'FOCUS') {
            const newSessions = completedSessions + 1;
            set({
                completedSessions: newSessions,
                sessionType: 'BREAK',
                timeLeft: BREAK_TIME,
                isRunning: false,
            });

            // Trigger donation modal after EVERY completed session
            set((state) => ({
                mealsDonated: state.mealsDonated + 1, // keeping this stat for total count
                showRewardModal: true
            }));
        } else {
            set({
                sessionType: 'FOCUS',
                timeLeft: POMODORO_TIME,
                isRunning: false,
            });
        }
    },

    closeRewardModal: () => {
        const { demoClicks } = get();
        if (demoClicks > 0 && demoClicks % 4 === 0) {
            set({ showRewardModal: false, showDemoMessage: true });
        } else {
            set({ showRewardModal: false });
        }
    },

    triggerDemo: () => {
        set((state) => ({
            demoClicks: state.demoClicks + 1,
            completedSessions: state.completedSessions + 1,
            mealsDonated: state.mealsDonated + 1,
            showRewardModal: true,
            isRunning: false,
            isPaused: false,
            timeLeft: POMODORO_TIME,
            sessionType: 'FOCUS'
        }));
    },

    closeDemoMessage: () => set({ showDemoMessage: false })
}));
