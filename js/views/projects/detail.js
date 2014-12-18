define([
  'jquery',
  'underscore',
  'backbone',
  'collections/projects',
  'text!../../../templates/detailTemplate.html',
  'text!../../../templates/detailFooter.html',
  'details'
], function($, _, Backbone, ProjectsCollection, projectDetailTemplate, Footer, projectDetail){

    var ProjectDetailView = Backbone.View.extend({

    
    el: $("main"),

    section: "#project-description",

    nav: "#navbox",
    
    initialize: function(id){
      
      this.collection = new ProjectsCollection(projectData); 
      var project = this.collection.get(id);
      var template = this.getTemplate(project.id);
      this.section += id;
      this.nav += id;
       console.log(template);
      var compiledTemplate = _.template( template );

      var links = { next: Number(id) + 1, prev: Number(id) - 1, max: this.collection.length}
      this.$el.append(compiledTemplate({project: project, links: links}));
      $(this.nav).fadeIn("slow");
    },

    getTemplate: function(id){
      return projectDetailTemplate + projectDetail[id] + Footer;
    },

    destroy: function(){
      console.log("destroy called");
    },

    cleanup: function(){
        console.log("remove called on " + this.nav);
        $(this.nav).remove();
    }

  });
 
  return ProjectDetailView;

});