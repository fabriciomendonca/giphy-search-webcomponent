export interface GiphyApiService {
  fetchImages: (
    query: string,
    options: GiphyApiGetOptions,
  ) => Promise<GifObject[]>;
}
export interface GiphyApiGetOptions {
  lang?: string;
  limit?: number;
  offset?: number;
  rating?: string;
}

export interface GifObject {}

export interface GiphyApiExposer {
  getImages: (
    query: string,
    options?: GiphyApiGetOptions,
  ) => Promise<GifObject[]>;
}
