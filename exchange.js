var dateFormat = require('dateformat');
var now = new Date();
now=now.toString()
now=now.split(":")
var count=0;
console.log(now)
var cmd     = require('node-command-line');
var Promise = require('bluebird');

if(now[0][0]=='F'){
setInterval(function(){ 
	console.log (count)
if (count==0){
runSingleCommandWithWait()
function runSingleCommandWithWait() {
  Promise.coroutine(function *() {
    yield cmd.run('git pull');
    console.log('Executed your command :)');
    count=1;
  })();
}
}
}, 1000);

}