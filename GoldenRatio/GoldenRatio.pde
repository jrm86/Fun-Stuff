/*
*  Jonathan Middleton
*  
*  Inspired by this video from Numberphile: https://youtu.be/sj8Sg8qnjOg
*  
*  Demonstrates (approximately) the "irrationality" of irrational numbers.
*  Floating point numbers close to ratios (0.333... for 1/3) will draw dots as 
*    recognizable spokes. Approximations of irrational numbers will draw
*    more a more uniform distribution of dots.
*/

final int DOTSIZE = 25;
final float GRATIO = 1.61803398875; //Approx. golden ratio
final float INCREMENT = 0.00001;

float radius;
float angle;
float xPos;
float yPos;
float i;

void setup()
{
  size(600, 600);
  background(0);
  textSize(30);
  reset();
  i = INCREMENT;
}

void draw()
{
  translate(width/2, height/2);

  //drawPattern(PI);      // Although PI is irrational, it is very close to 
                          //   rational approximations.
                          
  //drawPattern(GRATIO);  // The golden ratio produces a more uniform spread
                          //   showing that it is "more irrational" than PI

  drawPattern(i);

  fill(255);
  translate(-width/2, -height/2);
  text(i, 15, 30);
  
  i = i + INCREMENT;
  
  if (i >= 1) i = INCREMENT;
  
  //delay(10);
}

void reset()
{
  radius = 10;
  angle = PI;
  xPos = 0;
  yPos = 0;
}

// Places successive dots on arcs of increasing radius.
// @param angleDiff is the how far it "turns" before placing
//   the next dot.
void drawPattern(float angleDiff)
{
  background(0);
  while(xPos <= height/1.3){
  xPos = radius * cos(angle);
  yPos = radius * sin(angle);

  //fill(random(255),random(255),random(256)); //disco ball
  fill(255,255,0); // less exciting than disco
  ellipse(xPos, yPos, DOTSIZE, DOTSIZE);
  updatePoint(angleDiff);
  }
  reset();
}

// Updates angle and radius.
// @param newAngle is the float multiplier of 2PI to
//   get the new angle in radians.
void updatePoint(float newAngle)
{
  radius += 1.0;
  angle += newAngle * 2 *  PI;
}