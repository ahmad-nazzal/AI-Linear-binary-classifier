let speed = 1000;
let settings = document.getElementById("settings");
let tcText = document.getElementById("tc");

let shape1List = [];
let shape2List = [];

//when using canvas in html directly you will have some problems
var canvas = document.createElement("canvas");
canvas.id = "canvas";
document.getElementById("container").appendChild(canvas);
const ctx = canvas.getContext("2d");
function speedd() {
  speed = document.getElementById("speedRange").value;
  let queens = document.getElementsByClassName("queen");
  for (let index = 0; index < queens.length; index++) {
    queens[index].style.transition = "all " + speed / 1000 + "s";
  }
}
function reset() {}
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

var rect = canvas.getBoundingClientRect();
scaleX = canvas.width / rect.width;
scaleY = canvas.height / rect.height;

canvas.addEventListener("click", async function (event) {
  let x = (event.clientX - rect.left) * scaleX;
  let y = (event.clientY - rect.top) * scaleY;
  shape1List.push({ x: x, y: y });
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.rect(x, y, 10, 5);
  ctx.fill();
  // ctx.stroke();
  await sleep(1000);
  ctx.clearRect(x - 1, y - 1, 12, 7);
});
canvas.addEventListener("contextmenu", async function (event) {
  event.preventDefault();
  let x = (event.clientX - rect.left) * scaleX;
  let y = (event.clientY - rect.top) * scaleY;
  shape2List.push({ x: x, y: y });
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  await sleep(1000);
  ctx.clearRect(x - 5, y - 5, 10, 10);
});
