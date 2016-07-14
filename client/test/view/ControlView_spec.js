import Backbone from 'backbone';
import ControlView from '../../src/js/views/controlView.js';

//Where el is the DOM element you'd like to test for visibility
function isHidden(el) {
    return (el.offsetParent === null)
}

describe('Tests for ControlView', function() {

    it('should have the default controls visible', function(){
        var c_node = document.createElement('div');
        c_node.id = 'controls';
        document.body.appendChild(c_node);

        new ControlView();

        var cv = document.querySelector('#controls');
        // console.log(document.body);

        var gen_diag_btn = cv.querySelector('#gen-diag-btn');
        var clr_data_btn = cv.querySelector('#clr-data-btn');
        var rm_sel_shapes_btn = cv.querySelector('#rm-sel-shapes-btn');

        expect(isHidden(gen_diag_btn)).toBe(false);
        expect(isHidden(clr_data_btn)).toBe(false);
        expect(isHidden(rm_sel_shapes_btn)).toBe(false);
    });

    /*
     * New feature:
     * No need for user to explicitly click button save shapes.  Shapes should be saved to persistent layer when updated.
     */
    xit('should ask backbone.localStorage to save shapes and edges', function () {
        
    });


});
