import { CardEntity } from "../../domain/models/CardEntity";
import { CharacterItems } from "../../domain/models/Character";

export const createCharacterAdapter = ( character: CharacterItems): CardEntity => {
  return {
    id: character.id,
    title: character.name,
    point: character.ki,
    subPoint: character.maxKi,
    image: character.image,
    threeTitle: character.race,
    subTitle: character.description,
    category: "Dragon Ball Z"
  };
}