import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, httpResource } from '@angular/common/http';
import {
  Category,
  Order,
  OrderItemDto,
  Payment,
  PaymentDto,
  Product,
  Team,
  TeamMember,
} from '../models';
import { map, Observable } from 'rxjs';

type receivedProduct = Omit<Product, 'price'> & { price: string };
type receivedTeamMember = Omit<TeamMember, 'balance'> & { balance: string };

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

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

  public teamMembers = httpResource<TeamMember[]>(
    () => `${environment.apiUrl}/team-members/`,
    {
      defaultValue: [],
      parse: (resp: unknown) =>
        (resp as receivedTeamMember[]).map<TeamMember>((tm) => ({
          ...tm,
          balance: parseFloat(tm.balance),
        })),
    },
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

  public createPayment(dto: PaymentDto) {
    const formData = new FormData();
    formData.append('by', dto.by.toString());
    formData.append('amount', dto.amount.toString());
    formData.append('description', dto.description);
    formData.append('proof_picture', dto.proof_picture);

    return this.http.post<Payment>(`${environment.apiUrl}/payments/`, formData);
  }
}
