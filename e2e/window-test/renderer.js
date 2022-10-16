const { ipcRenderer } = require("electron");

const close = document.getElementById("exit");
close.onclick = () => {
  ipcRenderer.send("main", "quit");
};
