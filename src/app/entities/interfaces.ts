import { TransactionType } from "./enums";

export interface ICustomer {
  name: string;
  lastName: string;
  customerId: string;
  email: string;
  accounts: IAccount[];
  investments: IInvest[];
}

export interface IAccount {
  accountId: string;
  customerId: string;
  accountName: string;
  balance: number;
  currency: string;
  transactions: ITransaction[];
}

export interface IInvest extends IAccount {
  investRate: IInvestRate
}

export interface ICurrency {
  code: string;
  name: string;
}

export interface IInvestRate {
  term: string;
  rate: number;
}

export interface ITransaction {
  transactionId: string;
  accountId: string;
  fromAccountId: string;
  amount: number;
  currency: string;
  transactionDate: Date;
  transactionType: TransactionType;
}
