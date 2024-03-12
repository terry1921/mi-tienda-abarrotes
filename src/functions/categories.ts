import axios from 'axios';
import {Categories} from "../models/Category";
import {API_URL, CACHE_DURATION_12_HOURS, cacheKeys} from "../constants/commons";

export const getCategories = async (): Promise<Categories> => {
    const cachedData = localStorage.getItem(cacheKeys.categories);
    const now = new Date();
    if (cachedData) {
        const {products, timestamp} = JSON.parse(cachedData);

        // Verificar si la caché aún es válida
        if (now.getTime() - timestamp < CACHE_DURATION_12_HOURS) {
            return products; // Utilizar los datos de la caché
        }
    }
    const url = `${API_URL}/categories`
    try {
        const response = await axios.get<Categories>(url);
        const categories = response.data;
        // Asumiendo que queremos validar que la respuesta no esté vacía
        if (categories && categories.length > 0) {
            // Guardar los nuevos datos en la caché con un sello temporal
            const dataToCache = {
                products: categories,
                timestamp: now.getTime(),
            };
            localStorage.setItem(cacheKeys.categories, JSON.stringify(dataToCache));
            return categories;
        } else {
            throw new Error('No categories found');
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}