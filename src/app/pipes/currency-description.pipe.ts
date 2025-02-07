import { Pipe, PipeTransform } from '@angular/core';
import { ICurrency } from '../entities/interfaces';

@Pipe({
  name: 'currencyDescription'
})
export class CurrencyDescriptionPipe implements PipeTransform {

  transform(currency: ICurrency): unknown {
    return `${currency.code} - ${currency.name}`;
  }

}
