import { Component, Input } from '@angular/core';
import { IAccount } from 'src/app/entities/interfaces';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'account-detail-modal',
  templateUrl: './account-detail-modal.component.html',
  styleUrls: ['./account-detail-modal.component.scss']
})
export class AccountDetailModalComponent {

  @Input()
  account?: IAccount;
  constructor(public activeModal: NgbActiveModal){}
}
