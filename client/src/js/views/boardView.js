import Backbone from 'backbone';
import ShapeList from '../collections/shapes.js';
import RectView from './rectView.js';


var BoardView = Backbone.View.extend({

  el: '#board',

  events: {
    'click': 'createShape',
    'dragmove rect': 'test'
  },

  initialize: function() {
    this.shapeCollection = new ShapeList();
    this.render();

    this.listenTo(this.shapeCollection, 'add', this.renderShape);
  },

  render: function() {
    // Do we need `this` as second argument to `each`?
    this.shapeCollection.each(function(model) {
      this.renderShape(model);
    });
  },

  renderShape: function(model) {
    var rectView = new RectView({model: model});   
    this.$el.append(rectView.render().el);
  },

  createShape: function(e) {
    this.shapeCollection.add({});
  },

  test: function(e) {
    console.log(e);
  },

  /*
   * Drag handlers
   */
  handleDragstart: function(d, index) {
  },

  handleDragmove: function(event) {
    // console.log(state.add_edge_mode);
     state.add_edge_mode = false;

    // If shift key is held, go into "add edge mode"
    // and start drawing edge path 
     if (state.add_edge_mode) {
        var center_x = (shape_datum.x + shape_datum.width/2);
        var center_y = (shape_datum.y + shape_datum.height/2);
        dragline.attr('d', 
            'M' + center_x + ',' + center_y +
            'L' + d3_sel.mouse(this)[0] + ',' + d3_sel.mouse(this)[1]
        );
     } else {
     // We are dragging the shape itself
        console.log(event);
        d3_sel.event.sourceEvent.stopPropagation();
        d3_sel.select(this)
          .attr('x', d3_sel.event.x)
          .attr('y', d3_sel.event.y); 

        svg.selectAll('path.edge')
          .filter(function(edge_datum) {
            return edge_datum.from === shape_datum || edge_datum.to === shape_datum;
          })
          .attr('d', renderPath);


        // TODO consider passing in state as a parameter. State right now is a global var...
        shape_datum.x = d3_sel.event.x; 
        shape_datum.y = d3_sel.event.y; 

        // TODO consider saving state to localstorage on dragend?
        // or maybe even while dragging?
    }
  },

  handleDragend: function(d, index) {
    console.log("on dragend");
    console.log(d);
    console.log(d3_sel.event.type, d3_sel.event.target, d3_sel.event );
    // d is the object we started drag event with (dragstart)
  }


});


export default BoardView;
