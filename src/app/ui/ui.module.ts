import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountCardComponent } from './account-card/account-card.component';
import { AccountDetailModalComponent } from './account-detail-modal/account-detail-modal.component';
import { TransaccionListComponent } from './transaccion-list/transaccion-list.component';
import { TransactionModalComponent } from './transaction-modal/transaction-modal.component';
import { PipesModule } from '../pipes/pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AccountCardComponent,
    AccountDetailModalComponent,
    TransaccionListComponent,
    TransactionModalComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAccordionModule
  ],
  exports: [
    AccountCardComponent,
    TransaccionListComponent
  ]
})
export class UiModule { }
