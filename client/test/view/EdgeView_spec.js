import $ from 'jquery';
import 'jasmine-jquery';

import Rect from '../../src/js/models/rect.js';

import Edge from '../../src/js/models/edge.js';
import EdgeView from '../../src/js/views/edgeView.js';


describe('Tests for EdgeView', function() {
    beforeEach(function () {
        var namespace = 'http://www.w3.org/2000/svg';
        this.svg = document.createElementNS(namespace, 'svg');
        this.svg.id = 'board';
        document.body.appendChild(this.svg);

    });

    afterEach(function () {
        this.svg.remove();
    });


    it('Should be tied to a DOM element when created, based off the property provided.', function () {
        this.edgeView = new EdgeView({model: new Edge()});

        expect(this.edgeView.el.tagName.toLowerCase()).toBe('path');
    });

    it('Is backed by a default model instance', function () {
        this.edgeView = new EdgeView({model: new Edge()});

        expect(this.edgeView.model).toBeDefined();
        // console.log(this.rectView.model);
        // console.log(Object.getPrototypeOf(this.rectView.model));
        // console.log(Object.getPrototypeOf(Object.getPrototypeOf(this.rectView.model)));
        // console.log(this.rectView.model);
        expect(this.edgeView.model.get('from')).toBeNull();
        expect(this.edgeView.model.get('to')).toBeNull();
    });

    it('should render the correct path string', function() {
        var rect1 = new Rect({id: 1, x: 100, y:100});
        var rect2 = new Rect({id: 2, x: 400, y:400} );

        var edgeView = new EdgeView({
            model: new Edge({from: rect1, to: rect2})
        });

        // TODO calculate this by hand? or trust the `renderPath` function?
        var expectedPathStr = 'M100,100L337.5,337.5';
        var actualPathStr = edgeView.render().el.getAttribute('d');
        expect(actualPathStr).toBe(expectedPathStr);

    });

});
