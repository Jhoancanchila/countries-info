import { useQuery } from "@tanstack/react-query";
import { GetCountries, GetCountriesFiltered } from "../../domain/useCases/getCountries";
import CountryRepositoryImp from "../../infrastructure/repositories/CountryRepositoryImp";
import { useCountryStore } from "../../infrastructure/stores/CountryStore";
import { useEffect } from "react";

interface Props {
  query: string;
}

export const useCountries = ({ query }: Props) => {

  const countryRepository = new CountryRepositoryImp();
  const getCountries = new GetCountries(countryRepository);
  const getCountriesFiltered = new GetCountriesFiltered(countryRepository);

  const { setCountries, setFilteredCountries } = useCountryStore();

  useEffect(() => {
    if (!query) {
      setFilteredCountries([]);
      return;
    }
    fetchCountriesFiltered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const fetchCountriesFiltered = async () => {
    const response = await getCountriesFiltered.execute(query);
    setFilteredCountries(response);
    setCountries(response);
    return response;
  };

  const allCountries = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await getCountries.execute();
      setCountries(response);
      return response;
    },
    staleTime: 1000 * 60 * 60,// 1 hora mantendrá la data en memoria
  });

  const countriesFiltered = useQuery({
    queryKey: ["countries", "filtered"],
    queryFn: fetchCountriesFiltered,
    enabled: false,
  });
  
  return {
    allCountries,
    countriesFiltered
  };

};

