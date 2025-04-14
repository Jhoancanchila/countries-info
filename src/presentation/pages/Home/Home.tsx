import { useContext, useEffect } from "react"
import MenuContext from "../../../infrastructure/context/menuContext/MenuContext";
import { ItemMenu } from "../../../domain/models/ItemsMenu";

const Home: React.FC = () => {
  const itemContext = useContext(MenuContext);
    
  // Verificar que el contexto no sea undefined
  if (!itemContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }
  
  const { toggleItem } = itemContext;
  useEffect(() => {
    toggleItem(ItemMenu.ANIMES);
  }, [ toggleItem ]);
  
  return (
    <section className="bg-white dark:bg-dark-color-secondary transition-colors duration-500" >
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl dark:text-white transition-colors duration-500">
            Understand User Flow.
            <strong className="font-extrabold text-red-700 sm:block"> Increase Conversion. </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed dark:text-white transition-colors duration-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
            numquam ea!
          </p>
        </div>
      </div>
    </section>
  )
}

export default Home