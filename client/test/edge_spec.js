import Edge from '../src/js/models/edge.js';
import Rect from '../src/js/models/rect.js';


describe('Default attributes', function() {
  var e;

  beforeEach(function() {
    e = new Edge(); 
  });

  it('can be created with default attributes', function() {
    expect(e.get('label')).toBe('');
  });

  it('`from` and `to` ids must exist', function() {
    expect(e.get('from')).toBeDefined();
    expect(e.get('to')).toBeDefined();
  });

});



describe('Validations', function() {
  var e;
  var errorCallback;

  beforeEach(function() {
    errorCallback = jasmine.createSpy('-invalid event callback-');
    e = new Edge(); 
    e.on('invalid', errorCallback);
  });

  it('`from` and `to` ids must be numbers', function() {
    e.set({from: '1', to: 2}, {validate: true});
    expect(errorCallback.calls.mostRecent().args[1]).toBe('`from` must be a Number');

    e.set({from: 1, to: '2'}, {validate: true});
    expect(errorCallback.calls.mostRecent().args[1]).toBe('`to` must be a Number');

  });

    // should check when creating new edge object as well
  it('`from` and `to` ids cannot be the same', function() {
    e.set({from: 2, to: 2}, {validate: true});

    expect(errorCallback.calls.mostRecent().args[1]).toBe('`from` and `to` vertex ids cannot be the same');
      
  });



});



