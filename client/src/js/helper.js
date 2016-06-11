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
export function renderPath(d) {

    if(d.from === null || d.to === null) {
        return '';
    }

    // NOTE
    // - See `calculatePerimeterPoint` for why we need to transform our rect objects before calling the function

    var from = {
        x: d.from.get('x') - (d.from.get('width')/2),
        y: d.from.get('y') - (d.from.get('height')/2),
        width: d.from.get('width'),
        height: d.from.get('height')
    };


    // retrieve 'to' Rect model from edgecollection
    var to = {
        x: d.to.get('x') - (d.to.get('width')/ 2),
        y: d.to.get('y') - (d.to.get('height')/ 2),
        width: d.to.get('width'),
        height: d.to.get('height')
    };


    var instructions = "M" + center(from).x + "," + center(from).y + "L";

    if (d.directed) {
        var pnt = calculatePerimeterPoint(from, to, 0.25);
        return instructions + pnt.x + "," + pnt.y;
    } else {
        return instructions + center(to).x + "," + center(to).y;
    }
}


// TODO
// - The old `calculatePerimeterPoint` below assumes that the rect datum `d` is structured like so:
// {
//    x: x-coord of top left corner
//    y: y-coord of top left corner
//    width: width of shape
//    height: height of shape
// }

// However, in our backbone rewrite, we will assume the following new structure:
// {
//    x: x-coord of center of shape
//    y: y-coord of center of shape
//    width: width of shape
//    height: height of shape
// }
//

// We need to refactor the code below to accept this new representation!
// But for now, the caller will convert the `rect` to its original representation as a quick fix.

// See the caller `renderPath` for details




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
