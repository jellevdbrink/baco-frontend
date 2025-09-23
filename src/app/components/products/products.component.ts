import { Component, computed, inject, input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, BadgeModule, CardModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class Products {
  private apiService = inject(ApiService);
  private cartService = inject(CartService);

  categoryId = input(undefined, { transform: this.transformCategoryId });

  protected products = computed(() =>
    this.apiService.products
      .value()
      .filter(
        (product) =>
          (this.categoryId() === undefined ||
            product.category.id === this.categoryId()) &&
          product.visible,
      ),
  );

  protected qtyItemInCart(productId: number): number {
    return this.cartService.qtyItemInCart(productId);
  }

  protected addToCart(productId: number) {
    this.cartService.addToCart(productId);
  }

  private transformCategoryId(inp: string | undefined): number | undefined {
    return inp === undefined ? inp : parseInt(inp);
  }
}
