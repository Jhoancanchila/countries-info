import React, { useEffect, useState, useCallback } from "react";
import { createCharacterAdapter } from "../../../infrastructure/adapters/character.adapter";
import { useCharacterStore } from "../../../infrastructure/stores/CharacterStore";
import ContainerCard from "../../components/ContainerCard/ContainerCard"
import { useCharactersDragonBallZ } from "../../hooks/useCharactersDragonBallZ";

const DragonBallZ: React.FC = () => {

  const [ hasMore, setHasMore ] = useState(true);

  const { characters } = useCharacterStore();

  const { isLoading, error, refetch } = useCharactersDragonBallZ({ page:characters.meta.currentPage + 1 });
  

  const getMoreCharacter = useCallback(() => {
    if (characters?.meta?.currentPage >= characters?.meta?.totalPages){
      setHasMore(false);
      return;
    } 
    refetch();
  }, [characters, refetch]);

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

  const characterAdapter = characters.items.map(createCharacterAdapter) || [];
  
  if (error) return <div>Error fetching animes</div>;

  return (
    <>
      <ContainerCard list={characterAdapter} /> 
      {(isLoading && hasMore ) && <span className="loading loading-ring loading-lg text-blue-700"></span>}
      {!hasMore && <h3 className="text-blue-700 font-bold">No hay más personajes para mostrar</h3>}
    </>
)
}

export default DragonBallZ