import { ENDPOINTS } from './constants';
import * as d from './definitions';

export const apiService: (apiKey: string) => d.GiphyApiService = (
  apiKey: string,
) => {
  return {
    async fetchImages(query, { lang, limit, offset, rating }) {
      let endpoint = ENDPOINTS.SEARCH;
      let response;
      const params = `?api_key=${apiKey}&q=${encodeURIComponent(
        query,
      )}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}`;

      try {
        response = await fetch(endpoint + params);
        response = await response.json();
      } catch (err) {
        throw err;
      }

      return response.data;
    },
  };
};
