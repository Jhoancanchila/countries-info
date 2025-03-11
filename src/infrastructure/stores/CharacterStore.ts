import { create } from "zustand";
import { Character, CharacterEmptyState, CharacterItems } from "../../domain/models/Character";

interface CharacterState {
    characters: Character;
    setCharacters: (characters: Character) => void;
    filteredCharacters: CharacterItems[];
    setFilteredCharacters: (characters: CharacterItems[]) => void;
}


export const useCharacterStore = create<CharacterState>((set) => ({
    characters: CharacterEmptyState,
    setCharacters: (characters: Character) => set({ characters }),
    filteredCharacters: [],
    setFilteredCharacters: (characters: CharacterItems[]) => set({ filteredCharacters: characters }),
}));