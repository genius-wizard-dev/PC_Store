import { clearAuth } from './auth';
import { clearCart } from './cart';
import { clearUser } from './user';

export { default as authReducer } from './auth';
export { default as cartReducer } from './cart';
export { default as userReducer } from './user';

// Action để clear tất cả state
export const clearAllState = () => (dispatch: any) => {
  dispatch(clearAuth());
  dispatch(clearCart());
  dispatch(clearUser());
};

