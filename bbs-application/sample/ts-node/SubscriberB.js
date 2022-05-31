const mqtt = require("mqtt");

//broker server
var client = mqtt.connect("mqtt://127.0.0.1:2020");



client.on("connect",function()

{
    //Topic
    client.subscribe("allfields");

    console.log("Client subscribed ");

});



client.on("message",function(topic, message){

    console.log(message.toString());

});