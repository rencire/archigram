import Backbone from 'backbone';
import ShapeList from '../collections/shapes.js';
import RectView from './rectView.js';

var BoardView = Backbone.View.extend({

  el: '#board',

  events: {
    'click': 'createShape'
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
  }
});


export default BoardView;
