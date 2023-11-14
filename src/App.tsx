import { Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import SmartphonePage from "./pages/SmartphonePage";
import MainLayout from './layouts/MainLayout';
import NotFoundBlock from './components/NotFoundBlock';
import { Suspense } from 'react';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<MainPage />}/>
        <Route path="cart" element={
          <Suspense fallback={<div>Идет загрузка корзины...</div>}>
            <CartPage />
          </Suspense>
        } />
        <Route path="favorites" element={
          <Suspense fallback={<div>Идет загрузка избранного...</div>}>
            <FavoritesPage />
          </Suspense>
        } />
        <Route path="smartphone/:id" element={
          <Suspense fallback={<div>Идет загрузка страницы смартфона...</div>}>
            <SmartphonePage />
          </Suspense>
        }/>
        <Route path='*' element={
          <Suspense fallback={<div>Идет загрузка...</div>}>
            <NotFoundBlock />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App;