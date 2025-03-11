export interface Naruto {
  characters:      Character[];
  currentPage:     number;
  pageSize:        number;
  totalCharacters: number;
}

export const NarutoEmpty: Naruto = {
  characters: [],
  currentPage: 0,
  pageSize: 0,
  totalCharacters: 0
}

export interface Character {
  id:            number;
  name:          string;
  images:        string[];
  debut?:        Debut;
  jutsu?:        string[];
  personal:      Personal;
  uniqueTraits?: string[];
  family?:       Family;
  natureType?:   string[];
  rank?:         Rank;
  voiceActors?:  VoiceActors;
  tools?:        string[];
}

export interface Debut {
  novel?:    string;
  movie?:    string;
  appearsIn: string;
  manga?:    string;
  anime?:    string;
  game?:     string;
  ova?:      string;
}

export interface Family {
  "incarnation with the god tree"?: string;
  "depowered form"?:                string;
  son?:                             string;
  nephew?:                          string;
  "adoptive son"?:                  string;
  father?:                          string;
  "adoptive brother"?:              string;
  cousin?:                          string;
  "adoptive father"?:               string;
  brother?:                         string;
  husband?:                         string;
}

export interface Personal {
  species?:        string;
  status?:         Status;
  kekkeiGenkai?:   string;
  classification?: string;
  jinchūriki?:     string[];
  titles?:         string[];
  affiliation?:    string[] | string;
  birthdate?:      string;
  sex?:            Sex;
  height?:         Height;
  weight?:         Weight;
  bloodType?:      string;
  occupation?:     string[] | string;
  team?:           string[] | string;
  partner?:        string;
  age?:            Age;
  clan?:           string;
}

export interface Age {
  "Part II"?:          string;
  "Part I"?:           string;
  "Academy Graduate"?: string;
  "Chunin Promotion"?: string;
  "Boruto Manga"?:     string;
}

export interface Height {
  "Part II"?:      string;
  "Part I"?:       string;
  "Blank Period"?: string;
  Gaiden?:         string;
}

export enum Sex {
  Female = "Female",
  Male = "Male",
}

export enum Status {
  Deceased = "Deceased",
  Incapacitated = "Incapacitated",
}

export interface Weight {
  "Part II"?: string;
  "Part I"?:  string;
}

export interface Rank {
  ninjaRank:          NinjaRank;
  ninjaRegistration?: string;
}

export interface NinjaRank {
  "Part II"?:      string;
  "Part I"?:       string;
  "Boruto Manga"?: string;
}

export interface VoiceActors {
  japanese?: string[] | string;
  english?:  string[] | string;
}
