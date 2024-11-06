import { Product } from "./Product";

export interface CartCountResponse {
  code: number;
  message?: string;
  result: CartItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartResponse {
  code: number;
  message?: string;
  result: {
    success: boolean;
  };
}

