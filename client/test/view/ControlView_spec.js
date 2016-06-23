import Backbone from 'backbone';


//Where el is the DOM element you'd like to test for visibility
function isHidden(el) {
    return (el.offsetParent === null)
}

describe('Tests for ControlView', function() {



    it('should have the default controls visible', function(){
        var control_view = new ControlView();

        var cv = document.querySelector('controls');

        var ss_btn = cv.querySelector('save');
        var pop_storage_btn = cv.querySelector('populate-storage');
        var clr_storage_btn = cv.querySelector('clear-storage');
        var rm_sel_shapes_btn = cv.querySelector('rm-sel-shaspes');

        expect(isHidden(ss_btn)).toBe(false);
        expect(isHidden(pop_storage_btn)).toBe(false);
        expect(isHidden(clr_storage_btn)).toBe(false);
        expect(isHidden(rm_sel_shapes_btn)).toBe(false);

    });

});
