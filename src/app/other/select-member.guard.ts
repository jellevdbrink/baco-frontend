import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class SelectMemberGuard implements CanActivate {
  private router = inject(Router);
  private cartService = inject(CartService);

  public canActivate(): boolean {
    if (this.cartService.activePerson() === undefined) {
      this.router.navigate(['/member-selector']);
      return false;
    }

    return true;
  }
}
