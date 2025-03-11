import { Character, CharacterItems } from "../models/Character";
import CharacterRepository from "../repositories/CharacterRepository";

export  const getCharacter = async (respository: CharacterRepository, page:number):Promise<Character> => {
    return await respository.getCharacterList(page);
}

export const getCharacterFiltered = async (respository: CharacterRepository, query:string):Promise<CharacterItems[]> => {
    return await respository.getCharacterFiltered(query);
}