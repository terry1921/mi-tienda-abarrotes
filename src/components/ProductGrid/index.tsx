import React, {useEffect, useState} from 'react';
import {Product} from '../../models/Product';
import {useCart} from "../CartContext";
import {Bounce, toast} from "react-toastify";

interface ProductListProps {
    products: Product[];
    categories: Map<string, string>;
}

const ProductGrid: React.FC<ProductListProps> = ({products, categories}) => {
    const { addToCart, cartMessage, clearCartMessage  } = useCart();
    const itemsPerPage = 8; // Cantidad de productos por página
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const goToNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    const goToPrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

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

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-2">
                {currentItems.map((product) => (
                    <div onClick={() => addToCart(product, 1)} key={product.id} className="bg-card-light border rounded-md p-4 shadow-lg">
                        <p className="text-primary-dark">{categories.get(product.category)}</p>
                        <div className="flex justify-center items-center">
                            <svg width="100" height="100" fill="currentColor" aria-hidden="true"
                                 className="text-white mr-2"
                                 viewBox="0 0 20 20">
                                <path
                                    d="M18.555,15.354V4.592c0-0.248-0.202-0.451-0.45-0.451H1.888c-0.248,0-0.451,0.203-0.451,0.451v10.808c0,0.559,0.751,0.451,0.451,0.451h16.217h0.005C18.793,15.851,18.478,14.814,18.555,15.354 M2.8,14.949l4.944-6.464l4.144,5.419c0.003,0.003,0.003,0.003,0.003,0.005l0.797,1.04H2.8z M13.822,14.949l-1.006-1.317l1.689-2.218l2.688,3.535H13.822z M17.654,14.064l-2.791-3.666c-0.181-0.237-0.535-0.237-0.716,0l-1.899,2.493l-4.146-5.42c-0.18-0.237-0.536-0.237-0.716,0l-5.047,6.598V5.042h15.316V14.064z M12.474,6.393c-0.869,0-1.577,0.707-1.577,1.576s0.708,1.576,1.577,1.576s1.577-0.707,1.577-1.576S13.343,6.393,12.474,6.393 M12.474,8.645c-0.371,0-0.676-0.304-0.676-0.676s0.305-0.676,0.676-0.676c0.372,0,0.676,0.304,0.676,0.676S12.846,8.645,12.474,8.645"/>
                            </svg>
                        </div>
                        <div className="grid grid-cols-2 gap-2 px-2">
                            <h2 className="text-text-primary text-lg font-semibold">{product.name}</h2>
                            <p className="text-right">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination-controls flex justify-center items-center mt-4">
                <button onClick={goToPrevPage} disabled={currentPage === 1}
                        className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-blue-300">
                    Anterior
                </button>
                <span className="text-white">Página {currentPage} de {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}
                        className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-blue-300">
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default ProductGrid;