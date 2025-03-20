import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Favorite } from '../../domain/models/Favorite';

interface FavoriteStore {
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (id: string) => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (favorite) =>
        set((state) => {
          if (!state.favorites.some((f) => f.id === favorite.id)) {
            return { favorites: [...state.favorites, favorite] };
          }
          return state;
        }),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        })),
    }),
    {
      name: 'favorites-storage', // Nombre de la clave en localStorage
      getStorage: () => localStorage, // Usar localStorage como almacenamiento
    }
  )
);