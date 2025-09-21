import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, httpResource } from '@angular/common/http';
import {
  Category,
  Order,
  OrderItemDto,
  Product,
  Team,
  TeamMember,
} from '../models';
import { map, Observable } from 'rxjs';

type receivedProduct = Omit<Product, 'price'> & { price: string };

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  public categoryId = signal<number | undefined>(undefined);

  public products = httpResource<Product[]>(
    () => `${environment.apiUrl}/products/`,
    {
      defaultValue: [],
      parse: (resp: unknown) =>
        (resp as receivedProduct[]).map<Product>((p) => ({
          ...p,
          price: parseFloat(p.price),
        })),
    },
  );

  public filteredProducts = computed(() =>
    this.products
      .value()
      .filter(
        (product) =>
          this.categoryId() === undefined ||
          product.category.id === this.categoryId(),
      ),
  );

  public teamMembers = httpResource<TeamMember[]>(
    () => `${environment.apiUrl}/team-members/`,
    { defaultValue: [] },
  );

  public getCategories() {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories/`);
  }

  public getTeams(): Observable<Team[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/teams/`).pipe(
      map((teams) =>
        teams.map<Team>((team) => ({
          ...team,
          start_date: new Date(team.start_date),
        })),
      ),
    );
  }

  public createOrder(by: number, items: OrderItemDto[]) {
    return this.http.post<Order>(`${environment.apiUrl}/orders/`, {
      by,
      items,
    });
  }
}
