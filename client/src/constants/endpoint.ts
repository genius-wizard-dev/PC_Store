
const ENDPOINT = {
    LOGIN: `/api/auth/log-in`,
    REGISTER: `/api/customers/register`,
    LOGOUT: `/api/auth/logout`,
    REFRESH_TOKEN: `/api/auth/refresh`,
    INTROSPECT: `/api/auth/introspect`,
    LIST_PRODUCT: `/api/products`,
    PRODUCT_DETAIL: `/api/product-detail`,
    USER_INFO: `/api/customers/info`,
    CART_COUNT: `/api/cart`,
    ADD_TO_CART: `/api/cart`,
    DELETE_CART: `/api/cart/deleteItem`,
    DECREASE_QUANTITY: `/api/cart/decreaseQuantity`,
    INCREASE_QUANTITY: `/api/cart/increaseQuantity`,
    ORDER: `/api/orders`,

}

export default ENDPOINT;
