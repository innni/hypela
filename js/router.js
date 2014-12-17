// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/default',
  'views/projects/list',
  'views/projects/detail'
], function($, _, Backbone, HomeView, ProjectListView, ProjectDetailView){

  var AppRouter = Backbone.Router.extend({
    routes: {

      // Display all projects
      'projects': 'showProjects',

    
      // Get project of given :id
      'projects/:id': 'getProject',


      // Default
      '*actions': 'defaultAction'

    },

    view: { 
      previous: null,
      current: null
    },

    render: function(nextView, options){
      this.view.previous = this.view.current || null;
      this.view.current = nextView;
      this.view.current.render();
      if (this.view.previous) {
        this.transition(options);
      } else {
        $(this.view.current.section).addClass(options.in);
         _.defer(this.adjustHeight, this.view.current.section);
      }
      
    },

    transition: function(options){

      var prev =  this.view.previous;
      var curr = this.view.current;
      var resize = this.adjustHeight;

      if (prev.cleanup) { prev.cleanup(); }

      var intransition = function() {
       
        $(prev.section).removeClass(options.out);
        $(curr.section).addClass(options.in);
        $(prev.section).one('transitionend', function(){
          $(prev.section).remove();
          _.defer(resize, curr.section);
        });

      };

      _.delay(intransition, 20);
      
    },

    adjustHeight: function(section){
      
        $(section).height($(document).height());
     
    }

  });


  var initialize = function(){

    var app_router = new AppRouter;

    //transition classes, options 
    var options = { in: "is-visible", out: "is-visible" };

    // Display all projects
    app_router.on('route:showProjects', function(id){
      $('html, body').animate({ scrollTop: 0 }, 'slow');
      var galleryView = new ProjectListView();
      this.render(galleryView, options);
    });


    // Get project of given :id
    app_router.on('route:getProject', function(id){
      $('html, body').animate({ scrollTop: 0 }, 'slow');
       var projectDetailView = new ProjectDetailView(id);
       this.render(projectDetailView, options);
    });


    // Default
    app_router.on('route:defaultAction', function(id){
      var homeView = new HomeView();
      this.render(homeView, options);
    });


    Backbone.history.start();

  };

  return {
    initialize: initialize
  };

});