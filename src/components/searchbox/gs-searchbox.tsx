import { Event, Component, State, EventEmitter } from '@stencil/core';

@Component({
  tag: 'gs-searchbox',
})
export class GsSearchbox {
  @Event({
    eventName: 'submit-search',
  })
  onSubmitSearch: EventEmitter;

  @State() query: string;

  onChangeQuery(e) {
    this.query = e.target.value;
  }

  onSubmitHandler(e) {
    e.preventDefault();

    this.onSubmitSearch.emit(this.query);
  }

  render() {
    return (
      <form name="search" onSubmit={e => this.onSubmitHandler(e)}>
        <fieldset>
          <label htmlFor="query">
            <input
              id="query"
              name="query"
              type="text"
              placeholder="Search all the GIFs and Stickers"
              value={this.query}
              onChange={e => this.onChangeQuery(e)}
            />
          </label>
        </fieldset>
        <button type="submit">Search</button>
      </form>
    );
  }
}
