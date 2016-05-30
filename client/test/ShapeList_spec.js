import ShapeList from '../src/js/collections/shapes.js';

describe('ShapeList tests', function() {
  it('Can ADD instances of Rectangle Model', function() {
    var shapes = new ShapeList();
    expect(shapes.length).toBe(0);

    shapes.add({label: 'I am a rect'});
    expect(shapes.length).toBe(1);
  });
  
  it('correctly filters out the selected shapes', function() {
    var shapes = new ShapeList();
    shapes.add({highlight: true});
    shapes.add({highlight: true});
    shapes.add({highlight: false});

    expect(shapes.selected().length).toBe(2);

  });

});
