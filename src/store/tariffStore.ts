import { create } from "zustand";

interface TariffState {
    openedModal: boolean;
    setModal: (data: boolean) => void;
    checkBalanceModal: boolean;
    setCheckBalanceModal: (data: boolean) => void;
    checkBalanceCountryId: string | null;
    setCheckBalanceCountryId: (data: string) => void;
    checkBalanceTariffId: number | null;
    setCheckBalanceTariffId: (data: number) => void;

    checkBalanceTariffType: 'unlimited' | 'fixed' | null
    setCheckBalanceTariffType: (data: 'unlimited' | 'fixed' | null) => void;

}

export const useTariffStore = create<TariffState>((set) => ({
    openedModal: false,
    setModal: (data: boolean) => set(() => ({ openedModal: data })),
    checkBalanceModal: false,
    setCheckBalanceModal: (data: boolean) => set(() => ({ checkBalanceModal: data })),
    checkBalanceCountryId: null,
    setCheckBalanceCountryId: (data: string) => set(() => ({ checkBalanceCountryId: data })),
    checkBalanceTariffId: null,
    setCheckBalanceTariffId: (data: number) => set(() => ({ checkBalanceTariffId: data })),
    checkBalanceTariffType: null,
    setCheckBalanceTariffType: (data: 'unlimited' | 'fixed' | null) => set(() => ({ checkBalanceTariffType: data }))
}));
