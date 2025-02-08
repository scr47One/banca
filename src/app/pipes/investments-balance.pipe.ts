import { Pipe, PipeTransform } from '@angular/core';
import { IInvest } from '../entities/interfaces';

@Pipe({
  name: 'investmentsBalance'
})
export class InvestmentsBalancePipe implements PipeTransform {

  transform(investments: IInvest[]): number {
      return investments.reduce((sum, invest) => sum + invest.balance, 0);
    }

}
