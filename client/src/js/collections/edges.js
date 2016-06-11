import Backbone from 'backbone';
import Edge from '../models/edge.js';

var EdgeList = Backbone.Collection.extend({
    model: Edge
});

export default EdgeList;