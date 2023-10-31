export const calcTotalPrice = (items: CartItem[]) => {
    const totalPrice = items.reduce((sum, obj) => sum + obj.price * obj.count, 0);

    return totalPrice;
}