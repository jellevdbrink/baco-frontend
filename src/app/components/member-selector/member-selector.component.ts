import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TeamMember } from '../../models';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-member-selector',
  imports: [CardModule, AvatarModule],
  templateUrl: './member-selector.component.html',
  styleUrl: './member-selector.component.css',
})
export class MemberSelector {
  private apiService = inject(ApiService);
  private cartService = inject(CartService);
  private router = inject(Router);

  protected teamMembers = this.apiService.teamMembers;

  protected selectMember(teamMember: TeamMember) {
    this.cartService.activePerson.set(teamMember);
    this.apiService.teamMembers.reload();
    this.router.navigate(['/products']);
  }
}
