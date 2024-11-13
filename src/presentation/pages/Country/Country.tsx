import { createCountryAdapter } from "../../../infrastructure/adapters/country.adapter";
import { useCountryStore } from "../../../infrastructure/stores/CountryStore";
import ContainerCard from "../../components/ContainerCard/ContainerCard"
import { useCountries } from "../../hooks/useCountries";

const Country: React.FC = () => {

  const { /* isLoading, */ error } = useCountries();

  const { countryList } = useCountryStore();

  const countriesAdapter = countryList.map(createCountryAdapter);
 
  if (error) return <div>Error fetching animes</div>;

  return <ContainerCard list={ countriesAdapter } />
}

export default Country