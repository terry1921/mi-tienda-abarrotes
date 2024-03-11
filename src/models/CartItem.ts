import {Product} from "./Product";

export interface CartItem {
    product: Product;
    quantity: number;
    cartId: string | null;
}

export interface CartBody {
    cartId?: string | undefined;
    productId: string;
    quantity: number;
}

export interface CartResponse {
    error?: string;
    status: number;
    message?: string;
    cartId: string;
}