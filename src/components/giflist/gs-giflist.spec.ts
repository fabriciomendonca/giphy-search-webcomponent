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

  it('renders an empty list', () => {
    expect(component).toBe('');
  });

  it('renders a list with 3 elements', () => {
    component = GsGifList({ gifs: (<any>mocks).data }, [], null);
    const vdata = { ...component };

    const gifs = vdata.vchildren;

    expect(vdata).toBeDefined();
    expect(vdata.vtag).toBe('div');
    expect(vdata.vchildren).toHaveLength(3);
    expect(gifs[0].vattrs.key).toBe('kvrvnB158J4fm');
  });
});
