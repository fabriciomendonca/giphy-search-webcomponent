import { apiExposer, GiphyApiExposer } from './api';
import mocks from './mocks.json';

describe('API factory', () => {
  let api: GiphyApiExposer;
  beforeEach(() => {
    api = apiExposer('123456');
  });

  it('should create an apiExposer object', () => {
    expect(api).toBeDefined();
    expect(api).toHaveProperty('apiKey', '123456');
  });

  it('should fetch the data passing only the query', async () => {
    const spy = jest
      .fn()
      .mockImplementation(() => Promise.resolve((<any>mocks).data));
    (<any>api).service.fetchImages = spy;
    const data = await api.getImages('test');

    expect(data).toHaveLength(3);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('test', {
      lang: 'en',
      limit: 10,
      offset: 0,
      rating: 'g',
    });
  });
});
