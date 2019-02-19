import { apiExposer } from './api';
import mocks from './mocks.json';

describe('API factory', () => {
  let api;
  beforeEach(() => {
    api = apiExposer('123456');
    api.service.fetchImages = jest.fn(() => Promise.resolve(JSON.parse(mocks)));
  });

  it('sanity check', () => {
    expect(true).toBe(true);
  });
});
