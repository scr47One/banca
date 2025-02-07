import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { ICustomer } from '../entities/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageCustomerDataService {

  constructor(private localStorage: LocalStorageService) { }

  public getCustomer() {
    return this.localStorage.retrieve('customer') as ICustomer;
  }

  public setCustomer(customer: ICustomer) {
    this.localStorage.store('customer', customer);
  }
}
