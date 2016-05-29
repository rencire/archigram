
import Edge from '../src.js/models/edge.js';

describe('Validations', function() {

  beforeEach(function() {
    var errorCallback = jasmine.createSpy('-invalid event callback-');
    var e = new Edge(); 
    vert.on('invalid', errorCallback);
  });

  it('`from` and `to` ids must exist', function() {
    vert.set({from: 2, to: 2}, {validate: true});
    expect(errorCallback.calls.mostRecent().args[1]).toBe('`from` and `to` vertex ids must exist');
  });

    // should check when creating new edge object as well
  it('`from` and `to` ids cannot be the same', function() {
    vert.set({from: 2, to: 2}, {validate: true});

    expect(errorCallback.calls.mostRecent().args[1]).toBe('`from` and `to` vertex ids cannot be the same');
      
  });


});




describe('Default attributes', function() {

  it('can be created with default attributes', function() {
    var e = new Edge();
    expect(e.get('label')).toBe('');
  });

});
