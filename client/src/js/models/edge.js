import Backbone from 'backbone';
import _ from 'underscore';

var Edge = Backbone.Model.extend({
    defaults: {
        label: '',
        from: null,
        to: null,
        directed: true
    },

    
    initialize: function (from, to) {
        this.listenTo(from, 'destroy', this.mydestroy);
        this.listenTo(to, 'destroy', this.mydestroy);
        this.listenTo(this, 'sync', this.postSync);
    },

    // TODO resolve bug where some deleted edges are not synced with localStorage.

    // can problem arise when both 'from' and 'to' are both destroyed, one after another?

    mydestroy: function (a,b,c){
        console.log(a);
        console.log(b);
        console.log(c);
        this.destroy();
    },

    sync: function (method, model, options) {
        // - If destroying, no need to save 'from' and 'to'
        if (method === 'create' || method === 'update') {
            var from = this.get('from');
            var to = this.get('to');

            // Temporarily set 'from' and 'to' to ids for saving to persistent layer
            this.set({from: from.id}, {silent: true});
            this.set({to: to.id}, {silent: true});

            // Overriding default options.success behavior in 'model.save()'.

            // Backbone.localStorage will directly use this success handler, instead of
            // the one in 'model.save()'

            // side effects of overriding:
            // - No 'sync' event will be fired now.
            // - server attributes will not be assigned to model.attributes (this)


            // Alternative 1:
            // - override 'model.save()' with and set our custom options.success
            // there instead.
            // - This will allow the default behavior to occur
            // (firing sync event, setting server attrs to client model attrs)

            // Alternative 2:
            // - Use options.complete callback.  This will allow default sync behavior,
            // and also allow for our custom callback to be called.
            // - However, it seems to be intended for jQuery use.  See Backbone.localStorage


            // Since we don't want any syncing behavior, (just want to dump data to localStorage)
            // no need to consider alternatives right now.

            options.success = (function handleSuccess(resp) {
                // Set 'from' and 'to' back to their respective shape objects
                this.set({from: from}, {silent: true});
                this.set({to: to}, {silent: true});
            }).bind(this);
        }

        Backbone.sync.call(this, method, model, options);
    },

    postSync: function(model, resp, options) {
        console.log('postsync');
    },

    validate: function (attrs) {

        //if (attrs.hasOwnProperty('from') && !_.isNumber(attrs.from)) {
        //  return '`from` must be a Number';
        //}
        //
        //if (attrs.hasOwnProperty('to') && !_.isNumber(attrs.to)) {
        //  return '`to` must be a Number';
        //}

        if (attrs.hasOwnProperty('from') &&
            attrs.hasOwnProperty('to') &&
            attrs.from === attrs.to) {
            return '`from` and `to` vertex ids cannot be the same';
        }

    }

});

export default Edge;

