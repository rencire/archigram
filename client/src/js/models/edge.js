import Backbone from 'backbone';
import _ from 'underscore';

var Edge = Backbone.Model.extend({
  defaults: {
    label: '',
    from: null,
    to: null,
    directed: true
  },

  initialize: function () {
    this.listenTo(this.get('from'), 'destroy', this.destroy);
    this.listenTo(this.get('to'), 'destroy', this.destroy);
  },

  validate: function(attrs) {
    
    //if (attrs.hasOwnProperty('from') && !_.isNumber(attrs.from)) {
    //  return '`from` must be a Number';
    //}
    //
    //if (attrs.hasOwnProperty('to') && !_.isNumber(attrs.to)) {
    //  return '`to` must be a Number';
    //}

    if (attrs.hasOwnProperty('from') && 
        attrs.hasOwnProperty('to') &&
        attrs.from === attrs.to) {
      return '`from` and `to` vertex ids cannot be the same';
    }

  }

});

export default Edge;

