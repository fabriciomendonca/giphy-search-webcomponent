import { GsSearchbox } from './gs-searchbox';

describe('Main component', () => {
  let component;
  beforeEach(() => {
    component = new GsSearchbox();
  });

  it('creates the component', () => {
    expect(component).toBeDefined();
  });

  it('renders the component', () => {
    const vdata = component.render();

    expect(vdata).toBeDefined();
    expect(vdata.vtag).toBe('form');
  });

  it('updates the state query value', () => {
    const vdata = component.render();
    const spy = jest.fn();

    const label = vdata.vchildren[0].vchildren[0];
    const input = label.vchildren[0];

    input.vattrs.onChange({
      target: {
        value: 'query',
      },
    });

    expect(component.query).toBe('query');
  });

  it('updates the state query value', () => {
    const vdata = component.render();
    const spy = jest.fn();

    component.onSubmitSearch = {
      emit: spy,
    };
    vdata.vattrs.onSubmit({ target: { value: 'query' }, preventDefault() {} });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
