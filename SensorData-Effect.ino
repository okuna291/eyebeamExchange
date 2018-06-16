String inputString = "";
boolean stringComplete = false;

const int led1 = 5;
const int led2 = 6;
int fader =0;
int estate =0;
int sensor_input1 = 0;
int sensor_input2 = 0;
int sensor1 = A3;
int sensor2 = A2;
int brightness = 0;    // how bright the LED is
int fadeAmount = 5; 
unsigned long previousMillis = 0;
unsigned long currentMillis = 0;
const long interval = 1000;
unsigned long wpreviousMillis = 0;
unsigned long wcurrentMillis = 0;
const long winterval = 10000;
int sensor_input1p=0;
int ledState =  LOW;





void setup() {

  Serial.begin(9600);
  inputString.reserve(200);

  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  

}

void loop() {



  
 if (stringComplete) {
    

    int break_point = inputString.indexOf(',');
    String effect = inputString.substring(0,break_point);
    //String second_led = inputString.substring(break_point+1, inputString.length()-1);


  if(effect == "5"){
//    Serial.println("FLASH EFFECT");
//estate=5;
    blinkled();
    }

      if(effect == "4"){
//    Serial.println("FADE EFFECT");
estate=4;
    
    }

     if(effect == "3"){
//    Serial.println("VIB EFFECT");
vib();
    
    }
   
    inputString = "";
    stringComplete = false;
    
    }

  
 


  currentMillis = millis();
  averageSensorValues();


  if (estate==4){
    fadeled();
    }

    if (estate==5){
    blinkled();
    }

     if (estate==0){
    digitalWrite(led1,LOW);
    }
 
}


void serialEvent() {
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    inputString += inChar;

    if (inChar == '\n') {
      stringComplete = true;
      
      }
    }
  }





void averageSensorValues(){
  
  for (int i=0; i<5; i++){
    
    sensor_input1 += analogRead(sensor1);
    sensor_input2 += analogRead(sensor2);
    sensor_input1 = sensor_input1/5;
    sensor_input2 = sensor_input2/5;
  }

if(abs(sensor_input1-sensor_input1p)>2){
  Serial.print(sensor_input1);
  Serial.print(",");
  Serial.println(sensor_input2);
  sensor_input1p=sensor_input1;
  delay(1000);
  }
  
  
}


void blinkled(){

   digitalWrite(led1, HIGH);
    delay(100);
       digitalWrite(led1, LOW);
    delay(100);
    digitalWrite(led1, HIGH);
    delay(100);
       digitalWrite(led1, LOW);
    delay(100);
    digitalWrite(led1, HIGH);
    delay(100);
       digitalWrite(led1, LOW);
    delay(100);
    digitalWrite(led1, HIGH);
    delay(100);
       digitalWrite(led1, LOW);
    delay(100);



  
  }

void vib(){
    digitalWrite(led2, HIGH);
    delay(100);
       digitalWrite(led2, LOW);
    delay(100);
    digitalWrite(led2, HIGH);
    delay(100);
       digitalWrite(led2, LOW);
    delay(100);
    digitalWrite(led2, HIGH);
    delay(100);
       digitalWrite(led2, LOW);
    delay(100);
    digitalWrite(led2, HIGH);
    delay(100);
       digitalWrite(led2, LOW);
    delay(100);

  }



void fadeled(){
  
  unsigned long wcurrentMillis = millis();
if (wcurrentMillis - wpreviousMillis >= winterval) {
    // save the last time you blinked the LED
    wpreviousMillis = wcurrentMillis;

   estate=0;
  }
//  digitalWrite(led1, HIGH);
  
   analogWrite(led1, brightness);

  // change the brightness for next time through the loop:
  brightness = brightness + fadeAmount;

  // reverse the direction of the fading at the ends of the fade:
  if (brightness <= 0 || brightness >= 255) {
    fadeAmount = -fadeAmount;
  }
  // wait for 30 milliseconds to see the dimming effect
  delay(20);
 


  
}
 

  
