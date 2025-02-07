import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer, IInvest } from 'src/app/entities/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomerManagerService {

  constructor() { }

  public addInvestment(customer: ICustomer, investment: IInvest): Observable<{customer: ICustomer, investment: IInvest}> {
    return new Observable(observer => {
      investment.accountId = Math.random().toString(36).substring(2, 9);
      customer.investments.push(investment);
      observer.next({customer, investment});
      observer.complete();
    });
  }
}
