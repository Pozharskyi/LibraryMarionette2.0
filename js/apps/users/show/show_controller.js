Library.module('UsersApp.Show', function (Show, Library, Backbone, Marionette, $, _) {
    Show.Controller = {
        showUser: function (id) {
            console.log('in showUser controller');
            var userView;
            var fetchingUser = Library.request('user:entity', id);
            $.when(fetchingUser).done(function(user){
                if(user !== undefined){
                    userView = new Show.User({
                        model: user
                    });
                } else {
                    userView = new Show.MissingUser();
                }

                Library.mainRegion.show(userView);
            });

        }
    }
});