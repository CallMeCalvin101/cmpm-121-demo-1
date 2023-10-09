import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "This is a test game test game";
const clickerText = "Click ME 😎";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const clicker = document.getElementById("clicker");
clicker!.innerHTML = clickerText;
app.append(clicker!);