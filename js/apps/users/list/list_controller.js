Library.module('UsersApp.List', function(List, Library, Backbone, Marionette, $, _){
    List.Controller = {
        listUsers: function(){
            var users = Library.request('user:entities');

            var view = new List.Users({
                collection: users
            });
            view.on('childview:user:show',function(childview,model){

                Library.trigger('user:show', model.get('id'));
            });
            view.on('childview:user:showBooksClicked',function(childview,model){
                console.log('in UsersApp.List/Controller ');

                Library.trigger('user:showBooks', model.get('id'));
                console.log(model.get('id'));
            });
            view.on('childview:user:showAssignList',function(childview,model){
                console.log('in UsersApp.List.Controller show assign list ');

                Library.trigger('user:showAssignList', model.get('id'));
                //console.log(model.get('id'));
            });

            Library.mainRegion.show(view);
        }
    }
});

