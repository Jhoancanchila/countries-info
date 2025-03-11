import { Country } from "../models/Country";
import CountryRepository from "../repositories/CountryRepository";

export class GetCountries {
  constructor(private countryRepository: CountryRepository) {}

  async execute(): Promise<Country[]> {
    return await this.countryRepository.getCountryList();
  }
}

export class GetCountriesFiltered {
  constructor(private countryRepository: CountryRepository) {}

  async execute(query: string): Promise<Country[]> {
    return await this.countryRepository.getCountryFiltered(query);
  }
}