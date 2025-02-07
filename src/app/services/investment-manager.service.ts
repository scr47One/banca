import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionType } from '../entities/enums';
import { IAccount, IInvest } from '../entities/interfaces';

@Injectable({
  providedIn: 'root'
})
export class InvestmentManagerService {

  constructor() { }

  public addTransaction(investment: IInvest,  amount: number, fromAccountId: string, transactionType: TransactionType): Observable<IInvest> {
    return new Observable(observer => {
      if(amount <= 0) {
        observer.error('Invalid amount');
      }
      if ((transactionType === TransactionType.TRANSFER || transactionType === TransactionType.WITHDRAW) && investment.balance < amount) {
        observer.error('Insufficient balance');
      }
      switch (transactionType) {
        case TransactionType.DEPOSIT:
          investment.balance += amount;
          break;
        case TransactionType.WITHDRAW:
          investment.balance -= amount;
          break;
        case TransactionType.TRANSFER:
          investment.balance -= amount;
          break;
        default:
          observer.error('Invalid transaction type');
          break;
      }
      investment.transactions.push({
        transactionId: Math.random().toString(36).substring(2, 9),
        accountId: investment.investmentId,
        fromAccountId,
        amount,
        transactionDate: new Date(),
        transactionType
      });
      observer.next(investment);
      observer.complete();
    });
  }
}
