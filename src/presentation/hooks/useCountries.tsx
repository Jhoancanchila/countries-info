import { useQuery } from "@tanstack/react-query";
import GetCountries from "../../domain/useCases/getCountries";
import CountryRepositoryImp from "../../infrastructure/repositories/CountryRepositoryImp";
import { useCountryStore } from "../../infrastructure/stores/CountryStore";


export const useCountries = () => {

  const countryRepository = new CountryRepositoryImp();
  const getCountries = new GetCountries(countryRepository);

  const { setCountries } = useCountryStore();
  
  return useQuery({ 
    queryKey: ["countries"], 
    queryFn: async() => {
    const response = await getCountries.execute();
    setCountries(response);
    return response;
  },
  staleTime: 1000 * 60 * 60,// 1 hora mantendrá la data en memoria
});
};