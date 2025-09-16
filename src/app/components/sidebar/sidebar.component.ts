import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AsyncPipe } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { httpResource } from '@angular/common/http';
import { Category } from '../../models';

@Component({
  selector: 'app-sidebar',
  imports: [MenuModule, BadgeModule, AvatarModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class Sidebar implements OnInit {
  private apiService = inject(ApiService);

  protected categories$ = this.apiService.getCategories();
  //protected categories = httpResource<Category[]>(this.apiService.getCategoriesUrl);

  protected menuItems?: MenuItem[];

  ngOnInit(): void {
    this.categories$.subscribe((cats) => {
      this.menuItems = [
        {
          separator: true,
        },
        {
          label: 'Categories',
          items: cats.map((cat) => ({
            label: cat.name,
            icon: `pi pi-${cat.icon}`
          }))
        },
        {
          label: 'Other',
          items: [
            {
              label: 'Admin',
              icon: 'pi pi-cog',
            },
            {
              label: 'Cart',
              icon: 'pi pi-shopping-cart',
              badge: '2',
            },
            {
              label: 'Quit',
              icon: 'pi pi-sign-out',
            },
          ],
        },
        {
          separator: true,
        },
      ];
    });
  }
}
