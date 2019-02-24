import { Component, Element, Listen, State, Prop } from '@stencil/core';
import { apiExposer } from '../../utils/api';
import { GsGifList } from '../giflist/gs-giflist';
import * as d from '../../utils/definitions';

@Component({
  styleUrls: ['./gs-gifsearch.scss', '../giflist/gs-giflist.scss'],
  tag: 'gs-gifsearch',
})
export class GsGifSearch {
  private mainElement: HTMLElement;
  private api: d.GiphyApiExposer;
  private page = 1;
  private shouldUpdateInitialList = false;

  constructor() {
    this.onMainElementScroll = this.onMainElementScroll.bind(this);
  }

  @State() gifs = [];
  @State() query = '';
  @Prop() apiKey: string;
  @Prop() gifsPerPage: number = 10;
  @Element() host: HTMLElement;

  componentWillLoad() {
    this.api = apiExposer(this.apiKey);
  }

  componentDidLoad() {
    this.createListeners();
  }

  componentDidUnload() {
    this.destroyListeners();
  }

  createListeners() {
    this.host.parentElement.addEventListener(
      'scroll',
      this.onMainElementScroll,
    );

    window.addEventListener('scroll', this.onMainElementScroll);
  }

  destroyListeners() {
    this.host.parentElement.removeEventListener(
      'scroll',
      this.onMainElementScroll,
    );

    window.removeEventListener('scroll', this.onMainElementScroll);
  }

  async loadImages() {
    let data = await this.api.getImages(this.query, {
      lang: 'en',
      limit: this.gifsPerPage,
      offset: (this.page - 1) * this.gifsPerPage,
      rating: 'g',
    });

    this.gifs = [...this.gifs, ...data];

    return data;
  }

  async componentDidUpdate() {
    let { innerHeight, offsetHeight } = this.getBottomValues();

    if (innerHeight === offsetHeight) {
      const windowBotton = this.getBottomValues(true);
      innerHeight = windowBotton.innerHeight;
      offsetHeight = windowBotton.offsetHeight;
    }

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

    this.destroyListeners();
    this.createListeners();
  }

  async updatePage(): Promise<any> {
    this.page += 1;
    await this.loadImages();
  }

  @Listen('submit-search')
  async onSubmitSearch(e) {
    this.page = 1;
    this.gifs = [];
    this.query = e.detail;
    await this.loadImages();
  }

  getBottomValues(isWindow = false) {
    return isWindow
      ? {
          offsetHeight: document.documentElement.offsetHeight || 0,
          scrollTop: document.documentElement.scrollTop || 0,
          innerHeight: window.innerHeight || 0,
        }
      : {
          offsetHeight: this.mainElement.getBoundingClientRect().height || 0,
          scrollTop: this.host.parentElement.scrollTop || 0,
          innerHeight:
            this.host.parentElement.getBoundingClientRect().height || 0,
        };
  }

  async onMainElementScroll() {
    if (this.gifs.length === 0) {
      return;
    }
    let { innerHeight, offsetHeight, scrollTop } = this.getBottomValues();
    let inMiddle = false;

    if (innerHeight === offsetHeight) {
      const windowBotton = this.getBottomValues(true);
      innerHeight = windowBotton.innerHeight;
      offsetHeight = windowBotton.offsetHeight;
      scrollTop = windowBotton.scrollTop;

      inMiddle =
        this.mainElement.offsetTop +
          this.mainElement.clientHeight +
          parseFloat(
            window.getComputedStyle(this.host.parentElement).marginBottom,
          ) <
        offsetHeight;
    }

    // There is a bottom margin outside the component parent
    // or another element after the component in the DOM
    // so the bottom of the page now is the bottom of the component
    // container
    if (inMiddle) {
      offsetHeight =
        this.mainElement.offsetTop +
        this.mainElement.clientHeight +
        parseFloat(
          window.getComputedStyle(this.host.parentElement).marginBottom,
        );
    }

    let bottom = scrollTop + innerHeight >= offsetHeight;

    // We should trigger update page only once
    // to avoid any unnecessary api calls
    if (bottom) {
      this.destroyListeners();
      await this.updatePage();
    }
  }

  render() {
    return (
      <section class='gs-main' ref={el => (this.mainElement = el)}>
        <gs-searchbox />
        <GsGifList gifs={this.gifs} />
      </section>
    );
  }
}
