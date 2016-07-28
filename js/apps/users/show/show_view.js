Library.module('UsersApp.Show', function(Show, Librery, Backbone, Marionette, $, _){
    Show.User = Marionette.ItemView.extend({
        template: '#user-view',
        tagName: 'ul',
        className: 'list-group'
        //serializeData : function() {
        //    var book = this.model.get('data');
        //    return {
        //        title : book.title,
        //        author : book.author,
        //        genre :book.genre,
        //        year: book.year,
        //    };
        //}
    });
    Show.MissingUser = Marionette.ItemView.extend({
        template: '#missing-user-template'
    });
});