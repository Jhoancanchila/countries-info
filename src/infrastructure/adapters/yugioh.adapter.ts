import { CardEntity } from "../../domain/models/CardEntity";
import { Yugioh } from "../../domain/models/YuGiOh";

export const createYugiOhAdapter = ( character: Yugioh): CardEntity => {
  return {
    id: character.id,
    title: character?.name ?? "No name",
    point: character?.card_sets ? character?.card_sets[0]?.set_code : "No point",
    subPoint: character?.card_prices[0]?.tcgplayer_price ?? "No price",
    image: character?.card_images[0]?.image_url ?? "No image",
    threeTitle: character?.race ?? "No race",
    subTitle: character?.desc ?? "No description",
    category: character?.type ?? "No type"
  };
}