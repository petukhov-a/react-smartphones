import doogeeImg from '../assets/img/smartphones/DOOGEE-V30.webp';
import { useDispatch, useSelector } from 'react-redux';
import { selectSmartphones } from '../redux/smartphones/selectors';
import { useParams } from 'react-router-dom';
import SmartphoneSpecs from '../components/SmartphoneSpecs';
import { addCartItem } from '../redux/cart/slice';

const SmartphonePage = () => {
  const { items } = useSelector(selectSmartphones);
  const {id} = useParams();
  const currentSmartphone = items.find(item => item.id === id);
  const dispatch = useDispatch();


  const onClickAddCart = () => {
    if (currentSmartphone) {
      dispatch(addCartItem({
        id: currentSmartphone.id,
        name: currentSmartphone.name,
        price: currentSmartphone.price,
        img: currentSmartphone.img,
        rating: currentSmartphone.rating,
        count: 1
      }));
    }
  }

  if (!currentSmartphone) {
    return '...загрузка'
  }

  return (
    <div className="smartphone-page">
      <div className="container">
        <div className="smartphone-page-heading">
          <div className="smartphone-name no-hover">Смартфон {currentSmartphone.name}</div>
          <div className="smartphone-id">Код товара: {currentSmartphone.id}</div>
        </div>
        <div className="smartphone-page-info">
          <img className="smartphone-page__img" src={currentSmartphone.img} alt="" />
          <div className="smartphone-page-desq">
            <p className="smartphone-page-desq__color">
              Цвет: <span>черный</span>
            </p>
            <SmartphoneSpecs item={currentSmartphone} />
          </div>
          <div className="smartphone-page-actions">
            <div className="price">
              {currentSmartphone.price} <span>₽</span>
            </div>
            <button
              className="smartphone-page-actions__add-cart-btn btn btn-icon"
              onClick={onClickAddCart}>
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
              <span>В корзину</span>
            </button>
            <button className="smartphone-page-actions__add-favorites-btn">
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
