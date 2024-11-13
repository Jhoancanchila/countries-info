import { Country } from "../../domain/models/Country";

export const fetchCountryList = async (): Promise<Country[]> => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  if(!response.ok) {
    throw new Error("Failed to fetch");
  }
  const data = await response.json();
  return data;
}