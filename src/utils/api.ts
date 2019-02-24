import { ENDPOINTS } from './constants';

export interface GifObject {}

export interface GiphyApiGetOptions {
  lang?: string;
  limit?: number;
  offset?: number;
  rating?: string;
}

export interface GiphyApiService {
  fetchImages: (
    query: string,
    options: GiphyApiGetOptions,
  ) => Promise<GifObject[]>;
}

export interface GiphyApiExposer {
  getImages: (
    query: string,
    options?: GiphyApiGetOptions,
  ) => Promise<GifObject[]>;
}

const apiService: (apiKey: string) => GiphyApiService = (apiKey: string) => {
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

export const apiExposer: (apiKey: string) => GiphyApiExposer = (
  apiKey: string,
) => {
  const service = apiService(apiKey);
  return {
    getImages(
      query,
      { lang, limit, offset, rating } = {
        lang: 'en',
        limit: 10,
        offset: 0,
        rating: 'g',
      },
    ) {
      if (!apiKey) {
        throw new Error(
          'You need a Giphy API Key, see https://developers.giphy.com/docs for details.',
        );
      }

      const q = query || 'random';

      let data;

      try {
        data = service.fetchImages(q, { limit, lang, offset, rating });
      } catch (err) {
        throw err;
      }

      return data;
    },
  };
};
