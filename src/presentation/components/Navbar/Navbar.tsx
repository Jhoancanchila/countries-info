import { useContext, useEffect, useState } from "react";
import MenuContext from "../../../infrastructure/context/menuContext/MenuContext";
import { Link, useSearchParams } from "react-router-dom";
import { getItemSelectedMenu } from "../../../utilities/localStorage/menuStorage";

import { ItemMenu } from "../../../domain/models/ItemsMenu";
import FavorityIconNabvar from "../Favorites/FavorityIconNabvar";
import { useFavorites } from "../../../infrastructure/stores/FavoriteStore";
import InputSearch from "../InputSearch/InputSearch";
import useWindowWidth from "../../hooks/useWindowsWidth";

import { useRandomImageProfile } from "../../hooks/useRandomImageProfile";


const Navbar: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  
  
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
  
  const windowsWidth = useWindowWidth();
  
  useEffect(() => {
    if (windowsWidth > 480) {
      setIsExpanded(false);
    }
  }, [windowsWidth]);
  
  const favoritesExist: boolean = favorites.length > 0;
  
  const { currentImage } = useRandomImageProfile({ itemSelected: itemSelected || ItemMenu.ANIMES});

  return (
    <div className="navbar bg-base-100 justify-end">
      {
      <div className={`${isExpanded ? 'hidden' : ''} flex-1`}>
        <h1 className={`text-xl font-bold tracking-wide text-[#B91C1C] mr-4`}>{itemSelected}</h1>
        {
          !!favoritesExist && (
            <Link to="/favorites">
              <FavorityIconNabvar favorites={favorites} handleToggle={handleToggle}/>
            </Link>
          )
        }
      </div>        
      }
      <div className="flex-none gap-2">
        <div className="form-control">
          {
            itemSelected === "Ánimes" ? (
              <ul className="hidden sm:visible min-w-80 sm:justify-around sm:flex" >
                <li className="hover:text-[#B91C1C]" onClick={()=> handleToggle(ItemMenu.DRAGONBALLZ)}><Link to="/dragon-ball-z">Dragón Ball Z</Link></li>
                <li className="hover:text-[#B91C1C]" onClick={() => handleToggle(ItemMenu.COUNTRIES)}><Link to="/country">Países</Link></li>
                <li className="hover:text-[#B91C1C]" onClick={() => handleToggle(ItemMenu.NARUTO)}><Link to="/naruto">Naruto</Link></li>
                <li className={`${favoritesExist ? '' : 'hidden'} hover:text-[#B91C1C]`} onClick={() => handleToggle(ItemMenu.FAVORITOS)}><Link to="/favorites">Favoritos</Link></li>
              </ul>
            )
            :
            (
              <InputSearch
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                handleChange={handleSearch}
                value={searchParams.get("query") || ""}
              />
            )
          }
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-[#B91C1C]">
            <div className="w-10 rounded-full">
              <img
                className="cover"
                alt="logo navbar"
                src={currentImage} />
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
            <li className={`${!favoritesExist ? 'hidden' : ''}`} onClick={() => handleToggle(ItemMenu.FAVORITOS)}><Link to="/favorites">Favoritos</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar