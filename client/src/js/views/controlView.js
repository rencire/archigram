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


// todo Figure out why buttons are not rendering
var ControlView = Backbone.View.extend({
    el: '#controls',

    events: {
        'click #rm-sel-shapes-btn': 'rmSelShapes'
    },

    render: function () {
        var buttons = [
            {id: 'save-state-btn', text: 'Save State'},
            {id: 'pop-storage-btn', text: 'Populate storage'},
            {id: 'clr-storage-btn', text: 'clear storage'},
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
    }
});

export default ControlView;
