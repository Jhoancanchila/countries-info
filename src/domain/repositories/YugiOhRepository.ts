import { Yugioh } from "../models/YuGiOh";

export default interface YugiOhRepository {
    getYugiOhList(): Promise<Yugioh[]>
    getYugiOhFiltered(query: string): Promise<Yugioh[]>
}