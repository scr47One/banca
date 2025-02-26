Feature: Balance de cuentas
  Scenario: Verificar la suma de balance de cuentas
    Given dos cuentas con balance de MX$50,000.00 y MX$25,000.00
    Then el resultado debe ser de 'MX$75,000.00'