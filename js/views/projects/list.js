define([
  'jquery',
  'underscore',
  'backbone',
  'collections/projects',
  'text!../../../templates/galleryTemplate.html'
], function($, _, Backbone, ProjectsCollection, projectsListTemplate){

    var ProjectListView = Backbone.View.extend({
    
    el: $("main"),

    section: "#folio",
    
    initialize: function(){
      this.collection = new ProjectsCollection(projectData);      
      var compiledTemplate = _.template( projectsListTemplate );
      this.$el.append(compiledTemplate({ projects: this.collection.models } ));
      //_.defer(this.resize, this.section);
    },

    resize: function(section){
      $(section).height($(document).height());
      console.log("resize called:" + section);
    }

  });
 
  return ProjectListView;

});