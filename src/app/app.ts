import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar.component';
import { CartService } from './services/cart.service';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Toast, MessageModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [MessageService],
})
export class App {
  private cartService = inject(CartService);

  protected showSideBar = () => this.cartService.activePerson() !== undefined;

  protected balanceMessage = computed(() => {
    const balanceBadgeColour = this.cartService.balanceBadgeColour();
    if (balanceBadgeColour === 'success') {
      return undefined;
    }

    return {
      severity: balanceBadgeColour === 'warn' ? 'warn' : 'error',
      detail: balanceBadgeColour === 'warn' ? 'Warning!!' : 'WARNING!!',
      message:
        balanceBadgeColour === 'warn'
          ? 'Your balance is almost too low, please give more money. Under €0 you cannot order.'
          : 'Your balance is too low, you have to give money now and you cannot order now.',
    };
  });
}
