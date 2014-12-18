window.Flock = (function(){

	function Flock(boid_settings, flock_settings){
	  this.boids = new Array();
	  this.boid_settings = boid_settings || {};
	  this.flock_settings = flock_settings || {};
	  this.population = flock_settings.population || 20;
	  this.world_x = flock_settings.world_width || window.innerWidth;
	  this.world_y = flock_settings.world_height || window.innerHeight;
	  this.world_centre = new Vector(this.world_width/2, this.world_height/2);
	}
	
	Flock.prototype = {
	  
	  constructor: Flock,
	  
	  addBoid: function(boid){
	    this.boids.push(boid);
	  },
	  
	  setup: function(){

	    for(var i=0; i < this.population; i++ ){
	      this.boid_settings.separation_neighbor_dis = Helper.getRandomInt(3,14);
	      this.boid_settings.maxspeed = Helper.getRandomInt(5,6);
	      this.addBoid( new Boid(Helper.getRandomInt(0, this.world_x), Helper.getRandomInt(0, this.world_y), this.boid_settings) );
	    }
	  },

	  default_world: function(){
	  	context.beginPath();
	  	context.fillStyle = "#395a6e";
	  	context.fillRect(0,this.world_y-100, this.world_x, 2);
	  	context.fillRect(0,this.world_y-50, this.world_x, 2);
	  	context.closePath();
	  },
	  
	  run: function(){
	    for (var i = 0; i < this.boids.length; i++){
	      this.boids[i].run(this.boids);
	    }
	    
	    //canvas.width = canvas.width;
	    context.clearRect(0, 0, w, h);

	    if(this.flock_settings.world){
	    	this.flock_settings.world();
	    } else {
	    	this.default_world();
		}

	    for (var i = 0; i < this.boids.length; i++){

	      this.boids[i].render();
	      context.beginPath();
	      if(typeof this.boids[i+1] != 'undefined'){
	      	context.moveTo(this.boids[i].location.x, this.boids[i].location.y);
	      	context.lineTo(this.boids[i+1].location.x, this.boids[i+1].location.y);
	      }
	      if(typeof this.boids[i+2] != 'undefined'){
	      	context.moveTo(this.boids[i].location.x, this.boids[i].location.y);
	      	context.lineTo(this.boids[i+2].location.x, this.boids[i+2].location.y);
	      }

	      context.lineWidth = 0.06;
	      context.strokeStyle = "gray";
	      context.closePath();
	      context.stroke();

	     /*or (var j = i + 1; j < this.boids.length; j++){
	      	if (j !== i) {
	      		context.beginPath();
	     		context.moveTo(this.boids[i].location.x, this.boids[i].location.y);
	     		context.lineTo(this.boids[j].location.x, this.boids[j].location.y);
	     		context.lineWidth = 0.06;
	     		context.strokeStyle = "gray";
	     		context.closePath();
	     		context.stroke();
	      	}
	      }*/
	      
	     } 

	      
		}
	    

	  
	};

	return Flock;
	
})();