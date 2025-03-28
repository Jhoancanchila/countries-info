import { useEffect, useState, useCallback } from 'react';
import { useCharacterStore } from "../../infrastructure/stores/CharacterStore";
import { useNarutoStore } from "../../infrastructure/stores/NarutoStore";
import { useFavorites } from "../../infrastructure/stores/FavoriteStore";
import { useCountryStore } from "../../infrastructure/stores/CountryStore";
import { ItemMenu } from "../../domain/models/ItemsMenu";
import { ramdonNumber } from "../../utilities/ramdonNumber/randomNumber";

interface Props {
  itemSelected: string;
}

export const useRandomImageProfile = ({ itemSelected }: Props) => {
  const { countryList } = useCountryStore();
  const { characters } = useCharacterStore();
  const { charactersNaruto } = useNarutoStore();
  const favorites = useFavorites();
  const [currentImage, setCurrentImage] = useState<string>('https://www.gravatar.com/avatar/');

  // Función para obtener la imagen aleatoria (memoizada con useCallback)
  const getRandomImageProfile = useCallback((): string => {
    const defaultImage = 'https://www.gravatar.com/avatar/';
    switch (itemSelected) {
      case ItemMenu.COUNTRIES: {
        if (!countryList?.length) return defaultImage;
        const randomCountry = countryList[ramdonNumber(countryList.length - 1)];
        return randomCountry?.flags.png || defaultImage;
      }
      case ItemMenu.DRAGONBALLZ: {
        if (!characters?.items?.length) return defaultImage;
        const randomCharacter = characters.items[ramdonNumber(characters.items.length - 1)];
        return randomCharacter?.image || defaultImage;
      }
      case ItemMenu.NARUTO: {
        if (!charactersNaruto?.characters?.length) return defaultImage;
        const randomNaruto = charactersNaruto.characters[ramdonNumber(charactersNaruto.characters.length - 1)];
        return randomNaruto?.images?.[0] || defaultImage;
      }
      case ItemMenu.FAVORITOS: {
        if (!favorites?.length) return defaultImage;
        const randomFavorite = favorites[ramdonNumber(favorites.length - 1)];
        return randomFavorite?.image || defaultImage;
      }
      default:
        return defaultImage;
    }
  }, [itemSelected, countryList, characters, charactersNaruto, favorites]);

  // Efecto para actualizar la imagen cada 5 segundos
  useEffect(() => {
    setCurrentImage(getRandomImageProfile()); // Establece la imagen inicial

    const intervalId = setInterval(() => {
      setCurrentImage(getRandomImageProfile());
    }, 5000); // 5000 ms = 5 segundos

    return () => clearInterval(intervalId); // Limpieza al desmontar
  }, [getRandomImageProfile]);

  return {
    currentImage, // Retorna la imagen actual (no la función)
  };
};