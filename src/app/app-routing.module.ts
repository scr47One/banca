import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { MovementsComponent } from './movements/movements.component';
import { InvestComponent } from './invest/invest.component';
const routes: Routes = [
  { path: '', redirectTo: '/accounts-list', pathMatch: 'full' },
  { path: 'accounts-list', component: AccountsListComponent },
  { path: 'movements', component: MovementsComponent },
  { path: 'investments', component: InvestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
