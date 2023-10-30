type CartSliceState = {
    items: CartItem[];
    totalPrice: number;
    totalCount: number;
}

type CartItem = {
    id: string;
    img: string;
    name: string;
    price: number;
    count: number;
}