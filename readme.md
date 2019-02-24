![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Giphy Search Web Component

This web component searches and shows animated Gif's from the GIPHY public API in an infinite scroll container.

The usage of Stenciljs for generating the Web Component brings the possibility of, instead of only an stand-alone application, to use it also as a widget in any website/application. And it is IE11+ compatible! :D

It will load `10` Gif's at a time, incrementing the page every time the scroll reaches the bottom of the page. You can change the amount of gifs per page setting the property `gif-per-page` on the component.

## Getting Started

To start building the Giphy Search component, clone this repo to a new directory:

```bash
git clone https://github.com/fabriciomendonca/giphy-search-webcomponent.git giphy-search-webcomponent
cd giphy-search-webcomponent
git remote rm origin
```

and run:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```

## Running the dev server

To run the development environtment, just run `npm start` after running `npm install`.

It will open the browser with HMR on port (default) `3333`.

## Usage

### Serving the JS File

Clone this repo.

```bash
git clone https://github.com/fabriciomendonca/giphy-search-webcomponent.git giphy-search-webcomponent
cd giphy-search-webcomponent
git remote rm origin
```

After building the project for production with `npm run build`, you can coppy the `/dist` folder to your server.

```HTML
<script src="/component_pro_folder/giphysearch.js"></script>
<gs-gifsearch api-key="YOR_GIPHY_API_KEY" gifs-per-page="10">
```

### As a dependency for React or VueJS

Install the Giphy Search Web Component as a dependency.

```bash
npm i -S giphy-search-web-component
```

####

For React apps, edit your `index.js` file

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Add this line to import the component loader
import { defineCustomElements } from 'giphy-search-web-component/dist/loader';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// Add this line to define the component on the window scope
defineCustomElements(window);
```

And use it as an HTML custom tag on your JSX files

```javascript
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <gs-gifsearch api-key='YOUR_API_KEY' gifs-per-page='10' />
      </div>
    );
  }
}

export default App;
```

See Stenciljs docs for integration with other frameworks and libraries at https://stenciljs.com/docs/overview

## Next steps for this project

- Improve performance of the infinite scroll, rendering only a small set of the loaded pages and discarding elements that is too far away from what is being shown;
- Add more actions to the actions bar in the bottom of each gif, like `copy link`, `share` and so on;
- Create option to show the list in a three columns per row way.

## GIPHY API Docs

https://developers.giphy.com/docs/
