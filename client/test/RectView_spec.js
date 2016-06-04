import $ from 'jquery';
import 'jasmine-jquery';

import Rect from '../src/js/models/rect.js';
import RectView from '../src/js/views/rectView.js';


describe('Tests for RectView', function() {
  beforeEach(function() {
    $('body').append('<svg id="board"></svg>'); 
    this.rectView = new RectView({model: new Rect() });
  });

  afterEach(function() {
    this.rectView.remove();
    $('#board').remove();
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
