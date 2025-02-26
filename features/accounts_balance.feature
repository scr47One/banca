Feature: Balance de cuentas
  Scenario: Suma del balance de dos cuentas corrientes en el mismo tipo de cambio
    Given dos cuentas con balance de 50000 y 25000
    When sumamos el balance de ambas
    Then el resultado debe ser de 75000