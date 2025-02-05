import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerNamePipe } from './customer-name.pipe';
import { AccountsBalancePipe } from './accounts-balance.pipe';
import { TransactionsListPipe } from './transactions-list.pipe';



@NgModule({
  declarations: [
    CustomerNamePipe,
    AccountsBalancePipe,
    TransactionsListPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomerNamePipe,
    AccountsBalancePipe
  ]
})
export class PipesModule { }
