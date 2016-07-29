Library.module('UsersApp.ShowBooks', function (ShowBooks, Library, Backbone, Marionette, $, _) {
    ShowBooks.Controller = {
        showUsersBooks: function (id) {
            console.log('in showUserBooks controller');
            var view;

            //var usersBooks = Library.request('usersBook:entities', id);

            var fetchingUsersBook = Library.request('usersBook:entities', id);
            $.when(fetchingUsersBook).done(function(usersBooks){
                if(usersBooks !== undefined) {
                    console.log('qqqq');
                    console.log(usersBooks);

                    view = new ShowBooks.Books({
                        collection: usersBooks
                    });
                }
                //else {
                //    view = new Library.BooksApp.Show.MissingBook();
                //}

                Library.mainRegion.show(view);
            });

            view.on('childview:usersBook:delete',function(childview,model){
                console.log('destroying model')
                model.destroy();
            });




        }
    }
});