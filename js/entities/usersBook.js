Library.module('Entities', function (Entities, Library, Backbone, Marionette, $, _) {
    Entities.UsersBook = Backbone.Model.extend({
        urlRoot: function () {
            return 'http://localhost:8000/api/v1/users/' + this.options.group + '/books';
        },
        initialize: function (models, options) {
            this.options = options;
        },


        parse: function (response, options) {
            if (options.collection) return response;
            return response.data;
        }

    });


    Entities.UsersBooks = Backbone.Collection.extend({
        //url: function (userId) {
        //    return 'http://localhost:8000/api/v1/users/' + this.userId + '/books';
        //},
        //initialize: function (models, options) {
        //
        //    this.userid = options.userId;
        //    console.log(this.userid);
        //},
        //url: function() {
        //    return 'http://localhost:8000/api/v1/users/' + this.userId+'/books';
        //},
        url: function () {
            return 'http://localhost:8000/api/v1/users/' + this.options.group + '/books';
        },
        initialize: function (models, options) {
            this.options = options;
        },
        parse: function (response, options) {
            return response.data;
        },
        model: Entities.UsersBook
    });

    var API = {
        getUsersBookEntities: function (usersId) {
            var books = new Entities.UsersBooks([], {group: usersId});
            console.log(books);
            books.fetch();
            return books;
        },
        getUsersBookEntity: function (userId, bookId) {
            var book = new Entities.UsersBook({id: bookId}, {opt1: usersId});
            var defer = $.Deferred();

            book.fetch({
                success: function (data) {
                    defer.resolve(data);
                },
                error: function (data) {
                    defer.resolve(undefined);
                }
            });
            return defer.promise();
        }

    };

    Library.reqres.setHandler('usersBook:entities', function (userId) {
        return API.getUsersBookEntities(userId);
    });
    Library.reqres.setHandler('usersBook:entity', function (userId, bookId) {
        return API.getUsersBookEntity(userId, bookId);
    });
});