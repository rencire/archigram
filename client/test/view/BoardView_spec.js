import BoardView from '../../src/js/views/boardView.js';
import Edge from '../../src/js/models/edge.js';
import Rect from '../../src/js/models/rect.js';

describe('Tests for BoardView', function() {
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

  xit('Should create a new Rect with origin coordinates at mouse position click', function() {
    // Below does not work since MouseEvent is not a constructor.
    // Maybe PhantomJS does not load MouseEvent constructor?
    //
    // var ev = new MouseEvent(
    //   "click",
    //   {
    //       'view': window,
    //       'bubbles': true,
    //       'cancelable': true
    //   }
    // );
    //
    // ev.screenX = 500;
    // ev.screenY = 500;

    // DEPRECATED.
    // However, it seems PhantomJS does not have MouseEvent constructor. Hence using this approach for now.
    //
    var ev = document.createEvent('MouseEvent');

    var click_coord_x = 500;
    var click_coord_y = 500;
    ev.initMouseEvent(
        "click",
        true /* bubble */, true /* cancelable */,
        window, null,
        0, 0, click_coord_x, click_coord_y, /* coordinates */
        false, false, false, false, /* modifier keys */
        0 /*left*/, null
    );

    this.svg.dispatchEvent(ev);

    // console.log(document.body.innerHTML());
    var rect = document.querySelector('rect');

    var origin_x = ev.offsetX;
    var origin_y = ev.offsetY;
    // console.log(origin_x);
    // console.log(origin_x);

    expect(parseInt(rect.getAttribute('x'))).toBe(origin_x - rect.getAttribute('width') / 2);
    expect(parseInt(rect.getAttribute('y'))).toBe(origin_y - rect.getAttribute('height') / 2);

    // cleanup this test by removing shapes
    document.querySelector('rect').remove();
  });

  xit('should create a new shape when clicking anywhere on the board not occupied by a shape', function() {

  });

  xit('should NOT create a new shape when clicking on an existing shape', function() {

  });

  //// TODO figure out why this test is failing
  it('should render a new edge when new edge model is added to collection', function() {
    var edge_model = new Edge({
      from: new Rect({x:100, y:200}),
      to: new Rect({x:200, y:100})
    });
    this.boardView.edgeCollection.add(edge_model);

    var edge = document.querySelector('path.link');
    expect(edge).not.toBeNull();

    expect(edge.classList.contains('link')).toBe(true);
    expect(edge.tagName).toBe('path');
  });


  // TODO hard to automate this behavior test. come back to this later
  xit('should render a new edge when holding shift and dragging from shape A to shape B', function() {

  });

  it('should be able to remove selected shapes from collection', function() {

    this.boardView.createShape({x: 200, y: 200});
    this.boardView.createShape({x: 500, y: 500});

    expect(this.boardView.shapeCollection.length).toBe(2);

    this.boardView.shapeCollection.at(0).set('highlight', true);
    this.boardView.delSelectedShapes();

    expect(this.boardView.shapeCollection.length).toBe(1);
  });
});

