Library.module('UsersApp.AssignBook', function (AssignBook, Library, Backbone, Marionette, $, _) {
    AssignBook.Book = Marionette.ItemView.extend({
        template: '#books-list-toassign-template',
        tagName: 'tr',
        ui:{
            'assign':'button.js-assign'
        },
        events: {
            'click @ui.assign': 'assignClicked',

        },
        assignClicked: function () {
            this.trigger('usersBook:assignClicked', this.model);
        },

    });
    AssignBook.Books = Marionette.CompositeView.extend({
        tagName: 'table',
        className: 'table table-bordered',
        childView: AssignBook.Book,
        template: '#books-list-toassign',
        childViewContainer: 'tbody'
    });
});