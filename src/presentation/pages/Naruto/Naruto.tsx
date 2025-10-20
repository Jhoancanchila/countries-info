import { FC } from 'react'
import ContainerCard from '../../components/ContainerCard/ContainerCard';
import { useQuerySearch } from "../../hooks/useQuerySearch";
import ErrorFetching from '../../components/Error/ErrorFetching';
import { useYugiOhStore } from '../../../infrastructure/stores/YugiohStore';
import { useYugioh } from '../../hooks/useYugioh';
import { createYugiOhAdapter } from '../../../infrastructure/adapters/yugioh.adapter';


const Naruto: FC = () => {

  const query = useQuerySearch();
  const { yugiohList, yugiohFiltered, isSearching, searchStrategy } = useYugioh({ query }); 

  // Usar la misma validación que el hook para el query original
  const isValidQuery = Boolean(query && query.trim().length >= 2);

  // Seleccionar los datos correctos basado en si hay query válido o no
  const currentQuery = isValidQuery ? yugiohFiltered : yugiohList;
  const { error, isLoading, isError } = currentQuery;

  const { yugiOh, filteredYugiOh } = useYugiOhStore();
  
  // Usar los datos del store que ya se actualizan en el hook
  // Validar que los datos existan antes de usar map
  const cardsYugiOh = isValidQuery ? filteredYugiOh : yugiOh;
  const yugiohAdapter = Array.isArray(cardsYugiOh) ? cardsYugiOh.map(createYugiOhAdapter) : [];
  
  // Debug info en development
  if (process.env.NODE_ENV === 'development' && isValidQuery) {
    console.log(`🔍 Search strategy for "${query}":`, searchStrategy);
    console.log(`📊 Results found:`, yugiohAdapter.length);
  }
  
  // Mostrar error si hay algún problema
  if (isError || error) {
    return <ErrorFetching message="Error fetching Yugioh" />;
  }

  return (
    <>
      <ContainerCard list={yugiohAdapter} /> 
      
      {/* Mostrar loading durante búsqueda normal o durante debounce */}
      {(isLoading || isSearching) && (
        <div className="flex justify-center items-center mt-4">
          <span className="loading loading-ring loading-lg text-blue-700"></span>
          <div className="ml-2 text-sm">
            {isSearching && <span className="text-gray-500">Searching...</span>}
            {isLoading && searchStrategy === 'server' && (
              <span className="text-blue-600">Searching server...</span>
            )}
            {isLoading && searchStrategy === 'local' && (
              <span className="text-green-600">Filtering locally...</span>
            )}
          </div>
        </div>
      )}
      
      {/* Mostrar mensaje cuando no hay resultados en búsqueda válida */}
      {isValidQuery && !isLoading && !isSearching && yugiohAdapter.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-8">
          <p className="text-gray-500 mb-2">No YugiOh cards found for "{query}"</p>
          {searchStrategy === 'local' && (
            <p className="text-sm text-blue-500">
              ✨ Searched in cached data (instant results)
            </p>
          )}
          {searchStrategy === 'server' && (
            <p className="text-sm text-orange-500">
              🌐 Searched on server (no local matches found)
            </p>
          )}
        </div>
      )}
      
      {/* Mostrar info de resultados exitosos */}
      {isValidQuery && !isLoading && !isSearching && yugiohAdapter.length > 0 && (
        <div className="flex justify-center mt-4">
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <span>Found {yugiohAdapter.length} results</span>
            {searchStrategy === 'local' && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                ⚡ Local search
              </span>
            )}
            {searchStrategy === 'server' && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                🌐 Server search
              </span>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Naruto