import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName: string = "😎 Game";
const clickerText: string = "😎";
const upgradeAText: string = "😎 Toothpicker [10😎 --> 0.1 😎/sec]";
const upgradeBText: string = "😎 Pickaxe [100😎 --> 2 😎/sec]";
const upgradeCText: string = "😎 Driller [1000😎 --> 50 😎/sec]";

let counter: number = 0;
let timestamp: number = 0;
let numA: number = 0;
let numB: number = 0;
let numC: number = 0;
let costA: number = 10;
let costB: number = 100;
let costC: number = 1000;

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

/*
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);*/

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
  if (counter >= costA) {
    counter -= 10;
    numA += 1;
    costA *= 1.15;
    upgraderA!.innerHTML = `😎 Toothpicker [${costA.toFixed(
      2,
    )}😎 --> 0.1 😎/sec]`;

    timestamp = performance.now();
    window.requestAnimationFrame(automaticIncrease);
  }
});

upgraderB?.addEventListener("click", () => {
  if (counter >= costB) {
    counter -= 100;
    numB += 1;
    costB *= 1.15;
    upgraderB!.innerHTML = `😎 Pickaxe [${costB.toFixed(2)}😎 --> 2 😎/sec]`;
  }
});

upgraderC?.addEventListener("click", () => {
  if (counter >= costC) {
    counter -= 1000;
    numC += 1;
    costC *= 1.15;
    upgraderC!.innerHTML = `😎 Driller [${costC.toFixed(2)}😎 --> 50 😎/sec]`;
  }
});
