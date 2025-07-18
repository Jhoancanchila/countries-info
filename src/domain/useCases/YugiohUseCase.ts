import YugiOhRepository from "../repositories/YugiOhRepository";

export const getYugiOhList = async (repository: YugiOhRepository) => {
    return await repository.getYugiOhList();
}

export const getYugiOhFiltered = async (repository: YugiOhRepository, query: string) => {
    return await repository.getYugiOhFiltered(query);
}