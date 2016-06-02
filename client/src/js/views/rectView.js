import Backbone from 'backbone';
//
// TODO figure out why we need to require these libraries
// Doesn't webpack handle es6 import? Maybe it can't handle jquery-ui format?
var $ = require('jquery');
require('jquery-ui/ui/widgets/draggable.js');

var rectView = Backbone.View.extend({

  initialize: function() {
    var namespace = 'http://www.w3.org/2000/svg';
    var rect = document.createElementNS(namespace, 'rect');

    // bind drag event handlers
    // Not very 'backbone-ish' to bind events here, but quick and easy to get drag behavior up and running
    $(rect).draggable({
      start: this.onDragStart,
      drag: this.onDrag,
      stop: this.onDragStop
    });

    this.setElement(rect); 
  },

  render: function() {
    this.$el
      .attr('x', this.model.attributes.x)
      .attr('y', this.model.attributes.y)
      .attr('width', this.model.attributes.width)
      .attr('height', this.model.attributes.height);
    return this;
  },

  onDragStart: function(e) {
    console.log('drag start');
    console.log(e);
  },
  
  // http://stackoverflow.com/questions/1108480/svg-draggable-using-jquery-and-jquery-svg#6166850
  onDrag: function(e, ui) {
    // console.log('drag');
    console.log(e);
    // Note: `this` will refer to the element itself, not the model
    this.setAttribute('x', ui.position.left);

    // TODO figure out why position is still off.  for now, quick fix to subtract 25 for y value
    this.setAttribute('y', ui.position.top-25);

  },

  onDragEnd: function(e) {
    console.log('drag end');
    console.log(e);
  }

});

export default rectView;
