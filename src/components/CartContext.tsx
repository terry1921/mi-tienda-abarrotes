import React, {createContext, useContext, useState} from "react";
import {Product} from "../models/Product";
import {CartItem} from "../models/CartItem";
import {deleteItemFromCart, deleteShoppingCart, setShoppingCart} from "../functions/cart";

interface CartContextType {
    cartItems: CartItem[];
    cartMessage: string;
    addToCart: (product: Product, quantity: number) => Promise<void>;
    removeFromCart: (productId: string) => void;
    deleteCart: () => void;
    clearCartMessage: () => void;
}

const CartContext = createContext<CartContextType>({
    cartItems: [],
    cartMessage: '',
    addToCart: async () => {
    },
    removeFromCart: () => {
    },
    deleteCart: () => {
    },
    clearCartMessage: () => {
    },
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartId, setCartId] = useState<string | null>(null);
    const [cartMessage, setCartMessage] = useState<string>('');

    const addToCart = async (product: Product, quantity: number = 1) => {
        console.log('addToCart', product, quantity);
        try {
            const body = cartId ? {productId: product.id, quantity, cartId} : {productId: product.id, quantity};
            const response = await setShoppingCart(body);
            if (response.status !== 200) {
                setCartMessage(response.message || 'Error adding product to shopping cart')
                return;
            }

            if (!cartId && response.cartId) {
                setCartId(response.cartId);
            }
            setCartItems((prevItems) => {
                const itemExists = prevItems.find((item) => item.product.id === product.id);
                if (itemExists) {
                    setCartMessage('Product added to shopping cart');
                    return prevItems.map((item) =>
                        item.product.id === product.id ? {...item, quantity: item.quantity + quantity} : item
                    );
                } else {
                    setCartMessage('Product added to shopping cart');
                    return [...prevItems, {product, quantity, cartId: response.cartId}];
                }
            });
        } catch (error) {
            setCartMessage('Error adding product to shopping cart');
        }
    };

    const removeFromCart = async (productId: string) => {
        if (!cartId) {
            setCartMessage('Error deleting the item from the shopping cart.');
            return;
        }

        try {
            const response = await deleteItemFromCart({productId, cartId, quantity: 1});
            if (response.status !== 200) {
                setCartMessage(response.message || 'Error deleting the item from the shopping cart.');
                return;
            }
            setCartItems((prevItems) =>
                prevItems.reduce((acc, item) => {
                    if (item.product.id === productId) {
                        if (item.quantity > 1) {
                            return [...acc, {...item, quantity: item.quantity - 1}];
                        }
                        return acc;
                    } else {
                        return [...acc, item];
                    }
                }, [] as CartItem[])
            );
        } catch (e) {
            setCartMessage('Error deleting the item from the shopping cart.');
        }
    };

    const deleteCart = async () => {
        if (!cartId) {
            setCartMessage('Error deleting the shopping cart.');
            return;
        }
        try {
            const response = await deleteShoppingCart(cartId);
            if (response.status !== 200) {
                setCartMessage(response.message || "Error deleting the shopping cart.");
                return;
            }
            setCartItems([]);
            setCartId(null);
            setCartMessage(response.message || "Cart deleted successfully.");
        } catch (error) {
            setCartMessage("Error deleting the shopping cart.");
        }
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            deleteCart,
            cartMessage,
            clearCartMessage: () => setCartMessage('')
        }}>
            {children}
        </CartContext.Provider>
    );
};