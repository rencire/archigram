import Backbone from 'backbone';

// helper function to create elements
function ele(type, attributes) {
    var node = document.createElement(type);

    for (var prop in attributes) {
        if (attributes.hasOwnProperty(prop)) {
            node.setAttribute(prop, attributes[prop]);
        }
    }

    for (var i = 2; i < arguments.length; i++) {
        var child = arguments[i];
        if (typeof child === 'string') {
            child = document.createTextNode(child);
        } 
        node.appendChild(child);
    }
    return node;
}


var ControlView = Backbone.View.extend({
    el: '#controls',

    events: {
        'click #rm-sel-shapes-btn': 'rmSelShapes',
        'click #gen-diag-btn': 'genDiagram',
        'click #clr-data-btn': 'clearData'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        var buttons = [
            {id: 'gen-diag-btn', text: 'Gen Diagram'},
            {id: 'clr-data-btn', text: 'Clear Data'},
            {id: 'rm-sel-shapes-btn', text: 'remove selected shapes'},
        ];

        buttons.forEach(function(data) {
            var n = ele('button', {id: data.id}, data.text);
            this.el.appendChild(n);
        }, this);

        return this;
    },

    rmSelShapes: function() {
        Backbone.pubSub.trigger('board:rmSelShapes');
    },

    genDiagram: function() {
        Backbone.pubSub.trigger('board:genDiagram');
    },

    clearData: function() {
        Backbone.pubSub.trigger('board:destroyAll');
    }
});

export default ControlView;
