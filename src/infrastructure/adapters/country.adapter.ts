import { CardEntity } from "../../domain/models/CardEntity";

export const createCountryAdapter = (country: any):CardEntity => ({
  id: country.name.common,
  title: country.name.common,
  subTitle: country.name.official,
  threeTitle: country.region,
  point: country.population,
  subPoint: country.area,
  image: country.flags.png,
  category:"Países"
})
