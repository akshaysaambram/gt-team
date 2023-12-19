import { create } from 'zustand';

const useAppStore = create((set) => ({
  isInitialLaunch: true,
  setIsInitialLaunch: (payload) => set(() => ({ isInitialLaunch: payload })),

  themeScheme: 'system',
  setThemeScheme: (payload) => set(() => ({ themeScheme: payload })),

  animationLoop: 'loop',
  setAnimationLoop: (payload) => set(() => ({ animationLoop: payload })),
}));

export default useAppStore;
