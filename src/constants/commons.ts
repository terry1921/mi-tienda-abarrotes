export const API_URL = 'https://local-shop-api.fly.dev';
export const CACHE_DURATION_12_HOURS = 12 * 60 * 60 * 1000; // 12 hours

export const cacheKeys = {
    products: 'productsData',
    product: (id: string) => `productData_${id}`,
    categories: 'categoryData',
    shoppingCart: (uuid: String) => `shoppingCartData_${uuid}`
}