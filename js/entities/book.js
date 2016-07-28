Library.module('Entities', function (Entities, Library, Backbone, Marionette, $, _) {
    Entities.Book = Backbone.Model.extend({
        urlRoot: 'http://localhost:8000/api/v1/books',
        validate: function (attrs, options) {
            var errors = {};
            if (!attrs.title) {
                errors.title = 'can not be empty';
            }
            if((!/^[a-zA-Z]*$/g.test(attrs.title))){
                errors.title = 'must contains oly letters'
            }
            if((!/^[a-zA-Z]*$/g.test(attrs.author))){
                errors.author = 'must contains oly letters'
            }

            if (!attrs.author) {
                errors.author = 'can not be empty'
            }
            if((!/^[a-zA-Z]*$/g.test(attrs.genre))){
                errors.genre = 'must contains oly letters'
            }
            if (!attrs.genre) {
                errors.genre = 'can not be empty'
            }
            if (/\D/.test(attrs.year)) {
                errors.year = 'must contains only digits'
            }
            if (!attrs.year) {
                errors.year = 'can not be empty'
            }
            if (!_.isEmpty(errors)) {
                return errors;
            }

        },
        parse: function (response, options) {
            if (options.collection) return response;
            return response.data;
        }

    });
    Entities.BooksCollection = Backbone.Collection.extend({
        url: 'http://localhost:8000/api/v1/books',
        model: Entities.Book,
        parse: function (response) {
            return response.data;
        },

        comparator: function (book) {
            return book.get('title');
        }
    });

    var API = {
        getBookEntities: function () {
            var books = new Entities.BooksCollection();
            books.fetch();
            return books;
        },

        getBookEntity: function (bookId) {
            var book = new Entities.Book({id: bookId});
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

    Library.reqres.setHandler('book:entities', function () {
        return API.getBookEntities();
    });

    Library.reqres.setHandler('book:entity', function (id) {
        return API.getBookEntity(id);
    });
});