import { useFavorites } from "../../../infrastructure/stores/FavoriteStore";
import ContainerCard from "../../components/ContainerCard/ContainerCard"

const Favorites = () => {
  const favorites = useFavorites();
  if(favorites.length === 0) return <div>No favorites yet</div>
  return (
    <ContainerCard list={ favorites } />
  )
}

export default Favorites