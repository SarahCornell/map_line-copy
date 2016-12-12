function temp(temp){
  
  for(var j = 0; j < 25; j++){
    var speedAlpha = temp * .001;
    var corr = .1;
    var timing = (frameCount * speedAlpha) + (j*corr);
    var upper = map(noise(timing),0,1,0,height/2);
    var space = 35;
    
    push();
    translate(j*space,upper);
    fill('blue');
    rect(540,360,30,30);
    pop();
  }
  
  
  
}