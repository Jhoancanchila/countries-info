import { CardEntity } from "../models/CardEntity";
import FavoriteRepository from "../repositories/FavoriteRepository";

export class AddFavorite {
  constructor(private repository: FavoriteRepository) {}

  execute(favorite: CardEntity): void {
    this.repository.add(favorite);
  }
}

export class RemoveFavorite {
  constructor(private repository: FavoriteRepository) {}

  execute(favorite: CardEntity): void {
    this.repository.remove(favorite);
  }
}

export class GetFavorites {
  constructor(private repository: FavoriteRepository) {}

  execute(): CardEntity[] {
    return this.repository.getAll();
  }
}