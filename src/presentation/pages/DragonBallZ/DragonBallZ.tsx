import React, { useEffect, useState, useCallback } from "react";
import { createCharacterAdapter } from "../../../infrastructure/adapters/character.adapter";
import { useCharacterStore } from "../../../infrastructure/stores/CharacterStore";
import ContainerCard from "../../components/ContainerCard/ContainerCard"
import { useCharactersDragonBallZ } from "../../hooks/useCharactersDragonBallZ";
import { pageInitial } from "../../../domain/models/General";
import { useQuerySearch } from "../../hooks/useQuerySearch";


const DragonBallZ: React.FC = () => {

  const query = useQuerySearch();
  
  const page = pageInitial;
  const [ hasMore, setHasMore ] = useState(true);

  const { characters, filteredCharacters } = useCharacterStore();

  const { charactersDragonBallZ } = useCharactersDragonBallZ({ page, query });
  

  const getMoreCharacter = useCallback(() => {
    if (characters?.meta?.currentPage >= characters?.meta?.totalPages){
      setHasMore(false);
      return;
    } 
    charactersDragonBallZ.fetchNextPage();
  }, [characters, charactersDragonBallZ]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
      getMoreCharacter();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, [ getMoreCharacter, characters ]);

  const characterAdapter = query ? filteredCharacters.map(createCharacterAdapter) : characters.items.map(createCharacterAdapter) || [];
  
  if (charactersDragonBallZ.error) return <div>Error fetching characters of DBZ</div>;

  return (
    <>
      <ContainerCard list={characterAdapter} /> 
      {(charactersDragonBallZ.isLoading && hasMore ) && <span className="loading loading-ring loading-lg text-blue-700"></span>}
      {!hasMore && <h3 className="text-blue-700 font-bold">No hay más personajes para mostrar</h3>}
    </>
)
}

export default DragonBallZ