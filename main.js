function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('mobileNet',modelload);
  previous="";
}
function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,gotresult);
}

function modelload(){
  console.log('model is loaded');
}

function gotresult(error,results){
  if(error){
    console.error(error);
  }
  else{
    if((results[0].label != previous) && (results[0].confidence < 0.5)){
      console.log(results);
      document.getElementById('object').innerHTML = "Object:" + results[0].label;
      document.getElementById('accuracy').innerHTML = "Accuracy:" + results[0].confidence.toFixed(3);
      var synth = window.speechSynthesis;
      speak_data = "object is "+results[0].label;
      utterthis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterthis);
    }
  }
}
