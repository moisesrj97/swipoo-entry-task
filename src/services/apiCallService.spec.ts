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
  describe('When getCars is called without errors', () => {
    beforeEach(() => {
      global.fetch = jest
        .fn()
        .mockRejectedValue(new Error('Fetch error')) as jest.Mock;
    });
    test('It should return data and call fetch', () => {
      getCars('Audi', '2020-01-01', 'G').catch((e) => {
        expect(e.message).toEqual('Error: Fetch error');
      });
    });
  });
});
