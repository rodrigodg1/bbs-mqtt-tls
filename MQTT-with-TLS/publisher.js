

/*
Mosquitto Server Port : 8883
*/

const mqtt = require('mqtt')
const fs = require('fs');
const execSync = require('child_process').execSync;



function publish() {

    //var startTime_subA = performance.now()
    var startTime_subA = new Date().toISOString()

    fs.readFile('input_Temp_with_Suburb.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        //exec publish subA
        const output = execSync('mosquitto_pub -p 8883 -u publisher -P pub --cafile certs/ca/ca.crt --cert client.crt --key client.key -h localhost -f input_Temp_with_Suburb.json -t temp_with_suburb', { encoding: 'utf-8' });  // the default is 'buffer'

        fs.appendFile('start_time_subA.txt', String(startTime_subA), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        fs.appendFile('start_time_subA.txt', "\n", function (err) {
            if (err) throw err;
            console.log('Saved!');
        });



    });


    //var startTime_subB = performance.now()
    var startTime_subB = new Date().toISOString();

    fs.readFile('input_Temp_with_GPS.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        //exec publish
        //const output = execSync('mosquitto_pub -p 8883 -u publisher -P pub --cafile certs/ca/ca.crt --cert client.crt --key client.key -h localhost -f input_Temp_with_GPS.json -t temp_with_gps', { encoding: 'utf-8' });  // the default is 'buffer'

        const output = execSync('mosquitto_pub -p 8883 -u publisher -P pub --cafile certs/ca/ca.crt --cert client.crt --key client.key -h localhost -f input_Temp_with_GPS.json -t temp_with_gps', { encoding: 'utf-8' });  // the default is 'buffer'
        fs.appendFile('start_time_subB.txt', String(startTime_subB), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });

        fs.appendFile('start_time_subB.txt', "\n", function (err) {
            if (err) throw err;
            console.log('Saved!');
        });









    })

}



publish();

