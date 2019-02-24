import mocks from './mocks.json';
export const fetchImages = jest.fn().mockImplementation(query => {
  if (query === 'tes') {
    throw new Error('service error');
  }
  return Promise.resolve((<any>mocks).data);
});
