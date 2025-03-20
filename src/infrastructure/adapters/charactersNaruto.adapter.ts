import { CardEntity } from "../../domain/models/CardEntity";
import { Character } from "../../domain/models/Naruto";

export const createCharacterNarutoAdapter = ( character: Character): CardEntity => {
  return {
    id: character.id,
    title: character.name,
    point: character.id,
    subPoint: character.id,
    image: character.images[0],
    threeTitle: character.name,
    subTitle: character.debut?.novel,
    category: "Naruto"
  };
}