import { TestBed } from '@angular/core/testing';

import { LocalStorageCustomerDataService } from './local-storage-customer-data.service';

describe('LocalStorageCustomerDataService', () => {
  let service: LocalStorageCustomerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageCustomerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
