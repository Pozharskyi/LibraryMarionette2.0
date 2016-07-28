Library.module('BooksApp.List', function (List, Library, Backbone, Marionette, $, _) {
    List.Book = Marionette.ItemView.extend({
        template: '#books-list-template',
        tagName: 'tr',

        events: {
            'click button.js-delete': 'deleteClicked',
            'click td a.js-show': 'showClicked',
            'click td a.js-edit': 'editClicked',
        },
        editClicked: function (e) {
            e.preventDefault();
            this.trigger('book:edit', this.model);
        },
        showClicked: function (e) {
            e.preventDefault();
            this.trigger('book:show', this.model);
        },

        deleteClicked: function () {
            //this.model.collection.remove(this.model);
            this.trigger('book:delete', this.model);
        },

        //add animation fadeout when itemView is deleting
        remove: function () {
            var self = this;
            this.$el.fadeOut(function () {
                Marionette.ItemView.prototype.remove.call(self);
            });
        }
    });
    List.Books = Marionette.CompositeView.extend({
        tagName: 'table',
        className: 'table table-bordered',
        childView: List.Book,
        template: '#books-list',
        childViewContainer: 'tbody'
    });
});