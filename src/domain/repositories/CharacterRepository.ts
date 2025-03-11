import { Character, CharacterItems } from "../models/Character";

export default interface CharacterRepository {
    getCharacterList(page:number): Promise<Character>
    getCharacterFiltered(query: string): Promise<CharacterItems[]>
}