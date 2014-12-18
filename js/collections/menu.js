// Filename: collections/projects
define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/menuItem'
], function(_, Backbone, MenuItemModel){
  var MenuItemCollection = Backbone.Collection.extend({
    model: MenuItemModel
  });
  // You don't usually return a collection instantiated
  return MenuItemCollection;
});

