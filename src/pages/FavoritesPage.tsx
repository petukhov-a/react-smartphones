import React from 'react';
import Sort from '../components/SortList';
import FavoritesCard from '../components/FavoritesCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../redux/cart/selectors';
import { selectFavorites } from '../redux/favorites/selectors';
import { clearFavorites } from '../redux/favorites/slice';

const FavoritesPage = () => {
  const { items } = useSelector(selectFavorites);

  const favorites = items.map(item => <FavoritesCard {...item} key={item.id}/>)
  const dispatch = useDispatch();

  return (
    <div className="favorites">
      <div className="container">
        <h1 className="favorites__heading">Избранное</h1>
        <div className="favorites-content">
          <div className="favorites-content-btns">
            <button className="btn-outline btn-icon">
              <svg
                fill="#000000"
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                data-name="Layer 1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg">
                <title />
                <path
                  fill="#fff"
                  d="M12.2,9h1.6V6.8H16V5.2H13.8V3H12.2V5.2H10V6.8h2.2ZM20,5v5.5L7.45,12.72,5,3H1.25a1,1,0,0,0,0,2H3.47L6.7,18H20V16H8.26l-.33-1.33L22,12.18V5ZM7,19a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,7,19Zm12,0a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,19,19Z"
                />
              </svg>
              <span>Купить все товары</span>
            </button>
            <button
              className="btn-outline-gray btn-icon"
              onClick={() => dispatch(clearFavorites())}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"
                width="64px"
                height="64px">
                <path d="M 49 1 C 47.34 1 46 2.34 46 4 C 46 5.66 47.34 7 49 7 L 79 7 C 80.66 7 82 5.66 82 4 C 82 2.34 80.66 1 79 1 L 49 1 z M 24 15 C 16.83 15 11 20.83 11 28 C 11 35.17 16.83 41 24 41 L 101 41 L 101 104 C 101 113.37 93.37 121 84 121 L 44 121 C 34.63 121 27 113.37 27 104 L 27 52 C 27 50.34 25.66 49 24 49 C 22.34 49 21 50.34 21 52 L 21 104 C 21 116.68 31.32 127 44 127 L 84 127 C 96.68 127 107 116.68 107 104 L 107 40.640625 C 112.72 39.280625 117 34.14 117 28 C 117 20.83 111.17 15 104 15 L 24 15 z M 24 21 L 104 21 C 107.86 21 111 24.14 111 28 C 111 31.86 107.86 35 104 35 L 24 35 C 20.14 35 17 31.86 17 28 C 17 24.14 20.14 21 24 21 z M 50 55 C 48.34 55 47 56.34 47 58 L 47 104 C 47 105.66 48.34 107 50 107 C 51.66 107 53 105.66 53 104 L 53 58 C 53 56.34 51.66 55 50 55 z M 78 55 C 76.34 55 75 56.34 75 58 L 75 104 C 75 105.66 76.34 107 78 107 C 79.66 107 81 105.66 81 104 L 81 58 C 81 56.34 79.66 55 78 55 z" />
              </svg>
              <span>Очистить список</span>
            </button>
          </div>
          <div className="favorites-content-main">
            {/* <Sort /> */}
            <div className="favorites-cards">
                {favorites}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
