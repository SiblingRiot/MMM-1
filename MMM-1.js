/* global Module */

/* Magic Mirror
 * Module: MMM-1
 *
 * By Sibling Riot
 * MIT Licensed.
 */

Module.register("MMM-1", {
  // Default module config.
  defaults: {
    file: "/home/pi/MagicMirror/Connections/complimentsA.json",
  },

  start: function () {
    // Load the MMM-Keyboard module.
    this.keyboard = MM.getModule("MMM-Keyboard");

    // Add a keyboard input listener.
    this.keyboard.on("input", (value) => {
      // Append the input value to the file.
      const fs = require("fs");
      const path = require("path");
      const filePath = path.resolve(__dirname, this.config.file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      data.push(value);
      fs.writeFileSync(filePath, JSON.stringify(data));
    });
  },

  // Override the getDom method to display the module content.
  getDom: function () {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = "My Module";
    return wrapper;
  },
  
  socketNotificationReceived: function (notification, payload) {
    if (notification === 'SAVE_MESSAGE') {
      // do something with the loaded JSON data if needed
      const fs = require('fs');
      fs.readFile("complimentsB.json", (err, data) => {  // READ
        if (err) {
          return console.error(err);
      };

      var data = JSON.parse(data.toString());
      data.age = "23"; // MODIFY
      var writeData = fs.writeFile("complimentsB.json", JSON.stringify(data), (err, result) => {  // WRITE
          if (err) {
              return console.error(err);
          } else {
              console.log(result);
              console.log("Success");
          }
      });
  });
      }
    }
});
