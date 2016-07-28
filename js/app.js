var Library = new Marionette.Application();
Library.addRegions({
    mainRegion: '#main-region'
});

Library.navigate = function (route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};
Library.getCurrentRoute = function(){
  return Backbone.history.fragment;
};

Library.on('start', function () {

    if (Backbone.history) {
        Backbone.history.start();

        if (this.getCurrentRoute() === '') {
           Library.trigger('books:list');       //method is in BooksApp
        }
    }
});