import { Character } from "../../domain/models/Character";
import CharacterRepository from "../../domain/repositories/CharacterRepository";
import { fetchCharacterList } from "../api/CharacterApi";

export const characterRepositoryImp = (): CharacterRepository => {
    return {
        getCharacterList: async (page: number):Promise<Character> => {
            const characters = await fetchCharacterList(page);
            return characters;
        },
    };
}