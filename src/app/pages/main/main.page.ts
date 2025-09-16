import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-main',
  imports: [Sidebar],
  templateUrl: './main.page.html',
  styleUrl: './main.page.css',
})
export class MainPage {}
