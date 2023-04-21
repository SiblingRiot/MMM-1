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
    jsonFilePath: "/home/pi/MagicMirror/Connections/complimentsA.json"
  },

  // Define start function.
  start: function() {
    this.sendNotification("SHOW_ALERT", {title: "MMM-1", message: "Ready to write!"});
    this.jsonFile = require(this.config.jsonFilePath);
  },

  // Define getScripts function.
  getScripts: function() {
    return ["MMM-Keyboard.js"];
  },

  // Define getStyles function.
  getStyles: function() {
    return [];
  },

  // Define notificationReceived function.
  notificationReceived: function(notification, payload, sender) {
    if (notification === "KEYPRESS") {
      if (payload === "ENTER") {
        // Get the message from the 'MMM-Keyboard' module.
        var message = this.getTypedMessage();
        // Save the message to the local JSON file.
        this.saveMessage(message);
        // Show an alert to indicate that the message has been saved.
        this.sendNotification("SHOW_ALERT", {title: "MMM-1", message: "Message saved!"});
      }
    }
  },

  // Define getTypedMessage function.
  getTypedMessage: function() {
    var inputField = document.getElementById("MMM-Keyboard-input");
    return inputField.value.trim();
  },

  // Define saveMessage function.
  saveMessage: function(message) {
    // Append the message to the existing list of messages in the local JSON file.
    this.jsonFile.anytime.push(message);
    // Write the updated list of messages to the local JSON file.
    var fs = require("fs");
    fs.writeFileSync(this.config.jsonFilePath, JSON.stringify(this.jsonFile));
  }

});
