Library.module('BooksApp.Edit', function (Edit, Library, Backbone, Marionette, $, _) {
    Edit.Book = Marionette.ItemView.extend({
        template: '#book-update-template',
        events: {
            'click button.js-submit': 'submitClicked'
        },
        submitClicked: function (e) {
            e.preventDefault();
            var data = {
                'author': this.$('.book-author-edit').val(),
                'title': this.$('.book-title-edit').val(),
                'year': this.$('.book-year-edit').val(),
                'genre': this.$('.book-genre-edit').val(),
            };
            this.trigger('form:submit', data);
            console.log('edit book submit ');
            console.log(data);
        },
        onFormDataInvalid: function (errors) {
            var $view = this.$el;
            console.log('on form data invalid method');

            var markErrors = function (value, key) {
                var $controlGroup = $view.find('.book-' + key +'-edit').parent();
                var $errorEl = $('<span>', {class: 'help-inline error', text: value});
                $controlGroup.append($errorEl).addClass('error');
            };
          _.each(errors, markErrors);
        }

    });
});