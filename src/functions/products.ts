import axios from 'axios';
import {Products} from "../models/Product";
import {API_URL, CACHE_DURATION_12_HOURS, cacheKeys} from "../constants/commons";
import { saveFailedRequest, getAndClearFailedRequests } from './db';

// getProductsList: Obtiene la lista de productos
export const getProductsList = async (): Promise<Products> => {
    const cachedData = localStorage.getItem(cacheKeys.products);
    const now = new Date();
    // Verificar si hay datos en la caché
    if (cachedData) {
        const { products, timestamp } = JSON.parse(cachedData);

        // Verificar si la caché aún es válida
        if (now.getTime() - timestamp < CACHE_DURATION_12_HOURS) {
            return products; // Utilizar los datos de la caché
        }
    }
    const url = `${API_URL}/products`
    try {
        // Realizar la petición a la API
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
            // En caso de que no haya productos, lanzar un error
            throw new Error('No products found');
        }
    } catch (e) {
        // En caso de que la petición falle, retornar un array vacío
        await saveFailedRequest(url, 'GET');
        return [];
    }
}

// Listener para reintentar las peticiones cuando el usuario esté online
window.addEventListener('online', async () => {
    const requests = await getAndClearFailedRequests();
    for (const request of requests) {
        axios.get(request.url).then(response => {
            console.log('Request reattempted and succeeded:', response);
            const dataToCache = {
                products: response.data,
                timestamp: new Date().getTime(),
            };
            localStorage.setItem(cacheKeys.products, JSON.stringify(dataToCache));
        }).catch(error => {
            console.error('Request reattempted and failed:', error);
            saveFailedRequest(request.url, 'GET');
        });
    }
});

export const getProductsById = async (id: string): Promise<Products> => {
    const cacheKey = cacheKeys.product(id);
    const cachedData = localStorage.getItem(cacheKey);
    const now = new Date();
    // Verificar si hay datos en la caché
    if (cachedData) {
        const cachedProducts = JSON.parse(cachedData) as { products: Products, timestamp: number };
        // Verificar si la caché aún es válida
        if (now.getTime() - cachedProducts.timestamp < CACHE_DURATION_12_HOURS) {
            return cachedProducts.products;
        }
    }

    const url = `${API_URL}/products/?category=${id}`
    try {
        // Realizar la petición a la API
        const response = await axios.get<Products>(url);
        const products = response.data;
        // Asumiendo que queremos validar que la respuesta no esté vacía
        if (products && products.length > 0) {
            // Guardar los nuevos datos en la caché con un sello temporal
            const dataToCache = { products, timestamp: now.getTime() };
            localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
            return products;
        } else {
            // En caso de que no haya productos, lanzar un error
            throw new Error('No products found');
        }
    } catch (e) {
        // En caso de que la petición falle, retornar un array vacío
        await saveFailedRequest(url, 'GET');
        return [];
    }
}