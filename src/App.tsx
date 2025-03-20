import './App.css'
import Navbar from './presentation/components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './presentation/pages/Home/Home';
import DragonBallZ from './presentation/pages/DragonBallZ/DragonBallZ';
import Country from './presentation/pages/Country/Country';
import NotFound from './presentation/pages/NotFound/NotFound';
import { MenuProvider } from './infrastructure/context/menuContext/MenuProvider';
import Naruto from './presentation/pages/Naruto/Naruto';
import Favorites from './presentation/pages/Favorites/Favorites';

function App() {

  return (
    <>
      <MenuProvider>
        <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dragon-ball-z" element={<DragonBallZ />} />
            <Route path="/country" element={<Country />} />
            <Route path="/naruto" element={<Naruto />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </MenuProvider>
    </>
  )
}

export default App
