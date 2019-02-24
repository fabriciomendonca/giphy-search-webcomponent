import { apiService } from './service';

describe('service', () => {
  let service;
  beforeEach(() => {
    service = apiService('123456');
  });

  it('fetches an enpty image list', async () => {
    const spy = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json() {
          return Promise.resolve({ data: [] });
        },
      }),
    );
    window.fetch = spy;
    const response = await service.fetchImages('test', {
      lang: 'en',
      limit: 10,
      offset: 0,
      rating: 'g',
    });

    expect(spy).toHaveBeenCalled();
    expect(response).toEqual([]);
  });

  it('throws an error when fetching images', async () => {
    const spy = jest.fn().mockImplementation(() => {
      throw new Error('server error');
    });
    let error;
    window.fetch = spy;
    try {
      await service.fetchImages('test', {
        lang: 'en',
        limit: 10,
        offset: 0,
        rating: 'g',
      });
    } catch (err) {
      error = err;
    }

    expect(spy).toHaveBeenCalled();
    expect(error.message).toBe('server error');
  });
});
