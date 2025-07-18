import { useEffect, useState, useMemo } from "react";
import { getYugiOhFiltered, getYugiOhList } from "../../domain/useCases/YugiohUseCase";
import { YugiOhRepositoryImpl } from "../../infrastructure/repositories/YugiohRepositoryImpl";
import { useYugiOhStore } from "../../infrastructure/stores/YugiohStore";
import { useQuery } from "@tanstack/react-query";

interface Props {
  query: string;
}

// Hook personalizado para debounce
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useYugioh = ({ query }: Props) => {

  // Debounce del query para evitar llamadas excesivas
  const debouncedQuery = useDebounce(query, 500); // 500ms de delay

  const yugiohRepository = YugiOhRepositoryImpl();
  const getListYugiOh = getYugiOhList(yugiohRepository);
  const getFilteredYugiOh = getYugiOhFiltered(yugiohRepository, debouncedQuery);

  const { yugiOh, setYugiOh, setFilteredYugiOh } = useYugiOhStore();

  const fetchYogiOhFiltered = async () => {
    const response = await getFilteredYugiOh;
    setFilteredYugiOh(response);
    return response;
  }

  const fetchYogiOhList = async () => {
    const response = await getListYugiOh;
    setYugiOh(response);
    return response;
  } 

  // Validar que el query tenga al menos 2 caracteres
  const isValidQuery = Boolean(debouncedQuery && debouncedQuery.trim().length >= 2);

  // Filtrado local en los datos ya cargados
  const localFilteredResults = useMemo(() => {
    if (!isValidQuery || !Array.isArray(yugiOh) || yugiOh.length === 0) {
      return [];
    }
    
    const searchTerm = debouncedQuery.toLowerCase().trim();
    return yugiOh.filter(card => 
      card.name.toLowerCase().includes(searchTerm) ||
      card.desc.toLowerCase().includes(searchTerm) ||
      card.type.toLowerCase().includes(searchTerm) ||
      card.race.toLowerCase().includes(searchTerm)
    );
  }, [yugiOh, debouncedQuery, isValidQuery]);

  // Determinar si necesitamos hacer petición al servidor
  const shouldFetchFromServer = isValidQuery && 
    Array.isArray(yugiOh) && 
    yugiOh.length > 0 && 
    localFilteredResults.length === 0;

  // Query para la lista completa (solo cuando no hay query válido)
  const yugiohList = useQuery({
    queryKey: ["yugiohList"],
    queryFn: fetchYogiOhList,
    staleTime: 1000 * 60 * 60, // 1 hora mantendrá la data en memoria
    enabled: !isValidQuery, // Solo se ejecuta cuando NO hay query válido de búsqueda
  });

  // Query para filtrado servidor (solo cuando no hay resultados locales)
  const yugiohFiltered = useQuery({
    queryKey: ["yugiohFiltered", debouncedQuery],
    queryFn: fetchYogiOhFiltered,
    enabled: shouldFetchFromServer, // Solo cuando no hay resultados locales
    staleTime: 1000 * 30, // 30 segundos para resultados de búsqueda
  });

  // Actualizar el store con resultados locales cuando corresponda
  useEffect(() => {
    if (isValidQuery && localFilteredResults.length > 0) {
      setFilteredYugiOh(localFilteredResults);
    } else if (!isValidQuery) {
      setFilteredYugiOh([]);
    }
  }, [isValidQuery, localFilteredResults, setFilteredYugiOh]);

  // Determinar el estado de loading
  const isLoadingLocal = isValidQuery && yugiohList.isLoading;
  const isLoadingServer = shouldFetchFromServer && yugiohFiltered.isLoading;
  const isLoading = isLoadingLocal || isLoadingServer;

  // Determinar errores
  const hasError = yugiohList.isError || yugiohFiltered.isError;
  const error = yugiohList.error || yugiohFiltered.error;

  return { 
    yugiohList: {
      ...yugiohList,
      isLoading,
      isError: hasError,
      error
    }, 
    yugiohFiltered: {
      ...yugiohFiltered,
      isLoading,
      isError: hasError,
      error
    },
    isSearching: query !== debouncedQuery && query.length >= 2,
    searchStrategy: isValidQuery ? 
      (localFilteredResults.length > 0 ? 'local' : 
       shouldFetchFromServer ? 'server' : 'no-results') : 'none'
  };
}