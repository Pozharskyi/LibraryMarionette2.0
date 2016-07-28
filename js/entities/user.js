Library.module('Entities', function(Entities, Library, Backbone, Marionette, $, _){
    Entities.User = Backbone.Model.extend({
        urlRoot: 'http://localhost:8000/api/v1/users',
        parse : function(response, options){
            //if (options.collection) return response;
            return response.data;
        },
    });

    var API = {
        getUserEntity: function (userId) {
            var user = new Entities.User({id: userId});
            var defer = $.Deferred();

            user.fetch({
                success: function(data){
                    defer.resolve(data);
                },
                error: function(data){
                    defer.resolve(undefined);
                }
            });
            return defer.promise();
        }
    };

    Library.reqres.setHandler('user:entity', function(id){
        return API.getUserEntity(id);
    });
});