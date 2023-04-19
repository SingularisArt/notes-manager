import { contextBridge, ipcRenderer } from "electron";

let sendSubmit = (lead: string) => {
  console.log(lead);
  console.log("Renderer Processes > sendSubmit");

  ipcRenderer.send("send", lead);
};

let indexBridge = {
  sendSubmit: sendSubmit,
};

contextBridge.exposeInMainWorld("indexBridge", indexBridge);
