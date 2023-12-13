import { create } from 'zustand';

const useAppStore = create((set) => ({
  themeScheme: 'light',
  setThemeScheme: (payload) => set(() => ({ themeScheme: payload })),

  animationLoop: 'loop',
  setAnimationLoop: (payload) => set(() => ({ animationLoop: payload })),
}));

export default useAppStore;
