Library.module('UsersApp', function (UsersApp, Library, Backbone, Marionette, $, _) {
    UsersApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'users': 'listUsers',
            'users/:id': 'showUser',
            'users/:id/books': 'showUsersBooks',
            'users/:userId/assign': 'showAssignList'
        }
    });
    var API = {
        listUsers: function () {
            Library.UsersApp.List.Controller.listUsers();
        },
        showUser: function (id) {
            console.log('in API showUser');
            UsersApp.Show.Controller.showUser(id);
        },
        showUsersBooks: function (userId) {
            UsersApp.ShowBooks.Controller.showUsersBooks(userId);
        },
        showAssignList: function (userId, bookId) {
            UsersApp.AssignBook.Controller.assignBook(userId, bookId);
        },


    };
    Library.on('user:show', function (id) {
        console.log('in Library user showUser');
        Library.navigate('users/' + id);
        API.showUser(id);
    });

    Library.on('users:list', function () {
        Library.navigate('users');
        API.listUsers();
    });

    Library.on('user:showBooks', function (userId) {
        Library.navigate('users/' + userId + '/books');
        API.showUsersBooks(userId);
    });

    Library.on('user:showAssignList', function (userId) {
        Library.navigate('users/' + userId + '/assign');
        API.showAssignList(userId);
    });


    Library.on('before:start', function () {
        new UsersApp.Router({
            controller: API
        });
    })
});