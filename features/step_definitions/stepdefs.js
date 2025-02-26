const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

function pipe (accounts) {
  return accounts.reduce((acc, account) => acc + account.balance, 0);
}

Given('dos cuentas con balance de 50000 y 25000', function () {
  this.accounts = [
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
  this.result = parseInt(pipe(this.accounts));
});

Then('el resultado debe ser de {int}', function (expectedAnswer) {
    assert.strictEqual( this.result, expectedAnswer);
});