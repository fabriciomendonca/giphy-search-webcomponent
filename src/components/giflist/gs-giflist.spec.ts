import { GsGifList } from './gs-giflist';
import mocks from '../../utils/__mocks__/mocks.json';

describe('Main component', () => {
  let component;
  beforeEach(() => {
    component = GsGifList({ gifs: [] }, [], null);
  });

  it('creates the component', () => {
    expect(component).toBeDefined();
  });

  xit('renders an empty list', () => {
    const vdata = component.render();

    expect(vdata).toBeDefined();
    expect(vdata.vtag).toBeUndefined;
  });

  xit('renders a list with 3 elements', () => {
    component.gifs = (<any>mocks).data;
    const vdata = component.render();

    const gifs = vdata.vchildren;

    expect(vdata).toBeDefined();
    expect(vdata.vtag).toBe('div');
    expect(vdata.vchildren).toHaveLength(3);
    expect(gifs[0].vattrs.key).toBe('kvrvnB158J4fm');
  });
});
