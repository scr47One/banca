import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import Customer from 'src/assets/json/customer.json';
import { CurrencyExchangeManagerService } from './services/local/currency-exchange-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  customer = Customer;
  title = 'BANCA POR INTERNET';
  isMenuCollapsed = true;
  constructor(
    private storage: LocalStorageService,
    private currencyExchangeService: CurrencyExchangeManagerService
  ) { }

  ngOnInit(): void {
    this.chargeCustomer();
    this.chargeCurrencies();
  }

  chargeCustomer() {
    this.customer = this.storage.retrieve('customer') || this.customer;
    this.storage.store('customer', this.customer);
  }

  chargeCurrencies() {
    this.currencyExchangeService.chargeCurrencies();
  }
}
