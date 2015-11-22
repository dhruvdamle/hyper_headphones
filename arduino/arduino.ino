//Upload this code on arduino mini on HyperHeadphones product.
//A0 reads X value
//A1 reads Y value from the accelerometer
//Use Adafruit bluetooth module for communication between arduino and p5.js. (https://www.adafruit.com/products/1588)

void setup() {
  Serial1.begin(9600);
  Serial.begin(9600);

}

void loop() {
  int xvalue = analogRead(A0);
  Serial1.print(xvalue);
  Serial.print(xvalue);

  Serial1.print(",");
  Serial.print(",");

  int yvalue = analogRead(A1);
  Serial1.println(yvalue);
  Serial.println(yvalue);

  delay(100);
}
