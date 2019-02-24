import { GsGifSearch } from './gs-gifsearch';
import mocks from '../../utils/__mocks__/mocks.json';

describe('Main component', () => {
  let component;
  beforeEach(() => {
    component = new GsGifSearch();
  });

  it('creates the component', () => {
    expect(component).toBeDefined();
  });

  it('renders the component', () => {
    const vdata = component.render();

    expect(vdata).toBeDefined();
  });

  it('loads images data', async () => {
    const spy = jest
      .fn()
      .mockImplementation(() => Promise.resolve((<any>mocks).data));

    component.componentWillLoad();
    component.api.getImages = spy;

    await component.loadImages();

    expect(component.gifs).toHaveLength(3);
  });

  it('runs the onsubmit callback', async () => {
    const spy = jest
      .fn()
      .mockImplementation(() => Promise.resolve((<any>mocks).data));

    component.componentWillLoad();
    component.api.getImages = spy;

    await component.onSubmitSearch({ detail: 'query' });

    expect(component.gifs).toHaveLength(3);
    expect(component.query).toBe('query');
  });

  xit('runs window onscroll event and updates the list', async () => {
    const spy = jest
      .fn()
      .mockImplementation(() => Promise.resolve((<any>mocks).data));

    component.componentWillLoad();
    component.api.getImages = spy;
    await component.onWindowScroll();

    expect(component.page).toBe(2);
    expect(component.gifs).toHaveLength(3);
  });

  xit('runs window onscroll event and does not update the list', async () => {
    const spy = jest
      .fn()
      .mockImplementation(() => Promise.resolve((<any>mocks).data));

    document.documentElement.scrollTop = 10;
    component.componentWillLoad();
    component.api.getImages = spy;
    await component.onWindowScroll();

    expect(component.page).toBe(1);
    expect(spy).not.toHaveBeenCalled();
  });

  xit('runs componentDidUpdate and call a new page for big screens', async () => {
    const spy = jest
      .fn()
      .mockImplementation(() => Promise.resolve((<any>mocks).data));
    component.componentWillLoad();
    component.api.getImages = spy;
    await component.loadImages();
    await component.componentDidUpdate();

    expect(component.page).toBe(2);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  xit('runs componentDidUpdate and do NOT call a new page for big screens', async () => {
    const spy = jest
      .fn()
      .mockImplementation(() => Promise.resolve((<any>mocks).data));

    component.shouldUpdateInitialList = false;
    component.componentWillLoad();
    component.api.getImages = spy;
    await component.loadImages();
    await component.componentDidUpdate();

    expect(component.page).toBe(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
