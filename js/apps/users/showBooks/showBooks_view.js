Library.module('UsersApp.ShowBooks', function (ShowBooks, Library, Backbone, Marionette, $, _) {
    ShowBooks.Book = Marionette.ItemView.extend({
        template: '#usersbooks-list-template',
        tagName: 'tr',

    });
    ShowBooks.Books = Marionette.CompositeView.extend({
        tagName: 'table',
        className: 'table table-bordered',
        childView: ShowBooks.Book,
        template: '#usersbooks-list',
        childViewContainer: 'tbody'
    });
});