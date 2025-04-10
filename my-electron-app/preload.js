// preload.js
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // add any custom APIs if needed
});
