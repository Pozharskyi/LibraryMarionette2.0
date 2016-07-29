Library.module('UsersApp', function (UsersApp, Library, Backbone, Marionette, $, _) {
    UsersApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'users/:id': 'showUser',
            'users/:id/books': 'showUsersBooks',
            //'users/:userId/books/:bookId': 'assignBook'
        }
    });
    var API = {
        showUser: function (id) {
            console.log('in API showUser');
            UsersApp.Show.Controller.showUser(id);
        },
        showUsersBooks: function (userId) {
            UsersApp.ShowBooks.Controller.showUsersBooks(userId);
        },
        assignBook: function(userId, bookId){

        }

    };
    Library.on('user:show', function (id) {
        console.log('in Library user showUser');
        Library.navigate('users/' + id);
        API.showUser(id);
    });
    Library.on('users:showBooks', function(id){
        Library.navigate('users/'+id+'/books');
        API.showUsersBooks(id);
    });

    Library.on('before:start', function () {
        new UsersApp.Router({
            controller: API
        });
    })
});