let speed = 1000;
let settings = document.getElementById("settings");
let tcText = document.getElementById("tc");
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

createChessBoard(4);
document.getElementById("N-Queens").addEventListener("input", (event) => {
  let deletePrev = document.querySelectorAll(".queen");
  deletePrev.forEach((element) => {
    element.remove();
  });
  let n = document.getElementById("N-Queens").value;
  createChessBoard(n);
});
