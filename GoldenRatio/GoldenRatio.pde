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
 // noStroke();
}

// I don't like these globals. Will rearrange things later
float RADIUS = 10;
float angle = PI;
int dotSize = 20;
int updateCount = 0;
int maxUpdates = 500;
float angleDiff = 1.618; //Approx. golden ratio

void draw()
{

  translate(width/2, height/2);
  //ellipse(0,0, 2 * RADIUS, 2 * RADIUS);
  float xPos = RADIUS * cos(angle);
  float yPos = RADIUS * sin(angle);

  fill(255,255,0);
  ellipse(xPos, yPos, dotSize, dotSize);
  updatePoint(angleDiff);
  updateCount++;
  if (updateCount == maxUpdates)
  {
    noLoop();
  }
}

//
void updatePoint(float newAngle)
{
  RADIUS += 0.5;
  angle += newAngle * 2*  PI;
}
