import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { IAccount, ICustomer } from '../entities/interfaces';
import { AccountManagerService } from '../services/account-manager.service';
import { TranscationType } from '../entities/enums';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent {

  customer: ICustomer = this.storage.retrieve('customer');

  constructor(private storage: LocalStorageService, private accountManagerService: AccountManagerService) { }


  showDetails(account: IAccount) {
    alert(`Account: ${account.accountName} Balance: ${account.balance}`);

    this.accountManagerService.addTransaction(account, 100, TranscationType.TRANSFER)
      .subscribe({
        next: (account: IAccount) => {
          this.accountManagerService.addTransaction(account, 100, TranscationType.DEPOSIT)
          .subscribe({
            next: (account: IAccount) => {

            },
            error: (error) => { }
          });
        },
        error: (error) => { }
      });
  }
}
