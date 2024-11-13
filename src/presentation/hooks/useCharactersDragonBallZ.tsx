import { useQuery } from "@tanstack/react-query";
import { characterRepositoryImp } from "../../infrastructure/repositories/CharacterRepositoryImp";
import { getCharacter } from "../../domain/useCases/getCharacter";
import { useCharacterStore } from "../../infrastructure/stores/CharacterStore";

interface Props {
  page: number;
}

export const useCharactersDragonBallZ = ( { page }: Props ) => {

  const characterRepository = characterRepositoryImp();
  const { setCharacters, characters } = useCharacterStore();

  return useQuery({
    queryKey: ["characters"],
    queryFn: async () => {
      const charactersList = await getCharacter(characterRepository,page);
      const newCharacters = {
        items: page === 1 ? charactersList.items : [...characters.items, ...charactersList.items],
        links: charactersList.links,
        meta: charactersList.meta
    }
      setCharacters(newCharacters);
      return newCharacters;
    },
    staleTime: 1000 * 60 * 60,// 1 hora mantendrá la data en memoria
  })
};