import { Character, CharacterItems } from "../../domain/models/Character";
import CharacterRepository from "../../domain/repositories/CharacterRepository";
import { fetchCharacterList, fetchCharactersFiltered } from "../api/CharacterApi";

export const characterRepositoryImp = (): CharacterRepository => {
    return {
        getCharacterList: async (page: number):Promise<Character> => {
            const characters = await fetchCharacterList(page);
            return characters;
        },
        getCharacterFiltered: async (query: string):Promise<CharacterItems[]> => {
            const characters = await fetchCharactersFiltered(query);
            return characters.filter((character) => character.name.toLowerCase().includes(query.toLowerCase()));
        }
    };
}