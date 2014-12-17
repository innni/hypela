window.Boid = (function(){

	function Boid(x, y, settings){

	  this.location = new Vector(x, y);
	  this.acceleration = new Vector(0, 0);
	  this.velocity = new Vector(Helper.getRandomInt(-1,1), Helper.getRandomInt(-1,1));
	  this.settings = settings || {};
	  this.show_connections = settings.show_connections || true;

	  this.r = settings.r || 3.0;
	  this.maxspeed = settings.maxspeed || 2;
	  this.maxforce = settings.maxforce || 0.5;
	  
	  this.perchSite = settings.perchSite || [h - 100, h - 50];
	  this.laziness_level = settings.laziness_level || 0.7;
	  this.min_perch = settings.min_perch || 1;
	  this.max_perch = settings.max_perch || 100; 

	  this.perching = settings.perching || false;
	  this.perchTimer = settings.perchTimer || 100;

	  this.separation_multiple = settings.separation || 0.2;
	  this.cohesion_multiple = settings.cohesion || 2.0;
	  this.alignment_multiple = settings.alignment || 1.0;

	  this.separation_neighbor_dist = (settings.separation_neighbor_dis || 10) * 10;
	  this.cohesion_neighbor_dist = settings.cohesion_neighbor_dis || 200;
	  this.alignment_neighbor_dist = settings.alignment_neighbor_dis || 200;

	}
	
	Boid.prototype = {

	  constructor: Boid,
	  
	  update: function(){
	     
	     if (this.perching) {
	       this.perchTimer--;
	       if (this.perchTimer < 0){
	         this.perching = false;
	       }
	     } else {
	       this.velocity.add(this.acceleration);
	       this.velocity.limit(this.maxspeed);
	       this.location.add(this.velocity);
	       this.acceleration.multiply(0);
	     }
	
	  },
	  
	  applyForce: function(force){
	    this.acceleration.add(force);
	  },

	  tired: function(){
  			var x = Math.random();
  			if (x < this.laziness_level){
    			return false;
  			} else {
    			return true;
  			}
  		},
	  
	  seek: function(target) {
	    var desired = Vector.subtract(target, this.location);
	    desired.normalize();
	    desired.multiply(this.maxspeed);
	    var steer = Vector.subtract(desired, this.velocity);
	    steer.limit(this.maxforce);
	    return steer;
	  },
	  
	  //Leaving this function here for experiments
	  //You can replace "seek" inside cohesion()
	  //For a more fish-like behaviour
	  arrive: function(target) {
	    var desired = Vector.subtract(target, this.location);
	    var dMag = desired.magnitude();
	    desired.normalize();
	    // closer than 100 pixels?
	    if (dMag < 100) {
	      var m = Helper.map(dMag,0,100,0,this.maxspeed);
	      desired.multiply(m);
	    } else {
	      desired.multiply(this.maxspeed);
	    }
	    var steer = Vector.subtract(desired, this.velocity);
	    steer.limit(this.maxforce);
	    return steer;
	  },
	  
	  align: function(boids){
	    var sum = new Vector();
	    var count = 0;
	    for (var i = 0; i < boids.length; i++){
	      if (boids[i].perching == false) {
	        var distance = Vector.distance(this.location, boids[i].location);
	        //if ((distance > 0) && (distance < this.align_neighbor_dist)) {
	          sum.add(boids[i].velocity);
	          count++;
	         //}   
	      }
	    }
	    if (count > 0) {
	      sum.divide(count);
	      sum.normalize();
	      sum.multiply(this.maxspeed);
	      var steer = Vector.subtract(sum,this.velocity);
	      steer.limit(this.maxforce);
	      return steer;
	    } else {
	      return new Vector(0,0);
	    }
	  },
	  
	   cohesion: function(boids){
	    var sum = new Vector();
	    var count = 0;
	    for (var i = 0; i < boids.length; i++){
	      if (boids[i].perching == false) {
	        var distance = Vector.distance(this.location, boids[i].location);
	        //if ((distance > 0) && (distance < this.cohesion_neighbor_dist)) {
	          sum.add(boids[i].location);
	          count++;
	        //} 
	      }
	    }
	    if (count > 0) {
	      sum.divide(count);
	      return this.seek(sum);
	    } else {
	      return new Vector(0,0);
	    }
	  },
	  
	  separate: function(boids) {
	    var sum = new Vector();
	    var count = 0;
	    for (var i=0; i< boids.length; i++){
	 
	      var distance = Vector.distance(this.location, boids[i].location);
	      if ((distance > 0) && (distance < this.separation_neighbor_dist)) {
	         var diff = Vector.subtract(this.location, boids[i].location);
	         diff.normalize();
	         diff.divide(distance);
	         sum.add(diff);
	        count++;
	      }

	    }
	    
	    if(count > 0){
	      sum.divide(count);
	      sum.normalize();
	      sum.multiply(this.maxspeed);
	      var steer = Vector.subtract(sum, this.velocity);
	      steer.limit(this.maxforce);
	    }
	    
	    return sum;
	    
	  },
	  
	  borders: function() {
	  	//We are allowing boids to fly a bit outside
	  	//the view and then return.
	    var offset = 20;
	    var isTired = this.tired();
	    if (this.onPerchSite() && isTired ){
	      	this.perching = true;
	    } else {
	    	if (this.location.x < -offset) this.location.x += 5;
	    	if (this.location.x > w + offset) this.location.x -= 5;
	    	if (this.location.y > h + offset) this.location.y -= 5;
	    	if (this.location.y < -offset) this.location.y += 5;
	    }
	    
	  },

	  onPerchSite: function(){
	  	for (var i = 0; i < this.perchSite.length; i++){
	  		if( this.location.y > this.perchSite[i] -2 && this.location.y < this.perchSite[i] + 2 )
	  			return true;
	  	}
	  	return false;
	  },

	  borders2: function() {
	  	var offset = 20;
	    var isTired = this.tired();
	    if (this.location.y > this.perchSite - 2 && this.location.y < this.perchSite + 2 && isTired ){
	      	this.perching = true;
	    } else {
    	if (this.location.x < -this.r) this.location.x = w+this.r;
    	if (this.location.y < -this.r) this.location.y = h+this.r;
    	if (this.location.x > w+this.r) this.location.x = -this.r;
    	if (this.location.y > h+this.r) this.location.y = -this.r;
       }
  	  },
	  
	  render: function() {
	 
	    var theta = this.velocity.heading() + Math.PI/2;
	    context.stroke();
	    context.save();
	    context.translate(this.location.x, this.location.y);
	    context.rotate(theta);
	    
	    if(this.settings.boid_shape){
	    	this.settings.boid_shape();
	    } else {
	    	this.default_boid_shape();
	    }
	    
	    context.restore();
	 
	  },

	  default_boid_shape: function(){
	  	var radius = 5;
	  	context.fillStyle = "#636570";
	  	context.beginPath();
	    context.arc(0, 0, radius, 0, 2 * Math.PI, false);
	    context.closePath();
	    context.fill();

	  },
	  
	  flock: function(boids){
	    var separate = this.separate(boids);
	    var align = this.align(boids);
	    var cohesion = this.cohesion(boids);
	    
	    separate.multiply(this.separation_multiple);
	    align.multiply(this.alignment_multiple);
	    cohesion.multiply(this.cohesion_multiple);
	    
	    this.applyForce(separate);
	    this.applyForce(align);
	    this.applyForce(cohesion);
	  },

	  run: function(boids){
	    
	    if (this.perching){
	      this.perchTimer--;
	      if(this.perchTimer < 0 ) 
	      {
	        this.perching = false;
	        this.perchTimer = Helper.getRandomInt(this.min_perch,this.max_perch);
	      }
	    } else {
	      this.flock(boids);
	      this.update();
	      this.borders();
	    }
	    
	  }
	
	};

	return Boid;
})();