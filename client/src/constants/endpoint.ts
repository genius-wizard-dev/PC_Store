const BASE_URL = import.meta.env.VITE_API_URL;


const ENDPOINT = {
    LOGIN: `${BASE_URL}/api/auth/log-in`,
    REGISTER: `${BASE_URL}/api/customers/register`,
    LOGOUT: `${BASE_URL}/api/auth/logout`,
    REFRESH_TOKEN: `${BASE_URL}/api/auth/refresh`,
    INTROSPECT: `${BASE_URL}/api/auth/introspect`,
    LIST_PRODUCT: `${BASE_URL}/api/products`,
    PRODUCT_DETAIL: `${BASE_URL}/api/product-detail`,
    USER_INFO: `${BASE_URL}/api/customers/info`,
    CART_COUNT: `${BASE_URL}/api/cart`,
    ADD_TO_CART: `${BASE_URL}/api/cart`,
    DELETE_CART: `${BASE_URL}/api/cart/deleteItem`,
}

export default ENDPOINT;
