import * as d from './definitions';
import { apiService } from './service';

export const apiExposer: (apiKey: string) => d.GiphyApiExposer = (
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
    ): Promise<d.GifObject[]> {
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
