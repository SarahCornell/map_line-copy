function cloud(cloudCover){
  
  
  for(var i = 0; i < 100; i++){
    var speed = 0.001;
    var correlation = 1000;
    var time = (frameCount * speed)+(i*correlation);
    var up = map(noise(time),0,1,0,height);
    time = time + 100;
    var across = map(noise(time),0,1,540,width);
    var spacer = 80
    //connects the cloud cover probability to the actual value
    if(random(100) < cloudCover){
    //randomSeed stabilized random numbers
    randomSeed(i*300);
    
    var raduis = random(100);
    
    push();
    translate(across,up);
    fill(255,random(255));
    ellipse(0,0,raduis,raduis);
    pop();
    } 
    }
}
