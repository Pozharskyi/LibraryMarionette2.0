Library.module('BooksApp.List', function(List, Library, Backbone, Marionette, $, _){
    List.Controller = {
        listBooks: function(){
            var books = Library.request('book:entities');

            var booksListView = new List.Books({
                collection: books
            });

            booksListView.on('childview:book:delete',function(childview,model){
               model.destroy();
            });
            booksListView.on('childview:book:show',function(childview,model){

                Library.trigger('book:show', model.get('id'));
            });
            booksListView.on('childview:book:edit',function(childview,model){

                Library.trigger('book:edit', model.get('id'));
            });

            Library.mainRegion.show(booksListView);
        }
    }
});
