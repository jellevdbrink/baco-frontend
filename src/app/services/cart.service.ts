import { computed, inject, Injectable, signal } from '@angular/core';
import { OrderItem, OrderItemDto, TeamMember } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiService = inject(ApiService);

  public activePerson = signal<TeamMember | undefined>(undefined);
  private cart = signal<OrderItemDto[]>([]);

  public numItemsInCart = computed(() =>
    this.cart().reduce((total, orderItem) => total + orderItem.quantity, 0),
  );

  public cartOverview = computed<OrderItem[]>(() => {
    const productMap = new Map(
      this.apiService.products.value().map((p) => [p.id, p]),
    );

    return this.cart()
      .map(({ product_id, quantity }) => {
        const product = productMap.get(product_id);
        return product ? { product, quantity } : undefined;
      })
      .filter((item) => item !== undefined);
  });

  public total = computed(() =>
    this.cartOverview().reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    ),
  );

  private isInCart(productId: number): number {
    return this.cart().findIndex(
      (orderItem) => orderItem.product_id === productId,
    );
  }

  public addToCart(productId: number, quantity = 1) {
    const index = this.isInCart(productId);
    if (index !== -1) {
      const updated = [...this.cart()];
      updated[index] = {
        ...updated[index],
        quantity: updated[index].quantity + quantity,
      };
      this.cart.set(updated);
    } else {
      this.cart.set([...this.cart(), { product_id: productId, quantity }]);
    }
  }

  public removeFromCart(productId: number, quantity = 1) {
    const index = this.isInCart(productId);
    if (index !== -1) {
      const updated = [...this.cart()];
      if (updated[index].quantity <= quantity) {
        updated.splice(index, 1);
      } else {
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity - quantity,
        };
      }
      this.cart.set(updated);
    }
  }

  public exportCart(): OrderItemDto[] {
    return this.cart();
  }

  public clearCart(): void {
    this.cart.set([]);
  }
}
