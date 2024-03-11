import React from 'react';
import './main.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import ProductCore from "./components/ProductGrid/helper";
import CategoryCore from "./components/CategoryList/helper";
import {CartProvider} from "./components/CartContext";
import Cart from "./components/Cart";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const App: React.FC = () => {
    return (
        <CartProvider>
            <Router>
                {<Header/>}
                <Routes>
                    <Route path="/" element={<CategoryCore/>}/>
                    <Route path="/products" element={<ProductCore/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/*" element={<NotFoundPage/>}/>
                </Routes>
            </Router>
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </CartProvider>
    );
}

export default App;
