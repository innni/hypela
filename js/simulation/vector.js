/* 
Vector.JS
Implements Vector Operations
Hina Aman
http://codecyb.org

Static Methods:
add, subtract, distance

Instance Methods:
add, subtract, multiply, 
divide, magnitude, normalize,
heading, limit

*/

window.Vector = (function(){

  function Vector(x, y){
    this.x = x || 0;
    this.y = y || 0;
  }
  
  
  Vector.add = function(v1, v2){
    return new Vector(v1.x + v2.x, v1.y + v2. y);
  };
  
  Vector.subtract = function(v1, v2){
    return new Vector(v1.x - v2.x, v1.y - v2. y);
  };
  
  Vector.distance = function(v1, v2){
    return Math.sqrt( Math.pow( (v1.x - v2.x), 2 ) + Math.pow( (v1.y - v2.y), 2 ) );
  };
  
  
  Vector.prototype = {
    constructor: Vector,
    add: function(v){
      if (v instanceof Vector ) {
        this.x += v.x;
        this.y += v.y;
      } else {
        this.x += v;
        this.y += v;
      }
    },
    
    subtract: function(v){
      if (v instanceof Vector ) {
        this.x -= v.x;
        this.y -= v.y;
      } else {
        this.x -= v;
        this.y -= v;
      }
    },
    
    multiply: function(v){
      if (v instanceof Vector ) {
        this.x *= v.x;
        this.y *= v.y;
      } else {
        this.x *= v;
        this.y *= v;
      }
    },
    
    divide: function(v){
      if (v instanceof Vector ) {
        this.x /= v.x;
        this.y /= v.y;
      } else {
        this.x /= v;
        this.y /= v;
      }
    },
    
    magnitude: function(){
      return Math.sqrt( (this.x*this.x) + (this.y*this.y) );
    },
    
    normalize: function(){
      var m = this.magnitude();
      if (m !== 0){
        this.divide(m);
      }
    },
    
    heading: function(){
      return Math.atan2(this.y, this.x);
    },
    
    limit: function(max){
      var m = this.magnitude();
      if(m > max){
        this.normalize();
        this.multiply(max);
      }
    }
  };

  return Vector;

})();
