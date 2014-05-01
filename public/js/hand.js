

var canvas = document.getElementById('canvas');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

var c =  canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

//Set up the controller
var controller = new Leap.Controller();
var isCounting = false;
controller.on( 'frame' , function(frame){
  c.clearRect(0, 0, width, height);
  var numberOfFingers = frame.fingers.length;
  c.font = "200px Arial";
  c.fillStyle = '#3e8a41';
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillText( numberOfFingers , width/2 , height/2 );

  if(numberOfFingers == 5 && !isCounting) {
    isCounting = true;
    setTimeout(function(){
      isCounting = false;
      if(numberOfFingers == 5){ //5 fingers still after 3s
        var start = parseInt(document.getElementById('count').innerHTML);
        var end = start+1;
        document.getElementById('count').innerHTML = end;
        }
      }, 3*1000); //after 3s
    }
});


controller.connect();