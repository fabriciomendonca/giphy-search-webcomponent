import { ENDPOINTS } from './constants';

export interface GifObject {}

export interface GiphyApiGetOptions {
  lang?: string;
  limit?: number;
  offset?: number;
  rating?: string;
}

export interface GiphyApiService {
  apiKey: string;
  fetchImages: (
    query: string,
    options: GiphyApiGetOptions,
  ) => Promise<GifObject[]>;
}

export interface GiphyApiExposer {
  apiKey: string;
  getImages: (
    query: string,
    options?: GiphyApiGetOptions,
  ) => Promise<GifObject[]>;
  service: GiphyApiService;
}

const apiService: (apiKey: string) => GiphyApiService = (apiKey: string) => {
  return {
    apiKey,
    async fetchImages(query, { lang, limit, offset, rating }) {
      let endpoint = ENDPOINTS.SEARCH;

      let response;
      const params = encodeURIComponent(
        `?api_key=${
          this.apiKey
        }&q=${query}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}`,
      );

      try {
        response = fetch(endpoint + params);
        response = response.json();
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
    apiKey,
    service,
    getImages(
      query,
      { lang, limit, offset, rating } = {
        lang: 'en',
        limit: 10,
        offset: 0,
        rating: 'g',
      },
    ) {
      if (!this.apiKey) {
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
