import { Character } from "../../domain/models/Character";
import { Naruto } from "../../domain/models/Naruto";

const BASE_URL = "https://narutodb.xyz/api/character";

export const fetchNarutoList = async (page: number = 1): Promise<Naruto> => {
  const response = await fetch(`${BASE_URL}?page=${page}&limit=10`);
  if(!response.ok) {
    throw new Error("Failed to fetch characters of naruto");
  }
  const data = await response.json();
  return data;
};

export const fetchNarutoFiltered = async (query: string): Promise<Character[]> => {
  const response = await fetch(`${BASE_URL}?name=${query}`);
  if(!response.ok) {
    throw new Error("Failed to fetch in filter characters of naruto");
  }
  const data = await response.json();
  return data;
};
