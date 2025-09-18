import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [MenuModule, BadgeModule, AvatarModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class Sidebar implements OnInit {
  private apiService = inject(ApiService);
  private cartService = inject(CartService);
  private router = inject(Router);

  protected activeCategory = this.apiService.categoryId;
  protected categories$ = this.apiService.getCategories();

  protected activePerson = this.cartService.activePerson;
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
              target: '_blank',
            },
            {
              label: 'Cart',
              icon: 'shopping-cart',
              badge: 'yes',
            },
            {
              label: 'Quit',
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
    this.apiService.categoryId.set(categoryId);
  }

  protected logOut() {
    this.cartService.activePerson.set(undefined);
    this.router.navigate(['/member-selector']);
  }
}
