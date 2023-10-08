import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "This is a test game test game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
