import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import Customer from 'src/assets/json/customer.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'banca';
  customer = Customer;
  isMenuCollapsed = true;
  constructor(private storage: LocalStorageService) { }

  ngOnInit(): void {
    this.customer = this.storage.retrieve('customer') || this.customer;
    this.storage.store('customer', this.customer);
  }
}
