import _ from 'underscore';

// Collection must assign correct id to Vertex (collection.length)
var vertexProtoDefaults = {
  id: null,
  label: '',
  x: 0,
  y: 0,
  highlight: false
};


export var vertexProto = {
  defaults: vertexProtoDefaults,

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
};





var rectProtoDefaults = _.extendOwn(
  {
    width: 50,
    height: 50
  }, 
  vertexProtoDefaults
);


export var rectProto = {
  defaults: rectProtoDefaults,
  validate: function(attrs) {
    vertexProto.validate(attrs); 
    // add rect specific validation here:
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
};
