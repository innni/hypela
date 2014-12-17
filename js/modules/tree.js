
var w = window.innerWidth;
var h = window.innerHeight;

var context = document.getCSSCanvasContext('2d', 'pagebg', w, h);

function Tree(context){
  this.branch_width = 10;
  this.width_reduce = 0.66;
  this.reduce = 0.666;
  this.left_branch = Math.PI/6;
  this.right_branch = -Math.PI/6;
  this.min_length = 2;
  this.color = "green";
  this.size = 200;
  this.context = context;
  
  this.color_branches = "rgb(194, 180, 154)";
  this.color_leaves = "rgb(59,134,134)";
  this.color_shoots = "rgb(255,127,127)";
  
  this.density_leaves = 10;
  this.density_shoots = 4;
  
}

Tree.prototype = {
  
  constructor: Tree,
  
  branch: function(x, y, len, width){
    
    len *= this.reduce;
    
    width *= this.width_reduce;
    
    this.context.fillStyle = this.color_branches;
  
    if (len < this.density_leaves){
      width /= this.width_reduce;
      this.context.fillStyle = this.color_leaves;
    }
  
    if (len < this.density_shoots){
      width /= this.width_reduce;
      this.context.fillStyle = this.color_shoots;
    }
  
    if (len > this.min_length){
      
      this.context.fillRect(x,y,width,-len);
      this.context.translate(x,y-len);
      this.context.save();
  
      this.context.rotate(this.left_branch);
      this.branch(0, 0, len, width);
      this.context.restore();
  
      this.context.save();
      this.context.rotate(this.right_branch);
      this.branch(0, 0, len, width);
      this.context.restore();
    }
  },
  
  create: function(x, y){
    this.context.save();
    this.branch(x, y, this.size, this.branch_width);
    this.context.restore();
  }
  
};

function init(){
  var bigTree = new Tree(context);
  bigTree.branch_width = 10;
  bigTree.width_reduce = 0.8;
  bigTree.size = 200;
  bigTree.left_branch = Math.PI/2.7
  bigTree.right_branch = -Math.PI/7;
  bigTree.create(w/1.2, h);
  
}

//init();