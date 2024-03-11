import React, {useEffect} from "react";
import {useCart} from "../CartContext";
import {Bounce, toast} from "react-toastify";

const Cart: React.FC = () => {
    const {cartItems, cartMessage, clearCartMessage, removeFromCart, deleteCart} = useCart();
    console.log(cartItems);

    useEffect(() => {
        if (cartMessage) {
            toast.info(cartMessage, {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            clearCartMessage();
        }
    }, [cartMessage, clearCartMessage]);

    if (cartItems.length === 0) {
        return (
            <div className="cart-container p-4">
                <p className="text-white">Tu carrito está vacío.</p>;
            </div>
        );
    }

    return (
        <div className="cart-container p-4">

            <div className="flex items-center justify-end">
                <div onClick={() => deleteCart()} className="bg-primary hover:bg-primary-dark group flex items-center rounded-md text-white text-sm font-bold pl-2 pr-3 py-2 shadow-sm">
                    <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                        <path d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
                    </svg>
                    Delete Shopping Cart
                </div>
            </div>

            <ul className="w-full">
                {cartItems.map(item => (
                    <li key={item.product.id}
                        className="bg-card-dark text-white font-medium rounded-lg p-4 my-4 shadow-lg hover:bg-card transition duration-300 flex justify-between items-center mb-4">
                        <div>
                            <h5 className="font-bold">{item.product.name}</h5>
                            <p>Cantidad: {item.quantity}</p>
                            <p>Precio: ${item.product.price}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)}
                                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700">Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;