import Backbone from 'backbone';
//
// TODO figure out why we need to require these libraries
// Doesn't webpack handle es6 import? Maybe it can't handle jquery-ui format?
var $ = require('jquery');
require('jquery-ui/ui/widgets/draggable.js');

var rectView = Backbone.View.extend({

  initialize: function() {
    // need to create element with svg namespace, hence not using `tagName` property
    var namespace = 'http://www.w3.org/2000/svg';
    var rect = document.createElementNS(namespace, 'rect');

    this.model.on('change', this.render, this);
    // bind drag event handlers
    // http://jqueryui.com/draggable/#events
    $(rect).draggable({
      start: this.onDragStart,
      drag: this.onDrag.bind(this),
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
    // console.log(e);
  },
  
  // http://stackoverflow.com/questions/1108480/svg-draggable-using-jquery-and-jquery-svg#6166850
  onDrag: function(e, ui) {
    // console.log(e);
    // Note: `this` will refer to the element itself, not the model
    this.model.set({
      x: ui.position.left,
      // TODO figure out why left and top position is off.  for now, quick fix to subtract width/2 for y value
      y: ui.position.top-(this.model.get('width')/2)
    });
  },


  // TODO this does not fire.  Is it because it conflicts with some 'click' event handler?
  onDragEnd: function(e) {
    console.log('drag end');
    console.log(e);
  }

});

export default rectView;
