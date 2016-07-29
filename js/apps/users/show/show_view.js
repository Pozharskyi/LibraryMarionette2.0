Library.module('UsersApp.Show', function(Show, Librery, Backbone, Marionette, $, _){
    Show.User = Marionette.ItemView.extend({
        template: '#user-view',
        tagName: 'ul',
        className: 'list-group'
    });
    Show.MissingUser = Marionette.ItemView.extend({
        template: '#missing-user-template'
    });
});