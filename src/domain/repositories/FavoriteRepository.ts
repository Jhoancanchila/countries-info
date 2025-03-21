import { CardEntity } from "../models/CardEntity";

export default interface FavoriteRepository {
  add(favorite: CardEntity): void;
  remove(favorite: CardEntity): void;
  getAll(): CardEntity[];
}