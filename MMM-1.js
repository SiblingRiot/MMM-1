/* global Module */

/* Magic Mirror
 * Module: MMM-1
 *
 * By Sibling Riot
 * MIT Licensed.
 */

Module.register("MMM-1", {
  requiresVersion: "2.1.0",

  start: function() {
    this.message = "";
    this.updateDom();

    this.keyboard = this.createKeyboard();
    this.keyboard.start();
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = this.message;
    return wrapper;
  },

  createKeyboard: function() {
    var keyboard = new Keyboard({
      layoutName: "default",
      inputElement: document.createElement("input"),
      onKeyPress: this.onKeyPress.bind(this),
    });
    return keyboard;
  },

  onKeyPress: function(keyCode, event) {
    if (keyCode === Keyboard.KEY_RETURN) {
      this.saveMessage();
      this.message = "";
    } else if (keyCode === Keyboard.KEY_BACKSPACE) {
      this.message = this.message.slice(0, -1);
    } else {
      this.message += event.key;
    }
    this.updateDom();
  },

  saveMessage: function() {
    var fs = require("fs");
    var path = require("path");
    var message = {
      text: this.message,
      timestamp: new Date(),
    };
    var filePath = path.join("/home/pi/MagicMirror/Connections", "complimentsA.json");
    var data = JSON.parse(fs.readFileSync(filePath));
    data.push(message);
    fs.writeFileSync(filePath, JSON.stringify(data));
  },
});
