import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFavoritesItem, removeFavoritesItem } from '../redux/favorites/slice';
import { selectFavorites } from '../redux/favorites/selectors';
import clsx from 'clsx';

type FavoritesIconProps = {
    item: CartItem
}

const FavoritesIcon: FC<FavoritesIconProps> = ( {item} ) => {
  const {id, img, price, name, rating} = item;

  const { items: favoritesItems } = useSelector(selectFavorites);
  const currentFavoritesItem = favoritesItems.find((item) => item.id === id);

  const dispatch = useDispatch();

  const onClickAddFavorites = () => {
    dispatch(addFavoritesItem({ id, img, price, name, rating, count: 1 }));
    if (currentFavoritesItem?.id === id) {
      dispatch(removeFavoritesItem(id));
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      onClick={onClickAddFavorites}
      className={clsx('favorites-icon', currentFavoritesItem && 'active')}>
      <g id="Bookmark">
        <path d="M17.6,21.945a1.483,1.483,0,0,1-1.01-.4l-4.251-3.9a.5.5,0,0,0-.68,0L7.409,21.545a1.5,1.5,0,0,1-2.516-1.1V4.57a2.5,2.5,0,0,1,2.5-2.5h9.214a2.5,2.5,0,0,1,2.5,2.5V20.442a1.481,1.481,0,0,1-.9,1.374A1.507,1.507,0,0,1,17.6,21.945ZM12,16.51a1.5,1.5,0,0,1,1.018.395l4.251,3.9a.5.5,0,0,0,.839-.368V4.57a1.5,1.5,0,0,0-1.5-1.5H7.393a1.5,1.5,0,0,0-1.5,1.5V20.442a.5.5,0,0,0,.839.368L10.983,16.9A1.5,1.5,0,0,1,12,16.51Z" />
      </g>
    </svg>
  );
}

export default FavoritesIcon