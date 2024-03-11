import React, {useEffect, useState} from 'react';
import {getProductsList} from '../../functions/products';
import {Products} from '../../models/Product';
import SearchBar from "../SearchBar";
import ProductGrid from "./index";
import {getCategories} from "../../functions/categories";
import {CategoriesMap, Category} from "../../models/Category";

const ProductCore: React.FC = () => {
    const [products, setProducts] = useState<Products>([]);
    const [filteredProducts, setFilteredProducts] = useState<Products>([]);
    const [categories, setCategories] = useState<CategoriesMap>(new Map())

    useEffect(() => {
        const fetchProducts = async () => {
            const productsList = await getProductsList();
            if (productsList) {
                setProducts(productsList);
                setFilteredProducts(productsList);
            }
        };

        const fetchCategories = async () => {
            const categories = await getCategories();
            if (categories) {
                setCategories(convertArrayToMap(categories))
            }
        }

        fetchProducts();
        fetchCategories()
    }, []);

    const handleSearch = (query: string) => {
        if (!query) {
            setFilteredProducts(products);
        } else {
            const matchedProducts = products.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(matchedProducts);
        }
    };

    return (
        <div>
            {<SearchBar onSearch={handleSearch}/>}
            {<ProductGrid products={filteredProducts} categories={categories}/>}
        </div>
    );
};

const convertArrayToMap = (array: Category[]): Map<string, string> => {
    return array.reduce((acc, current) => {
        acc.set(current.id, current.name);
        return acc;
    }, new Map<string, string>());
};
export default ProductCore;