import { CardEntity } from "../../domain/models/CardEntity";
import FavoriteRepository from "../../domain/repositories/FavoriteRepository";

export class FavoriteRepositoryImp implements FavoriteRepository {

  private readonly storageKey = "favorites";

  add(favorite: CardEntity): void {
    const favorites = this.getAll();
    const coincidence = favorites.some((item) => item.id === favorite.id);
    if (!coincidence) {
      favorites.push(favorite);
      this.save(favorites);
    }
  }
  remove(favorite: CardEntity): void {
    const favorites = this.getAll();
    const newFavorites = favorites.filter((item) => item.id !== favorite.id);
    this.save(newFavorites);
  }
  
  getAll(): CardEntity[] {
    const favorites = localStorage.getItem(this.storageKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  private save(favorites: CardEntity[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
  
}