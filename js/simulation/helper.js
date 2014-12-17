/* 
Helper.JS
Helper Functions for Boid
Hina Aman
http://codecyb.org
*/

window.Helper = (function(){

  function Helper(){
    
  }
  
  Helper.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };


  Helper.map = function(value, start1, stop1, start2, stop2){
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  };

  return Helper;

})();

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
