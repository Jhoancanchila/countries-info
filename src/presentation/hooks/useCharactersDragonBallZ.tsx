import { useInfiniteQuery } from "@tanstack/react-query";
import { characterRepositoryImp } from "../../infrastructure/repositories/CharacterRepositoryImp";
import { getCharacter } from "../../domain/useCases/getCharacter";
import { useCharacterStore } from "../../infrastructure/stores/CharacterStore";

interface Props {
  page: number;
}

export const useCharactersDragonBallZ = ( { page }: Props ) => {

  const characterRepository = characterRepositoryImp();
  const { setCharacters, characters } = useCharacterStore();

  return useInfiniteQuery({
    queryKey: ["characters", "infiniteScroll"],
    queryFn: async ( { pageParam, /* queryKey */ } ) => {
      
      const charactersList = await getCharacter(characterRepository, pageParam);
      const newCharacters = {
        items: [...characters.items, ...charactersList.items],
        links: charactersList.links,
        meta: charactersList.meta
      }
      setCharacters(newCharacters);
      return newCharacters;
    },
    staleTime: 1000 * 60 * 60,// 1 hora mantendrá la data en memoria,
    initialPageParam: page,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.currentPage >= lastPage.meta.totalPages) {
        return undefined;
      }
      return lastPage.meta.currentPage + 1
    }
  })
};