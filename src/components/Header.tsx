import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-primary text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">TiendApp</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link to="/" className="hover:text-gray-300">Inicio</Link></li>
                        <li><Link to="/products" className="hover:text-gray-300">Productos</Link></li>
                        <li><Link to="/cart" className="hover:text-gray-300">Carrito</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;