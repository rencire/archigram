import Backbone from 'backbone';

import {renderPath} from '../helper.js';


var edgeView = Backbone.View.extend({

    initialize: function () {
        var namespace = 'http://www.w3.org/2000/svg';
        var path = document.createElementNS(namespace, 'path');

        this.setElement(path);

        this.listenTo(this.model.get('from'), 'change:x', this.render);
        this.listenTo(this.model.get('from'), 'change:y', this.render);

        this.listenTo(this.model.get('to'), 'change:x', this.render);
        this.listenTo(this.model.get('to'), 'change:y', this.render);

        this.listenTo(this.model.get('to'), 'destroy', this.remove);
        this.listenTo(this.model.get('from'), 'destroy', this.remove);

    },

    render: function() {
        var path_str = renderPath(this.model.attributes);
        this.$el
            .attr('d', path_str)
            .addClass('link');

        this.el.style['marker-end'] = "url(#end-arrow)";

        return this;
    },
    

    
});

export default edgeView;
