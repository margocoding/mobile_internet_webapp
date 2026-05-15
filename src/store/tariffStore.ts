import { create } from "zustand";

interface TariffState {
  openedModal: boolean;
  setModal: (data: boolean) => void;
}

export const useTariffStore = create<TariffState>((set) => ({
  openedModal: false,
  setModal: (data: boolean) => set(() => ({ openedModal: data })),
}));
