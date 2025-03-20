import { Favorite } from "../models/Favorite";

export default interface FavoriteRepository {
  add(favorite: Favorite): void;
  remove(favorite: Favorite): void;
  getAll(): Favorite[];
}