import { Component, computed, inject, input } from '@angular/core';
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

  categoryId = input(undefined, { transform: this.transformCategoryId });

  protected products = computed(() =>
    this.apiService.products
      .value()
      .filter(
        (product) =>
          this.categoryId() === undefined ||
          product.category.id === this.categoryId(),
      ),
  );

  protected addToCart(productId: number) {
    this.cartService.addToCart(productId);
  }

  private transformCategoryId(inp: string | undefined): number | undefined {
    return inp === undefined ? inp : parseInt(inp);
  }
}
