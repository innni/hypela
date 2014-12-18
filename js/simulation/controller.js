var w = window.innerWidth;
var h = window.innerHeight;

var context = document.getCSSCanvasContext("2d", "simulation", w, h);


var flock_settings = {
	population: 20
};

var boid_settings = {
	laziness_level: 0.1
}

var f = new Flock(boid_settings,flock_settings);
f.setup();


(function loop(){
  f.run();
  requestAnimFrame(loop);
})();