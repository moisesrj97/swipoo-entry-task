import deprecatePriceByYear from './deprecatePrice';

describe('Given deprecatePrice', () => {
  describe('When it is called with valid parameters', () => {
    test('It should return an array of values with length equivalent to years difference', () => {
      const result = deprecatePriceByYear(22000, 2014);

      expect(result).toHaveLength(9);
    });
    test('It should return an array of values with 90% difference between them', () => {
      const result = deprecatePriceByYear(22000, 2014);

      result.forEach((price, index) => {
        if (result[index - 1]) {
          expect(price).toBeCloseTo(result[index - 1] * 0.9, -1);
        }
      });

      expect(result).toHaveLength(9);
    });
  });
  describe('When it is called with the same year', () => {
    test('It should return an array with the same price', () => {
      const result = deprecatePriceByYear(22000, 2022);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe(22000);
    });
  });
  describe('When it is called with posterior year', () => {
    test('It should return an array with the same price', () => {
      const result = deprecatePriceByYear(22000, 2022);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe(22000);
    });
  });
});
