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
  transactions: ITransaction[];
}

export interface ITransaction {
  transactionId: string;
  accountId: string;
  fromAccountId: string;
  amount: number;
  transactionDate: Date;
  transactionType: TransactionType;
}

export interface IInvest {
  investmentId: string;
  balance: number;
  investmentName: string;
  transactions: ITransaction[];
  investRate: number;
}
