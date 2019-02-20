import { Component, Prop } from '@stencil/core';

@Component({
  styleUrl: './gs-giflist.scss',
  tag: 'gs-giflist',
})
export class GsGifList {
  @Prop() gifs = [];

  render() {
    return (
      <div>
        {this.gifs.map(gif => (
          <div key={gif.id}>
            <picture>
              <source type="image/webp" srcSet={gif.images.fixed_width.webp} />
              <img src={gif.images.fixed_width.url} alt={gif.title} />
            </picture>
          </div>
        ))}
      </div>
    );
  }
}
