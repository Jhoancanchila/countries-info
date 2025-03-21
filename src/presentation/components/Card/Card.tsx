import { FC, memo } from "react"
import { CardEntity } from "../../../domain/models/CardEntity"
import { useModalStore } from "../../../infrastructure/stores/ModalStore";
import { getItemSelectedMenu } from "../../../utilities/localStorage/menuStorage";
import { ModalContent } from "../../../domain/models/ModalContent";
import { useLazyImages } from "../../hooks/useLazyImages";
import FavoritiesAction from "../Favorites/FavoritiesAction";

interface CardProps {
  character: CardEntity
}

const Card: FC<CardProps> = memo(({ character }) => {
  
  const { title, subTitle, threeTitle, point, subPoint, image } = character;
  
  const { isVisible, cardRef } = useLazyImages();

  const { openModal } = useModalStore();

  const itemSelected = getItemSelectedMenu() as ModalContent;

  const handleCardClick = () => {
    if (itemSelected) {
      openModal(itemSelected, character);
    }
  };

  return (
    <div 
      ref={ cardRef }
      className="animate-fadeIn card card-compact bg-base-100 shadow-xl pt-4 cursor-pointer"
      onClick={handleCardClick}
    >
      {
        !isVisible ? (
          <div className="skeleton w-full h-48 rounded-t-lg animate-pulse"></div>
        )
        :

        <figure>
          <img
            className="rounded-t-lg w-full h-48 object-contain"
            src={ image }
            alt={ title } 
            loading="lazy"
          />
        </figure>
      }
      <div className="card-body">
        <div className="flex">
          <h2 className="card-title mr-2">{ title }</h2> 
          <FavoritiesAction {...character} />
        </div>
        <h2 className="text-left line-clamp-2">{ subTitle }</h2>
        <h4 className="text-left">{ threeTitle }</h4>
        <div className="badge badge-secondary">{ point }</div>
        <h4 className="text-left">{ subPoint }</h4>
      </div>
    </div>
  )
})

export default Card