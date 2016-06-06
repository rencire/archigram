import BoardView from '../src/js/views/boardView.js';

describe('Tests for BoardView', function() {
  beforeEach(function() {
    var namespace = 'http://www.w3.org/2000/svg';
    this.svg = document.createElementNS(namespace, 'svg');
    this.svg.id = 'board';

    document.body.appendChild(this.svg); 
    this.boardView = new BoardView();
  });

  it('Should create a new Rect with origin coordinates at mouse position click', function() {
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
  });
});
