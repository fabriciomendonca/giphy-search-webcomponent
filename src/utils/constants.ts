export interface GiphyApiEndPoints {
  SEARCH: string;
}

const endPointsFactory: () => GiphyApiEndPoints = () => {
  const baseUrl = 'https://api.giphy.com/v1/gifs/';

  return {
    SEARCH: baseUrl + 'search',
  };
};
export const ENDPOINTS = endPointsFactory();
