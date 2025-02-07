import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'investRate'
})
export class InvestRatePipe implements PipeTransform {

  transform(investRate: number): unknown {
    return '+' + investRate * 100 + '%';
  }

}
