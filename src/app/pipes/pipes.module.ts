import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerNamePipe } from './customer-name.pipe';
import { AccountsBalancePipe } from './accounts-balance.pipe';
import { TransactionsListPipe } from './transactions-list.pipe';
import { AccountDescriptorPipe } from './account-descriptor.pipe';
import { TransactionTypePipe } from './transaction-type.pipe';



@NgModule({
  declarations: [
    CustomerNamePipe,
    AccountsBalancePipe,
    TransactionsListPipe,
    AccountDescriptorPipe,
    TransactionTypePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomerNamePipe,
    AccountsBalancePipe,
    AccountDescriptorPipe,
    TransactionTypePipe
  ]
})
export class PipesModule { }
