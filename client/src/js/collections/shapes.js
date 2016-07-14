import Backbone from 'backbone';
import Rect from '../models/rect.js';
import 'backbone.localstorage';

var ShapeList = Backbone.Collection.extend({
    model: Rect,

    localStorage: new Backbone.LocalStorage("archigram-shapes"), // Unique name within your app.

    selected: function () {
        return this.filter(function (shape) {
            return shape.get('highlight');
        });
    }
});

export default ShapeList;
