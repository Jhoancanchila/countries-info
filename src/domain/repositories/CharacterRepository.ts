import { Character } from "../models/Character";

export default interface CharacterRepository {
    getCharacterList(page:number): Promise<Character>
}