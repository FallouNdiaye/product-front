import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog'; // Import for p-dialog
import { PanelMenuComponent } from './shared/ui/panel-menu/panel-menu.component';
import { CartService } from 'app/cart/data-access/cart.service'; // Import CartService
import { CartComponent } from 'app/cart/ui/cart/cart.component'; // Import CartComponent
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    SplitterModule,
    ToolbarModule,
    DialogModule, // Added for p-dialog
    PanelMenuComponent,
    CartComponent,
    CommonModule
     // Added for app-cart
  ],
})
export class AppComponent {
  title = 'ALTEN SHOP';
  private readonly cartService = inject(CartService);
  public readonly totalItems = this.cartService.totalItems;
  public showCartDialog = false;

  constructor() {
    // Optional: Initialize cart if needed (e.g., this.cartService.get() if implemented)
  }
}