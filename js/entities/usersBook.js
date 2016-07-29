Library.module('Entities', function (Entities, Library, Backbone, Marionette, $, _) {
    Entities.UsersBook = Backbone.Model.extend({

        urlRoot: function () {
            console.log(this.options);
            if(this.options.collection === undefined){
                return 'http://localhost:8000/api/v1/users/' + this.options.group + '/books';
            } else {
                return 'http://localhost:8000/api/v1/users/' + this.options.collection.options.group + '/books';
            }

        },
        initialize: function (models, options) {
            //console.log(options);
            this.options = options;
        },


        parse: function (response, options) {
            if (options.collection) return response;
            return response.data;
        }

    });


    Entities.UsersBooks = Backbone.Collection.extend({
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
            var book = new Entities.UsersBook({id: bookId}, {group: userId});
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
        },
        assignBookToUser: function(userId, bookId){
            $.ajax({
                url: 'http://localhost:8000/api/v1/users/'+userId+'/books/'+bookId,
                type: 'PUT',
                success: function(data) {
                    console.log('book assigned successfully');
                    console.log(data);
                }
            });
        }

    };

    Library.reqres.setHandler('usersBook:entities', function (userId) {
        return API.getUsersBookEntities(userId);
    });
    Library.reqres.setHandler('usersBook:entity', function (userId, bookId) {
        return API.getUsersBookEntity(userId, bookId);
    });
    Library.reqres.setHandler('usersBook:assign', function (userId, bookId) {
        return API.assignBookToUser(userId, bookId);
    });
});