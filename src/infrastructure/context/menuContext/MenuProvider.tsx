import React, { useState } from 'react';
import MenuContext from './MenuContext';
import { setItemSelectedMenu } from '../../../utilities/localStorage/menuStorage';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const MenuProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [item, setItem] = useState<string>("");

  const toggleItem = (itemSelected: string) => {
    setItem(itemSelected);
    setItemSelectedMenu(itemSelected);
  };

  return (
    <MenuContext.Provider value={{ item, toggleItem }}>
      {children}
    </MenuContext.Provider>
  );
};