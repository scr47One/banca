import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountCardComponent } from './account-card/account-card.component';
import { AccountDetailModalComponent } from './account-detail-modal/account-detail-modal.component';
import { TransaccionListComponent } from './transaccion-list/transaccion-list.component';
import { TransactionModalComponent } from './transaction-modal/transaction-modal.component';
import { PipesModule } from '../pipes/pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { InvestCardComponent } from './invest-card/invest-card.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { InvestmentModalComponent } from './investment-modal/investment-modal.component';
import { InvestmentModalAddComponent } from './investment-modal-add/investment-modal-add.component';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [
    AccountCardComponent,
    AccountDetailModalComponent,
    TransaccionListComponent,
    TransactionModalComponent,
    InvestCardComponent,
    CustomerDataComponent,
    InvestmentModalComponent,
    InvestmentModalAddComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAccordionModule,
    NgbAlertModule
  ],
  exports: [
    AccountCardComponent,
    TransaccionListComponent,
    InvestCardComponent
  ]
})
export class UiModule { }
