import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionType } from '../entities/enums';
import { IAccount } from '../entities/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountManagerService {

  constructor() { }

  public addTransaction(account: IAccount, amount: number, fromAccountId: string, transactionType: TransactionType): Observable<IAccount> {
    return new Observable(observer => {
      if (transactionType === TransactionType.DEPOSIT) {
        account.balance += amount;
      } else if (transactionType === TransactionType.WITHDRAW) {
        if (account.balance >= amount) {
          account.balance -= amount;
        } else {
          observer.error('Insufficient funds');
          return;
        }
      } else if (transactionType === TransactionType.TRANSFER) {
        if (account.balance >= amount) {
          account.balance -= amount;
        } else {
          observer.error('Insufficient funds');
          return;
        }
      }
      account.transactions.push({
        transactionId: Math.random().toString(36).substring(2, 9),
        accountId: account.accountId,
        fromAccountId,
        amount: amount,
        transactionDate: new Date(),
        transactionType: transactionType
      });
      observer.next(account);
      observer.complete();
    });
  }
}
