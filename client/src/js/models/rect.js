import Vertex from './vertex.js';
import _ from 'underscore';

var Rect = Vertex.extend({
  defaults: {
    width: 50,
    height: 50  
  },

  validate: function(attrs) {
    if (attrs.hasOwnProperty('width') && !_.isNumber(attrs.width)) {
      return 'Width must be a Number'; 
    }

    if (attrs.hasOwnProperty('height') && !_.isNumber(attrs.height)) {
      return 'Height must be a Number'; 
    }

    if (attrs.hasOwnProperty('width') && attrs.width < 0) {
      return 'Width must be >= 0'; 
    }

    if (attrs.hasOwnProperty('height') && attrs.height < 0) {
      return 'Height must be >= 0'; 
    }

  }
});


export default Rect;
