import Backbone from 'backbone';
import _ from 'underscore';


var Vertex = Backbone.Model.extend({

  // no need for 'id', backbone adds a 'cid' attribute
  // NOt true, we need 'id'. 'cid' is only temporary 
  //
  // Collection must assign correct id to Vertex (collection.length)
  defaults: {
    id: null,
    label: '',
    x: 0,
    y: 0,
    highlight: false
  },

  validate: function(attrs) {
    // Look into YDKJS for subtleties of hasOwnProperty
    if (attrs.hasOwnProperty('x') && !_.isNumber(attrs.x)) {
      return 'x must be a Number'; 
    }

    if (attrs.hasOwnProperty('y') && !_.isNumber(attrs.y)) {
      return 'y must be a Number'; 
    }

    if (attrs.hasOwnProperty('label') && !_.isString(attrs.y)) {
      return 'label must be a String'; 
    }
  }

});

export default Vertex;
