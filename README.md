# Archigram
Archigram is a simple tool to help with drawing and visualizing diagrams.  Original purpose is to help with drawing software architecture diagrams.


#Project Management
Trello board:
https://trello.com/b/eUE5jIHf/archigram#


# Installation
All frontend code is in 'client'. Core libraries:
- [d3](https://d3js.org/) for binding data to elements. 

- [Webpack](https://webpack.github.io/) for managing modules.
- [Babel](https://babeljs.io/) for ES6 transpilation
- [Karma](https://github.com/karma-runner/karma) for test runner.
- [Jasmine](http://jasmine.github.io/) for bdd/unit tests.

- ...and a bunch of plugins for integrating them :). Check the package.json for details.  


```
cd client
npm install
npm run start
```

## References:

### Webpack
- https://leanpub.com/setting-up-es6/read#sec_webpack-babel
- https://www.bensmithett.com/smarter-css-builds-with-webpack/
- http://www.syntaxsuccess.com/viewarticle/5532c5c0873cb5f0449ffcc5
- https://medium.com/@grrowl/testing-react-with-jasmine-and-karma-using-webpack-and-babel-18fc268f066a#.7fpog9kzr
- https://www.paypal-engineering.com/2015/08/07/1450/


### Modules
- http://exploringjs.com/es6/ch_modules.html
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

### Misc.
- http://www.nicoespeon.com/en/2015/06/objects-composition-backbone/










