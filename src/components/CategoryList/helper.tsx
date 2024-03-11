import React, {useEffect, useState} from 'react';
import {Categories} from '../../models/Category';
import SearchBar from "../SearchBar";
import CategoryList from "./index";
import {getCategories} from "../../functions/categories";
import {CategoryProvider} from "../CategoryContext";

const CategoryCore: React.FC = () => {
    const [categories, setCategories] = useState<Categories>([]);
    const [filteredCategories, setFilteredCategories] = useState<Categories>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoryList = await getCategories();
            if (categoryList) {
                setCategories(categoryList);
                setFilteredCategories(categoryList);
            }
        };

        fetchCategories();
    }, []);

    const handleSearch = (query: string) => {
        if (!query) {
            setFilteredCategories(categories);
        } else {
            const matchedCategories = categories.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredCategories(matchedCategories);
        }
    };

    return (
        <CategoryProvider>
            <div>
                {<SearchBar onSearch={handleSearch}/>}
                {<CategoryList categories={filteredCategories}/>}
            </div>
        </CategoryProvider>
    );
};
export default CategoryCore;