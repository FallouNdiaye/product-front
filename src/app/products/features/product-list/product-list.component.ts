import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from 'app/products/data-access/product.model';
import { ProductsService } from 'app/products/data-access/products.service';
import { CartService } from 'app/cart/data-access/cart.service';
import { ProductFormComponent } from 'app/products/ui/product-form/product-form.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';

const emptyProduct: Product = {
  id: 0,
  code: '',
  name: '',
  description: '',
  image: '',
  category: '',
  price: 0,
  quantity: 0,
  internalReference: '',
  shellId: 0,
  inventoryStatus: 'INSTOCK',
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    DataViewModule,
    CardModule,
    ButtonModule,
    DialogModule,
    ProductFormComponent,
    InputNumberModule,
    PaginatorModule,
    CommonModule
  ],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  public readonly products = this.productsService.products;
  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);
  public quantities: { [key: number]: number } = {};

  ngOnInit() {
    this.productsService.get().subscribe();
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    console.log(`Delete product: ${product.id}`);
  }

  public addToCart(product: Product) {
    const quantity = this.getQuantity(product.id);
    console.log(`Adding to cart: ${product.name}, Quantity: ${quantity}`); // Debug log
    this.cartService.addToCart(product, quantity);
    this.setQuantity(product.id, 1); // Reset to 1 after adding to cart
  }

  public onSave(product: Product) {
    console.log(`Save product: ${JSON.stringify(product)}`);
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  // Helper method to get the quantity with a default of 1
  public getQuantity(productId: number): number {
    return this.quantities[productId] || 1;
  }

  // Helper method to set the quantity
  public setQuantity(productId: number, quantity: number) {
    this.quantities[productId] = quantity;
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }
}