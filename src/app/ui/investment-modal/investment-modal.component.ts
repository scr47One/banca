import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionType } from 'src/app/entities/enums';
import { IAccount, ICustomer, IInvest } from 'src/app/entities/interfaces';
import { AccountManagerService } from 'src/app/services/local/account-manager.service';
import { CurrencyExchangeManagerService } from 'src/app/services/local/currency-exchange-manager.service';
import { InvestmentManagerService } from 'src/app/services/local/investment-manager.service';
import { LocalStorageCustomerDataService } from 'src/app/services/local/local-storage-customer-data.service';

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

  currencyKey: string = '.';

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private investService: InvestmentManagerService,
    private localStorageCustomer: LocalStorageCustomerDataService,
    private currencyExchangeService: CurrencyExchangeManagerService,
    private accountService: AccountManagerService) { }

  onAccountChange() {
    const currency = this.form.get('toAccount')?.value as IAccount;
    this.currencyKey = currency.currency;
  }

  submitOperation() {
    const fromAccount = this.form.get('fromAccount')?.value as IAccount;
    const toAccount = this.form.get('toAccount')?.value as IInvest;
    const amount = this.form.get('amount')?.value as number;
    const operationType = this.form.get('operationType')?.value as TransactionType;
    const operationTypeAccount = operationType === TransactionType.DEPOSIT ? TransactionType.WITHDRAW : TransactionType.DEPOSIT;

    const toCurrency = fromAccount.currency;
    const fromCurrency = toAccount.currency;

    if (fromCurrency !== toCurrency) {
      this.currencyExchangeService.convertCurrencyAmount( amount, fromCurrency, toCurrency ).subscribe({
        next: (convertedAmount) => {
          this.addTransaction(toAccount, fromAccount, operationType, operationTypeAccount, convertedAmount, amount);
          this.activeModal.dismiss();
        },
        error: (error) => {
          alert(error);
        }
      });
    } else {
      this.addTransaction(toAccount, fromAccount, operationType, operationTypeAccount, amount, amount);
      this.activeModal.dismiss();
    }
  }

  addTransaction(toAccount: IInvest, fromAccount: IAccount , operationType: TransactionType, operationTypeAccount: TransactionType, amount: number, amountConverted: number) {
    this.investService.addTransaction(toAccount, amountConverted, fromAccount.accountId, operationType).subscribe({
      next: (fam) => {
        this.accountService.addTransaction(fromAccount, amount, toAccount.accountId , operationTypeAccount).subscribe({
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
    this.customer!.investments[this.customer!.investments.findIndex(i => i.accountId === invest.accountId)] = invest;
    this.localStorageCustomer.setCustomer(this.customer!);
  }
}
