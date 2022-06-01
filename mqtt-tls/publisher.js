

/*
Mosquitto Server Port : 8883
*/




const mqtt = require('mqtt')
const fs = require('fs');
const execSync = require('child_process').execSync;



function publish(){


    fs.readFile('inputDocument.json', 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          return;
      }

      //exec publish
      const output = execSync('mosquitto_pub -p 8883 --cafile certs/ca/ca.crt --cert client.crt --key client.key -h localhost -f inputDocument.json -t temperature', { encoding: 'utf-8' });  // the default is 'buffer'


  });

  fs.readFile('inputDocument.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    
    //exec publish
    const output = execSync('mosquitto_pub -p 8883 --cafile certs/ca/ca.crt --cert client.crt --key client.key -h localhost -f inputDocument.json -t allfields', { encoding: 'utf-8' });  // the default is 'buffer'








})

}


publish();

