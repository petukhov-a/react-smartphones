import { useDispatch, useSelector } from 'react-redux';
import { selectSmartphones } from '../redux/smartphones/selectors';
import { useParams } from 'react-router-dom';
import SmartphoneSpecs from '../components/SmartphoneSpecs';
import AddCartBtn from '../components/AddCartBtn';
import { addFavoritesItem, removeFavoritesItem } from '../redux/favorites/slice';
import { selectFavorites } from '../redux/favorites/selectors';
import { formatPrice } from '../utils/formatPrice';

const SmartphonePage = () => {
  const { items } = useSelector(selectSmartphones);
  const {id} = useParams();
  const currentSmartphone = items.find(item => item.id === id);
  const dispatch = useDispatch();
  const { items: favoritesItems } = useSelector(selectFavorites);

  if (!currentSmartphone || !id) {
    return '...загрузка'
  }

  const { name, price, img, rating } = currentSmartphone;

  const currentFavoritesItem = favoritesItems.find((item) => item.id === id);

  const onClickAddFavorites = () => {
    dispatch(addFavoritesItem({ id, img, price, name, rating, count: 1 }));
    if (currentFavoritesItem?.id === id) {
      dispatch(removeFavoritesItem(id));
    }
  };

  const clazz = currentFavoritesItem ? ' active' : '';

  return (
    <div className="smartphone-page">
      <div className="container">
        <div className="smartphone-page-heading">
          <div className="smartphone-name no-hover">Смартфон {name}</div>
          <div className="smartphone-id">Код товара: {id}</div>
        </div>
        <div className="smartphone-page-info">
          <img className="smartphone-page__img" src={img} alt="" />
          <div className="smartphone-page-desq">
            <p className="smartphone-page-desq__color">
              Цвет: <span>черный</span>
            </p>
            <SmartphoneSpecs item={currentSmartphone} />
          </div>
          <div className="smartphone-page-actions">
            <div className="price">
              {formatPrice(price)} <span>₽</span>
            </div>
            <AddCartBtn item={currentSmartphone} isCountOnRight={true}/>
            <button
              className={"smartphone-page-actions__add-favorites-btn" + clazz}
              onClick={onClickAddFavorites}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                width="800px"
                height="800px"
                viewBox="0 0 24 24">
                <g id="Bookmark">
                  <path d="M17.6,21.945a1.483,1.483,0,0,1-1.01-.4l-4.251-3.9a.5.5,0,0,0-.68,0L7.409,21.545a1.5,1.5,0,0,1-2.516-1.1V4.57a2.5,2.5,0,0,1,2.5-2.5h9.214a2.5,2.5,0,0,1,2.5,2.5V20.442a1.481,1.481,0,0,1-.9,1.374A1.507,1.507,0,0,1,17.6,21.945ZM12,16.51a1.5,1.5,0,0,1,1.018.395l4.251,3.9a.5.5,0,0,0,.839-.368V4.57a1.5,1.5,0,0,0-1.5-1.5H7.393a1.5,1.5,0,0,0-1.5,1.5V20.442a.5.5,0,0,0,.839.368L10.983,16.9A1.5,1.5,0,0,1,12,16.51Z" />
                </g>
              </svg>
              <span>В избранное</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartphonePage;
