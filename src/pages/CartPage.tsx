import CartItem from '../components/CartItem';
import CartInfo from '../components/CartInfo';
import { Link } from 'react-router-dom';
import { selectCart } from '../redux/cart/selectors';
import { useSelector } from 'react-redux';
import emptyCartImg from '../assets/img/empty-cart.jpg';
import EmptyItems from '../components/EmptyItems';

const CartPage = () => {
  const { items, totalCount } = useSelector(selectCart);

  const cartItems = items.map((item) => <CartItem item={item} key={item.id} />);

  if (totalCount === 0) {
    return <EmptyItems text="Ваша корзина пуста!" img={emptyCartImg} />;
  }

  return (
    <>
      <div className="cart">
        <div className="container">
          <div className="cart-heading">
            <Link to="/" className="cart__exit">
              Вернуться к покупкам
            </Link>
            <h1 className="cart__heading">Корзина</h1>
          </div>
          <div className="cart-wrapper">
            <div className="cart-items">{cartItems}</div>
            <CartInfo />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
