import {  lazy, Suspense } from "react";
import CardLoader from "../CardLoader/CardLoader";
import { CardEntity } from "../../../domain/models/CardEntity";
import ModalDetails from "../ModalDetails/ModalDetails";
import FloatingButtonScroll from "../FloatingButton/FloatingButtonScroll";
import { useSearchParams } from "react-router-dom";

const Card = lazy(() => import('../Card/Card'));

interface Props {
  list: CardEntity[];
}

const ContainerCard: React.FC<Props> = ({ list }) => {

  const [ searchParams ] = useSearchParams();  
  const query = searchParams.get("query") || "";
  const charactersFiltered = list?.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className={`grid gap-4 mt-6 ${
      charactersFiltered.length === 1
        ? "grid-cols-[minmax(300px,400px)] justify-center" // Ajusta el ancho al contenido
        : "grid-cols-[repeat(auto-fit,minmax(300px,1fr))]" // Configuración normal para múltiples elementos
    }`}>
      {
        charactersFiltered.map((character) => (
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