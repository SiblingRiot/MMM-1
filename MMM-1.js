/* global Module */

/* Magic Mirror
 * Module: MMM-1
 *
 * By Sibling Riot
 * MIT Licensed.
 */

Module.register('MMM-1', {
  defaults: {
    jsonFilePath: '/home/pi/MagicMirror/Connections/complimentsA.json',
    messageType: 'anytime'
  },

  start: function () {
    Log.info('MMM-Compliment-Sender started');
    this.sendSocketNotification('LOAD_JSON_DATA', {...this.defaults});
  },

  getDom: function() {
    var self = this;
    var wrapper = document.createElement("div");
    wrapper.innerHTML = "Type a message:";

    var keyboard = document.createElement("div");
    keyboard.setAttribute("class", "keyboard");
    keyboard.innerHTML = "<div class='keys'></div>";
    wrapper.appendChild(keyboard);

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "messageInput");
    input.setAttribute("maxlength", "50");
    input.setAttribute("placeholder", "Type your message here");
    keyboard.insertBefore(input, keyboard.firstChild);

    input.addEventListener("focus", function() {
      self.sendNotification("KEYBOARD_SHOW");
    });

    input.addEventListener("blur", function() {
      self.sendNotification("KEYBOARD_HIDE");
    });

    this.sendNotification("KEYBOARD_REGISTER", {
      inputElement: input,
      keyboardElement: keyboard.querySelector(".keys")
    });

    var button = document.createElement("button");
    button.innerHTML = "Send";
    button.addEventListener("click", () => {
      var message = input.value.trim();
      if (message.length > 0) {
        this.sendSocketNotification('SAVE_MESSAGE', { ...this.defaults, type: this.config.messageType, message: message });
        input.value = '';
      }
    });
    wrapper.appendChild(button);
    return wrapper;
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'SAVE_MESSAGE') {
      // do something with the loaded JSON data if needed
      const fs = require('fs');
      fs.readFile("complimentsA.json", (err, data) => {  // READ
        if (err) {
          return console.error(err);
      };

      var data = JSON.parse(data.toString());
      data.age = "23"; // MODIFY
      var writeData = fs.writeFile("complimentsA.json", JSON.stringify(data), (err, result) => {  // WRITE
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
