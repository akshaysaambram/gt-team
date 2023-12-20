import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set) => ({
      isInitialLaunch: true,
      setIsInitialLaunch: () => set(() => ({ isInitialLaunch: false })),

      themeScheme: 'system',
      setThemeScheme: (payload) => set(() => ({ themeScheme: payload })),

      animationLoop: 'loop',
      setAnimationLoop: (payload) => set(() => ({ animationLoop: payload })),
    }),
    {
      name: 'appStore',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAppStore;
