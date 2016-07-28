Library.module('BooksApp.Show', function (Show, Library, Backbone, Marionette, $, _) {
    Show.Controller = {
        showBook: function (id) {

            var bookView;
            var fetchingBook = Library.request('book:entity', id);
            $.when(fetchingBook).done(function(book){
                if(book !== undefined){
                    bookView = new Show.Book({
                        model: book
                    });
                } else {
                    bookView = new Show.MissingBook();
                }

                Library.mainRegion.show(bookView);
            });

        }
    }
});