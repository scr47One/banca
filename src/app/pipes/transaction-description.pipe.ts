import { Pipe, PipeTransform } from '@angular/core';
import { IAccount, IInvest, ITransaction } from '../entities/interfaces';
import { TransactionType } from '../entities/enums';

@Pipe({
  name: 'transactionDescription'
})
export class TransactionDescriptionPipe implements PipeTransform {

  transform(transaction: ITransaction): string {
    return `${transaction.transactionType === TransactionType.DEPOSIT ? 'desde' : 'a la cuenta'} ${transaction.fromAccountId}`;
  }

}
