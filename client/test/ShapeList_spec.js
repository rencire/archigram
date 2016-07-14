import Rect from '../src/js/models/rect.js';
import ShapeList from '../src/js/collections/shapes.js';

describe('ShapeList tests', function () {

    // TODO add afterEAch step to clear localstorage
    beforeEach(function () {
        localStorage.clear();
    });

    afterEach(function () {
        localStorage.clear();
    });

    it('Can ADD instances of Rectangle Model', function () {
        var shapes = new ShapeList();
        expect(shapes.length).toBe(0);

        shapes.add({label: 'I am a rect'});
        expect(shapes.length).toBe(1);
    });

    it('correctly filters out the selected shapes', function () {
        var shapes = new ShapeList();
        shapes.add({highlight: true});
        shapes.add({highlight: true});
        shapes.add({highlight: false});

        expect(shapes.selected().length).toBe(2);

    });

    // TODO figure out why there are 16 items under the 'archigram-shapes' key
    xit('saves collection models to localstorage', function () {
        var sl = new ShapeList();
        sl.create({x: 10, y: 10});
        console.log(localStorage.key(0).length);
    });


    it('should load models from backbone.localStorage', function () {
        var shapes = new ShapeList();
        shapes.create({x: 100, y: 100});

        var shapes2 = new ShapeList();
        shapes2.fetch();

        expect(shapes2.length).toBe(1);

    });


});
