import Backbone from 'backbone';
import Rect from '../models/rect.js';

var ShapeList = Backbone.Collection.extend({
  model: Rect,

  selected: function() {
    return this.filter(function(shape) {
      return shape.get('highlight');    
    }); 
  }
});

export default ShapeList;
