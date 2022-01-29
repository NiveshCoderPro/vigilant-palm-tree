song = "";
leftWristX = "";
leftWristY = "";

rightWristX = "";
rightWristY = "";

scoreLeftWrist = "";
scoreRightWrist = "";

function preload() {
  song = loadSound("music.mp3");
}


function setup() {
  canvas = createCanvas(500,500);
  video = createCapture(VIDEO);
  canvas.center();
 video.hide();

  posenet = ml5.poseNet(video,modelLoaded);
  posenet.on('pose',gotPoses);
}

function draw() {
image(video , 0 ,0,500,500);

fill("#FF0000");
stroke("#FF0000");

 

if (scoreLeftWrist > 0.2) {
  circle(leftWristX, leftWristY, 20);
  InNumberLeftWristY = Number(leftWristY);
  remove_decimals = floor(InNumberLeftWristY);
  volume = remove_decimals / 500;
  document.getElementById("volume").innerHTML = "Volume = " + volume;
  song.setVolume(volume);

  circle(rightWristY, rightWristY, 20);


  if (rightWristY > 0 && rightWristY <= 100)
    document.getElementById("speed").innerHTML = "speed = 0.5x";
  song.rate(0.5);
}
else if (rightWristY > 100 && rightWristY <= 200) {
  document.getElementById("speed").innerHTML = "speed = 1x";
  song.rate(1);
}
else if (rightWristY > 200 && rightWristX <= 300) {
  document.getElementById("speed").innerHTML = "speed = 1.5x";
  song.rate(1.5);
}
else if (rightWristY > 300 && rightWristX <= 400) {
  document.getElementById("speed").innerHTML = "speed = 2x";
  song.rate(2);
}
else if (rightWristY > 400 && rightWristX <= 500) {
  document.getElementById("speed").innerHTML = "speed = 2.5x";
  song.rate(2.5);
}
}
 

  

function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}

function modelLoaded() {
  console.log("Posenet is Intialized")
}


function gotPoses(results) {
  if (results.length > 0) {
     console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = " + scoreLeftWrist);

     leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;

    console.log("leftWristX =" + leftWristX + "leftWristY = " + leftWristY);

 rightWristX = results[0].pose.rightWrist.x;
 rightWristY = results[0].pose.rightWrist.y;

 console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
  }
}
