import axios from 'axios';
import {Products} from "../models/Product";
import {API_URL, CACHE_DURATION, cacheKeys} from "../constants/commons";

export const getProductsList = async (): Promise<Products> => {
    const cachedData = localStorage.getItem(cacheKeys.products);
    const now = new Date();
    if (cachedData) {
        const { products, timestamp } = JSON.parse(cachedData);

        // Verificar si la caché aún es válida
        if (now.getTime() - timestamp < CACHE_DURATION) {
            return products; // Utilizar los datos de la caché
        }
    }
    const url = `${API_URL}/products`
    try {
        const response = await axios.get<Products>(url);
        const products = response.data;
        // Asumiendo que queremos validar que la respuesta no esté vacía
        if (products && products.length > 0) {
            // Guardar los nuevos datos en la caché con un sello temporal
            const dataToCache = {
                products,
                timestamp: now.getTime(),
            };
            localStorage.setItem(cacheKeys.products, JSON.stringify(dataToCache));
            return products;
        } else {
            throw new Error('No products found');
        }
    } catch (e) {
        return [];
    }
}

export const getProductsById = async (id: string): Promise<Products> => {
    const cacheKey = cacheKeys.product(id);
    const cachedData = localStorage.getItem(cacheKey);
    const now = new Date();

    if (cachedData) {
        const cachedProducts = JSON.parse(cachedData) as { products: Products, timestamp: number };

        // Verificar si los datos en caché tienen menos de 1 hora de antigüedad
        if (now.getTime() - cachedProducts.timestamp < CACHE_DURATION) {
            return cachedProducts.products;
        }
    }

    const url = `${API_URL}/products/?category=${id}`
    try {
        const response = await axios.get<Products>(url);
        const products = response.data;
        if (products && products.length > 0) {
            const dataToCache = { products, timestamp: now.getTime() };
            localStorage.setItem(cacheKey, JSON.stringify(dataToCache));

            return products;
        } else {
            throw new Error('No products found');
        }
    } catch (e) {
        return [];
    }
}