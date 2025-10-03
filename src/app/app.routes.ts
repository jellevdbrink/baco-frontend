import { Routes } from '@angular/router';
import { MemberSelector } from './components/member-selector/member-selector.component';
import { SelectMemberGuard } from './other/select-member.guard';
import { Products } from './components/products/products.component';
import { Cart } from './components/cart/cart.component';
import { Login } from './components/login/login.component';
import { AuthGuard } from './other/auth.guard';
import { Payment } from './components/payment/payment.component';
import { Dashboard } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'member-selector',
    component: MemberSelector,
    canActivate: [AuthGuard],
  },

  {
    path: 'products',
    component: Products,
    canActivate: [AuthGuard, SelectMemberGuard],
  },
  {
    path: 'cart',
    component: Cart,
    canActivate: [AuthGuard, SelectMemberGuard],
  },
  {
    path: 'payment',
    component: Payment,
    canActivate: [AuthGuard, SelectMemberGuard],
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard, SelectMemberGuard],
  },

  { path: '**', redirectTo: 'login' },
];
