import { Country } from "../../domain/models/Country";
import CountryRepository from "../../domain/repositories/CountryRepository";
import { fetchCountryList } from "../api/CountryApi";

export default class CountryRepositoryImp implements CountryRepository {
  async getCountryList(): Promise<Country[]> {
    const countries = await fetchCountryList();
    return countries;
  }

}