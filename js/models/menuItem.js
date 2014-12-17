// Filename: models/project
define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var menuItemModel = Backbone.Model.extend({
    defaults: {	
      name: "Home",
      path: "/#"
    },
    idAttribute: "ID"
  });
  return menuItemModel;
});