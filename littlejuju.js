var PORT = 33333;

var express = require('express');
var app = express();




var HOST = 'ec2-18-219-243-183.us-east-2.compute.amazonaws.com';
var redis = require('redis');
var clientRedis = redis.createClient(19907, 'redis-19907.c11.us-east-1-2.ec2.cloud.redislabs.com', {no_ready_check: true});
var Cryptr = require('cryptr');
var dgram = require('dgram');
//var message = new Buffer('My KungFu is Good!');
var prompt = require('prompt');

var SerialPort = require('serialport');
var prompt = require('prompt');

var Readline = SerialPort.parsers.Readline;
var port = new SerialPort('/dev/ttyS0');

var parser = new Readline();
var sensor1
var readSensor1
prompt.start();
var message;
var bool = 0;

var clientudp = dgram.createSocket('udp4');
var clientName="";
var cryptr = new Cryptr('myTotalySecretKey');
port.pipe(parser);

clientRedis.auth('eyebeam', function (err) {
    if (err) throw err;
});

clientRedis.on('connect', function() {
    console.log('Connected to Redis');
});

app.get('/', function (req, res) {
  res.send('Littlejuju!'); });
var serverw = app.listen(8000, function () {
  var hostw = serverw.address().address;
  var portw = serverw.address().port;
  console.log('Example app listening at http://%s:%s', hostw, portw);
});


port.write('main screen turn on \n', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  //console.log('message written');
});

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})



setInterval(function(){ 

clientRedis.hgetall('exchange', function(err, object) {

    // console.dir(parseInt(object.Sensor1)+","+parseInt(object.Sensor2)+","+parseInt(object.Effect));
    var toarduino = parseInt(object.Effect)+","+parseInt(object.Sensor1)+","+parseInt(object.Sensor2)
    //var toarduino = parseInt(object.Effect);
    port.write(toarduino +'\n', function(err) {
    	//port.write(toarduino, function(err){

    if (err) {
      return console.log('Error on write: ', err.message);
    }
   
    //console.log("Command Entered = "+result.enterCommand);
    console.log(toarduino);
    
    
  });
    
});
}, 500);



parser.on('data', function (data) {
  // console.log(data);

  //var incoming = data.toString();
  //incoming =

  //stores incoming data from arduino sensors to database
  sensor1 = data
  
    // console.log(sensor1);

  // message = new Buffer(clientName+","+sensor1);
    // var message = new Buffer(sensor1);
message=data.toString()
// message=message.split()
// var one = parseInt(message[0])
// var one = parseInt(message[0])
// console.log(message.toString())





			
				clientudp.send(message, 0, message.length, PORT, HOST, function (err, bytes) {
				    if (err) throw err;
				    // console.log('UDP message sent to ' + HOST +':'+ PORT);
				    //bool == 1;
				    //client.close();
				    // sendMessage();

// clientRedis.hgetall('exchange', function(err, object) {

//     console.dir(parseInt(object.Sensor1)+","+parseInt(object.Sensor2)+","+parseInt(object.Effect));
//     var toarduino = parseInt(object.Effect)+","+parseInt(object.Sensor1)+","+parseInt(object.Sensor2)
//     //var toarduino = parseInt(object.Effect);
//     port.write(toarduino +'\n', function(err) {
//     	//port.write(toarduino, function(err){

//     if (err) {
//       return console.log('Error on write: ', err.message);
//     }
   
//     //console.log("Command Entered = "+result.enterCommand);
//     console.log(toarduino);
    
    
//   });
    
// });


	// 			    readSensor1 = clientRedis.hget(["exchange", "Sensor1"], function (err, res) {
 //      			console.log(res);

 // port.write(res +'\n', function(err) {

 //    if (err) {
 //      return console.log('Error on write: ', err.message);
 //    }
   
 //    console.log("Command Entered = "+result.enterCommand);
    
    
 //  });

 //    				});




				});





});


function clientPrompt(){
	
		prompt.get(['clientName'], function (err, result){
	clientName=result.clientName;
	sendMessage();
	});//
	
	
}


/*function sendMessage() {

	


		
			// message = new Buffer(result.newMessage);

		prompt.get(['newMessage'], function (err, result){
			message = new Buffer(clientName+","+result.newMessage);

			
				client.send(message, 0, message.length, PORT, HOST, function (err, bytes) {
				    if (err) throw err;
				    console.log('UDP message sent to ' + HOST +':'+ PORT);
				    //bool == 1;
				    //client.close();
				    sendMessage();
				});
			
		});
	

	
	
}*/