import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from 'app/cart/data-access/cart.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    CardModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  public readonly cart = this.cartService.cart ;

  ngOnInit() {
    // No get() method needed; cart is managed locally
    console.log('Cart initialized:', this.cart().items);
  }

  onRemove(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }
}