import { Term } from "./enums";
import { IInvest, IInvestRate } from "./interfaces";

export const defaultRates: IInvestRate[] = [
    { term: Term.SHORT, rate: 0.05 },
    { term: Term.MEDIUM, rate: 0.1 },
    { term: Term.LONG, rate: 0.15 }
  ];

export const  defaultInvestment: IInvest = {
      accountId: '',
      customerId: '',
      accountName: '',
      balance: 0,
      currency: '',
      transactions: [],
      investRate: defaultRates[0]
    }
