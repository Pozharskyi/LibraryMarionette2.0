Library.module('BooksApp.Edit', function(Edit, Library, Backbone, Marionette, $, _){
   Edit.Controller = {
       editBook: function(id){
           var view;
           var fetchingBook = Library.request('book:entity', id);
           $.when(fetchingBook).done(function(book){
               if(book !== undefined){
                   view = new Edit.Book({
                       model: book
                   });
                   //save book from the form edit, after submitClicked and return to bookShow route
                   view.on('form:submit', function(data){
                       console.log('in submit');
                       var valid = book.save(data,{
                           success: function(book, response){
                               alert('book has been edited successfully');
                               Library.trigger('book:show', book.get('id'));

                           },
                           //wait: true
                       });
                       if(!valid){
                           view.triggerMethod('form:data:invalid', book.validationError);
                       };


                   });
               } else {
                   view = new Library.BooksApp.Show.MissingBook();
               }

               Library.mainRegion.show(view);
           });
       }
   }
});