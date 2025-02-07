import { Component, Input, OnInit } from '@angular/core';
import { ICustomer, IInvest } from '../entities/interfaces';
import { LocalStorageService } from 'ngx-webstorage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvestmentManagerService } from '../services/investment-manager.service';
import { TransactionType } from '../entities/enums';
import { InvestmentModalComponent } from '../ui/investment-modal/investment-modal.component';


@Component({
  selector: 'investments-list',
  templateUrl: './investments-list.component.html',
  styleUrls: ['./investments-list.component.scss']
})
export class InvestmentsListComponent implements OnInit {
  customer: ICustomer = this.storage.retrieve('customer');

  constructor(private storage: LocalStorageService, private investmentService: InvestmentManagerService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.startInvestmentTimer();
  }

  calcInvestmentProfit(investment: IInvest) {
    return investment.balance * investment.investRate;
  }

  startInvestmentTimer() {
    setInterval(() => {
      this.customer.investments.forEach(investment => {
        this.investmentService.addTransaction(investment, this.calcInvestmentProfit(investment), TransactionType.DEPOSIT).subscribe({
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
}
