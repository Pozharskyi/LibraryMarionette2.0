Library.module('BooksApp.Create', function (Create, Library, Backbone, Marionette, $, _) {
    Create.Controller = {
        createBook: function () {

            var view = new Create.Book();
            Library.mainRegion.show(view);

            //save book from the form create, after submitClicked, and then return to books list
            view.on('form:submit', function (data) {

                var book = new Library.Entities.Book(data);

                if(book.save()){
                    Library.trigger('books:list');
                    alert('book has been created successfully');
                } else {
                    view.triggerMethod('form:data:invalid', book.validationError);
                }
            });

        }
    }
});



