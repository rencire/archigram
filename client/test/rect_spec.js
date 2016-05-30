import Rect from '../src/js/models/rect.js';

describe('Rect validation tests', function() {
  var errorCallback;
  var rect;

  beforeEach(function() {
    errorCallback = jasmine.createSpy('-invalid event callback-');
    rect = new Rect();
    rect.on('invalid', errorCallback);
  });

  it('has width and height as numbers', function() {
    rect.set({width: '500'}, {validate: true});

    expect(errorCallback.calls.mostRecent().args[1]).toBe('Width must be a Number');

    rect.set({height: '300'}, {validate: true});
    expect(errorCallback.calls.mostRecent().args[1]).toBe('Height must be a Number');
  });

  it('has positive width and height values', function() {
    rect.set({width: -1}, {validate: true});

    expect(errorCallback.calls.mostRecent().args[1]).toBe('Width must be >= 0');

    rect.set({height: -10}, {validate: true});
    expect(errorCallback.calls.mostRecent().args[1]).toBe('Height must be >= 0');
  });
});
