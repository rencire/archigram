## Archigram
Archigram is a simple tool to help with drawing "boxes and arrows".  Inspiration comes from wanting to easily draw software architecture diagrams.

Main purpose of this project is to compare and contrast different javascript libraries/frameworks/patterns (similar to the infamous todos list app).

Currently a WIP.

#Project Management
Trello board:
https://trello.com/b/eUE5jIHf/archigram#


# Installation
All frontend code is in 'client'. Core libraries:
- [Webpack](https://webpack.github.io/) for managing modules.
- [Babel](https://babeljs.io/) for ES6 transpilation
- [Karma](https://github.com/karma-runner/karma) for test runner.
- [Jasmine](http://jasmine.github.io/) for bdd/unit tests.
- [d3-drag](https://github.com/d3/d3-drag) for drag behavior.

- ...and a bunch of plugins for integrating them :). Check the package.json for details.  


To install and run:
```
cd client
npm install
npm run start
```

To use, click on the page to create a shape.
To add edges between shapes, hold down 'shift' key and drag from one shape to another.


## References:

### Webpack
- https://webpack.github.io/
- https://leanpub.com/setting-up-es6/read#sec_webpack-babel
- https://www.bensmithett.com/smarter-css-builds-with-webpack/
- http://www.syntaxsuccess.com/viewarticle/5532c5c0873cb5f0449ffcc5
- https://medium.com/@grrowl/testing-react-with-jasmine-and-karma-using-webpack-and-babel-18fc268f066a#.7fpog9kzr
- https://www.paypal-engineering.com/2015/08/07/1450/
- https://blog.madewithlove.be/post/webpack-your-bags/


### Modules
- http://exploringjs.com/es6/ch_modules.html
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

### Misc.
- http://www.nicoespeon.com/en/2015/06/objects-composition-backbone/










