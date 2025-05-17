import { Injectable, signal } from '@angular/core';
import { Product } from 'app/products/data-access/product.model';
import { Cart, CartItem } from './cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _cart = signal<Cart>({ id: 0, items: [], user: null });
  public readonly cart = this._cart.asReadonly();
  public readonly totalItems = signal<number>(0);

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this._cart();
    const existingItem = currentCart.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.items.push({ id: Date.now(), product, quantity });
    }
    this._cart.set({ ...currentCart });
    this.updateTotalItems();
  }

  removeFromCart(productId: number): void {
    const currentCart = this._cart();
    const updatedItems = currentCart.items.filter(item => item.product.id !== productId);
    this._cart.set({ ...currentCart, items: updatedItems });
    this.updateTotalItems();
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentCart = this._cart();
    const item = currentCart.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity); // Ensure quantity doesn't go below 1
      this._cart.set({ ...currentCart });
      this.updateTotalItems();
    }
  }

  private updateTotalItems() {
    const total = this._cart().items.reduce((sum, item) => sum + item.quantity, 0);
    this.totalItems.set(total);
  }
}