import { create } from "zustand";
import { Yugioh } from "../../domain/models/YuGiOh";

interface YugiOhState {
  yugiOh: Yugioh[];
  setYugiOh: (yugiOh: Yugioh[]) => void;
  filteredYugiOh: Yugioh[];
  setFilteredYugiOh: (yugiOh: Yugioh[]) => void;
}

export const useYugiOhStore = create<YugiOhState>((set) => ({
  yugiOh: [],
  setYugiOh: (yugiOh) => set({ yugiOh }),
  filteredYugiOh: [],
  setFilteredYugiOh: (filteredYugiOh) => set({ filteredYugiOh }),
}));