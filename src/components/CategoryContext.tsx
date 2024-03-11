import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Product} from "../models/Product";
import {getProductsById} from "../functions/products";

const CategoryContext = createContext<CategoryContextType>({
    selectedCategoryId: '',
    handleSetSelectedCategoryId: (_: string) => {},
    filteredProducts: [],
    setFilteredProducts: () => {},
});

type CategoryContextType = {
    selectedCategoryId: string;
    handleSetSelectedCategoryId: (id: string) => void;
    filteredProducts: Product[];
    setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

type CategoryProviderProps = {
    children: ReactNode;
};

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const fetchAndSetProducts = async (categoryId: string) => {
        const products = await getProductsById(categoryId);
        setFilteredProducts(products);
    };

    const handleSetSelectedCategoryId = (id: string): void => {
        setSelectedCategoryId(id);
        fetchAndSetProducts(id);
    };

    return (
        <CategoryContext.Provider value={{ selectedCategoryId, handleSetSelectedCategoryId, filteredProducts, setFilteredProducts }}>
            {children}
        </CategoryContext.Provider>
    );
};
