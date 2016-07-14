import Backbone from 'backbone';

import d3_drag from 'd3-drag';
import d3_selection from 'd3-selection';

import Edge from '../models/edge.js';

import {renderPath, resetDragLine} from '../helper.js';

// TODO figure out why we need to `require` these libraries
//var $ = require('jquery');


var rectView = Backbone.View.extend({

    events: {
        'click': 'handleClick',
        'click rect': 'toggleSelect',
        'mouseup': 'handleMouseUp',
        'mousedown': 'handleMouseDown'
    },


    initialize: function () {
        // need to create element with svg namespace, hence not using `tagName` property
        var namespace = 'http://www.w3.org/2000/svg';

        // Create rect ele
        var group = document.createElementNS(namespace, 'g');
        var rect = document.createElementNS(namespace, 'rect');
        rect.classList.add('shape');


        // Create editable text ele
        // To make text editable, look into usinga  foreignObject
        // Credt to john ktejik
        //http://stackoverflow.com/questions/9308938/inline-text-editing-in-svg
        var myforeign = document.createElementNS(namespace, 'foreignObject')
        var textdiv = document.createElement("div");
        var textnode = document.createTextNode("Click to edit");
        textdiv.setAttribute("contentEditable", "true");
        textdiv.setAttribute("width", "auto");
        myforeign.classList.add("foreign"); //to make div fit text
        textdiv.classList.add("insideforeign"); //to make div fit text


        // add elements to group svg
        group.appendChild(rect);
        group.appendChild(myforeign);
        myforeign.appendChild(textdiv);
        textdiv.appendChild(textnode);


        // Listeners
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);


        //this.model.on('remove', this.removed, this);

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


        this.setElement(group);

        this.listenTo(Backbone.pubSub, 'drawEdge', this.incomingEdge);
    },

    render: function () {
        var rect = this.el.firstChild;
        var fo = this.el.lastChild;
        var text = fo.firstChild;
        var txtWidth = this.model.get('width') - 20;

        fo.setAttribute('x', (this.model.get('x') - this.model.attributes.width / 2) + 10);
        fo.setAttribute('y', this.model.get('y') - this.model.get('height')/2 + 20);
        fo.setAttribute('width', txtWidth );

        text.style["max-width"] = txtWidth + 'px';


        rect.setAttribute('x', this.model.attributes.x - this.model.attributes.width / 2);
        rect.setAttribute('y', this.model.attributes.y - this.model.attributes.height / 2);
        rect.setAttribute('width', this.model.attributes.width);
        rect.setAttribute('height', this.model.attributes.height);
        rect.setAttribute('data-id', this.model.id);

        rect.classList.toggle('highlight', this.model.get('highlight'));

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
        // console.log('drag end');

        // console.log(d3_selection.event);

        // approach 1
        // If (this.add_edge_mode && hovering over another shape) {
        //  add edge to edgeCollection with this.model, and the to.model
        // }


        // approach 2
        // emit event for boardView to handle.
        // Two choices:
        //    - low leve dom element handlers
        //    - bacbkkone level event handlers


        // Want to let the target element handle the event
        // NOTE: we have to re-trigger mouseup event since d3-drag blocks event from bubbling up
        //var dest_ele = d3_selection.event.sourceEvent.target;
        //var evt = new MouseEvent('mouseup');
        //evt._incomingModel = this;
        //dest_ele.dispatchEvent(evt);

        // TODO handle case where we release edge within the origin shape.
        // if (this.parentView.add_edge_mode && mouse coordinates are still in shape) {
        //     resetDragLine();
        //     return

        // Backbone level event handler
        if (this.parentView.add_edge_mode) {

            var dest_id = d3_selection.event.sourceEvent.target.getAttribute('data-id');

            // TODO consider changing from cid to id.
            // are models guaranteed to have the same cid when loaded from persistence layer?

            // Why publish event? we want to let the destination shape handle the action.
            // Else, we will have to do extra checks (test if event.target is a Rect/Shape view)
            Backbone.pubSub.trigger('drawEdge', this.model.id, dest_id);
            this.parentView.add_edge_mode = false;
            resetDragLine();
            return;
        }

        // Otherwise, we're not dragging.
        // We want to save model's new coordinates to persistent layer (local storage)
        this.model.save();
        resetDragLine();
    },

    handleClick: function (e) {
        // stop from progating to boardview's click handler
        e.stopPropagation();

    },

    toggleSelect: function(e) {
        this.model.save({highlight: !this.model.attributes.highlight});
    },


    //incomingEdge: function(incomingModel) {
    //    Backbone.pubSub.trigger('board:addEdge', incomingModel, this);
    //},

    handleMouseUp: function (e) {
        console.log('mouseup');

        // stop from progating to `this` click handler, and above (svg click handler)
        e.stopPropagation();
        console.log(this);

    },

    incomingEdge: function (src_id, dest_id) {
        if (dest_id == this.model.id) {
            this.parentView.createEdge(src_id, dest_id);
        }
    },

    destroyed: function () {
        // console.log('destroyed');
    },

    removed: function () {
        // console.log('removed');
    }

});

export default rectView;
