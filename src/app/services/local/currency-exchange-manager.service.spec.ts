import { TestBed } from '@angular/core/testing';

import { CurrencyExchangeManagerService } from './currency-exchange-manager.service';

describe('CurrencyExchangeManagerService', () => {
  let service: CurrencyExchangeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyExchangeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
