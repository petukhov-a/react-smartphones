import { calcTotalCount } from "./calcTotalCount";
import { calcTotalPrice } from "./countTotalPrice";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];

    const totalPrice = calcTotalPrice(items);
    const totalCount = calcTotalCount(items);

    return {
        items,
        totalPrice,
        totalCount
    }
}