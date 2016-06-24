import Backbone from 'backbone';

// helper function to create elements


function ele(type, attributes) {
    var node = document.createElement(type);

    for (var prop in attributes) {
        node.setAttribute(prop, attributes[prop]);
    }

    for (var i = 2; i < arguments.length; i++) {
        var child = arguments[i];
        if (typeof child === 'string') {
            child = document.createTextNode(child);
        } 
        node.appendChild(child);
    };
    return node;
}



var ControlView = Backbone.View.extend({
    el: '#controls',

    render: function () {
        console.log('in render');
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
    }
});

export default ControlView;
