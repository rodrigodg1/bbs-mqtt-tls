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


import mqtt = require('mqtt');
import * as fs from 'fs';
const execSync = require('child_process').execSync;

//connect MQTT broker
var client = mqtt.connect("mqtt://127.0.0.1:2020");



import {
  Bls12381G2KeyPair,
  BbsBlsSignature2020,
  BbsBlsSignatureProof2020,
  deriveProof
} from "@mattrglobal/jsonld-signatures-bbs";
import { extendContextLoader, sign, verify, purposes } from "jsonld-signatures";

import inputDocument from "./data/inputDocument.json";
import keyPairOptions from "./data/keyPair.json";
import exampleControllerDoc from "./data/controllerDocument.json";
import bbsContext from "./data/bbs.json";
import revealDocumentReceiverA from "./data/deriveProofReceiverA.json";
import revealDocumentReceiverB from "./data/deriveProofReceiverB.json";
import citizenVocab from "./data/citizenVocab.json";
import credentialContext from "./data/credentialsContext.json";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const documents: any = {
  "did:example:489398593#test": keyPairOptions,
  "did:example:489398593": exampleControllerDoc,
  "https://w3id.org/security/bbs/v1": bbsContext,
  "https://w3id.org/citizenship/v1": citizenVocab,
  "https://www.w3.org/2018/credentials/v1": credentialContext
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const customDocLoader = (url: string): any => {
  const context = documents[url];

  if (context) {
    return {
      contextUrl: null, // this is for a context via a link header
      document: context, // this is the actual document that was loaded
      documentUrl: url // this is the actual context URL after redirects
    };
  }

  console.log(
    `Attempted to remote load context : '${url}', please cache instead`
  );
  throw new Error(
    `Attempted to remote load context : '${url}', please cache instead`
  );
};

//Extended document load that uses local contexts
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const documentLoader: any = extendContextLoader(customDocLoader);

const main = async (): Promise<void> => {
  //Import the example key pair
  const keyPair = await new Bls12381G2KeyPair(keyPairOptions);

  //console.log("Input document");
  //console.log(JSON.stringify(inputDocument, null, 2));

  //Sign the input document
  const signedDocument = await sign(inputDocument, {
    suite: new BbsBlsSignature2020({ key: keyPair }),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader
  });

  //console.log("Input document with proof");
  //console.log(JSON.stringify(signedDocument, null, 2));

  //Verify the proof
  let verified = await verify(signedDocument, {
    suite: new BbsBlsSignature2020(),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader
  });

  //console.log("Verification result");
  //console.log(JSON.stringify(verified, null, 2));


  console.log("\nDERIVED PROOF TO THE TOPIC: Temperature");

  //Derive a proof to receiver A (only Temperature)
  const derivedProofReceiverA = await deriveProof(signedDocument, revealDocumentReceiverA, {
    suite: new BbsBlsSignatureProof2020(),
    documentLoader
  });



  //temp = derivedProofReceiverA.credentialSubject.temperature
  var derived_proof_A_to_file = JSON.stringify(derivedProofReceiverA, null, 2)

  fs.writeFile("temperature.json", derived_proof_A_to_file, function (err) {
    if (err) {
      console.log(err);
    }
  });



  //console.log(derivedProofReceiverA.credentialSubject.temperature)

  //console.log(typeof(derivedProofReceiverA))
  //console.log(JSON.stringify(derivedProofReceiverA, null, 2));

  //Verify the derived proof
  verified = await verify(derivedProofReceiverA, {
    suite: new BbsBlsSignatureProof2020(),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader
  });

  //console.log("Verification result");
  //console.log(JSON.stringify(verified, null, 2));




  console.log("\nDERIVED PROOF TO THE TOPIC: allfields \n");
  //RECEIVER B (all items)
  const derivedProofReceiverB = await deriveProof(signedDocument, revealDocumentReceiverB, {
    suite: new BbsBlsSignatureProof2020(),
    documentLoader
  });

  //console.log(JSON.stringify(derivedProofReceiverB, null, 2));


  var derived_proof_B_to_file = JSON.stringify(derivedProofReceiverB, null, 2)

  fs.writeFile("allfields.json", derived_proof_B_to_file, function (err) {
    if (err) {
      console.log(err);
    }
  });




  //Verify the derived proof
  verified = await verify(derivedProofReceiverB, {
    suite: new BbsBlsSignatureProof2020(),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader
  });

  //console.log("Verification result");
  //console.log(JSON.stringify(verified, null, 2));


};


function publish() {


  // publish the temperature proof
  fs.readFile('temperature.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    client.publish('Temperature', data,{qos: 1, retain: true})


  });

  // publish the allfields proof
  fs.readFile('allfields.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    client.publish('allfields', data,{qos: 1, retain: true})
    client.end()








  })

}


main();
publish();


