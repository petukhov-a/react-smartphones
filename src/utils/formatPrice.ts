export const formatPrice = (price: number) => {
    return Intl.NumberFormat('ru').format(price);
}