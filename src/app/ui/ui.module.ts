import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountCardComponent } from './account-card/account-card.component';
import { AccDetailModalComponent } from './acc-detail-modal/acc-detail-modal.component';
import { TransaccionListComponent } from './transaccion-list/transaccion-list.component';



@NgModule({
  declarations: [
    AccountCardComponent,
    AccDetailModalComponent,
    TransaccionListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccountCardComponent,
    TransaccionListComponent
  ]
})
export class UiModule { }
