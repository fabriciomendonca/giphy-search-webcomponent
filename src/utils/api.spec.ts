import { fetchImages } from './__mocks__/service';
export const mock = jest.mock('./service', () => ({
  apiService: () => ({
    fetchImages,
  }),
}));
import * as d from './definitions';
import { apiExposer } from './api';

describe('API factory', () => {
  let api: d.GiphyApiExposer;
  beforeEach(() => {
    api = apiExposer('123456');
  });

  it('should create an apiExposer object', () => {
    expect(api).toBeDefined();
    expect(api).toHaveProperty('getImages');
  });

  it('should fetch the data passing only the query', async () => {
    const data = await api.getImages('test');

    expect(data).toHaveLength(3);
  });

  it('should fetch the data for "random" ', async () => {
    const data = await api.getImages(null);

    expect(data).toHaveLength(3);
    expect(fetchImages).toBeCalledWith('random', {
      lang: 'en',
      limit: 10,
      offset: 0,
      rating: 'g',
    });
  });

  it('should throw an error when no apiKey defined', async () => {
    let error;
    const api = apiExposer(null);

    try {
      await api.getImages('tes');
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.message).toBe(
      'You need a Giphy API Key, see https://developers.giphy.com/docs for details.',
    );
  });

  it('should throw an error when service error', async () => {
    let error;

    try {
      await api.getImages('tes');
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.message).toBe('service error');
  });
});
