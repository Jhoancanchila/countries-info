import { Country } from "../models/Country";

export default interface CountryRepository {
    getCountryList(): Promise<Country[]>
    getCountryFiltered(query: string): Promise<Country[]>
}
