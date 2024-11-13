import { Character } from "../models/Character";
import CharacterRepository from "../repositories/CharacterRepository";

export  const getCharacter = async (respository: CharacterRepository, page:number):Promise<Character> => {
    return await respository.getCharacterList(page);
}