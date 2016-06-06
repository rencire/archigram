import Backbone from 'backbone';

import d3_drag from 'd3-drag';
import d3_selection from 'd3-drag/node_modules/d3-selection';

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

    // console.log(d3_drag);
    // console.log(d3_selection);
    // TODO refactor this.  no need to create a new drag object evertyime a new view is initialized. (singleton pattern?)
    var drag = d3_drag.drag()
      .on('start', this.handleDragStart)
      .on('drag', this.handleDrag.bind(this))
      .on('end', this.handleDragEnd);

      d3_selection.select(rect).call(drag);


    this.setElement(rect); 
  },

  render: function() {
    this.$el
      .attr('x', this.model.attributes.x - this.model.attributes.width/2)
      .attr('y', this.model.attributes.y - this.model.attributes.height/2)
      .attr('width', this.model.attributes.width)
      .attr('height', this.model.attributes.height);

    // drag.call(this.$el);

    return this;
  },

  handleDragStart: function(e) {
    console.log('drag start');
    // console.log(e);
  },
  
  // http://stackoverflow.com/questions/1108480/svg-draggable-using-jquery-and-jquery-svg#6166850
  handleDrag: function() {
    // console.log('drag');
    // console.log(d3_selection.event);
    // console.log(this);
    // console.log(this.model);
    this.model.set({
      x: d3_selection.event.x,
      y: d3_selection.event.y
    });
    
    // console.log(e);
    // NOTE: `this` will refer to the element itself, not the model
    // - walk through the d3-drag and d3-dispatch library to double check what the value of `this` is.
    //
    // this.model.set({
    //   x: ui.position.left,
    //   // TODO figure out why left and top position is off.  for now, quick fix to subtract width/2 for y value
    //   y: ui.position.top-(this.model.get('width')/2)
    // });
  },


  handleDragEnd: function(e) {
    console.log('drag end');
    console.log(e);
    // Stop event from propogating up to parent svg. Else, parent svg will handle event and unintentionally create a new rect shape on the board.
    
    e.stopPropagation();
  }

});

export default rectView;
