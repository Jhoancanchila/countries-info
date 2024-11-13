import { createContext } from "react";

// Define la interfaz del contexto
interface MenuContextType {
  item: string;
  toggleItem: (itemSelected: string) => void;
}

// Crear el contexto con un valor inicial opcional (null)
const MenuContext = createContext<MenuContextType | undefined>(undefined);

export default MenuContext;