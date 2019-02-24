import { Component, Listen, State, Prop } from '@stencil/core';
import { GiphyApiExposer, apiExposer } from '../../utils/api';
import { GsGifList } from '../giflist/gs-giflist';

@Component({
  styleUrls: ['./gs-gifsearch.scss', '../giflist/gs-giflist.scss'],
  tag: 'gs-gifsearch',
})
export class GsGifSearch {
  private api: GiphyApiExposer;
  private page = 1;
  private shouldUpdateInitialList = true;

  @State() gifs = [];
  @State() query = '';
  @Prop() apiKey: string;
  @Prop() gifsPerPage: number = 10;

  componentWillLoad() {
    this.api = apiExposer(this.apiKey);
  }

  async loadImages(q) {
    let data = await this.api.getImages(q, {
      lang: 'en',
      limit: this.gifsPerPage,
      offset: (this.page - 1) * this.gifsPerPage,
      rating: 'g',
    });

    this.gifs = [...this.gifs, ...data];

    return data;
  }

  async componentDidUpdate() {
    const { innerHeight, offsetHeight } = this.getBottomValues();

    // Loads next page for big screens
    // If the screen is too high, the first 10 elements
    // will not be enough for creating the infinite scroll
    // so we need to manually trigger the updatePage method
    // until we have a proper amount of elements rendered
    // to generate the infinite scroll
    if (
      offsetHeight <= innerHeight &&
      this.gifs.length > 0 &&
      this.shouldUpdateInitialList
    ) {
      const data = await this.updatePage();
      this.shouldUpdateInitialList = data.length > 0;
    }
  }

  async updatePage() {
    this.page += 1;
    return await this.loadImages('');
  }

  @Listen('submit-search')
  async onSubmitSearch(e) {
    this.page = 1;
    this.gifs = [];
    this.query = e.detail;
    return await this.loadImages(e.detail);
  }

  getBottomValues() {
    return {
      offsetHeight: document.documentElement.offsetHeight || 0,
      scrollTop: document.documentElement.scrollTop || 0,
      innerHeight: window.innerHeight || 0,
    };
  }

  @Listen('window:scroll')
  async onWindowScroll() {
    const { innerHeight, offsetHeight, scrollTop } = this.getBottomValues();

    const bottom = scrollTop + innerHeight === offsetHeight;

    if (bottom) {
      await this.updatePage();
    }
  }

  render() {
    return (
      <section class="gs-main">
        <gs-searchbox />
        <GsGifList gifs={this.gifs} />
      </section>
    );
  }
}
