import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  Category,
  Order,
  OrderItemDto,
  Product,
  Team,
  TeamMember,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  public getCategories() {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  public getProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  public getTeamMembers() {
    return this.http.get<TeamMember[]>(`${environment.apiUrl}/members`);
  }

  public getTeams() {
    return this.http.get<Team[]>(`${environment.apiUrl}/teams`);
  }

  public createOrder(by: number, items: OrderItemDto[]) {
    return this.http.post<Order>(`${environment.apiUrl}/orders`, { by, items });
  }
}
