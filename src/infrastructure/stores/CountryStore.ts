import { create } from 'zustand';
import { Country } from '../../domain/models/Country';

interface CountryState {
  countryList: Country[];
  setCountries: (countries: Country[]) => void;
  filteredCountries: Country[];
  setFilteredCountries: (countries: Country[]) => void;
}

export const useCountryStore = create<CountryState>((set) => ({
  countryList: [],
  setCountries: (countryList) => set({ countryList }),
  filteredCountries: [],
  setFilteredCountries: (filteredCountries) => set({ filteredCountries }),
}));

