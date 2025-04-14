export interface Country {
  id: string;
  name: string;
  capital: string;
  population: number;
  flag: string;
  region: string;
  flags?: {
    png: string;
  };
}
