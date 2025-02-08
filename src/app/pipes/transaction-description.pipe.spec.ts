import { TransactionDescriptionPipe } from './transaction-description.pipe';

describe('TransactionDescriptionPipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionDescriptionPipe();
    expect(pipe).toBeTruthy();
  });
});
