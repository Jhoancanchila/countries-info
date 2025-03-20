import { createCountryAdapter } from "../../../infrastructure/adapters/country.adapter";
import { useCountryStore } from "../../../infrastructure/stores/CountryStore";
import ContainerCard from "../../components/ContainerCard/ContainerCard"
import { useCountries } from "../../hooks/useCountries";
import { useQuerySearch } from "../../hooks/useQuerySearch";

const Country: React.FC = () => {

  const query = useQuerySearch();

  const { allCountries, countriesFiltered } = useCountries({ query });

  const { error } = query ? countriesFiltered : allCountries;

  const { countryList, filteredCountries } = useCountryStore();

  const countries = query ? filteredCountries : countryList;

  const countriesAdapter = countries.map(createCountryAdapter);
 
  if (error) return <div>Error fetching Countries</div>;

  return <ContainerCard list={ countriesAdapter } />
}

export default Country