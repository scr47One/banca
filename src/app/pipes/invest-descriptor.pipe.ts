import { Pipe, PipeTransform } from '@angular/core';
import { IInvest } from '../entities/interfaces';

@Pipe({
  name: 'investDescriptor'
})
export class InvestDescriptorPipe implements PipeTransform {

  transform(invest: IInvest): string{
    return `${invest.accountId} ${invest.accountName}`;
  }

}
