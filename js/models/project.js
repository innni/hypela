// Filename: models/project
define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var ProjectModel = Backbone.Model.extend({
    defaults: {	
      name: "Harry Potter"
    },
    idAttribute: "id"
  });
  // Return the model for the module
  return ProjectModel;
});