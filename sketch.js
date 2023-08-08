var cnv;
function centerCanvas() {
  cnv.position(568, 149);
}
function setup() {
  cnv = createCanvas(600, 400);
  centerCanvas();

  background(0);
}
window.oncontextmenu = function (e) {
  e.preventDefault();
};
let shape1List = new Set();
let shape2List = new Set();
function draw() {
  if (mouseIsPressed === true) {
    if (
      mouseButton === LEFT &&
      mouseX >= 0 &&
      mouseY >= 0 &&
      mouseX <= 585 &&
      mouseY <= 385
    ) {
      const c = color(255, 0, 0);
      fill(c);
      noStroke();
      rect(mouseX, mouseY, 15, 15);
      shape1List.add("" + mouseX + "," + mouseY);
    }
    if (
      mouseButton === RIGHT &&
      mouseX >= 10 &&
      mouseY >= 0 &&
      mouseX <= 590 &&
      mouseY <= 390
    ) {
      const c = color(0, 255, 0);
      fill(c);
      noStroke();
      triangle(
        mouseX,
        mouseY,
        mouseX - 10,
        mouseY + 13,
        mouseX + 10,
        mouseY + 13
      );
      shape2List.add("" + mouseX + "," + mouseY);
    }
  }
}
// ----------------------------------------------------------------------------------------------
// i was working in the original canvas but p5 is more beautiful
// let speed = 1000;
// let settings = document.getElementById("settings");
// let tcText = document.getElementById("tc");

// //when using canvas in html directly you will have some problems
// var canvas = document.createElement("canvas");
// canvas.id = "canvas";
// document.getElementById("container").appendChild(canvas);
// const ctx = canvas.getContext("2d");
// function speedd() {
//   speed = document.getElementById("speedRange").value;
//   let queens = document.getElementsByClassName("queen");
//   for (let index = 0; index < queens.length; index++) {
//     queens[index].style.transition = "all " + speed / 1000 + "s";
//   }
// }
// function sleep(milliseconds) {
//   return new Promise((resolve) => setTimeout(resolve, milliseconds));
// }

// var rect = canvas.getBoundingClientRect();
// scaleX = canvas.width / rect.width;
// scaleY = canvas.height / rect.height;

// canvas.addEventListener("click", async function (event) {
//   let x = Math.floor((event.clientX - rect.left) * scaleX);
//   let y = Math.floor((event.clientY - rect.top) * scaleY);
//   shape1List.push({ x: x, y: y });
//   console.log(shape1List);
//   ctx.fillStyle = "red";
//   ctx.beginPath();
//   ctx.rect(x, y, 5, 5);
//   ctx.fill();
//   // ctx.stroke();
//   // await sleep(1000);
//   // ctx.clearRect(x - 1, y - 1, 12, 7);
// });
// canvas.addEventListener("contextmenu", async function (event) {
//   event.preventDefault();
//   let x = Math.floor((event.clientX - rect.left) * scaleX);
//   let y = Math.floor((event.clientY - rect.top) * scaleY);
//   shape2List.push({ x: x, y: y });
//   console.log(shape2List);
//   ctx.fillStyle = "blue";
//   ctx.beginPath();
//   ctx.arc(x, y, 2.5, 0, 2 * Math.PI);
//   ctx.fill();
//   // ctx.stroke();
//   // await sleep(1000);
//   // ctx.clearRect(x - 5, y - 5, 10, 10);
// });

//shape 1 -> 0
// shape 2 -> 1

let w1, w2, threshold;
let learningRate = document.getElementById("Learning-rate").value;
function initialization() {
  w1 = Math.random() - 0.5;
  w2 = Math.random() - 0.5;
  threshold = Math.random() - 0.5;
  console.log("initialization");
  console.log("w1: " + w1 + " w2: " + w2 + " threshold: " + threshold);
}
function sigmoid(num) {
  return 1 / (1 + Math.pow(Math.E, -1 * num));
}
//actual output
function activate(x1, w1, x2, w2, learningRate) {
  return sigmoid(x1 * w1 + x2 * w2 - learningRate);
}

function calcualteError(actualOutput, expectedOutput) {
  return expectedOutput - actualOutput;
}

function correctWeight(learningRate, x, error) {
  return learningRate * x * error;
}

function trainWeight(weight, weightCorrection) {
  return weight + weightCorrection;
}
function trainListOfData(listOfData, expectedOutput) {
  for (const data of listOfData) {
    console.log("*****************");
    let x = data.split(",")[0];
    let y = data.split(",")[1];
    let actualOutput = activate(x, w1, y, w2, learningRate);
    console.log("expectedOutput: " + expectedOutput);
    console.log("actualOutput: " + actualOutput);
    let error = calcualteError(actualOutput, expectedOutput);
    console.log("error: " + error);
    w1 = trainWeight(w1, correctWeight(learningRate, x, error));
    w2 = trainWeight(w2, correctWeight(learningRate, y, error));
    console.log("*****************");
  }
}
function drawLine() {
  stroke(500);
  let y1 = threshold / w2;
  let y2 = (-1 * 600 * w1 + threshold) / w2;
  line(0, y1, 600, y2);
}
function startTraining() {
  let maxIterations = document.getElementById("max-iteration").value;
  console.log("maxIterations: " + maxIterations);
  console.log(shape1List);
  console.log(shape2List);
  initialization();
  let countIteration = 0;

  while (true) {
    console.log("---------------------------------------");
    console.log("w1: " + w1 + " w2: " + w2);
    trainListOfData(shape1List, 0);

    console.log("w1: " + w1 + " w2: " + w2);
    trainListOfData(shape2List, 1);
    console.log("w1: " + w1 + " w2: " + w2);
    console.log("---------------------------------------");

    countIteration++;
    if (countIteration == maxIterations) break;
  }
  drawLine();
}
