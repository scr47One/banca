import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { TransactionType } from 'src/app/entities/enums';
import { ICustomer, IAccount, IInvest, ICurrency, IInvestRate } from 'src/app/entities/interfaces';
import { AccountManagerService } from 'src/app/services/local/account-manager.service';
import { CustomerManagerService } from 'src/app/services/local/customer-manager.service';
import { InvestmentManagerService } from 'src/app/services/local/investment-manager.service';
import { LocalStorageCustomerDataService } from 'src/app/services/local/local-storage-customer-data.service';
import { AlertComponent } from '../alert/alert.component';
import { CurrencyExchangeManagerService } from 'src/app/services/local/currency-exchange-manager.service';
import { defaultInvestment, defaultRates } from 'src/app/entities/defaults';

@Component({
  selector: 'app-investment-modal-add',
  templateUrl: './investment-modal-add.component.html',
  styleUrls: ['./investment-modal-add.component.scss']
})
export class InvestmentModalAddComponent {

    @Input('customer') customer?: ICustomer;
    @Input('currencies') currencies: ICurrency[] = [];
    investment: IInvest = defaultInvestment
    modalRef: NgbModalRef | undefined;
    rates: IInvestRate[] = defaultRates;
    accountCurrency: string = '.';

    transactionType = Object.values(TransactionType);

    form: FormGroup = this.formBuilder.group({
      fromAccount: [undefined, Validators.required],
      investName: [undefined, Validators.required],
      investRate: [undefined, Validators.required],
      currency: [undefined, Validators.required],
      amount: [undefined, Validators.required]
    });

    constructor(
      public activeModal: NgbActiveModal,
      private modalService: NgbModal,
      private formBuilder: FormBuilder,
      private accountService: AccountManagerService,
      private investService: InvestmentManagerService,
      private customerService: CustomerManagerService,
      private localStorageCustomer: LocalStorageCustomerDataService,
      private currencyExchangeService: CurrencyExchangeManagerService
    ) { }

    onAccountChange() {
      const account = this.form.get('fromAccount')?.value as IAccount;
      console.log(account);
      this.accountCurrency = account.currency;
      console.log(this.accountCurrency);
    }

    submitOperation() {
      const fromAccount = this.form.get('fromAccount')?.value as IAccount;
      const investName = this.form.get('investName')?.value as string;
      const investRate = this.form.get('investRate')?.value as IInvestRate;
      const fromCurrency = fromAccount.currency;
      const toCurrency = this.form.get('currency')?.value as string;

      let amount = this.form.get('amount')?.value as number;
      let amountConverted = amount;

      if (fromCurrency !== toCurrency) {
        this.currencyExchangeService.convertCurrencyAmount( amount, fromCurrency, toCurrency ).subscribe({
          next: (convertedAmount) => {
            amountConverted = convertedAmount;
            this.addInvestment(investName, toCurrency, investRate, fromAccount,  amountConverted, amount );
          },
          error: (error) => {
            this.showAlert(error, 'danger');
          }
        });
      } else {
        this.addInvestment(investName, toCurrency, investRate, fromAccount, amount);
      }
    }

    addInvestment(investName: string, currency: string, investRate: IInvestRate, fromAccount: IAccount, amount: number, amountAfterExchange?: number) {
      this.investment.accountName = investName;
      this.investment.currency = currency;
      this.investment.investRate = investRate;
      this.customerService.addInvestment(this.customer!, this.investment ).subscribe({
        next: ({customer, investment}) => {
          this.customer = customer;
          this.addTransaction(investment, fromAccount, amount, amountAfterExchange || amount);
        },
        error: (error) => {
          alert(error);
        }
      });
    }

    addTransaction(investment: IInvest,  fromAccount: IAccount,  amount: number, amountAfterExchange: number) {
      this.investService.addTransaction(investment, amount, fromAccount.accountId, TransactionType.DEPOSIT).subscribe({
        next: (fam) => {
          this.accountService.addTransaction(fromAccount, amountAfterExchange, investment.accountId, TransactionType.WITHDRAW).subscribe({
            next: (tam) => {
              this.updateStorageCustomer(tam, fam);
              this.investment = defaultInvestment;
              this.activeModal.dismiss();
            },
            error: (error) => {
              this.showAlert(error, 'danger');
            }
          });
        },
        error: (error) => {
          alert(error);
        }
      });
    }

    updateStorageCustomer(account: IAccount, invest: IInvest) {
      this.customer!.accounts[this.customer!.accounts.findIndex(i => i.accountId === account.accountId)] = account;
      this.customer!.investments[this.customer!.investments.findIndex(i => i.accountId === invest.accountId)] = invest;
      this.localStorageCustomer.setCustomer(this.customer!);
      this.showAlert('Operación realizada con éxito', 'success');
    }

    showAlert(message: string, type: string) {
      this.modalRef = this.modalService.open(AlertComponent)
      this.modalRef.componentInstance!.message = message;
      this.modalRef.componentInstance!.type = type;
    }
}
