// Get the canvas DOM element
var canvas = document.getElementById('canvas');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

var c =  canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height = 400;

function leapToScene( frame , leapPos ){

  var iBox = frame.interactionBox;

  var left = iBox.center[0] - iBox.size[0]/2;
  var top = iBox.center[1] + iBox.size[1]/2;

  var x = leapPos[0] - left;
  var y = leapPos[1] - top;

  x /= iBox.size[0];
  y /= iBox.size[1];

  x *= width;
  y *= height;

  return [ x , -y ];

}

var controller = new Leap.Controller();

controller.on( 'frame' , function(frame){

  c.clearRect( 0 , 0 , width , height );

  for( var i=0; i < frame.hands.length; i++ ){

    // Getting the hand position
    var hand = frame.hands[i];

    var handPos = leapToScene( frame , hand.palmPosition );


    for( var j = 0; j < hand.fingers.length; j++ ){

      //Getting the finger position

      var finger = hand.fingers[j];

      var fingerPos = leapToScene( frame , finger.tipPosition );

      /*
          First Draw the Connection
      */

      // Setting up the style for the stroke
      c.strokeStyle = "#000000";
      c.lineWidth = 3;

      // Drawing the path
      c.beginPath();

      // Moves to the hand position
      c.moveTo(   handPos[0] ,   handPos[1] );

      // Draws a line to the finger position
      c.lineTo( fingerPos[0] , fingerPos[1] );

      c.closePath();
      c.stroke();


      /*
          Second Draw the Finger
      */

      // Setting up the style for the stroke
      c.strokeStyle = "#3e8a41";
      c.lineWidth = 5;

      // Creating the path for the finger circle
      c.beginPath();

      // Draw a full circle of radius 6 at the finger position
      c.arc(fingerPos[0], fingerPos[1], 20, 0, Math.PI*2);

      c.closePath();
      c.stroke();

    }


    /*
        Third draw the hand
    */

    // Setting up the style for the fill
    c.fillStyle = "#3e8a41";

    // Creating the path for the hand circle
    c.beginPath();

    // Draw a full circle of radius 10 at the hand position
    c.arc(handPos[0], handPos[1], 40, 0, Math.PI*2);

    c.closePath();
    c.fill();

  }

});

// Get frames rolling by connecting the controller
controller.connect();