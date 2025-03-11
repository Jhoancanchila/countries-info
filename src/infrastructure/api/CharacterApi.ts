import { Character, CharacterItems } from "../../domain/models/Character";
const BASE_URL = "https://dragonball-api.com/api/characters";

export const fetchCharacterList = async (page: number = 1):Promise<Character> => {
    const PARAMS = `?page=${page}&limit=10`;
    const response = await fetch(`${BASE_URL}${PARAMS}`);
    if(!response.ok) {
        throw new Error("Failed to fetch characters");
    }
    const data = await response.json();
    return data;
}

export const fetchCharactersFiltered = async (query: string):Promise<CharacterItems[]> => {
    const QUERY = `?name=${query}`;
    const response = await fetch(`${BASE_URL}${QUERY}`);
    if(!response.ok) {
        throw new Error("Failed to fetch in filter characters");
    }
    const data = await response.json();
    return data;
}
