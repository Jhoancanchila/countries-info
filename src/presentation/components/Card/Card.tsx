import { FC } from "react"
import { CardEntity } from "../../../domain/models/CardEntity"
import { useModalStore } from "../../../infrastructure/stores/ModalStore";
import { getItemSelectedMenu } from "../../../utilities/localStorage/menuStorage";
import { ModalContent } from "../../../domain/models/ModalContent";

interface CardProps {
  character: CardEntity
}

const Card: FC<CardProps> = ({ character }) => {

  const { openModal } = useModalStore();

  const itemSelected = getItemSelectedMenu() as ModalContent;

  const { title, subTitle, threeTitle, point, subPoint, image } = character;

  return (
    <div 
      className="animate-fadeIn card card-compact bg-base-100 shadow-xl pt-4 cursor-pointer"
      onClick={() => itemSelected && openModal(itemSelected, character)}
    >
      <figure>
        <img
          className="rounded-t-lg w-full h-48 object-contain"
          src={ image }
          alt={ title } 
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{ title }</h2>
        <h2 className="text-left line-clamp-2">{ subTitle }</h2>
        <h4 className="text-left">{ threeTitle }</h4>
        <div className="badge badge-secondary">{ point }</div>
        <h4 className="text-left">{ subPoint }</h4>
      </div>
    </div>
  )
}

export default Card