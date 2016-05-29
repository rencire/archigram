// TODO figure out how to import relative to '../src/js' 
// e.g import state from 'state.js'
// '
// import state from '../src/js/state.js';
import Vertex from '../src/js/models/vertex.js';

describe('Vertex Model', () => {

  it('can be created with default attributes', () => {
    var v = new Vertex();
    expect(v.get('label')).toBe('');
    expect(v.get('x')).toBe(0);
    expect(v.get('y')).toBe(0);
    expect(v.get('highlight')).toBe(false);
  });

  it('should trigger an invalid event on failed validation', () => {
    var errorCallback = jasmine.createSpy('-invalid event callback-');
    var vert = new Vertex();

    vert.on('invalid', errorCallback);

    vert.set({x: '123'}, {validate: true});

    expect(errorCallback.calls.mostRecent().args[0]).toBe(vert);
    expect(errorCallback.calls.mostRecent().args[1]).toBe('x must be a Number');

  });
});


