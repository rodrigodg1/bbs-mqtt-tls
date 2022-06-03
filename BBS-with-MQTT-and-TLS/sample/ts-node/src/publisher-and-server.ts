/*
 * Copyright 2020 - MATTR Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { readFileSync } from "fs";
const fs = require("fs");
const mqtt = require("mqtt");
const execSync = require("child_process").execSync;

import {
  generateBls12381G2KeyPair,
  blsSign,
  blsVerify,
  blsCreateProof,
  blsVerifyProof,
} from "@mattrglobal/bbs-signatures";
import { exit } from "process";

const main = async () => {
  //Generate a new key pair

  const keyPair = await generateBls12381G2KeyPair();

  console.log("Key pair generated");
  //console.log(`Public key base64 = ${Buffer.from(keyPair.publicKey).toString("base64")}`);

  //document sent by publisher and will be received by server
  let jsonInputDocument = require("../inputDocument.json");

  const temperature = jsonInputDocument.Data.Temperature;
  const suburb = jsonInputDocument.Data.Suburb;
  const latitude = jsonInputDocument.Data.GPS_Lat;
  const longitude = jsonInputDocument.Data.GPS_Long;

  //Set of messages we wish to sign
  const messages = [
    Uint8Array.from(Buffer.from(temperature.toString(), "utf8")),
    Uint8Array.from(Buffer.from(suburb.toString(), "utf8")),
    Uint8Array.from(Buffer.from(latitude.toString(), "utf8")),
    Uint8Array.from(Buffer.from(longitude.toString(), "utf8")),
  ];

  //console.log("Signing a message set of " + messages);

  //publisher creates the signature. The signature and the inputDocument will be send to the server.
  const signature = await blsSign({
    keyPair,
    messages: messages,
  });

  //console.log(`Output signature base64 = ${Buffer.from(signature).toString("base64")}`);

  //Server and subscribers can verify the signature.
  const isVerified = await blsVerify({
    publicKey: keyPair.publicKey,
    messages: messages,
    signature,
  });

  //Derive a proof from the signature revealing temperature and suburb
  //Note: this is a piece of software executed by server
  const proof_temp_suburb = await blsCreateProof({
    signature,
    publicKey: keyPair.publicKey,
    messages,
    nonce: Uint8Array.from(Buffer.from("nonce", "utf8")),
    revealed: [0, 1], //temperature and suburb position
  });

  /*Verify the created proof
  The proof is created containing the messages selected to be shared. In this implementation, messages are not shown inside the proof.
 
  To be able to consult the messages, it is necessary to pass the indices of the same through the verify function:
  If the message is allowed, the check function returns true.
  */
  const isProofVerified_temp_suburb = await blsVerifyProof({
    proof: proof_temp_suburb,
    publicKey: keyPair.publicKey,
    messages: messages.slice(0, 2), // temperature and suburb (note the message position here)
    nonce: Uint8Array.from(Buffer.from("nonce", "utf8")),
  });

  var client = mqtt.connect("mqtt://127.0.0.1:2020");
  const { exec } = require("child_process");

  //sends the data to the subscriber A
  if (isProofVerified_temp_suburb.verified == true) {
    var temp_suburb = { Temperature: temperature, Suburb: suburb };
    var temp_with_suburb_string = JSON.stringify(temp_suburb);

    fs.writeFile("temp_with_suburb.json", temp_with_suburb_string, (err) => {
      if (err) {
        console.error(err);
      }
      const output = execSync(
        "sudo mosquitto_pub -p 8883 -u publisher -P pub --cafile certs/ca/ca.crt --cert certs/client/client.crt --key certs/client/client.key -h localhost -f temp_with_suburb.json -t temp_with_suburb",
        { encoding: "utf-8" }
      ); // the default is 'buffer'
    });
  }

  //Derive a proof from the signature revealing all the items
  const proof_all_items = await blsCreateProof({
    signature,
    publicKey: keyPair.publicKey,
    messages,
    nonce: Uint8Array.from(Buffer.from("nonce", "utf8")),
    revealed: [0, 1, 2, 3], //temperature and suburb position
  });

  //console.log(`Output proof_B base64 = ${Buffer.from(proof_all_items).toString("base64")}`);

  const isProofVerified_temp_with_gps = await blsVerifyProof({
    proof: proof_all_items,
    publicKey: keyPair.publicKey,
    messages: messages.slice(0, 4), // temperature lat_gps, long_gps and suburb
    nonce: Uint8Array.from(Buffer.from("nonce", "utf8")),
  });

  //sends the data to the subscriber B
  if (isProofVerified_temp_with_gps.verified == true) {
    var temp_with_gps = {
      Temperature: temperature,
      Lat_GPS: latitude,
      Long_GPS: longitude,
      Suburb: suburb,
    };
    var temp_with_gps_json = JSON.stringify(temp_with_gps);

    fs.writeFile("temp_with_gps.json", temp_with_gps_json, (err) => {
      if (err) {
        console.error(err);
      }
      const output = execSync(
        "sudo mosquitto_pub -p 8883 -u publisher -P pub --cafile certs/ca/ca.crt --cert certs/client/client.crt --key certs/client/client.key -h localhost -f temp_with_gps.json -t temp_with_gps",
        { encoding: "utf-8" }
      ); // the default is 'buffer'
    });

    console.log("Published !");
    //exit();
  }
};

main();
