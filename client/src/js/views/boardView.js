import Backbone from 'backbone';
import ShapeList from '../collections/shapes.js';
import RectView from './rectView.js';

import EdgeList from '../collections/edges.js';
import EdgeView from './edgeView.js';

import {rectProtoDefaults} from '../models/protos.js';

import d3_sel from 'd3-selection';


var BoardView = Backbone.View.extend({

    el: '#board',

    add_edge_mode: false,

    edge_source_view: null,

    events: {
        'click': 'createShape',
        //'dragmove rect': 'test',
        //'mouseup .shape': 'test'
    },

    initialize: function () {
        this.shapeCollection = new ShapeList();
        this.edgeCollection = new EdgeList();
        this.render();

        this.listenTo(this.shapeCollection, 'add', this.renderShape);
        this.listenTo(this.edgeCollection, 'add', this.renderEdge);

        //this.listenTo(Backbone.pubSub, 'test', this.test);


        // TODO - refactor this to remove dependency on d3.

        /*
         *  Load initial shapes
         */
        var svg = d3_sel.select('#board');

        // add arrow markers
        // define arrow markers for graph links
        // borrowed from:
        // http://bl.ocks.org/cjrd/6863459
        var defs = svg.append('svg:defs');
        defs.append('svg:marker')
            .attr('id', 'end-arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', "7")
            .attr('markerWidth', 3.5)
            .attr('markerHeight', 3.5)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,-5L10,0L0,5');

        // define arrow markers for leading arrow
        defs.append('svg:marker')
            .attr('id', 'mark-end-arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 7)
            .attr('markerWidth', 3.5)
            .attr('markerHeight', 3.5)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,-5L10,0L0,5');


        // draw dragline
        var dragline = svg.append('svg:path')
            .attr('class', 'link hidden')
            .style('marker-end', 'url(#mark-end-arrow)');


        // TODO - move below code to an 'edge' collection.initialize function.
        //// draw edges
        //// Note: need to draw edges before shapes
        //var sel_edge = svg.selectAll('path.edge')
        //    .data(state.edges, function(d) {return d.id;})
        //    .enter()
        //    .append('path')
        //    .classed('edge', true)
        //    .classed('link', true)
        //    .attr('d', renderPath)
        //    .style('marker-end', 'url(#end-arrow)');
        //


    },

    render: function () {
        // Do we need `this` as second argument to `each`?
        this.shapeCollection.each(function (model) {
            this.renderShape(model);
        });

        this.edgeCollection.each(function (model) {
            this.renderEdge(model);
        });

    },

    renderShape: function (model) {
        // console.log('rendered');
        // console.log(model);
        var rectView = new RectView({model: model});
        rectView.parentView = this;
        console.log(rectView);
        this.$el.append(rectView.render().el);
    },

    createShape: function (e) {

        // TODO figure out difference between clientX/screenX/offsetX
        // in Rect.js?
        var model = this.shapeCollection.add({
            x: e.offsetX,
            y: e.offsetY
        });
    },

    renderEdge: function (model) {
        var edgeView = new EdgeView({model: model});
        this.$el.append(edgeView.render().el);

        edgeView.parentView = this;
        console.log(edgeView);

    },
    test: function () {
        console.log('test');
    }


});


export default BoardView;
