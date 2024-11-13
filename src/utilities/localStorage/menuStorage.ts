export const setItemSelectedMenu = (item: string) => {
  localStorage.setItem("itemMenu", item);
}

export const getItemSelectedMenu = () => {
  return localStorage.getItem("itemMenu");
}