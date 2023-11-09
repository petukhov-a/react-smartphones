import { Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import SmartphonePage from "./pages/SmartphonePage";
import MainLayout from './layouts/MainLayout';
import NotFoundBlock from './components/NotFoundBlock';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<MainPage />}/>
        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="smartphone/:id" element={<SmartphonePage />}/>
        <Route path='*' element={<NotFoundBlock />} />
      </Route>
    </Routes>
  );
}

export default App;