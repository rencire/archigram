import Backbone from 'backbone';
import Rect from '../models/rect.js';

var ShapeList = Backbone.Collection.extend({
  model: Rect
});

export default ShapeList;
