import { Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import SmartphonePage from "./pages/SmartphonePage";
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<MainPage />}/>
        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="smartphone/:id" element={<SmartphonePage />}/>
        </Route>
    </Routes>
  );
}

export default App;