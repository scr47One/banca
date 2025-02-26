const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
import { IAccount } from 'src/app/entities/interfaces';
import { AccountsBalancePipe } from 'src/app/pipes/accounts-balance.pipe';

let pipe: AccountsBalancePipe;
let accounts: IAccount[];
let result: number;

Given('dos cuentas con balance de 50000 y 25000', function () {
  accounts = [
    {
      accountId: '',
      balance: 50000,
      accountName: 'Cuenta 1',
      currency: 'MXN',
      customerId: '1',
      transactions: []
    },
    {
      accountId: '',
      balance: 25000,
      accountName: 'Cuenta 2',
      currency: 'MXN',
      customerId: '1',
      transactions: []
    }
  ]
});
  
When('sumamos el balance de ambas', async function () {
  pipe = new AccountsBalancePipe()
  result = pipe.transform(accounts);
});

Then('el resultado debe ser de 75000', function (expectedAnswer: number) {
    assert.strictEqual( result, expectedAnswer);
});