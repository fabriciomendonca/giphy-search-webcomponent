import { Component, Listen, State } from '@stencil/core';
import { GiphyApiExposer, apiExposer } from '../../utils/api';

@Component({
  styleUrl: './gs-gifsearch.scss',
  tag: 'gs-gifsearch',
})
export class GsGifSearch {
  private api: GiphyApiExposer;
  private page = 1;
  private shouldUpdate = true;

  @State() gifs = [];
  @State() query = '';

  componentWillLoad() {
    this.api = apiExposer('CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6');
  }

  async loadImages() {
    let data = await this.api.getImages(this.query, {
      lang: 'en',
      limit: 10,
      offset: (this.page - 1) * 10,
      rating: 'g',
    });
    
    this.gifs = [...this.gifs, ...data];

    return data;
  }

  async componentDidUpdate() {
    const {innerHeight, offsetHeight} = this.getBottomValues();

    // Loads next page for big screens
    if(offsetHeight <= innerHeight && this.gifs.length > 0 && this.shouldUpdate) {
      const data = await this.updatePage();
      
      this.shouldUpdate = data.length > 0;
    }
  }

  async updatePage() {
    this.page += 1;
    return await this.loadImages();
  }


  @Listen('submit-search')
  async onSubmitSearch(e) {
    this.page = 1;
    this.gifs = [];
    this.query = e.detail;
    return await this.loadImages();
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
        <gs-giflist gifs={this.gifs} />
      </section>
    );
  }
}
