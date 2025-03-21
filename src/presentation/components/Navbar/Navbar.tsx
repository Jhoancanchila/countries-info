import { useContext } from "react";
import MenuContext from "../../../infrastructure/context/menuContext/MenuContext";
import { Link, useSearchParams } from "react-router-dom";
import { getItemSelectedMenu } from "../../../utilities/localStorage/menuStorage";

import imgNavbar from "../../../assets/anime.webp";
import { ItemMenu } from "../../../domain/models/ItemsMenu";
import FavorityIconNabvar from "../Favorites/FavorityIconNabvar";
import { useFavorites } from "../../../infrastructure/stores/FavoriteStore";


const Navbar: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const itemContext = useContext(MenuContext);

  const favorites = useFavorites();

  // Verificar que el contexto no sea undefined
  if (!itemContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { toggleItem } = itemContext;
  const itemSelected = getItemSelectedMenu();

  const handleToggle = (item: ItemMenu) => {
    toggleItem(item);
  };

  const handleSearch = (query: string) => {
    setSearchParams({ query });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <h1 className="text-xl font-bold tracking-wide text-[#B91C1C] mr-4">{itemSelected}</h1>
        {
          favorites.length > 0 && (
            <Link to="/favorites">
              <FavorityIconNabvar favorites={favorites} handleToggle={handleToggle}/>
            </Link>
          )
        }
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          {
            itemSelected === "Ánimes" ? (
              <ul className="hidden sm:visible min-w-48 sm:justify-around sm:flex" >
                <li className="hover:text-[#B91C1C]" onClick={()=> handleToggle(ItemMenu.DRAGONBALLZ)}><Link to="/dragon-ball-z">Dragón Ball Z</Link></li>
                <li className="hover:text-[#B91C1C]" onClick={() => handleToggle(ItemMenu.COUNTRIES)}><Link to="/country">Países</Link></li>
                <li className="hover:text-[#B91C1C]" onClick={() => handleToggle(ItemMenu.NARUTO)}><Link to="/naruto">Naruto</Link></li>
              </ul>
            )
            :
            (
              <input 
                type="text" 
                placeholder="Search" 
                className="input input-bordered w-24 md:w-auto" 
                onChange={(e) => handleSearch(e.target.value)}
                value={searchParams.get("query") || ""}
              />
            )
          }
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-[#B91C1C]">
            <div className="w-10 rounded-full">
              <img
                alt="logo navbar"
                src={imgNavbar} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li onClick={()=> handleToggle(ItemMenu.ANIMES)}>
              <Link to="/" className="justify-between">
                Home
              </Link>
            </li>
            <li onClick={()=> handleToggle(ItemMenu.DRAGONBALLZ)}><Link to="/dragon-ball-z">Dragón Ball Z</Link></li>
            <li onClick={() => handleToggle(ItemMenu.COUNTRIES)}><Link to="/country">Países</Link></li>
            <li onClick={() => handleToggle(ItemMenu.NARUTO)}><Link to="/naruto">Naruto</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar