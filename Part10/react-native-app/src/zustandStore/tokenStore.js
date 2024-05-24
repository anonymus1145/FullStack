import { create } from 'zustand'

const useTokenStore = create((set) => ({
  token: false,
  setToken: () => set((state) => ({ token: !state.token })),
}))

export default useTokenStore

