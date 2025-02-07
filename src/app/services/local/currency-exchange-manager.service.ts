import { Injectable } from '@angular/core';
import { FastForexService } from '../remote/fast-forex.service';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { ICurrency } from 'src/app/entities/interfaces';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeManagerService {

  constructor(private fastForexService: FastForexService, private localStorage: LocalStorageService) { }

  public currencies: ICurrency[] = [];

  public getExchangeRate(fromCurrency: string, toCurrency: string): Observable<number> {
    return this.fastForexService.getExchangeRate(fromCurrency, toCurrency).pipe(
      map((response: any ) => {
        if (response && response.result && response.result[toCurrency]) {
          return response.result[toCurrency]
        } else {
          throw new Error('Tasa de cambio no disponible');
        }
      })
    );
  }

  public chargeCurrencies() {
    this.currencies = this.localStorage.retrieve('currencies');
    if (!this.currencies || this.currencies.length === 0) {
      this.fastForexService.getCurrencies().subscribe((data: any) => {
        let fields = Object.entries(data.currencies);
        this.currencies = fields.map(([key, value]) => ({
          code: key,
          name: value as string
        }));
        this.localStorage.store('currencies', this.currencies);
      });
    }
  }

  public convertCurrencyAmount(amount: number, fromCurrency: string, toCurrency: string): Observable<number> {
    if (amount <= 0) {
      throw new Error('Montos menores o iguales a cero no son permitidos');
    }
    return this.getExchangeRate(fromCurrency, toCurrency).pipe(
      map( rate => {
        return amount * rate;
      })
    );
  }
}

