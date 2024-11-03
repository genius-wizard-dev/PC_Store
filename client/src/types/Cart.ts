import { Product } from "./Product";

export interface CartCountResponse {
  code: number;
  result: CartItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

