import { Favorite } from "../models/Favorite";
import FavoriteRepository from "../repositories/FavoriteRepository";

export class AddFavorite {
  constructor(private repository: FavoriteRepository) {}

  execute(favorite: Favorite): void {
    this.repository.add(favorite);
  }
}

export class RemoveFavorite {
  constructor(private repository: FavoriteRepository) {}

  execute(favorite: Favorite): void {
    this.repository.remove(favorite);
  }
}

export class GetFavorites {
  constructor(private repository: FavoriteRepository) {}

  execute(): Favorite[] {
    return this.repository.getAll();
  }
}