import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { IAccount, ICustomer } from '../entities/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountDetailModalComponent } from '../ui/account-detail-modal/account-detail-modal.component';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent {

  customer: ICustomer = this.storage.retrieve('customer');

  constructor(private storage: LocalStorageService, private modalService: NgbModal) { }

  showDetails(account: IAccount) {
    const modalRef = this.modalService.open(AccountDetailModalComponent, { size: 'xl' });
    modalRef.componentInstance.account = account;
  }
}
