const deprecatePriceByYear = (price: number, year: number): number[] => {
  const differenceOfYears: number = new Date().getUTCFullYear() - year;
  const prices: number[] = [price];
  for (let i = 1; i < differenceOfYears + 1; i += 1) {
    prices.push(Math.round(prices[i - 1] * 0.9));
  }
  return prices;
};

export default deprecatePriceByYear;
