import { Component, Input, OnInit } from '@angular/core';
import { ICurrency, ICustomer, IInvest } from '../entities/interfaces';
import { LocalStorageService } from 'ngx-webstorage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvestmentManagerService } from '../services/local/investment-manager.service';
import { TransactionType } from '../entities/enums';
import { InvestmentModalComponent } from '../ui/investment-modal/investment-modal.component';
import { InvestmentModalAddComponent } from '../ui/investment-modal-add/investment-modal-add.component';
import { CurrencyExchangeManagerService } from '../services/local/currency-exchange-manager.service';


@Component({
  selector: 'investments-list',
  templateUrl: './investments-list.component.html',
  styleUrls: ['./investments-list.component.scss']
})
export class InvestmentsListComponent implements OnInit {
  customer: ICustomer = this.storage.retrieve('customer');
  currencies: ICurrency[] = this.storage.retrieve('currencies');

  constructor(
    private storage: LocalStorageService,
    private investmentService: InvestmentManagerService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.startInvestmentTimer();
  }

  calcInvestmentProfit(investment: IInvest) {
    return investment.balance * investment.investRate.rate;
  }

  startInvestmentTimer() {
    setInterval(() => {
      this.customer.investments.forEach(investment => {
        this.investmentService.addTransaction(investment, this.calcInvestmentProfit(investment), investment.accountId, TransactionType.DEPOSIT).subscribe({
          next: (inv) => {
            investment = inv;
          },
          error: (error) => {
            alert(error);
          }
        });
      });
      this.storage.store('customer', this.customer);
    }, 60000 * 5);
  }

  openInvestmentModal() {
    const modalRef = this.modalService.open(InvestmentModalComponent);
    modalRef.componentInstance.customer = this.customer;
  }

  openInvestmentModalAdd() {
    const modalRef = this.modalService.open(InvestmentModalAddComponent);
    modalRef.componentInstance.customer = this.customer
    modalRef.componentInstance.currencies = this.currencies;
  }
}
