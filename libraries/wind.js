function windSpeed(wind,direction){

  
  push();
    translate();
    rotate(direction);
    noStroke();
    fill("green");
    ellipse(locationX,90,50,50);
  pop();
    
    locationX += wind;
  
    if(locationX > 1080){
    locationX = 540;
  }
    
   
}