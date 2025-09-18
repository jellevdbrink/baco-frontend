import { Routes } from '@angular/router';
import { MemberSelector } from './components/member-selector/member-selector.component';
import { SelectMemberGuard } from './other/select-member.guard';
import { Products } from './components/products/products.component';

export const routes: Routes = [
  { path: 'products', component: Products, canActivate: [SelectMemberGuard] },
  { path: 'member-selector', component: MemberSelector, canActivate: [] },

  { path: '**', redirectTo: 'products' },
];
