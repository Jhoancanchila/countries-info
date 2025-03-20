import { Favorite } from "../../domain/models/Favorite";
import FavoriteRepository from "../../domain/repositories/FavoriteRepository";

export class FavoriteRepositoryImp implements FavoriteRepository {

  private readonly storageKey = "favorites";

  add(favorite: Favorite): void {
    const favorites = this.getAll();
    console.log("🚀 ~ FavoriteRepositoryImp ~ add ~ favorites:", favorites)
    const coincidence = favorites.some((item) => item.id === favorite.id);
    if (!coincidence) {
      favorites.push(favorite);
      this.save(favorites);
    }
  }
  remove(favorite: Favorite): void {
    const favorites = this.getAll();
    const newFavorites = favorites.filter((item) => item.id !== favorite.id);
    this.save(newFavorites);
  }
  
  getAll(): Favorite[] {
    const favorites = localStorage.getItem(this.storageKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  private save(favorites: Favorite[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
  
}