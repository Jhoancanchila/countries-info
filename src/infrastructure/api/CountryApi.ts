import { Country } from "../../domain/models/Country";

const BASE_URL = import.meta.env.VITE_API_URL_COUNTRIES;

export const fetchCountryList = async (): Promise<Country[]> => {
  const URL_BASE = `${BASE_URL}/independent`;
  const response = await fetch(`${URL_BASE}`);
  if(!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  const data = await response.json();
  return data;
}

export const fetchCountryFiltered = async (query: string):Promise<Country[]> => {
    const QUERY = `name/${query}`;
    const response = await fetch(`${BASE_URL}/${QUERY}`);
    if(!response.ok) {
        throw new Error("Failed to fetch in filter characters");
    }
    const data = await response.json();
    return data;
}
