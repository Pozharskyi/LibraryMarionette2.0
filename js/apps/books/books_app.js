Library.module('BooksApp', function (BooksApp, Library, Backbone, Marionette, $, _) {
    BooksApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'books': 'listBooks',
            'books/:id': 'showBook',
            'books/:id/edit': 'editBook',
            'createbook': 'createBook',
            //'users/:id': 'showUser'
        }
    });

    var API = {
        listBooks: function () {
            Library.BooksApp.List.Controller.listBooks();
        },
        showBook: function (id) {
            BooksApp.Show.Controller.showBook(id);
        },
        editBook: function (id) {
            BooksApp.Edit.Controller.editBook(id);
        },
        createBook: function () {
            BooksApp.Create.Controller.createBook();
        },

    };

    Library.on('books:list', function () {
        Library.navigate('books');
        API.listBooks();
    });

    Library.on('book:show', function (id) {
        Library.navigate('books/' + id);
        API.showBook(id);
    });

    Library.on('book:edit', function (id) {
        Library.navigate('books/' + id + '/edit');
        API.editBook(id);
    });


    Library.on('before:start', function () {
        new BooksApp.Router({
            controller: API
        });
    })
});