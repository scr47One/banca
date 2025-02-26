import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerNamePipe } from './customer-name.pipe';
import { AccountsBalancePipe } from './accounts-balance.pipe';
import { TransactionsListPipe } from './transactions-list.pipe';
import { AccountDescriptorPipe } from './account-descriptor.pipe';
import { TransactionTypePipe } from './transaction-type.pipe';
import { InvestmentsBalancePipe } from './investments-balance.pipe';
import { InvestRatePipe } from './invest-rate.pipe';
import { InvestDescriptorPipe } from './invest-descriptor.pipe';
import { TransactionDescriptionPipe } from './transaction-description.pipe';
import { CurrencyDescriptionPipe } from './currency-description.pipe';
import { RateDescriptionPipe } from './rate-description.pipe';



@NgModule({
  declarations: [
    CustomerNamePipe,
    AccountsBalancePipe,
    TransactionsListPipe,
    AccountDescriptorPipe,
    TransactionTypePipe,
    InvestmentsBalancePipe,
    InvestRatePipe,
    InvestDescriptorPipe,
    TransactionDescriptionPipe,
    CurrencyDescriptionPipe,
    RateDescriptionPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomerNamePipe,
    AccountsBalancePipe,
    AccountDescriptorPipe,
    TransactionTypePipe,
    InvestmentsBalancePipe,
    InvestRatePipe,
    InvestDescriptorPipe,
    TransactionDescriptionPipe,
    CurrencyDescriptionPipe,
    RateDescriptionPipe
  ]
})
export class PipesModule { }
