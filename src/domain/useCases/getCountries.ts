import { Country } from "../models/Country";
import CountryRepository from "../repositories/CountryRepository";

export default class GetCountries {
  constructor(private countryRepository: CountryRepository) {}

  async execute(): Promise<Country[]> {
    return await this.countryRepository.getCountryList();
  }
}