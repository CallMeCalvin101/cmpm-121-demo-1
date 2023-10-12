import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName: string = "This is a test game test game";
const clickerText: string = "Click ME 😎";
const upgradeAText: string = "10 😎 --> 0.1 Auto 😎";
const upgradeBText: string = "100 😎 --> 2 Auto 😎";
const upgradeCText: string = "1000 😎 --> 50 Auto 😎";

let counter: number = 0;
let timestamp: number = 0;
let numA: number = 0;
let numB: number = 0;
let numC: number = 0;

function increaseCount(n: number) {
  counter += n;
  countText!.innerHTML = `😎 ${counter.toFixed(2)} 😎`;
  rateText!.innerHTML = `${calculateGrowthRate().toFixed(2)} 😎/sec`;
}

function automaticIncrease() {
  const timePassed = performance.now() - timestamp;
  increaseCount(calculateGrowthRate() * (timePassed / 1000));
  timestamp = performance.now();
  window.requestAnimationFrame(automaticIncrease);

  if (counter >= 100 && (upgraderB! as HTMLSelectElement).disabled != false) {
    (upgraderB! as HTMLSelectElement).disabled = false;
  }

  if (counter >= 1000 && (upgraderC! as HTMLSelectElement).disabled != false) {
    (upgraderC! as HTMLSelectElement).disabled = false;
  }
}

function calculateGrowthRate(): number {
  return 0.1 * numA + 2 * numB + 50 * numC;
}

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const clicker = document.getElementById("clicker");
clicker!.innerHTML = clickerText;
app.append(clicker!);

app.append(document.createElement("br"));

const upgraderA = document.getElementById("upgradeA");
upgraderA!.innerHTML = upgradeAText;
app.append(upgraderA!);

const upgraderB = document.getElementById("upgradeB");
upgraderB!.innerHTML = upgradeBText;
app.append(upgraderB!);

const upgraderC = document.getElementById("upgradeC");
upgraderC!.innerHTML = upgradeCText;
app.append(upgraderC!);

const countText = document.getElementById("count");
countText!.innerHTML = `😎 0.00 😎`;
app.append(countText!);

const rateText = document.getElementById("growthRate");
rateText!.innerHTML = `0.00 😎/sec`;
app.append(rateText!);

clicker?.addEventListener("click", () => {
  increaseCount(100);
  if (counter >= 10) {
    (upgraderA! as HTMLSelectElement).disabled = false;
  }
});

upgraderA?.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    numA += 1;
    timestamp = performance.now();
    window.requestAnimationFrame(automaticIncrease);
  }
});

upgraderB?.addEventListener("click", () => {
  if (counter >= 100) {
    counter -= 100;
    numB += 1;
  }
});

upgraderC?.addEventListener("click", () => {
  if (counter >= 1000) {
    counter -= 1000;
    numC += 1;
  }
});
