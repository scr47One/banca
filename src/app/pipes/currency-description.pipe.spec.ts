import { CurrencyDescriptionPipe } from './currency-description.pipe';

describe('CurrencyDescriptionPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyDescriptionPipe();
    expect(pipe).toBeTruthy();
  });
});
