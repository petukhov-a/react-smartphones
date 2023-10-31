export const calcTotalCount = (items: CartItem[]) => {
    const totalCount = items.reduce((sum, obj) => sum + obj.count, 0);

    return totalCount;
}