import { create } from "zustand";
import { Character, CharacterEmptyState } from "../../domain/models/Character";

interface CharacterState {
    characters: Character;
    setCharacters: (characters: Character) => void;
}


export const useCharacterStore = create<CharacterState>((set) => ({
    characters: CharacterEmptyState,
    setCharacters: (characters: Character) => set({ characters })
}));