import { Product } from "../../products/data-access/product.model";

export interface Cart {
  id: number;
  items: CartItem[];
  user: null;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}