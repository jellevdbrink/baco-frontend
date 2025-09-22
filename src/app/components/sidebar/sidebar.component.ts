import { Component, computed, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [MenuModule, BadgeModule, AvatarModule, CurrencyPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class Sidebar implements OnInit {
  private apiService = inject(ApiService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected categories$ = this.apiService.getCategories();

  protected activePerson = this.cartService.activePerson;
  protected balanceActivePerson = this.cartService.balanceActivePerson;
  protected numItemsInCart = this.cartService.numItemsInCart;

  protected menuItems?: MenuItem[];

  ngOnInit(): void {
    this.categories$.subscribe((cats) => {
      this.menuItems = [
        {
          separator: true,
        },
        {
          label: 'Categories',
          items: [
            {
              label: 'All',
              icon: 'all',
              command: () => this.changeCategory(undefined),
            },
            ...cats.map((cat) => ({
              label: cat.name,
              icon: `${cat.icon}`,
              command: () => this.changeCategory(cat.id),
            })),
          ],
        },
        {
          label: 'Other',
          items: [
            {
              label: 'Admin',
              icon: 'cog',
              url: `${environment.apiUrl.slice(0, -3)}admin`,
            },
            {
              label: 'Cart',
              icon: 'shopping-cart',
              badge: 'cart',
              command: () => this.router.navigate(['/cart']),
            },
            {
              label: 'Balance',
              icon: 'money-bill',
              badge: 'payment',
              command: () => this.router.navigate(['/payment']),
            },
            {
              label: 'Quit',
              icon: 'pi pi-times',
              command: () => this.quit(),
            },
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
              command: () => this.logOut(),
            },
          ],
        },
        {
          separator: true,
        },
      ];
    });
  }

  protected changeCategory(categoryId: number | undefined): void {
    this.router.navigate(['/products'], {
      queryParams: { categoryId },
    });
  }

  private quit(): void {
    this.cartService.reset();
    this.router.navigate(['/member-selector']);
  }

  private logOut(): void {
    this.cartService.reset();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
