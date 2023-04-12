/* global Module */

/* Magic Mirror
 * Module: MMM-1
 *
 * By Sibling Riot
 * MIT Licensed.
 */

Module.register("MMM-1", {
  defaults: {
    jsonFilePath: '/home/pi/MagicMirror/Connections/complimentsA.json',
    messageType: 'anytime'
  },

  start: function() {
    Log.info('MMM-1 started');
    this.sendSocketNotification('LOAD_JSON_DATA', {...this.defaults});
  },
  
  getDom: function() {
    var button = document.createElement("button");
    button.innerHTML = "Send";
    button.addEventListener("click", () => {
      var message = input.value.trim();
      if (message.length > 0 {
        this.sendSocketNotification('SAVE_MESSAGE', { ...this.defaults, type: this.config.messageType, message: message });
        input.value = '';
      }
    });
    
    wrapper.appendChild(button);
    return.wrapper;
  
  },
  
  socketNotificationReceived: function (notification, payload) {
    if (notification === 'SAVE_MESSAGE') {
      const fs = require('fs');
      fs.readFile("complimentsA.json", (err, data) => {
        if (err) {
          return console.error(err);
        };
      
    }
  },

  writeJsonToFile: function(json) {
    // Write the JSON object to the file specified in the configuration
  },

  readJsonFromFile: function() {
    // Read the JSON object from the file specified in the configuration
  },

  keyboardInputHandler: function(input) {
    // Handle the input from the keyboard
  }
});
