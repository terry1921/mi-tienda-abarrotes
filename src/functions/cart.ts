import {API_URL} from "../constants/commons";
import {CartBody, CartResponse} from "../models/CartItem";
import axios from "axios";

export const setShoppingCart = async (body: CartBody): Promise<CartResponse> => {
    let url = `${API_URL}/shopping-cart`;
    try {
        const response = await axios.post<CartResponse>(url, body);
        if (response.status === 200) {
            return {status: response.status, message: response.data.message, cartId: response.data.cartId};
        } else {
            return {status: response.status, message: response.data.error, cartId: ""};
        }
    } catch (e) {
        return {status: 500, message: "Error loading items into the shopping cart.", cartId: ""};
    }
};

export const deleteShoppingCart = async (cartId: string): Promise<CartResponse> => {
    let url = `${API_URL}/shopping-cart/${cartId}`;
    try {
        const response = await axios.delete<CartResponse>(url);
        if (response.status === 200) {
            return {status: response.status, message: response.data.message, cartId: response.data.cartId};
        } else {
            return {status: response.status, message: response.data.error, cartId: ""};
        }
    } catch (e) {
        return {status: 500, message: "Error deleting the shopping cart.", cartId: cartId};
    }
};

// delete item by cartId and productId
export const deleteItemFromCart = async (body: CartBody): Promise<CartResponse> => {
    let url = `${API_URL}/shopping-cart`;
    try {
        const response = await axios.delete<CartResponse>(url, {data: body});
        if (response.status === 200) {
            return {status: response.status, message: response.data.message, cartId: response.data.cartId};
        } else {
            return {status: response.status, message: response.data.error, cartId: body.cartId || ""};
        }
    } catch (e) {
        return {status: 500, message: "Error deleting the item from the shopping cart.", cartId: body.cartId || ""};
    }
};