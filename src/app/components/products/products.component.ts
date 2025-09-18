import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ButtonModule } from 'primeng/button';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, ButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class Products {
  private apiService = inject(ApiService);
  private cartService = inject(CartService);

  protected products = this.apiService.products;

  protected addToCart(productId: number) {
    this.cartService.addToCart(productId);
  }
}
