import { Component, ViewChild, inject, TemplateRef} from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { IAccount, ICustomer } from '../entities/interfaces';
import { AccountManagerService } from '../services/account-manager.service';
import { TranscationType } from '../entities/enums';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent {
  private modalService = inject(NgbModal);
  selectedAccount: IAccount | null = null;
  customer: ICustomer = this.storage.retrieve('customer');
  @ViewChild('content') contentTemplate!: TemplateRef<any>;

  operation = {
    fromAccount: '',
    toAccount: '',
    balance: 0,
    movementType: 'deposit',
    amount: 0,
  };

  constructor(private storage: LocalStorageService) { }

  openBankOperationModal(content: TemplateRef<any>) {
    this.operation = {
      fromAccount: '',
      toAccount: '',
      balance: 0,
      movementType: 'deposit',
      amount: 0,
    };
    this.modalService.open(content, { size: 'lg' });
  }

  submitOperation() {
    console.log('Operación:', this.operation);


    this.modalService.dismissAll();

    this.operation = {
      fromAccount: '',
      toAccount: '',
      balance: 0,
      movementType: 'deposit',
      amount: 0,
    };
  }

  showDetails(account: IAccount) {
    this.selectedAccount = account;
    this.modalService.open(this.contentTemplate);
  }
}
