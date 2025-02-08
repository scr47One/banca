import { Pipe, PipeTransform } from '@angular/core';
import { IInvestRate } from '../entities/interfaces';

@Pipe({
  name: 'rateDescription'
})
export class RateDescriptionPipe implements PipeTransform {

  transform(rate: IInvestRate): string {
    const rateFormat = `${rate.rate * 100}%`;
    switch(rate.term) {
      case '1':
        return '1 mes' + ' - ' + rateFormat;
      case '3':
        return '3 meses' + ' - ' + rateFormat;
      case '6':
        return '6 meses' + ' - ' + rateFormat;
      default:
        return 'Indefinido';
    }
  }

}
