import { inject, Injectable } from '@angular/core';
import { OrderItem, OrderItemDto } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiService = inject(ApiService);

  private cart: OrderItemDto[] = [];

  private isInCart(productId: number): number | undefined {
    return this.cart.findIndex(
      (orderItem) => orderItem.product_id === productId,
    );
  }

  public addToCart(productId: number, quantity = 1) {
    const index = this.isInCart(productId);
    if (index) {
      this.cart[index].quantity += quantity;
    } else {
      this.cart.push({ product_id: productId, quantity });
    }
  }

  public removeFromCart(productId: number, quantity = 1) {
    const index = this.isInCart(productId);
    if (index) {
      if (this.cart[index].quantity <= quantity) {
        this.cart.splice(index, 1);
      } else {
        this.cart[index].quantity -= quantity;
      }
    }
  }

  public cartOverview(): OrderItem[] {
    this.apiService.categoryId.set(undefined);
    const productMap = new Map(
      this.apiService.products.value().map((p) => [p.id, p]),
    );

    return this.cart
      .map(({ product_id, quantity }) => {
        const product = productMap.get(product_id);
        return product ? { product, quantity } : undefined;
      })
      .filter((item) => item !== undefined);
  }

  public exportCart(): OrderItemDto[] {
    return this.cart;
  }

  public itemsInCart(): number {
    return this.cart.reduce(
      (total, orderItem) => (total += orderItem.quantity),
      0,
    );
  }
}
