import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      authUserDoc: {},
      setAuthUserDoc: (payload) => set(() => ({ authUserDoc: payload })),

      team: [],
      setTeam: (payload) => set(() => ({ team: payload })),
    }),
    {
      name: 'userStore',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;
