/* global Module */

/* Magic Mirror
 * Module: MMM-1
 *
 * By Sibling Riot
 * MIT Licensed.
 */

Module.register("my-module", {
  // Default module config.
  defaults: {
    jsonFilePath: "/home/pi/MagicMirror/Connections/complimentsA.json",
    messageType: 'anytime'
  },

  start: function () {
    // Load the MMM-Keyboard module.
    this.keyboard = MM.getModule("MMM-Keyboard");
    Log.info('MMM-Keyboard started!');
    this.sendSocketNotification('LOAD_JSON_DATA', {...this.defaults});
  },
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
});
