import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { IAccount } from '../entities/interfaces';
import { TranscationType } from '../entities/enums';

@Injectable({
  providedIn: 'root'
})
export class AccountManagerService {

  constructor(private storage: LocalStorageService) { }


}
