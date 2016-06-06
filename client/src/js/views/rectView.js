import Backbone from 'backbone';

import 'd3';
// import d3_drag from 'd3-drag';
// import d3_selection from 'd3-selection';
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
    // $(rect).draggable({
    //   start: this.onDragStart,
    //   drag: this.onDrag.bind(this),
    //   stop: this.onDragStop
    // });


    this.setElement(rect); 
  },

  render: function() {
    this.$el
      .attr('x', this.model.attributes.x)
      .attr('y', this.model.attributes.y)
      .attr('width', this.model.attributes.width)
      .attr('height', this.model.attributes.height);

    var drag = d3.drag()
      .on('start', this.handleDragStart)
      .on('drag', this.handleDrag)
      .on('end', this.handleDragEnd);

    // drag.call(d3_selection.select('rect'));
    // drag.call(this.$el);

    return this;
  },

  handleDragStart: function(e) {
    console.log('drag start');
    // console.log(e);
  },
  
  // http://stackoverflow.com/questions/1108480/svg-draggable-using-jquery-and-jquery-svg#6166850
  handleDrag: function(x, i) {
    // console.log(e);
    // NOTE: `this` will refer to the element itself, not the model
    // - walk through the d3-drag and d3-dispatch library to double check what the value of `this` is.
    //
    this.model.set({
      x: ui.position.left,
      // TODO figure out why left and top position is off.  for now, quick fix to subtract width/2 for y value
      y: ui.position.top-(this.model.get('width')/2)
    });
  },


  handleDragEnd: function(e) {
    console.log('drag end');
    console.log(e);
    // Stop event from propogating up to parent svg. Else, parent svg will handle event and unintentionally create a new rect shape on the board.
    
    e.stopPropagation();
  }

});

export default rectView;
