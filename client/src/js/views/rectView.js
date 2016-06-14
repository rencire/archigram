import Backbone from 'backbone';

import d3_drag from 'd3-drag';
import d3_selection from 'd3-selection';

import Edge from '../models/edge.js';

import {resetDragLine} from '../helper.js';

// TODO figure out why we need to `require` these libraries
//var $ = require('jquery');


var rectView = Backbone.View.extend({

    events: {
        'click': 'handleClick',
        'mouseup': 'handleMouseUp'
    },

    initialize: function () {
        // need to create element with svg namespace, hence not using `tagName` property
        var namespace = 'http://www.w3.org/2000/svg';
        var rect = document.createElementNS(namespace, 'rect');
        rect.classList.add('shape');

        this.model.on('change', this.render, this);
        // bind drag event handlers
        // http://jqueryui.com/draggable/#events
        // $(rect).draggable({
        //   start: this.onDragStart,
        //   drag: this.onDrag.bind(this),
        //   stop: this.onDragStop
        // });

        // console.log(d3_drag);
        // console.log(d3_selection);
        // TODO refactor this.  no need to create a new drag object evertyime a new view is initialized. (singleton pattern?)
        var drag = d3_drag.drag()
            .on('start', this.handleDragStart.bind(this))
            .on('drag', (function (view, d3_selection) {
                return function (e) {
                    view.handleDrag(e, d3_selection);
                };
            })(this, d3_selection))
            .on('end', this.handleDragEnd.bind(this))
            .subject(this.model.attributes);

        d3_selection.select(rect).call(drag);
            //.on('mouseup', this.handleShapeMouseup);



        this.setElement(rect);
    },

    render: function () {
        this.$el
            .attr('x', this.model.attributes.x - this.model.attributes.width / 2)
            .attr('y', this.model.attributes.y - this.model.attributes.height / 2)
            .attr('width', this.model.attributes.width)
            .attr('height', this.model.attributes.height)
            .toggleClass('highlight', this.model.attributes.highlight);

        return this;
    },

    handleDragStart: function (d, i, sel) {
        console.log('drag start');

        if (d3_selection.event.sourceEvent.shiftKey) {
            this.parentView.add_edge_mode = true;
            this.parentView.add_edge_source = this.model;
        }

    },

    // http://stackoverflow.com/questions/1108480/svg-draggable-using-jquery-and-jquery-svg#6166850
    handleDrag: function (e, d3_selection) {

        this.parentView.add_edge_mode = d3_selection.event.sourceEvent.shiftKey;
        var dragline = document.querySelector('path.link');


        // If shift key is held, go into "add edge mode"
        // and start drawing edge path
        if (this.parentView.add_edge_mode) {
            this.parentView.edge_source_view = this;

            dragline.classList.toggle('hidden', false);
            var center_x = (this.model.attributes.x);
            var center_y = (this.model.attributes.y);
            dragline.setAttribute('d',
                'M' + center_x + ',' + center_y +
                'L' + d3_selection.mouse(this.el)[0] + ',' + d3_selection.mouse(this.el)[1]
            );
        } else {


            // console.log('drag');
            // console.log(d3_selection.event);
            // console.log(this);
            // console.log(this.model);
            this.model.set({
                x: d3_selection.event.x,
                y: d3_selection.event.y
            });
        }

    },


    handleDragEnd: function (e) {
        console.log('drag end');

        console.log(d3_selection.event);
        //var dest_ele = d3_selection.event.sourceEvent.target;
        //var evt = new MouseEvent('mouseup');
        //dest_ele.dispatchEvent(evt);


        //
        // approach 1
        // If (this.add_edge_mode && hovering over another shape) {
        //  add edge to edgeCollection with this.model, and the to.model
        // }



        // approach 2 (eventBus)
        // emit event for boardView to handle.


        // Approach 1 seems simplest for now, so lets go with that

        //console.log(this.parentView.add_edge_mode);
        //console.log(this.parentView.edge_source_view);
        //console.log(this);
        //
        //
        //var source_view = this.parentView.edge_source_view;
        //var dest_view = this;
        //
        //
        //
        //
        //
        //
        //// TODO
        //// Should all this logic be in the rectView? or should we ask BoardView (either by calling it or via events)
        //// to handle adding an edge?
        //if (this.parentView.add_edge_mode && source_view != dest_view) {
        //    console.log(d3_selection.event);
        //
        //    var e = new Edge({
        //        from: source_view.model,
        //        to: dest_view.model
        //    });
        //
        //    this.parentView.edgeCollection.add(e);
        //}
        //



        this.parentView.add_edge_mode = false;
        this.parentView.edge_source_view = null;


        resetDragLine();

    },

    handleClick: function (e) {
        e.stopPropagation();

        this.model.set({highlight: !this.model.attributes.highlight});
        //this.el.classList.toggle('selected');

        // Test using Backbone as the event bus
        //Backbone.pubSub.trigger('test');
    },


    handleMouseUp: function () {
        console.log('mouseup');
        //console.log(this);
    }

});

export default rectView;
