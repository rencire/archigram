import $ from 'jquery';
import 'jasmine-jquery';

import Rect from '../../src/js/models/rect.js';
import RectView from '../../src/js/views/rectView.js';
import BoardView from '../../src/js/views/boardView.js';


describe('Tests for RectView', function() {
  beforeEach(function() {
    var namespace = 'http://www.w3.org/2000/svg';
    this.svg = document.createElementNS(namespace, 'svg');
    this.svg.id = 'board';
    document.body.appendChild(this.svg); 

    this.rectView = new RectView({model: new Rect() });
  });

  afterEach(function() {
    this.svg.remove();
  });


  it('Should be tied to a DOM element when created, based off the property provided.', function() {
    expect(this.rectView.el.tagName.toLowerCase()).toBe('rect');
  });

  it('Is backed by a model instance', function() {
    expect(this.rectView.model).toBeDefined();
    // console.log(this.rectView.model);
    // console.log(Object.getPrototypeOf(this.rectView.model));
    // console.log(Object.getPrototypeOf(Object.getPrototypeOf(this.rectView.model)));
     // console.log(this.rectView.model);
    expect(this.rectView.model.get('label')).toBe('');
    expect(this.rectView.model.get('width')).toBe(100);
    expect(this.rectView.model.get('height')).toBe(100);
  });


});

describe('RectView', function() {
  beforeEach(function(){
    this.model = new Backbone.Model({
      label: 'My Rect',
      width: 30,
      height: 30,
      x: 20,
      y:20
    });

    this.view = new RectView({model: this.model});
  });

  describe('Rendering', function() {
    it('returns the view object', function() {
      expect(this.view.render()).toBe(this.view);
    });

    // TODO think if this is worth testing.  we need to check if the model attributes will be reflected on the html attributes
    xit('produces the correct HTML', function() {
      this.view.render();

      // console.log(this.view.el);
      expect(this.view.el.outerHTML).toContain('x=20');
      expect(this.view.el.outerHTML).toContain('y=20');
      expect(this.view.el.outerHTML).toContain('width=30');
      expect(this.view.el.outerHTML).toContain('height=30');
    });
  });


});

describe('Clicks with RectView', function() {
  
  beforeEach(function() {
    var namespace = 'http://www.w3.org/2000/svg';
    this.svg = document.createElementNS(namespace, 'svg');
    this.svg.id = 'board';
    document.body.appendChild(this.svg); 

    this.boardView = new BoardView();
  });

  afterEach(function() {
    this.svg.remove();
  });

  // TODO fix this.  Defect is not reproducible with this test:
  // - clicking on an existing shape will create a new shape
  // - unexpected behavior, but this test is not catching it.
  xit('should select the shape when user clicks on shape', function() {
    // simulate mouse click event with a specified coordinate
    var ev = document.createEvent('MouseEvent');
    var ev2 = document.createEvent('MouseEvent');

    var click_coord_x = 100;
    var click_coord_y = 100;
    ev.initMouseEvent(
        "click",
        true /* bubble */, true /* cancelable */,
        window, null,
        0, 0, click_coord_x, click_coord_y, /* coordinates */
        false, false, false, false, /* modifier keys */
        0 /*left*/, null
    );

    ev2.initMouseEvent(
        "click",
        true /* bubble */, true /* cancelable */,
        window, null,
        0, 0, 20, 20, /* coordinates */
        false, false, false, false, /* modifier keys */
        0 /*left*/, null
    );


    // Now test by clicking on same spot
    this.svg.dispatchEvent(ev);
    this.svg.dispatchEvent(ev2);

    var rect = document.querySelector('rect');
    console.log(rect);
    // expect(rect).toBe(1);
    // expect(rect.class).toBe('selected');
  });

  xit('should NOT select the shape when user clicks outside of the shape', function() {

  });
})
