define([
  'jquery',
  'underscore',
  'backbone',
  'collections/menu',
  'text!../../templates/defaultTemplate.html'
], function($, _, Backbone, MenuItemCollection, defaultTemplate){

    var HomeView = Backbone.View.extend({
    
    el: $("main"),

    section: "#about",
    
    initialize: function(){
      
      this.collection = new MenuItemCollection(menuItems);      
      var compiledTemplate = _.template( defaultTemplate );
      this.$el.append(compiledTemplate({ menuItems: this.collection.models } ));

    }

  });
 
  return HomeView;

});