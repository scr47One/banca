import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionType } from 'src/app/entities/enums';
import { IAccount, ICustomer, IInvest } from 'src/app/entities/interfaces';
import { AccountManagerService } from 'src/app/services/account-manager.service';
import { InvestmentManagerService } from 'src/app/services/investment-manager.service';
import { LocalStorageCustomerDataService } from 'src/app/services/local-storage-customer-data.service';

@Component({
  selector: 'app-investment-modal',
  templateUrl: './investment-modal.component.html',
  styleUrls: ['./investment-modal.component.scss']
})
export class InvestmentModalComponent {

  @Input('customer') customer?: ICustomer;

  transactionType = Object.values(TransactionType);

  form: FormGroup = this.formBuilder.group({
    operationType: [undefined, Validators.required],
    fromAccount: [undefined, Validators.required],
    toAccount: [undefined, Validators.required],
    amount: [undefined, Validators.required]
  });

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private investService: InvestmentManagerService, private accountService: AccountManagerService) { }

  submitOperation() {
    const fromAccount = this.form.get('fromAccount')?.value as IAccount;
    const toAccount = this.form.get('toAccount')?.value as IInvest;
    const amount = this.form.get('amount')?.value as number;
    const operationType = this.form.get('operationType')?.value as TransactionType;
    const operationTypeAccount = operationType === TransactionType.DEPOSIT ? TransactionType.WITHDRAW : TransactionType.DEPOSIT;

    this.investService.addTransaction(toAccount, amount, fromAccount.accountId, operationType).subscribe({
      next: (fam) => {
        this.accountService.addTransaction(fromAccount, amount, toAccount.investmentId, operationTypeAccount).subscribe({
          next: (tam) => {
            this.updateCustomer(tam, fam);
            this.activeModal.dismiss();
          },
          error: (error) => {
            alert(error);
          }
        });
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  updateCustomer(account: IAccount, invest: IInvest) {
    this.customer!.accounts[this.customer!.accounts.findIndex(i => i.accountId === account.accountId)] = account;
    this.customer!.investments[this.customer!.investments.findIndex(i => i.investmentId === invest.investmentId)] = invest;
  }
}
