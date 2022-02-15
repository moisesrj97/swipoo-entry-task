import getCars from './apiCallServices';

describe('Given apiCallServices', () => {
  describe('When getCars is called without errors', () => {
    beforeEach(() => {
      global.fetch = jest
        .fn()
        .mockResolvedValue({ json: () => ({ cars: [] }) }) as jest.Mock;
    });
    test('It should return data and call fetch', async () => {
      expect(await getCars('Audi', '2020-01-01', 'G')).toEqual([]);
    });
  });
});
