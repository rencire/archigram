import Backbone from 'backbone';

import d3_drag from 'd3-drag';
import d3_selection from 'd3-selection';

// TODO figure out why we need to `require` these libraries
// Doesn't webpack handle es6 import? Maybe it can't handle jquery-ui format?
import $ from 'jquery';

import {renderPath} from '../helper.js';



var edgeView = Backbone.View.extend({

    initialize: function () {
        var namespace = 'http://www.w3.org/2000/svg';
        var path = document.createElementNS(namespace, 'path');

        this.setElement(path);
    },

    render: function() {
        var path_str = renderPath(this.model.attributes);
        this.$el
            .attr('d', path_str)
            .addClass('link');

        this.el.style = 'marker-end: url(#end-arrow)';

        return this;
    }

    
});

export default edgeView;
