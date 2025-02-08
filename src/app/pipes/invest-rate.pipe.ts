import { Pipe, PipeTransform } from '@angular/core';
import { IInvestRate } from '../entities/interfaces';

@Pipe({
  name: 'investRate'
})
export class InvestRatePipe implements PipeTransform {

  transform(investRate: IInvestRate): string {
    switch(investRate.term) {
      case '1':
        return '+' + investRate.rate * 100 + '%' + ' - ' + '1 mes';
      case '3':
        return '+' + investRate.rate * 100 + '%' + ' - ' + '3 meses';
      case '6':
        return '+' + investRate.rate * 100 + '%' + ' - ' + '6 meses';
      default:
        return 'Indefinido';
    }
  }

}
