import Backbone from 'backbone';
import {vertexProto} from './protos.js';

console.log(vertexProto);
var Vertex = Backbone.Model.extend(vertexProto);

export default Vertex;
