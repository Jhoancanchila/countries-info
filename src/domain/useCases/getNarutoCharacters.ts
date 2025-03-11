import { Character } from "../models/Character";
import { Naruto } from "../models/Naruto";
import NarutoRepository from "../repositories/NarutoRepository";

export  const getCharactersNaruto = async (respository: NarutoRepository, page:number):Promise<Naruto> => {
    return await respository.getNarutoList(page);
}

export const getCharactersNarutoFiltered = async (respository: NarutoRepository, query:string):Promise<Character[]> => {
    return await respository.getNarutoFiltered(query);
}