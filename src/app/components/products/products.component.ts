import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class Products {
  private apiService = inject(ApiService);

  protected products = this.apiService.products;
}
