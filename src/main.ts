import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName: string = "This is a test game test game";
const clickerText: string = "Click ME 😎";
let counter: number = 0;
let timestamp: number = 0;

function increaseCount(n: number) {
  counter += n;
  countText!.innerHTML = `😎 ${counter} 😎`;
}

function automaticIncrease() {
  const timePassed = performance.now() - timestamp;
  increaseCount(timePassed / 1000);
  timestamp = performance.now();
  window.requestAnimationFrame(automaticIncrease);
}

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const clicker = document.getElementById("clicker");
clicker!.innerHTML = clickerText;
app.append(clicker!);

const countText = document.getElementById("count");
countText!.innerHTML = `😎 ${counter} 😎`;
app.append(countText!);

clicker?.addEventListener("click", () => {
  increaseCount(1);
});

window.requestAnimationFrame(automaticIncrease);
