import {  lazy, Suspense, useMemo } from "react";
import CardLoader from "../CardLoader/CardLoader";
import { CardEntity } from "../../../domain/models/CardEntity";
import ModalDetails from "../ModalDetails/ModalDetails";
import FloatingButtonScroll from "../FloatingButton/FloatingButtonScroll";

const Card = lazy(() => import('../Card/Card'));

interface Props {
  list: CardEntity[];
}

const ContainerCard: React.FC<Props> = ({ list }) => {

  const memoizedList = useMemo(() => list, [list]);

  return (
    <div className={`grid gap-4 mt-6 ${
      memoizedList.length === 1
        ? "grid-cols-[minmax(300px,400px)] justify-center" // Ajusta el ancho al contenido
        : "grid-cols-[repeat(auto-fit,minmax(300px,1fr))]" // Configuración normal para múltiples elementos
    }`}>
      {
        memoizedList.map((character) => (
          <Suspense key={character.id} fallback={<CardLoader/>}>
            <Card character={character} />
          </Suspense>
        ))
      }
      <ModalDetails />
      <FloatingButtonScroll /> 
    </div>
  )
}

export default ContainerCard