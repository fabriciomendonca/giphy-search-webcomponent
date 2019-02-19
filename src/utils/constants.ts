export interface GiphyApiEndPoints {
  RANDOM: string;
  SEARCH: string;
}

const endPointsFactory: () => GiphyApiEndPoints = () => {
  const baseUrl = 'https://api.giphy.com/v1/gifs/';

  return {
    RANDOM: baseUrl + '/search',
    SEARCH: baseUrl + '/search',
  };
};
export const ENDPOINTS = endPointsFactory();
