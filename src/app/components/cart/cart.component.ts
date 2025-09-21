import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [ButtonModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class Cart {
  private cartService = inject(CartService);
  private apiService = inject(ApiService);
  private router = inject(Router);

  protected cartOverview = this.cartService.cartOverview;
  protected numItemsInCart = this.cartService.numItemsInCart;
  protected total = this.cartService.total;

  protected increaseItem(productId: number): void {
    this.cartService.addToCart(productId, 1);
  }

  protected decreaseItem(productId: number): void {
    this.cartService.removeFromCart(productId, 1);
  }

  protected deleteItem(productId: number): void {
    this.cartService.deleteFromCart(productId);
  }

  protected orderButtonDisabled(): boolean {
    return (
      this.cartService.activePerson() === undefined ||
      this.cartService.numItemsInCart() === 0
    );
  }

  protected placeOrder(): void {
    if (this.orderButtonDisabled()) {
      return;
    }

    this.apiService
      .createOrder(
        this.cartService.activePerson()!.id,
        this.cartService.exportCart(),
      )
      .subscribe({
        next: (order) => {
          console.log('Order placed:', order);
          alert('Order placed successfully!');
          this.cartService.clearCart();
          this.cartService.activePerson.set(undefined);
          this.router.navigate(['/member-selector']);
        },
        error: (err) => {
          console.error(err);
          alert('Failed to place order.');
        },
      });
  }
}
