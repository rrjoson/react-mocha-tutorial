Testing React Components with Mocha (Part 1)
===

[![Build Status](https://img.shields.io/travis/rrjoson/react-mocha-tutorial.svg?style=flat-square)](https://travis-ci.org/rrjoson/react-mocha-tutorial)

![Cowboy Coder](http://i.imgur.com/N0VqWcL.png "Cowboy Coder")

> Note: This tutorial is an intro to Testing with Mocha.

The purpose of this tutorial is just to get your feet wet with testing React components. By the end of part 1, you will have created a test to check if your component renders without any errors.

This tutorial has three parts:

1. [Setup](#setup)
2. [App Component Test](#app-component-test)
3. [App Component](#app-component)

Setup
---
  1. Create the project directory structure.
     * Add project directory folders
       ```bash
       mkdir -p mocha/{test,dist,src/components/App}
       ```
     * Navigate to project directory
       ```bash
       cd mocha
       ```
     * Add base project files
       ```bash
       touch index.html package.json .babelrc webpack.config.js src/index.jsx src/components/App/App.jsx src/components/App/App.spec.jsx test/setup.jsx
       ```

  2. Initialize project
     * Add /package.json contents
       ```json
       {
         "name": "react-mocha-tutorial",
         "version": "1.0.0",
         "description": "",
         "main": "webpack.config.js",
         "directories": {
           "src": "src",
           "test": "test"
         },
         "scripts": {
           "test": "mocha test/setup.jsx src/**/*.spec.jsx",
           "start": "webpack-dev-server --hot --inline --progress --colors --watch --display-error-details --display-cached --content-base ./"
         },
         "keywords": [],
         "author": "",
         "license": "ISC",
         "dependencies": {
           "babel-core": "^6.25.0",
           "babel-loader": "^7.1.1",
           "babel-preset-airbnb": "^2.4.0",
           "babel-preset-es2015": "^6.24.1",
           "babel-preset-react": "^6.24.1",
           "babel-preset-stage-0": "^6.24.1",
           "chai": "^4.0.2",
           "enzyme": "^2.9.1",
           "react": "^0.14.7",
           "react-dom": "^0.14.7"
         },
         "devDependencies": {
           "jsdom": "^8.1.0",
           "mocha": "^3.4.2",
           "react-addons-test-utils": "^0.14.7",
           "webpack": "^1.12.14",
           "webpack-dev-server": "^1.14.1"
         }
       }
       ```

     * Add /.babelrc contents
       ```json
       {
         "presets": ["airbnb", "es2015", "stage-0"]
       }
       ```

     * Add /webpack.config.js contents
       ```javascript
       const webpack = require('webpack');

       module.exports = {
         entry: './src/index.jsx',
         devServer: {
           hot: true,
           inline: true,
           port: 8080,
           historyApiFallback: true,
         },
         resolve: {
           extensions: ['', '.js', '.jsx'],
         },
         output: {
           path: 'dist',
           filename: 'app.js',
           publicPath: 'http://localhost:8080/dist',
         },
         externals: {
           'cheerio': 'window',
           'react/lib/ExecutionEnvironment': true,
           'react/lib/ReactContext': true,
         },
         module: {
           loaders: [{
             test: /\.jsx?$/,
             exclude: /(node_modules|bower_components)/,
             loader: 'babel',
             query: {
               presets: ['react', 'es2015', 'stage-0'],
             },
           }],
         },
         plugins: [],
       };
       ```

     * Add /index.html contents
       ```html
       <html>
         <head>
           <title>Testing React Components</title>
           <meta charset="utf-8">
           <meta http-equiv="X-UA-Compatible" content="IE=edge">
           <meta name="viewport" content="width=device-width, minimum-scale=1.0">
         </head>
         <body>
           <div id="main"></div>
           <script src='http://localhost:8080/dist/app.js'></script>
         </body>
       </html>
       ```

  3. Install project dependencies
     ```bash
     yarn
     ```
     or
     ```bash
     npm install
     ```

  4. Run `npm test`

[Next](#app-component-test)

---

App Component Test
---

  1. Add test/setup.jsx contents
     ```javascript
     require('babel-register')();

     var jsdom = require('jsdom').jsdom;

     var exposedProperties = ['window', 'navigator', 'document'];

     global.document = jsdom('');
     global.window = document.defaultView;
     Object.keys(document.defaultView).forEach((property) => {
       if (typeof global[property] === 'undefined') {
         exposedProperties.push(property);
         global[property] = document.defaultView[property];
       }
     });

     global.navigator = {
       userAgent: 'node.js'
     };

     documentRef = document;
     ```

  2. Add /src/components/App/App.spec.jsx contents
     ```javascript
     import React from 'react';
     import { mount, shallow } from 'enzyme';
     import { expect } from 'chai';

     import App from './App';

     describe('<App/>', () => {
       it('should render without blowing up', () => {
         const wrapper = shallow(<App />);

         expect(wrapper.length).to.eql(1);
       });
     });
     ```

    3. Run `npm test`

[Previous](#setup) &middot; [Next](#app-component)

---

App Component
---

  1. Add /src/components/index.jsx contents:
     ```javascript
     import React from 'react';
     import { render } from 'react-dom';

     import App from './components/App/App';

     render(
       <App />,
       document.getElementById('main')
     );
     ```

  2. Add /src/components/App/App.jsx contents:
     ```javascript
     import React from 'react';

     const App = () => {
       return (
         <div>
           Hello World
         </div>
       );
     };

     export default App;

     ```

  3. Run `npm test`

[Previous](#app-component-test)
