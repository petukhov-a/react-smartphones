import { calcTotalCount } from "./calcTotalCount";
import { calcTotalPrice } from "./countTotalPrice";

export const getDataFromLS = (dataName: string) => {
    const data = localStorage.getItem(dataName);
    const items = data ? JSON.parse(data) : [];

    const totalPrice = calcTotalPrice(items);
    const totalCount = calcTotalCount(items);

    return {
        items,
        totalPrice,
        totalCount
    }
}