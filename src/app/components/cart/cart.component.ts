import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  imports: [ButtonModule, CurrencyPipe, CardModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class Cart {
  private cartService = inject(CartService);
  private apiService = inject(ApiService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  protected cartOverview = this.cartService.cartOverview;
  protected numItemsInCart = this.cartService.numItemsInCart;
  protected total = this.cartService.total;

  protected loading = signal(false);

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
      this.cartService.numItemsInCart() === 0 ||
      this.loading()
    );
  }

  protected placeOrder(): void {
    if (this.orderButtonDisabled()) {
      return;
    }
    this.loading.set(true);

    this.apiService
      .createOrder(
        this.cartService.activePerson()!.id,
        this.cartService.exportCart(),
      )
      .subscribe({
        next: (order) => {
          this.messageService.add({
            summary: `Success!!`,
            detail: 'Your order was placed succesfully.',
            severity: 'success',
          });

          this.cartService.clearCart();
          this.cartService.activePerson.set(undefined);
          this.router.navigate(['/member-selector']);
          this.loading.set(false);
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({
            summary: `Failed to place order`,
            detail: `${error.status}: ${error.statusText}`,
            severity: 'error',
          });
          this.loading.set(false);
        },
      });
  }
}
