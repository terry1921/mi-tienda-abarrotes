import React from 'react';
import {Category} from '../../models/Category';
import {useCategory} from "../CategoryContext";
import ProductList from "../ProductList";

interface CategoryListProps {
    categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({categories}) => {
    const { handleSetSelectedCategoryId } = useCategory();
    return (
        <div className="space-y-4 p-4 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
            <h2 className="text-white text-2xl font-bold my-2 px-4">Categorías</h2>
            <div className="flex items-center justify-between hover:flex-row px-4">
                <ul className="w-full">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            onClick={() => handleSetSelectedCategoryId(category.id)}
                            className="bg-card-dark text-white text-lg font-medium rounded-lg p-4 my-4 shadow-lg hover:bg-card transition duration-300">
                            <div className="relative w-full text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                <span className="flex items-center">{category.name}</span>
                                <span
                                    className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"/>
                                </svg>
                                </span>
                            </div>
                            {<ProductList category={category}/>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryList;