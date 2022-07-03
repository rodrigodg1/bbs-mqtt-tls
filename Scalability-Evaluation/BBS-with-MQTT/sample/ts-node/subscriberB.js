const mqtt = require("mqtt");

//broker server information
var client = mqtt.connect("mqtt://127.0.0.1:2020");

client.on("connect", function () {
  //Topic
  client.subscribe("temp_with_gps");

  console.log("Client subscribed ");
});

client.on("message", function (topic, message) {
  console.log(message.toString());
});
