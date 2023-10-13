import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName: string = "😎 Game";
const clickerText: string = "😎";
const clickAmount: number = 100;
const second: number = 1000;

let isAutoStarted: boolean = false;
let counter: number = 0;
let timestamp: number = 0;

interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
}

const availableItems: Item[] = [
  { name: "Person", cost: 10, rate: 0.1, count: 0 },
  { name: "Worker", cost: 100, rate: 2, count: 0 },
  { name: "Grinder", cost: 1000, rate: 50, count: 0 },
];

function increaseCount(n: number) {
  counter += n;
  countText!.innerHTML = `😎 ${counter.toFixed(2)} 😎`;
  rateText!.innerHTML = `${calculateGrowthRate().toFixed(2)} 😎/sec`;
}

function automaticIncrease() {
  const timePassed: number = performance.now() - timestamp;
  increaseCount(calculateGrowthRate() * (timePassed / second));
  timestamp = performance.now();
  checkAllUpgrades();
  window.requestAnimationFrame(automaticIncrease);
}

function calculateGrowthRate(): number {
  let result: number = 0;
  availableItems.forEach((element) => (result += element.rate * element.count));
  return result;
}

function clickUpgrade(type: number) {
  const growthRate: number = 1.15;
  if (counter >= availableItems[type].cost) {
    counter -= availableItems[type].cost;
    availableItems[type].count += 1;
    availableItems[type].cost *= growthRate;
    updateUpgradeText(type);
    checkUpgradeState(type);
  }

  if (!isAutoStarted) {
    startAutoClicker();
  }
}

function updateUpgradeText(type: number) {
  const templateText: string = `😎 ${
    availableItems[type].name
  } [${availableItems[type].cost.toFixed(2)}😎 --> ${availableItems[
    type
  ].rate.toFixed(2)} 😎/sec]`;
  switch (type) {
    case 0:
      upgraderA!.innerHTML = templateText;
      break;
    case 1:
      upgraderB!.innerHTML = templateText;
      break;
    case 2:
      upgraderC!.innerHTML = templateText;
      break;
  }
}

function checkUpgradeState(type: number) {
  const isNotActive: boolean = counter < availableItems[type].cost;
  switch (type) {
    case 0:
      (upgraderA! as HTMLSelectElement).disabled = isNotActive;
      break;
    case 1:
      (upgraderB! as HTMLSelectElement).disabled = isNotActive;
      break;
    case 2:
      (upgraderC! as HTMLSelectElement).disabled = isNotActive;
      break;
  }
}

function checkAllUpgrades() {
  for (let i: number = 0; i < availableItems.length; i++) {
    checkUpgradeState(i);
  }
}

function startAutoClicker() {
  timestamp = performance.now();
  window.requestAnimationFrame(automaticIncrease);
  isAutoStarted = true;
}

document.title = gameName;

const clicker: HTMLElement | null = document.getElementById("clicker");
clicker!.innerHTML = clickerText;
app.append(clicker!);

app.append(document.createElement("br"));

const upgraderA: HTMLElement | null = document.getElementById("upgradeA");
updateUpgradeText(0);
app.append(upgraderA!);

const upgraderB: HTMLElement | null = document.getElementById("upgradeB");
updateUpgradeText(1);
app.append(upgraderB!);

const upgraderC: HTMLElement | null = document.getElementById("upgradeC");
updateUpgradeText(2);
app.append(upgraderC!);

const countText: HTMLElement | null = document.getElementById("count");
countText!.innerHTML = `😎 0.00 😎`;
app.append(countText!);

const rateText: HTMLElement | null = document.getElementById("growthRate");
rateText!.innerHTML = `0.00 😎/sec`;
app.append(rateText!);

clicker?.addEventListener("click", () => {
  increaseCount(clickAmount);
  checkAllUpgrades();
});

upgraderA?.addEventListener("click", () => {
  clickUpgrade(0);
});

upgraderB?.addEventListener("click", () => {
  clickUpgrade(1);
});

upgraderC?.addEventListener("click", () => {
  clickUpgrade(2);
});
