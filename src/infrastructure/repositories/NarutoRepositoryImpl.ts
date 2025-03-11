import { Character } from "../../domain/models/Character";
import { Naruto } from "../../domain/models/Naruto";
import NarutoRepository from "../../domain/repositories/NarutoRepository";
import { fetchNarutoFiltered, fetchNarutoList } from "../api/NarutoApi";

export const NarutoRepositoryImpl = (): NarutoRepository => {
    const getNarutoList = async (page: number): Promise<Naruto> => {
        const narutoList = await fetchNarutoList(page);
        return narutoList;
    };

    const getNarutoFiltered = async (query: string): Promise<Character[]> => {
        const narutoList = await fetchNarutoFiltered(query);
        return narutoList;
    };

    return {
        getNarutoList,
        getNarutoFiltered
    };
    
};