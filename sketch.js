var weatherData;
var mapImage;
var myFont;
var centerX;
var centerY;
//selects the location of the circle
var selectionX;
var selectionY;
var mapLocationX = 100;
var mapLocationY = 190;
var mapSizeX = 360;
var mapSizeY = 180;
var speedX = 1;
var locationX = 540;

function preload(){
  myFont = loadFont("OptimusPrinceps.ttf");
  mapImage = loadImage("Equirectangular_projection_SW.jpg");
}

function setup() {
  createCanvas(1080,720);
  angleMode(DEGREES);
  
  textFont(myFont);
  fill('white');
  textSize(20);
  textAlign(LEFT);
 
  
  centerX = width/2;
  centerY = height/2;
  
  loadJSON("http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=7be327791d323dc12d8c941b067d4562&units=imperial", gotData);
  
}

function gotData(data){
  //this callback function executes once the json has arrived
  //takes the json in the data argument and dumps it in the weatherData variable
  weatherData = data;
}

function draw() {
  background(100);
  /*var time = frameCount * 0.001;
  var up = map(noise(time),0,1,0,height);
  */
  
  image(mapImage,mapLocationX,mapLocationY,mapSizeX,mapSizeY);
  //mapImage = (mapLocationX,mapSizeX,mapLocationY,mapSizeY);
  
  fill(255,240);
  ellipse(selectionX,selectionY,10,10);
    
  //if the mouse is over the map
  if(mouseX > mapLocationX &&
    mouseX < (mapLocationX + mapSizeX) &&
    mouseY > mapLocationY &&
    mouseY < (mapLocationY + mapSizeY)
    ){
    //draw the crosshair lines
    line(mouseX,mapLocationY,mouseX,mapLocationY + mapSizeY);
    line(mapLocationX,mouseY,mapLocationX + mapSizeX,mouseY);
    textSize(20);
    //noStroke();
    
    //draw the lat and long coordinates
    text(floor(map(mouseY,mapLocationY,mapLocationY + mapSizeY,90,-90)),mapSizeX+30,mouseY - 4);
    text(floor(map(mouseX,mapLocationX,mapLocationX + mapSizeX,-180,180)),mouseX - 20,mapLocationY + 20);
    
    }
  
    
  
  //if weatherData is undefined, then this code will not execute undefined = FALSE anything
  if(weatherData){
    fill('white');
    //City Name
    text(weatherData.name,100,400);
    //Country Name
    text(weatherData.sys.country,100,425);
    
    //temperature
    text(weatherData.main.temp + " °F",100,470);
    
    //weather type
    text(weatherData.weather[0].main,100,490);
    
    //wind speed
    text(weatherData.wind.speed + " Wind Speed",100,510);
    
    //showing the cloud cover in the city
    cloud(weatherData.clouds.all);
    
    //showing the wind speed for the city
    windSpeed(weatherData.wind.speed,weatherData.wind.deg);
    
    temp(weatherData.main.temp);
    
   /* //Latitude
    text(weatherData.coord.lat,100,525);
    //Longitude
    text(weatherData.coord.lon,100,550);
    */
    
    //wind(weatherData.wind.all,20,290);
  }
  
}


function mousePressed(){
  if(mouseX > mapLocationX &&
    mouseX <(mapLocationX + mapSizeX) &&
    mouseY > mapLocationY &&
    mouseY < (mapLocationY + mapSizeY)
    ){
      selectionX = mouseX;
      selectionY = mouseY;
      //grab the JSON based on the new selection
      var lon = map(selectionX,mapLocationX,mapLocationX + mapSizeX, -180,180);
      var lat = map(selectionY,mapLocationY,mapLocationY + mapSizeY, 90,-90);
      var start = "http://api.openweathermap.org/data/2.5/weather?lat="
      var end = "&appid=7be327791d323dc12d8c941b067d4562&units=imperial"
      var url = start + lat + "&lon=" + lon + end;
      loadJSON(url, gotData);
      //println(mousePressed);
    }
}
