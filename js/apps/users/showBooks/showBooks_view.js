Library.module('UsersApp.ShowBooks', function (ShowBooks, Library, Backbone, Marionette, $, _) {
    ShowBooks.Book = Marionette.ItemView.extend({
        template: '#usersbooks-list-template',
        tagName: 'tr',
        ui:{
            'delete':'button.js-delete'
        },

        events: {
            'click @ui.delete': 'deleteClicked',
        },
        deleteClicked: function () {
            //this.model.collection.remove(this.model);
            this.trigger('usersBook:delete', this.model);
        },
    });
    ShowBooks.Books = Marionette.CompositeView.extend({
        tagName: 'table',
        className: 'table table-bordered',
        childView: ShowBooks.Book,
        template: '#usersbooks-list',
        childViewContainer: 'tbody'
    });
});