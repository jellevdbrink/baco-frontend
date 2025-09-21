import { Routes } from '@angular/router';
import { MemberSelector } from './components/member-selector/member-selector.component';
import { SelectMemberGuard } from './other/select-member.guard';
import { Products } from './components/products/products.component';
import { Cart } from './components/cart/cart.component';

export const routes: Routes = [
  { path: 'member-selector', component: MemberSelector, canActivate: [] },

  { path: 'products', component: Products, canActivate: [SelectMemberGuard] },
  { path: 'cart', component: Cart, canActivate: [SelectMemberGuard] },

  { path: '**', redirectTo: 'member-selector' },
];
