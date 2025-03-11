import { create } from "zustand";
import { Naruto, NarutoEmpty } from "../../domain/models/Naruto";
import { Character } from "../../domain/models/Character";

interface NarutoState {
    charactersNaruto: Naruto;
    setNaruto: (charactersNaruto: Naruto) => void;
    charactersFilteredNaruto: Character[];
    setFilteredNaruto: (charactersFilteredNaruto: Character[]) => void;
}
    
export const useNarutoStore = create<NarutoState>((set) => ({
    charactersNaruto: NarutoEmpty,
    setNaruto: (charactersNaruto: Naruto) => set({ charactersNaruto }),
    charactersFilteredNaruto: [],
    setFilteredNaruto: (charactersFilteredNaruto: Character[]) => set({ charactersFilteredNaruto}),
}));