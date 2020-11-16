function particle(){
    this.pos = createVector(0,0);
    this.acc = createVector(0,0);
    this.val = createVector(0,0);
    this.size = random(1,8);
    this.alpha = random(150,255);
    this.maxVal = 2;
}

particle.prototype.update = function(){
    this.val.add(this.acc);
    this.val.limit(this.maxVal);
    this.pos.add(this.val);
    this.acc.mult(0);
}

particle.prototype.follow = function(flowFields){
    let x =  floor(this.pos.x/scl);
    let y = floor(this.pos.y/scl);
    let index = x + y * cols;
    this.applyForce(flowFields[index]);
}

particle.prototype.applyForce = function(force){
    this.acc.add(force);
}

particle.prototype.show = function(){
    stroke(255,this.alpha);
    strokeWeight(this.size);
    point(this.pos.x,this.pos.y);
}

particle.prototype.edges = function(){
    if(this.pos.x < 0){
        this.pos.x = width;
    }
    if(this.pos.x > width){
        this.pos.x = 0;
    }
    if(this.pos.y < 0){
        this.pos.y = height;
    }
    if(this.pos.y > height){
        this.pos.y = 0;
    }
}
