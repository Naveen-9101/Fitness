function handleTab(event){
  let tab = document.querySelectorAll("section.tabs > button");
  let tabContent = document.querySelectorAll(".calculator .tab-content");
  let target = event.target;
  let selectedTab = target.id;
  

  for(let i =0; i<tab.length; i++){
    tab[i].classList.remove("active");
  }

  for(let i =0; i<tabContent.length; i++){
    tabContent[i].classList.remove("active");
  }
  target.classList.add("active");
  document.querySelector(`.calculator .tab-content[for=${selectedTab}]`).classList.add("active");
}


function handleBmi(){
  const height = parseFloat(document.querySelector(".tab-content[for=bmi] [name=height]").value);
  const weight = parseFloat(document.querySelector(".tab-content[for=bmi] [name=weight]").value);
  const resultBox = document.querySelector(".tab-content[for=bmi] div.result")

  if(height && weight){
    let bmi = (weight /( height * height))* 10000;
    let bmiClass;

    switch (true){
      case (bmi < 18.5):
        bmiClass = "Under weight";
        break;
      case (bmi >= 18.5 && bmi < 25):
        bmiClass = "Normal weight";
        break;
      case (bmi >= 25 && bmi < 30):
        bmiClass = "Over weight";
        break;
      case (bmi >= 30):
        bmiClass = "Obese";
        break;
      default:
        alert ("Invalid BMI");  
    }

    resultBox.querySelector("#result-bmi").innerText = bmi.toFixed(2);
    resultBox.querySelector("#result-bmi-category").innerText = bmiClass;
    resultBox.classList.add("success");

  }else {
    alert("Please fill all the inputs in number format. Use dot for decimal");
  }
}


function handleWater(){
  const activity = parseFloat(document.querySelector(".tab-content[for=water] [name=activity]").value) || 0;
  const weight = parseFloat(document.querySelector(".tab-content[for=water] [name=weight]").value);
  const resultBox = document.querySelector(".tab-content[for=water] div.result")

  if(weight){
   
    let waterAmount = weight * 0.033 + activity * 0.35;

    resultBox.querySelector("#result-water").innerText = waterAmount.toFixed(2);
    resultBox.classList.add("success"); 

  }else {
    alert("Please fill the weight in number format. Use dot for decimal");
  }

}
/* function handleOrientation(e){
  console.log(e);

}

async function deviceApi(){
  if(typeof deviceApiEvent != 'undefined' && typeof deviceApiEvent.requestPermission === 'function'){

  } else if('deviceApiEvent' in window){
    window.addEventListener('deviceorientation',handleOrientation)

  } else{
    alert('not supported');
  }
  
} */

let stepcount =0;
let lastAccelartion = {x:0, y:0, z:0};
const stepThreshold = 7;
const stepCountDisplay = document.getElementById("stepcount");
const statusDisplay= document.getElementById("status");

if("DeviceMotionEvent" in window){
  window.addEventListener("devicemotion",detectStep);
  statusDisplay.innerText ="move your phone count Steps";
} else {
  statusDisplay.innerText ="Device motion ApI is not supported";
}

function detectStep(event){
  let acceleration = event.accelerationIncludingGravity;
  if(acceleration){
    let change = Math.abs(acceleration.x - lastAccelartion.x) + Math.abs(acceleration.y - lastAccelartion.y)+ Math.abs(acceleration.z - lastAccelartion.z);
    if (change > stepThreshold){
      stepcount++;
      stepCountDisplay.innerText = stepcount;
    }
    lastAccelartion = acceleration;
  }
}

function reset(){
  stepcount = 0;
  stepCountDisplay.innerText = stepcount;
}


