import { Pipe, PipeTransform } from '@angular/core';
import { TransactionType } from '../entities/enums';
@Pipe({
  name: 'transactionType'
})
export class TransactionTypePipe implements PipeTransform {

  transform(value: TransactionType): string {
    switch (value) {
      case TransactionType.DEPOSIT:
        return 'Depósito';
      case TransactionType.WITHDRAW:
        return 'Retiro';
      case TransactionType.TRANSFER:
        return 'Transferencia';
      default:
        return 'Desconocido';
    }
  }

}
