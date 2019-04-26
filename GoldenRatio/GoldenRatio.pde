/*
    Jonathan Middleton
    
    Inspired by this video from Numberphile: https://youtu.be/sj8Sg8qnjOg
    TODO - Get rid of global vars
    TODO - Draw an entire pattern, then increment angle update
    TODO - Text feedback showing current angle
*/



void setup()
{
  size(600, 600);
  background(0);

}

// I don't like these globals. Will rearrange things later
float RADIUS = 10;
float angle = PI;
int dotSize = 20;
int updateCount = 0;
int maxUpdates = 500;
float gRatio = 1.618; //Approx. golden ratio
float xPos;
float yPos;
float i = 0.00001;

void draw()
{
  translate(width/2, height/2);

  
  //drawPattern(gRatio);

  drawPattern(i);
  textSize(30);
  fill(255);
  translate(-width/2, -height/2);
  text(i, 15, 30);
  
  
  i = i + 0.00001;
  
  //delay(5);

}

void reset()
{
  //background(0);
  RADIUS = 10;
  angle = PI;
  xPos = 0;
  yPos = 0;
}

void drawPattern(float angleDiff)
{
  background(0);
  while(xPos <= height/2){
  xPos = RADIUS * cos(angle);
  yPos = RADIUS * sin(angle);

  fill(255,255,0);
  ellipse(xPos, yPos, dotSize, dotSize);
  updatePoint(angleDiff);
  //updateCount++;
  }
  reset();
}


//
void updatePoint(float newAngle)
{
  RADIUS += 0.6;
  angle += newAngle * 2*  PI;
}
