import { Character } from "../models/Character";
import { Naruto } from "../models/Naruto";

export default interface NarutoRepository {
    getNarutoList(page: number): Promise<Naruto>
    getNarutoFiltered(query: string): Promise<Character[]>
}
