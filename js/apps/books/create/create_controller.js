Library.module('BooksApp.Create', function (Create, Library, Backbone, Marionette, $, _) {
    Create.Controller = {
        createBook: function () {

            var view = new Create.Book();
            Library.mainRegion.show(view);

            //save book from the form create, after submitClicked, and then return to books list
            view.on('form:submit', function (data) {

                var book = new Library.Entities.Book(data);
                //book.save({}, {
                //    success: function (model, respose, options) {
                //        console.log("The model has been saved to the server");
                //        console.log(book);
                //
                //        Library.trigger('books:list');
                //
                //    },
                //    error: function (model, xhr, options) {
                //        console.log("Something went wrong while saving the model");
                //        view.triggerMethod('form:data:invalid', book.validationError);
                //        //Library.trigger('books:list');
                //    }
                //
                //});
                if(book.save()){
                    Library.trigger('books:list');
                } else {
                    view.triggerMethod('form:data:invalid', book.validationError);
                }
            });

        }
    }
});



