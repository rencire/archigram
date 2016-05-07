import * as statehandler from './state.js';

export function bootstrap() {
// Handlers

// load sample data if first-time user
if(localStorage.getItem('state') === null) {
  statehandler.populateStorage();
} 


var state = statehandler.loadData();

// Model accessors

// get shape from `shapes` by `id`
// function getShape(id, shapes) {}

// TODO figure out why below event handler is not being called
// document.addEventListener("DOMContentLoaded", function(event) {
  console.debug("loading bootstrap.js");

  // bind plain js functions
  document.querySelector(".save").addEventListener('click', function() {
    statehandler.saveData(state);
  });


  document.querySelector(".populate-storage").addEventListener('click', function() {
    statehandler.populateStorage();
  });

  document.querySelector(".clear-storage").addEventListener('click', function() {
    statehandler.clearStorage();
  });

  document.querySelector(".rm-sel-shapes").addEventListener('click', function() {
    rmSelShapes();
  });


  // d3 element handlers
  function handleShapeMousedown(d) {
    console.log('on mousedown shape');
    console.log(d3.event.type, d3.event.target, d3.event );
    if(d3.event.shiftKey) {
      state.add_edge_mode = true;
      state.new_edge_source = d; 

      // position dragline to origin of current shape
      var center_x = (d.x + d.width/2);
      var center_y = (d.y + d.height/2);

      // display dragline
      dragline.classed('hidden', false);
      // dragline.attr('d', 
      //     'M' + center_x + ',' + center_y +
      //     'L' + 300 + ',' + 300
      // );
    }
  }


  // add edges to a shape in state.rects
  function addEdge(shape1, shape2, isDirected) {
    state.edges.push(
        {
          id: state.edges.length,
          from: shape1,
          to: shape2,
          directed: true
        }
    );
  }   
  
  // Add shape to state
  // TODO
  // Add other shapes
  // Only rects for now
  function addShape(origin) {
    state.rects.push(
        {
          id: state.rect_cnt,
          x: origin.x - 50,
          y: origin.y - 50,
          width: 100,
          height: 100,
          highlight: false
        }
    );

    state.rect_cnt = state.rect_cnt + 1;

  }
  
  function delSelShapes() {
    var sel_rects = state.rects.filter(function(rect) {
      return rect.highlight;
    });
    var sel_rect_ids = sel_rects.map(function(rect) {
      return rect.id;
    });  

    // O(n^2)? depends on implementation of `indexOf`
    // Keep edge if both `from` and `to` do not refer to selected rects.
    state.edges = state.edges.filter(function(edge) {
      var from_idx = sel_rect_ids.indexOf(edge.from.id);
      var to_idx = sel_rect_ids.indexOf(edge.to.id);

      return (from_idx === -1) && ( to_idx === -1);
    });

    // remove selected rects
    state.rects = state.rects.filter(function(rect) {
      return !rect.highlight;
    });
    
  }

  function toggleSelection(d, i){
    if (d3.event.defaultPrevented) {
      return;
    }
    console.log('on click shape');
    console.log(d3.event.type, d3.event.target, d3.event );
    // highlight node with a css class
    this.classList.toggle("highlight");

    // set view highlight
    d.highlight = !d.highlight;

    console.log(d);
    // save state
    // statehandler.saveData(state);
  }


  // Reset drag line for two cases:
  // 1) releasing edge line with cursor on another shape
  // 2) releasing edge line without cursor on another shape
  function handleBoardMouseup() {
    console.log("on mouseup board");
    console.log(d3.event.type, d3.event.target, d3.event );
    if (state.add_edge_mode) {
      state.add_edge_mode = false;
      resetDragLine(dragline);
      console.log("ended add_edge_mode from board");

    }
  }

  function handleBoardClick() {
    console.log('on click board');
    console.log(d3.event.type, d3.event.target, d3.event );

    // If we are dragging anything on the board, d3.event.defaultPrevented should be true for 'click' events
    // See https://github.com/mbostock/d3/wiki/Drag-Behavior#on
    if (d3.event.defaultPrevented) {
      return;
    }
      
    if (d3.event.target === this) {
      // note offsetX and offsetY are experimental apis
      createShape({x: d3.event.offsetX, y: d3.event.offsetY});
    }
  }

  // Right now, restricted to creating rectangles
  function createShape(origin) {
    addShape(origin);

    // Enter selection
    svg.selectAll('rect').data(state.rects, function(d) {return d.id;})
      .enter().append('rect')
      .attr("x", function(d) {return d.x;})
      .attr("y", function(d) {return d.y;})
      .attr("width", function(d) {return d.width;})
      .attr("height", function(d) {return d.height;})
      .classed("highlight", function(d) {return d.highlight;})
      .on("click", toggleSelection)
      .on("mousedown", handleShapeMousedown)
      .on("mouseup", handleShapeMouseup)
      .call(drag);
  }


  function rmSelShapes() {
    // remove selected shape and its neighboring edges from Model
    delSelShapes();

    // re-render shapes and edges
    // Exit selection 
    svg.selectAll('rect').data(state.rects, function(d) {return d.id;})
      .exit().remove();    
    
  // TODO 
  // check why edges not being removed
    svg.selectAll('path.edge').data(state.edges, function(d) {return d.id;})
      .exit().remove();
  }

  function handleShapeMouseup(target, index) {
    console.log("on mouseup shape");
    console.log(d3.event.type, d3.event.target, d3.event, d3.event.sourceEvent );

    // If mouse is over another shape:
    //    lock coordinate to origin of other shape (later we will want to have it automatically locked to one side of the square
    if (state.add_edge_mode && target !== state.new_edge_source) {
      createEdge(state.new_edge_source, target);
      console.log("added edge to data, rendered new edge");
    }
  }

  function createEdge(a, b) {
    // add directed edge to state
    addEdge(a, b, true);

    // NOTE:
    // - Consider using a generalized update function 
    // - Need to insert edges before shapes to make sure shape element 
    //    renders on top of edge elements
    svg.selectAll('path.edge').data(state.edges, function(d) {return d.id;})
      .enter().insert('path', ':first-child')
      // .enter().append('path')
      .classed('link', true)
      .classed('edge', true)
      .attr('d', renderPath)
      .style('marker-end', 'url(#end-arrow)');
  }

  //
  // Calculate path. 
  // If edge is directed, we are drawing the path a little bit away from
  // the shape for aesthetic reasons
  //
  // 'd' is an edge datum
  //
  // TODO: figure out how to space out multiple edges between two shapes
  // - Approach 1: shift origin of both shapes up, and call `calculatePerimeterPoint`.
  //    Since origin has changed, we need to calculate the point with different width 
  //    and height
  //
  function renderPath(d) {
    var instructions = "M" + center(d.from).x + "," + center(d.from).y + "L"; 

    if (d.directed) {
      var pnt = calculatePerimeterPoint(d.from, d.to, 0.25);
      return instructions + pnt.x + "," + pnt.y;
    } else {
      return instructions + center(d.to).x + "," + center(d.to).y;
    }
  }


  // from - shape
  // to - shape
  // pad_pct - padding percentage. 
  //  This padding is extra distance from the end of edge to the perimeter of `to` shape.
  //
  // TODO current logic only for rects. consider implementing different strategies for other shapes  
  function calculatePerimeterPoint(from, to, pct) {
    var padded_to = {
      x: to.x - (to.width * pct)/2,
      y: to.y - (to.height * pct)/2,
      width: to.width + (to.width * pct),
      height: to.height + (to.height * pct)
    };

    // svg.append('rect')
    //   .attr('x', padded_to.x) 
    //   .attr('y', padded_to.y) 
    //   .attr('width', padded_to.width) 
    //   .attr('height', padded_to.height)
    //   .style('fill', 'red');
    //
    // console.log(padded_to);

    // difference from center(to) used for finding perimeter point
    var in_w;
    var in_h;

    // distance between center(from) and center(to)
    var out_w = center(from).x - center(padded_to).x; 
    var out_h = center(from).y - center(padded_to).y; 

    // Calculates the distances we need to reposition away from the center of the rectangle
    if (fromDirection(from,to) === "right") {
       in_w = padded_to.width/2;
       in_h = (in_w/out_w) * out_h;
       return {x: padded_to.x + padded_to.width, y: center(padded_to).y + in_h};
    }

    if (fromDirection(from,to) === "bottom") {
       in_h = padded_to.height/2;
       in_w = (in_h/out_h) * out_w;
       return {x: center(padded_to).x + in_w, y: padded_to.y + padded_to.height};
    }

    if (fromDirection(from,to) === "left") {
       in_w = -padded_to.width/2;
       in_h = (in_w/out_w) * out_h;
       return {x: padded_to.x, y: center(padded_to).y + in_h};
    }

    if (fromDirection(from,to) === "top") {
       in_h = -padded_to.height/2;
       in_w = (in_h/out_h) * out_w;
       return {x: center(padded_to).x + in_w, y: padded_to.y};
    }

  }

  function fromDirection(from, to) {
    var from_ctr = center(from);
    var to_ctr = center(to);
    var w = to.width/2;
    var h = to.height/2;

    var angle = Math.atan2(from_ctr.y - to_ctr.y, from_ctr.x - to_ctr.x);

    // console.log("angle");
    // console.log(angle);

    var bot_right_angle = Math.atan2(h, w);
    var bot_left_angle = Math.atan2(h, -w);
    var top_left_angle = Math.atan2(-h, -w);
    var top_right_angle = Math.atan2(-h, w);

    if (top_right_angle <= angle && angle < bot_right_angle) {
      return "right";
    }

    if (bot_right_angle <= angle && angle < bot_left_angle) {
      return "bottom";
    }

    if (bot_left_angle <= angle || angle < top_left_angle) {
      return "left";
    }

    if (top_left_angle <= angle && angle < top_right_angle) {
      return "top";
    }

    // otherwise throw error
  }

  function center(rect) {
    // only works for rect shapes as of now
    var center_x = (rect.x + rect.width/2);
    var center_y = (rect.y + rect.height/2);
    return {x: center_x, y: center_y};
  }

  function resetDragLine(line) {
    line.attr('d', '');
    line.classed('hidden', true);
  }


  /*
   * Drag handlers
   */
  function handleDragstart(d, index) {
  }

  function handleDragmove(shape_datum, index) {
    // console.log(state.add_edge_mode);

    // If shift key is held, go into "add edge mode"
    // and start drawing edge path 
     if (state.add_edge_mode) {
        var center_x = (shape_datum.x + shape_datum.width/2);
        var center_y = (shape_datum.y + shape_datum.height/2);
        dragline.attr('d', 
            'M' + center_x + ',' + center_y +
            'L' + d3.mouse(this)[0] + ',' + d3.mouse(this)[1]
        );
     } else {
     // We are dragging the shape itself
        d3.event.sourceEvent.stopPropagation();
        d3.select(this)
          .attr('x', d3.event.x)
          .attr('y', d3.event.y); 

        svg.selectAll('path.edge')
          .filter(function(edge_datum) {
            return edge_datum.from === shape_datum || edge_datum.to === shape_datum;
          })
          .attr('d', renderPath);


        // TODO consider passing in state as a parameter. State right now is a global var...
        shape_datum.x = d3.event.x; 
        shape_datum.y = d3.event.y; 

        // TODO consider saving state to localstorage on dragend?
        // or maybe even while dragging?
    }

  }

  function handleDragend(d, index) {
    console.log("on dragend");
    console.log(d);
    console.log(d3.event.type, d3.event.target, d3.event );
    // d is the object we started drag event with (dragstart)
  }

  var drag = d3.behavior.drag()
    .on("drag", handleDragmove)
    .on("dragend", handleDragend)
    .origin(function(d) {return d;});




  /*
   *  Load initial shapes
   */ 
  var svg = d3.select('svg')
    .on('mouseup', handleBoardMouseup)
    .on('click', handleBoardClick);

  // add arrow markers
  // define arrow markers for graph links
  // borrowed from:
  // http://bl.ocks.org/cjrd/6863459
  var defs = svg.append('svg:defs');
  defs.append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', "7")
    .attr('markerWidth', 3.5)
    .attr('markerHeight', 3.5)
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5');

  // define arrow markers for leading arrow
  defs.append('svg:marker')
    .attr('id', 'mark-end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 7)
    .attr('markerWidth', 3.5)
    .attr('markerHeight', 3.5)
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5');



  // draw edges
  // Note: need to draw edges before shapes
  var sel_edge = svg.selectAll('path.edge')
    .data(state.edges, function(d) {return d.id;})
    .enter()
    .append('path')
    .classed('edge', true)
    .classed('link', true)
    .attr('d', renderPath)
    .style('marker-end', 'url(#end-arrow)');

  // draw dragline
  var dragline = svg.append('svg:path')
    .attr('class', 'link hidden')
    .style('marker-end', 'url(#mark-end-arrow)');


  // draw shapes (currently rects)
  var sel_rect = svg.selectAll("rect")
    .data(state.rects, function(d) {return d.id;})
      .enter().append("rect")
      .attr("x", function(d) {return d.x;})
      .attr("y", function(d) {return d.y;})
      .attr("width", function(d) {return d.width;})
      .attr("height", function(d) {return d.height;})
      .classed("highlight", function(d) {return d.highlight;})
      .on("click", toggleSelection)
      .on("mousedown", handleShapeMousedown)
      .on("mouseup", handleShapeMouseup)
      .call(drag);


  // TODO be able to draw directed/undirected edges between shapes

// });



}
