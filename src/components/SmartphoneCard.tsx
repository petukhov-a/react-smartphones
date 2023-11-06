import { FC } from 'react';
import { Smartphone } from '../redux/smartphones/types';
import { Link } from 'react-router-dom';
import FavoritesIcon from './FavoritesIcon';
import SmartphoneSpecs from './SmartphoneSpecs';
import AddCartBtn from './AddCartBtn';

type SmartphoneCardProps = {
  item: Smartphone;
}

const SmartphoneCard: FC<SmartphoneCardProps> = ( {item} ) => {

  const { id, name, img, rating, price } = item;

  return (
    <>
      <div className="smartphone-card card-hover">
        <div className="smartphone-card-wrapper">
          <Link to={`/smartphone/${id}`} className="smartphone-card__img">
            <img src={img} alt="" />
          </Link>
          <div className="smartphone-card-desq">
            <div className="smartphone-card-heading">
              <Link to={`/smartphone/${id}`} className="smartphone-name">
                {name}
              </Link>
              <p className="smartphone-id">Код товара: {id}</p>
            </div>
            <div className="separator"></div>
            <SmartphoneSpecs item={item}/>
          </div>
          <div className="smartphone-card-add-cart">
            <div className="price">
              <p>
                {price} <span>₽</span>
              </p>
            </div>
            <div className="smartphone-card-add-cart-action">
              <AddCartBtn item={item} isCountOnRight={false}/>
            </div>
          </div>
          <div className="smartphone-card__add-favorites">
            <FavoritesIcon item={ {id, img, price, name, rating, count: 1} }/>
          </div>
        </div>
      </div>
      <div className="separator"></div>
    </>
  );
};

export default SmartphoneCard;
