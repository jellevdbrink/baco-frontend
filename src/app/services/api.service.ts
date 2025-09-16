import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  Category,
  Order,
  OrderItemDto,
  Product,
  Team,
  TeamMember,
} from '../models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  public getCategories() {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  public getProducts(): Observable<Product[]> {
    return this.http
      .get<any[]>(`${environment.apiUrl}/products`)
      .pipe(
        map((products) =>
          products.map<Product>((product) => ({
            ...product,
            price: parseFloat(product.price),
          })),
        ),
      );
  }

  public getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${environment.apiUrl}/members`);
  }

  public getTeams(): Observable<Team[]> {
    return this.http
      .get<any[]>(`${environment.apiUrl}/teams`)
      .pipe(
        map((teams) =>
          teams.map<Team>((team) => ({
            ...team,
            start_date: new Date(team.start_date),
          })),
        ),
      );
  }

  public createOrder(by: number, items: OrderItemDto[]) {
    return this.http.post<Order>(`${environment.apiUrl}/orders`, { by, items });
  }
}
