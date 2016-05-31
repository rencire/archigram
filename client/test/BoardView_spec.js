import $ from 'jquery';
import 'jasmine-jquery';

import Rect from '../src/js/models/rect.js';
import RectView from '../src/js/views/rectView.js';


describe('RectView tests', function() {
  beforeEach(function() {
    $('body').append('<svg id="board"></svg>'); 
    this.rectView = new RectView({model: new Rect() });
  });

  afterEach(function() {
    this.rectView.remove();
  });

  it('Is backed by a model instance', function() {
    expect(this.rectView.model).toBeDefined();
    // console.log(this.rectView.model);
    // console.log(Object.getPrototypeOf(this.rectView.model));
    // console.log(Object.getPrototypeOf(Object.getPrototypeOf(this.rectView.model)));
    expect(this.rectView.model.get('label')).toBe('');
    expect(this.rectView.model.get('width')).toBe(50);
    expect(this.rectView.model.get('height')).toBe(50);
  });
});
