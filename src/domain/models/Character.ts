export interface CharacterLinks {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface CharacterMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface CharacterItems{
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: string | null;
}

export interface Character {
  links: CharacterLinks;
  meta: CharacterMeta;
  items: CharacterItems[];
}

export const CharacterEmptyState: Character = {
  links: {
    first: "",
    previous: "",
    next: "",
    last: "",
  },
  meta: {
    currentPage: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalItems: 0,
    totalPages: 0,
  },
  items: [],
}


export interface CharacterView {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  image: string;
  race: string;
}