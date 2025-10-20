import { Yugioh } from "../../domain/models/YuGiOh";
import YugiOhRepository from "../../domain/repositories/YugiOhRepository";
import { fetchYugiOhFiltered, fetchYugiOhList } from "../api/YugiohApi";

export const YugiOhRepositoryImpl = (): YugiOhRepository => {

    const getYugiOhList = async (): Promise<Yugioh[]> => {
        const yogiOhList = await fetchYugiOhList();
        return yogiOhList;
    }

    const getYugiOhFiltered = async (query: string): Promise<Yugioh[]> => {
        const yogiOhList = await fetchYugiOhFiltered(query);
        return yogiOhList;
    }

    return {
        getYugiOhList,
        getYugiOhFiltered
    }
};