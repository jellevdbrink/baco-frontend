import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar.component';
import { Products } from '../../components/products/products.component';

@Component({
  selector: 'app-main',
  imports: [Sidebar, Products],
  templateUrl: './main.page.html',
  styleUrl: './main.page.css',
})
export class MainPage {}
