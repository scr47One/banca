import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input('message') message: string = '';
  @Input('type') type: string = 'info';

  constructor() { }

  getClass() {
    return `alert alert-${this.type} fade show d-flex h-100`;
  }
}
