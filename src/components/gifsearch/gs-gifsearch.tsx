import { Component, Listen, State } from '@stencil/core';
import { GiphyApiExposer, apiExposer } from '../../utils/api';

@Component({
  styleUrl: './gs-gifsearch.scss',
  tag: 'gs-gifsearch',
})
export class GsGifSearch {
  private api: GiphyApiExposer;
  private page = 1;

  @State() gifs = [];
  @State() query = '';

  componentWillLoad() {
    this.api = apiExposer('CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6');
  }

  async loadImages() {
    let data = await this.api.getImages(this.query, {
      lang: 'en',
      limit: 10,
      offset: this.page - 1,
      rating: 'g',
    });

    this.gifs = [...this.gifs, ...data];
  }

  @Listen('submit-search')
  async onSubmitSearch(e) {
    this.gifs = [];
    this.query = e.detail;
    await this.loadImages();
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
      this.page += 1;
      await this.loadImages();
    }
  }

  render() {
    return (
      <section class="gs-main">
        <gs-searchbox />
        <gs-giflist gifs={this.gifs} />
      </section>
    );
  }
}
