import { useFavorites } from "../../../infrastructure/stores/FavoriteStore";
import ContainerCard from "../../components/ContainerCard/ContainerCard";
import { useQuerySearch } from "../../hooks/useQuerySearch";

const Favorites = () => {
  const query = useQuerySearch();
  const favorites = useFavorites();
  const filteredFavorites = favorites.filter((favorite) => favorite.title.toLowerCase().includes(query.toLowerCase().trim()));
  if(favorites.length === 0) return <div>No favorites yet</div>
  return (
    <ContainerCard list={ filteredFavorites } />
  )
}

export default Favorites