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

final int DOTSIZE = 20;
final float GRATIO = 1.61803398875; //Approx. golden ratio
final float INCREMENT = 0.00005;

float radius;
float angle;
float xPos;
float yPos;
float i;

boolean paused;

void setup()
{
  size(800, 800);
  background(0);
  textSize(30);
  reset();
  i = INCREMENT;
  paused = false;
}

void draw()
{
  translate(width/2, height/2);

  //drawPattern(PI);      // Although PI is irrational, it is very close to 
                          //   rational approximations (such as 22/7)
                          
  //drawPattern(GRATIO);  // The golden ratio produces a more uniform spread
                          //   showing that it is "more irrational" than PI

  //i = (float)mouseY * (1/(float)width);
  

  drawPattern(i);
  println("hello");
  //fill(255);
  translate(-width/2, -height/2);
  text(i, 15, 30);
  
  if(!paused){
    i = i + INCREMENT;
    if (i >= 1) i = INCREMENT;
    delay(30);
  }
}

void reset()
{
  radius = 20;
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
  if(angleDiff > 0){
    while(xPos <= height/1.3){
      xPos = radius * cos(angle);
      yPos = radius * sin(angle);
    
      //colorMode(HSB);             // Trippy
      //fill(radius%255, 255, 255); // 
      
      //fill(random(255),random(255),random(256)); //disco ball
      fill(255,255,0); // less exciting than disco
      ellipse(xPos, yPos, DOTSIZE, DOTSIZE);
      updatePoint(angleDiff);
    }
  }
  reset();
}

// Updates angle and radius.
// @param newAngle is the float multiplier of 2PI to
//   get the new angle in radians.
void updatePoint(float newAngle)
{
  radius += 1.5;
  angle += newAngle * 2 *  PI;
}


void keyPressed()
{
  if(key == ' ')
  paused = !paused;
  if(keyCode == RIGHT)
    i += 0.001;
  if(keyCode == LEFT)
  {
    i -= 0.001;
    if(i<0) i += 1.0;
  }
  if(keyCode == UP)
    i += 0.01;
  if(keyCode == DOWN)
  {
    i -= 0.01;
    if (i<0) i += 1.0;
  }
}
