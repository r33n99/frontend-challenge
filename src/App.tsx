import React from 'react';
import { getCatsData } from './features/cats/catsSlice';
import { useAppDispatch } from './app/hooks';
import {
  Routes,
  Route,
} from "react-router-dom";
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { Header } from './components/Header';
function App() {

  const dispatch = useAppDispatch()
  React.useEffect(()=> {
   dispatch(getCatsData())
  }, [dispatch])


  return (
    <div className="wrapper">
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
