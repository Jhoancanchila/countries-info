import { Character } from "../../domain/models/Character";

export const fetchCharacterList = async (page: number = 1):Promise<Character> => {
    const response = await fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=10`);
    if(!response.ok) {
        throw new Error("Failed to fetch characters");
    }
    const data = await response.json();
    return data;
}
