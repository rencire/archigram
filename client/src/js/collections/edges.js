import Backbone from 'backbone';
import Edge from '../models/edge.js';

var EdgeList = Backbone.Collection.extend({
    model: Edge,

    localStorage: new Backbone.LocalStorage("archigram-edges")

    // // TODO
    // // - override sync method so we can put a custom 'success' callback.
    // sync: function() {
    //
    // }
});

export default EdgeList;