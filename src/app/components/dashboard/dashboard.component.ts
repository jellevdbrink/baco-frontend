import { httpResource } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CartService } from '../../services/cart.service';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CurrencyPipe } from '@angular/common';

type SummaryData = {
  total_spent: number;
  total_orders: number;
  avg_order_value: number;
  avg_orders_per_day: number;
};

type ChartData = {
  labels: string[];
  values: number[];
};

@Component({
  selector: 'app-dashboard',
  imports: [CardModule, ChartModule, CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class Dashboard {
  private cartService = inject(CartService);

  protected globalSummary = httpResource<SummaryData>(
    () => `${environment.apiUrl}/analytics/summary/`,
  );
  protected userSummary = httpResource<SummaryData>(
    () =>
      `${environment.apiUrl}/analytics/summary/?user_id=${this.cartService.activePerson()?.id}`,
  );

  protected topProducts = httpResource<ChartData>(
    () => `${environment.apiUrl}/analytics/top-products/`,
  );
  protected topProductsChartData = computed(() =>
    this.topProducts.hasValue()
      ? {
          labels: this.topProducts.value().labels,
          datasets: [
            { label: 'Units sold', data: this.topProducts.value().values },
          ],
        }
      : undefined,
  );

  protected topUsers = httpResource<ChartData>(
    () => `${environment.apiUrl}/analytics/top-users/`,
  );
  protected topUsersChartData = computed(() =>
    this.topUsers.hasValue()
      ? {
          labels: this.topUsers.value().labels,
          datasets: [
            { label: 'Total spent (€)', data: this.topUsers.value().values },
          ],
        }
      : undefined,
  );

  protected dataLoaded = computed(
    () =>
      this.globalSummary.hasValue() &&
      this.userSummary.hasValue() &&
      this.topProducts.hasValue() &&
      this.topUsers.hasValue(),
  );

  protected salesOverTime = httpResource<ChartData>(
    () => `${environment.apiUrl}/analytics/sales-over-time/`,
  );
  protected salesOverTimeChartData = computed(() =>
    this.salesOverTime.hasValue()
      ? {
          labels: this.salesOverTime.value().labels,
          datasets: [
            {
              label: 'Items sold',
              data: this.salesOverTime.value().values,
              fill: false,
              borderColor: '#42A5F5',
            },
          ],
        }
      : undefined,
  );
}
