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
        
        // this.render();

        this.listenTo(this.shapeCollection, 'add', this.renderShape);
        // this.listenTo(this.shapeCollection, 'sync', this.fetchEdges);

        this.listenTo(this.edgeCollection, 'add', this.renderEdge);

        this.listenTo(Backbone.pubSub, 'board:addEdge', this.test);
        this.listenTo(Backbone.pubSub, 'board:rmSelShapes', this.delSelectedShapes);
        this.listenTo(Backbone.pubSub, 'board:genDiagram', this.genDiagram);
        this.listenTo(Backbone.pubSub, 'board:destroyAll', this.destroyAll);

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
        this.dragline = svg.append('svg:path')
            .attr('class', 'link hidden')
            .classed('dragline', true)
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


        this.loadData();
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
        var rectView = new RectView({model: model});
        rectView.parentView = this;
        this.$el.append(rectView.render().el);
    },

    // TODO consider moving some of these methods to model if necessary
    createShape: function (e) {

        // TODO figure out difference between clientX/screenX/offsetX
        // in Rect.js?
        var model = this.shapeCollection.create({
            x: e.offsetX,
            y: e.offsetY
        });
    },


    delSelectedShapes: function () {
        var selected = this.shapeCollection.where({highlight: true});
        selected.forEach(function (m) {
            m.destroy();
        });
    },

    createEdge: function (src_id, dest_id) {
        // alt approach:
        // - save edge w/ ids
        // - add edge to collection replacing ids w/ respective shape objects
        //
        // But better to make the least amount of changes at the most specific cutpoint (e.g model.sync)
        // Hence sticking w/ current approach.
        this.edgeCollection.create({
            from: this.shapeCollection.get({id: src_id}),
            to: this.shapeCollection.get({id: dest_id})
        });
    },

    renderEdge: function (model) {
        var edgeView = new EdgeView({model: model});

        // no jquery needed
        var firstRect = document.getElementsByTagName('rect')[0];
        this.el.insertBefore(edgeView.render().el, firstRect);

        edgeView.parentView = this; },

    fetchEdges: function() {
        // Need to convert each edge's 'from' and 'to' attributes from ids into objects.

        // Approach 1:
        // - Once all data is fetched, modify the 'from' and 'to' attributes

        // Hence, we need to surpress the 'add' event, else we will
        // prematurely render the edge w/o the model object in the edge's attributes
        // this.edgeCollection.fetch({silent: true});
        //
        // this.edgeCollection.forEach(function(model) {
        //     var from_id = model.get('from');
        //     var to_id = model.get('to');
        //     var from = this.shapeCollection.get(from_id);
        //     var to = this.shapeCollection.get(to_id);
        //     model.set('from', from);
        //     model.set('to', to);
        //     model.listenToShapes(from, to);
        //     this.renderEdge(model);
        // }, this);

        // Problem with approach above: on edge initialization, was listening to shape 'ids' instead of shape objects

        // Approach 2:
        // - use custom 'success' handler
        var onEdgeCollSuccess = (function(collection, resp, options) {
            resp.forEach(function(m) {
                m.from = this.shapeCollection.get(m.from);
                m.to = this.shapeCollection.get(m.to);
                this.edgeCollection.add(m);
            }, this);
        }).bind(this);

        this.edgeCollection.fetch({add:false, success: onEdgeCollSuccess});
    },

    loadData: function() {
        var onShapeSuccess = (function(collection, resp, options) {
            this.fetchEdges();
        }).bind(this);

        this.shapeCollection.fetch({success: onShapeSuccess});

    },

    destroyAll: function() {
        // clear all shapes and edges on board
        var model;
        while (model = this.shapeCollection.first()) {
            model.destroy();
        }

        var edge;
        while (edge = this.edgeCollection.first()) {
            edge.destroy();
        }
    },

    genDiagram: function() {
        this.destroyAll();
        
        // add preset diagram
        var coords = [
            {x: 100, y:200},
            {x: 350, y:550},
            {x: 300, y:250},
            {x: 500, y:100},
        ];

        coords.forEach(function(pnt) {
            this.shapeCollection.create(pnt);
        }, this);

        this.edgeCollection.create({from: this.shapeCollection.at(2), to: this.shapeCollection.at(0)});
        this.edgeCollection.create({from: this.shapeCollection.at(1), to: this.shapeCollection.at(3)});
        this.edgeCollection.create({from: this.shapeCollection.at(1), to: this.shapeCollection.at(2)});

    }


});


export default BoardView;
