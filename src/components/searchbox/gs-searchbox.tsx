import { Event, Component, State, EventEmitter } from '@stencil/core';

@Component({
  styleUrl: './gs-searchbox.scss',
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
        <button type="submit">
          <i>
            <svg
              viewBox="0 0 250.313 250.313"
              style="enable-background:new 0 0 250.313 250.313;"
            >
              <g id="Search">
                <path
                  style="fill-rule:evenodd;clip-rule:evenodd;"
                  d="M244.186,214.604l-54.379-54.378c-0.289-0.289-0.628-0.491-0.93-0.76   c10.7-16.231,16.945-35.66,16.945-56.554C205.822,46.075,159.747,0,102.911,0S0,46.075,0,102.911   c0,56.835,46.074,102.911,102.91,102.911c20.895,0,40.323-6.245,56.554-16.945c0.269,0.301,0.47,0.64,0.759,0.929l54.38,54.38   c8.169,8.168,21.413,8.168,29.583,0C252.354,236.017,252.354,222.773,244.186,214.604z M102.911,170.146   c-37.134,0-67.236-30.102-67.236-67.235c0-37.134,30.103-67.236,67.236-67.236c37.132,0,67.235,30.103,67.235,67.236   C170.146,140.044,140.043,170.146,102.911,170.146z"
                />
              </g>
            </svg>
          </i>
        </button>
      </form>
    );
  }
}
