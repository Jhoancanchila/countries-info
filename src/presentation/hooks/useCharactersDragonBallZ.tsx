import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { characterRepositoryImp } from "../../infrastructure/repositories/CharacterRepositoryImp";
import { getCharacter, getCharacterFiltered } from "../../domain/useCases/getCharacter";
import { useCharacterStore } from "../../infrastructure/stores/CharacterStore";
import { getCharactersNaruto } from "../../domain/useCases/getNarutoCharacters";
import { NarutoRepositoryImpl } from "../../infrastructure/repositories/NarutoRepositoryImpl";
import { useNarutoStore } from "../../infrastructure/stores/NarutoStore";
import { useEffect } from "react";
import { CharacterItems } from "../../domain/models/Character";

interface Props {
  page: number;
  query: string;
}

export const useCharactersDragonBallZ = ( { page, query }: Props ) => {

  const characterRepository = characterRepositoryImp();
  const characterRepositoryNaruto = NarutoRepositoryImpl();
  const { setCharacters, characters, setFilteredCharacters } = useCharacterStore();
  const { setNaruto, charactersNaruto } = useNarutoStore();

  const fetchNarutoCharacters = async ({
    pageParam = 1,
  }: {
    pageParam?: number;
  }) => {
    const charactersList = await getCharactersNaruto(characterRepositoryNaruto, pageParam);
    const newCharactersNaruto = {
      characters: [...charactersNaruto.characters, ...charactersList.characters],
      currentPage: charactersList.currentPage,
      pageSize: charactersList.pageSize,
      totalCharacters: charactersList.totalCharacters,
    }
    setNaruto(newCharactersNaruto);
    return newCharactersNaruto;
  };

  
  const fetchCharactersFiltered = async () => {
    let charactersFiltered: CharacterItems[] = [];
    const characterExist = characters.items.find((character) => character.name.toLowerCase().includes(query.toLowerCase().trim()));
    if(characterExist){
      charactersFiltered = characters.items.filter((character) => character.name.toLowerCase().includes(query.toLowerCase().trim()));
      setFilteredCharacters(charactersFiltered);
    }else{
      charactersFiltered = await getCharacterFiltered(characterRepository, query);
      setFilteredCharacters(charactersFiltered);
    }
    return charactersFiltered;  
  }
  useEffect(() => {
    if (!query) {
      setFilteredCharacters([]);
      return;
    }

    fetchCharactersFiltered();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const fetchDragonBallZCharacters = async ({
    pageParam = 1,
  }: {
    pageParam?: number;
  }) => {
    const charactersList = await getCharacter(characterRepository, pageParam);
    const newCharacters = {
      items: [...characters.items, ...charactersList.items],
      links: charactersList.links,
      meta: charactersList.meta
    }
    setCharacters(newCharacters);
    return newCharacters;
  };

  const charactersNarut = useInfiniteQuery({
    queryKey: ["charactersNaruto", "infiniteScroll"],
    queryFn: fetchNarutoCharacters,
    staleTime: 1000 * 60 * 60,// 1 hora mantendrá la data en memoria,
    initialPageParam: page,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage * lastPage.pageSize >= lastPage.totalCharacters) {
        return undefined;
      }
      return lastPage.currentPage + 1;
    }
  });

  const charactersDBZFiltered = useQuery({
    queryKey: ["characters", "filtered"],
    queryFn: fetchCharactersFiltered,
    enabled: !!query,
  });

  const charactersDragonBallZ = useInfiniteQuery({
    queryKey: ["characters", "infiniteScroll"],
    queryFn: fetchDragonBallZCharacters,
    staleTime: 1000 * 60 * 60,// 1 hora mantendrá la data en memoria,
    initialPageParam: page,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.currentPage >= lastPage.meta.totalPages) {
        return undefined;
      }
      return lastPage.meta.currentPage + 1
    }
  })

  return {
    charactersDBZFiltered,
    charactersDragonBallZ,
    charactersNarut
  };
};