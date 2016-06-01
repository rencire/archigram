import Backbone from 'backbone';

var rectView = Backbone.View.extend({

  initialize: function() {
    var namespace = 'http://www.w3.org/2000/svg';
    var rect = document.createElementNS(namespace, 'rect');

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

  

});

export default rectView;
