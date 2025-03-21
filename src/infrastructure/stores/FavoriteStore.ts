import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CardEntity } from '../../domain/models/CardEntity';

interface FavoriteStore {
  favorites: CardEntity[];
  addFavorite: (favorite: CardEntity) => void;
  removeFavorite: (id: string | number) => void;
}

const useFavoriteStore = create<FavoriteStore>()(
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
      storage: createJSONStorage(()=>localStorage), // Tipo de almacenamiento

    }
  )
);

// Selector para obtener solo la lista de favoritos
export const useFavorites = () => useFavoriteStore((state) => state.favorites);

// Selector para obtener la función addFavorite
export const useAddFavorite = () => useFavoriteStore((state) => state.addFavorite);

// Selector para obtener la función removeFavorite
export const useRemoveFavorite = () => useFavoriteStore((state) => state.removeFavorite);