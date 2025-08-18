export interface CartProductItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
    thumbnail?: string;
}

export interface Cart {
    id: number;
    products: CartProductItem[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}

export interface CartsResponse {
    carts: Cart[];
    total: number;
    skip: number;
    limit: number;
}

export interface AddCartRequest {
    userId: number;
    products: Array<{
        id: number;
        quantity: number;
    }>;
}

export interface UpdateCartRequest {
    merge?: boolean;
    products: Array<{
        id: number;
        quantity: number;
    }>;
}


