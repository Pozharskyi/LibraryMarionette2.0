Library.module('Entities', function (Entities, Library, Backbone, Marionette, $, _) {
    Entities.User = Backbone.Model.extend({
        urlRoot: 'http://localhost:8000/api/v1/users',
        parse: function (response, options) {
            if (options.collection) {
                return response;
            }
            return response.data;
        },
    });
    Entities.UsersCollection = Backbone.Collection.extend({
        url: 'http://localhost:8000/api/v1/users',
        model: Entities.User,
        parse: function (response) {
            return response.data;
        },

        comparator: function (user) {
            return user.get('id');
        }
    });

    var API = {
        getUserEntity: function (userId) {
            var user = new Entities.User({id: userId});
            var defer = $.Deferred();

            user.fetch({
                success: function (data) {
                    defer.resolve(data);
                },
                error: function (data) {
                    defer.resolve(undefined);
                }
            });
            return defer.promise();
        },
        getUserEntities: function () {
            var users = new Entities.UsersCollection();
            users.fetch();
            return users;
        },

    };

    Library.reqres.setHandler('user:entity', function (id) {
        return API.getUserEntity(id);
    });
    Library.reqres.setHandler('user:entities', function () {
        return API.getUserEntities();
    });
});