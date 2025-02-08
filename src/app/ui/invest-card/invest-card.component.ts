import { Component, Input } from '@angular/core';
import { IInvest } from 'src/app/entities/interfaces';

@Component({
  selector: 'invest-card',
  templateUrl: './invest-card.component.html',
  styleUrls: ['./invest-card.component.scss']
})
export class InvestCardComponent {
  @Input('invest')
    invest?: IInvest;
}
