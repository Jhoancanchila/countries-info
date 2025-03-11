import { Country } from "../../domain/models/Country";
import CountryRepository from "../../domain/repositories/CountryRepository";
import { fetchCountryList, fetchCountryFiltered } from "../api/CountryApi";

export default class CountryRepositoryImp implements CountryRepository {
  async getCountryList(): Promise<Country[]> {
    const countries = await fetchCountryList();
    return countries;
  }

  async getCountryFiltered(query: string): Promise<Country[]> {
    const countries = await fetchCountryFiltered(query);
    return countries;
  }
}