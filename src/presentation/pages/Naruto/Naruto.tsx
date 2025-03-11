import { FC, useCallback, useEffect, useState } from 'react'
import { pageInitial } from '../../../domain/models/General';
import { useNarutoStore } from '../../../infrastructure/stores/NarutoStore';
import { useCharactersDragonBallZ } from '../../hooks/useCharactersDragonBallZ';
import ContainerCard from '../../components/ContainerCard/ContainerCard';
import { createCharacterNarutoAdapter } from '../../../infrastructure/adapters/charactersNaruto.adapter';

const Naruto: FC = () => {

  const [ hasMore, setHasMore ] = useState(true);

  const page = pageInitial;
  const { charactersNaruto } = useNarutoStore();
  const { charactersNarut } = useCharactersDragonBallZ({ page });

  const getMoreCharacter = useCallback(() => {
    const totalPages = Math.ceil(charactersNaruto?.totalCharacters / charactersNaruto?.pageSize);
      if (charactersNaruto?.currentPage >= totalPages){
        setHasMore(false);
        return;
      } 
      charactersNarut.fetchNextPage();
    }, [charactersNaruto, charactersNarut]);

  useEffect(() => {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight) {
        getMoreCharacter();
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  
    }, [ getMoreCharacter, charactersNaruto ]);

    const characterAdapter = charactersNaruto.characters?.map(createCharacterNarutoAdapter) || [];
      
    if (charactersNarut.error) return <div>Error fetching animes</div>;

  return (
    <>
      <ContainerCard list={characterAdapter} /> 
      {(charactersNarut.isLoading && hasMore ) && <span className="loading loading-ring loading-lg text-blue-700"></span>}
      {!hasMore && <h3 className="text-blue-700 font-bold">No hay más personajes para mostrar</h3>}
    </>
  )
}

export default Naruto