[![MATTR](./docs/assets/mattr-logo-square.svg)](https://github.com/mattrglobal)

# jsonld-signatures-bbs-MQTT-TLS

The following repository contains a [linked data proof](https://w3c-ccg.github.io/ld-proofs/) implementation for creating [BBS+ Signatures](https://github.com/mattrglobal/bbs-signatures-spec)
using [BLS12-381](https://tools.ietf.org/id/draft-yonezawa-pairing-friendly-curves-00.html#rfc.section.2.4) key pairs.

Due to the properties of a [BBS+ Signatures](https://github.com/mattrglobal/bbs-signatures-spec), [zero knowledge proof](https://en.wikipedia.org/wiki/Zero-knowledge_proof) can be derived from the signature, where-by the party generating the proof can elect to selectively disclose statements from the originally signed payload.

This library is runnable in browser and Node.js through the [WASM](https://webassembly.org/) based crypto implementation provided by [bbs-signatures](https://github.com/mattrglobal/bbs-signatures). Note [bbs-signatures](https://github.com/mattrglobal/bbs-signatures) also has an optional dependency on [node-bbs-signatures](https://github.com/mattrglobal/node-bbs-signatures) which can be used when running in [Node.JS](https://nodejs.org/en/) environments to obtain better performance. For environments that do not feature [WASM](https://webassembly.org/) support such as [react native](https://reactnative.dev/), [bbs-signatures](https://github.com/mattrglobal/bbs-signatures) includes an automatic roll back to an [asm.js](http://asmjs.org/) version but note however the performance difference between [asm.js](http://asmjs.org/) and [WASM](https://webassembly.org/) is significant, for those inclined there are runnable benchmarks in [bbs-signatures](https://github.com/mattrglobal/bbs-signatures).

## Getting started

To use this package within your project simply run

```
npm install @mattrglobal/jsonld-signatures-bbs
```

Or with [Yarn](https://yarnpkg.com/)

```
yarn add @mattrglobal/jsonld-signatures-bbs
```

To install mosquitto simply run:
```
sudo apt-get install mosquitto
sudo apt-get install mosquitto-clients
```

Configuration files:
Run mosquito server with the config file (```server-config.conf```):
```
listener 8883
allow_anonymous true

cafile /home/vm/bbs-application-with-tls/sample/ts-node/certs/ca/ca.crt

certfile /home/vm/bbs-application-with-tls/sample/ts-node/certs/broker/broker.crt

keyfile /home/vm/bbs-application-with-tls/sample/ts-node/certs/broker/broker.key

require_certificate true
```
run using the command:

```
mosquitto -c server-config.conf
```


Run the subscribers:

```
cd sample/ts-node/certs/client/
./subscriberA.sh
```
in other terminal:
```
cd sample/ts-node/certs/client/
./subscriberB.sh
```

Run the publish client:

```
yarn publisher
```



## Sample

See the [sample](./sample) directory for a runnable demo.

## Examples

The following is an example of a signed JSON-LD document featuring a `BbsBlsSignature2020` type signature.

Run this example using ```yarn demo ``` in ```sample/ts-node``` directory :

```console
cd sample/ts-node/
yarn install --frozen-lockfile
yarn publisher
```
Input document created by **Data Sender** 

Path: (sample/ts-node/src/data/inputDocument.json) :


```json
{
 
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/citizenship/v1",
    "https://w3id.org/security/bbs/v1"
  ],
  "id": "https://issuer.oidp.uscis.gov/credentials/83627465",
  "type": ["VerifiableCredential", "AnyUseCaseCard"],
  "issuer": "did:example:489398593",
  "identifier": "83627465",
  "name": "Any Use Case Card",
  "description": "Example of Any Use Case Card.",
  "issuanceDate": "2019-12-03T12:19:52Z",
  "expirationDate": "2029-12-03T12:19:52Z",
  "credentialSubject": {
    "id": "did:example:b34ca6cd37bbf23",
    "type": ["AnyUseCase", "Person"],
    "location": "office",
    "temperature": "82",
    "occupancy": "true"

  }
}
```



**For Receiver A**: Whereby a zero knowledge proof disclosing only `temperature` can be derived, from the above assertion using the following as the reveal document
which is a [JSON-LD frame](https://www.w3.org/TR/json-ld11-framing/).


Path: (sample/ts-node/src/data/deriveProofReceiverA.json) :

```json
{

 "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/citizenship/v1",
    "https://w3id.org/security/bbs/v1"
  ],
  "type": ["VerifiableCredential", "AnyUseCaseCard"],
  "credentialSubject": {
    "@explicit": true,
    "type": ["AnyUseCase", "Person"],
    "temperature": {}
  }
}
```

That gives rise to the output zero knowledge proof to RECEIVER A

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/citizenship/v1",
    "https://w3id.org/security/bbs/v1"
  ],
  "id": "https://issuer.oidp.uscis.gov/credentials/83627465",
  "type": [
    "AnyUseCaseCard",
    "VerifiableCredential"
  ],
  "description": "Example of Any Use Case Card.",
  "identifier": "83627465",
  "name": "Any Use Case Card",
  "credentialSubject": {
    "id": "did:example:b34ca6cd37bbf23",
    "type": [
      "Person",
      "AnyUseCase"
    ],
    "temperature": "82"
  },
  "expirationDate": "2029-12-03T12:19:52Z",
  "issuanceDate": "2019-12-03T12:19:52Z",
  "issuer": "did:example:489398593",
  "proof": {
    "type": "BbsBlsSignatureProof2020",
    "created": "2022-05-14T19:39:09Z",
    "nonce": "Wmhysi2eMwZp/5lm5rnCnZoMpkg7bxv5O3uxkwaZe3T6T22JG1xcysRx4dpw1WmQX5E=",
    "proofPurpose": "assertionMethod",
    "proofValue": "ABID/8+g+msu6QkBqYcI/OiWCZTqdWzMKZlkVUJbOHPsdSy49kvVAULrtkSnwTtCl0UUcAerFky/THq2A2iygZDroV5sdaZsiRaFaAWfJ6jKkoX3/9tEsG2nFjcVOqhS5OkxoGuZgsotchxgMFHeEQQAM4nUNNx853PeVO2GPZqfwA4BKDQA0CVTdUBAourwvuqg1y8AAAB0gxv6N8Otu2XF10zxrc4oFTJV/0+BAzBm2x/3qIiGkX6oMbw2uFOW0NkM8DO9vfMfAAAAAmKbtQUd8njmofMJjGPumUfqacjjhmVCiywsBM1f6fXePKhlFIZkNnKN8L3ZUqkzIwbipM+DJW7w87F2pB9KKGWNP9zz+YA7sVcMU0t7fifjE0J8bv64bsgMKP4F8aSYFzSQ166VkrBWFfgQuJBvj88AAAAEIO2mlK+5oG913R+L/ygylSukIn//GUJhWOtobcpdXogEcJrImzdZLRNGNVDHAdUSopXHOFiZ31dcqxH0fUhaRxFnYmonaWVSd4hDTs5MFt2Zlpok/nDKVjzVWt0TYTpCGNsOCc6KkSnMqdVvtXAoAEfYaBVMw/88LJ3amRiegJY=",
    "verificationMethod": "did:example:489398593#test"
  }

}
```



**For Receiver B**: Whereby a zero knowledge proof disclosing `location`, `occupancy` and `temperature` can be derived, from the above assertion using the following as the reveal document
which is a [JSON-LD frame](https://www.w3.org/TR/json-ld11-framing/).


Path: (sample/ts-node/src/data/deriveProofReceiverB.json) :


```json
{
  
"@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/citizenship/v1",
    "https://w3id.org/security/bbs/v1"
  ],
  "type": ["VerifiableCredential", "AnyUseCaseCard"],
  "credentialSubject": {
    "@explicit": true,
    "type": ["AnyUseCase", "Person"],
    "temperature": {},
    "location": {},
    "occupancy": {}
  }
}
```



That gives rise to the output zero knowledge proof to RECEIVER B

```json
{

  {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/citizenship/v1",
    "https://w3id.org/security/bbs/v1"
  ],
  "id": "https://issuer.oidp.uscis.gov/credentials/83627465",
  "type": [
    "AnyUseCaseCard",
    "VerifiableCredential"
  ],
  "description": "Example of Any Use Case Card.",
  "identifier": "83627465",
  "name": "Any Use Case Card",
  "credentialSubject": {
    "id": "did:example:b34ca6cd37bbf23",
    "type": [
      "Person",
      "AnyUseCase"
    ],
    "location": "office",
    "occupancy": "true",
    "temperature": "82"
  },
  "expirationDate": "2029-12-03T12:19:52Z",
  "issuanceDate": "2019-12-03T12:19:52Z",
  "issuer": "did:example:489398593",
  "proof": {
    "type": "BbsBlsSignatureProof2020",
    "created": "2022-05-14T19:39:09Z",
    "nonce": "znXYpl9AtdDKUS7nrbS9sdWF/ndJ7gX8KquvrE/gB0U9OfT7jM3DpaGcLIJ5CKafpx0=",
    "proofPurpose": "assertionMethod",
    "proofValue": "ABID//+Ze7BWxUJBYJcCOV3ZCGPjibowIqoNmz6ZqM1YqmELxTnBHsc1a4kTrQQTLfWrkrul8oElbBrkq5fZHHTwOnoGTy1jxA0GRDOVRLdBxGsrP0mhy7tgbXJUn1KY7b3CVByNOBt6GfVb93Mr9f5+Ki/5cwrm7YuXG236401Cu3h6t9F/CSJo8FzC9TfMs9yFz8QAAAB0k//2dBs6eQgAfnh/tME3Z8kOoUgqWG22JcdNqUdLQZWozRz6m0GZyC2JtO364H7VAAAAAiapVBYT7zm2mPjYnMLd9nPRcVHjiLn8Ysvvb35oyTR5KVEd9g4KQ1JDZZlK9/bv0L9UZfywg+AGN2Rxl477RjSsP2kDIASUyFxvVCHsxZ/rOB5bC+TCWFq0299zrGi58v4js6KyORIa0/GUdvCqx8MAAAACGNaaAP1fFAgaFycl4VGPXWrEurkIMEZaI3Irkq0qk0FXQsVEVj9vBS86rZy3mUluaSVc0K18NknMySkRLEOWjw==",
    "verificationMethod": "did:example:489398593#test"
  }
}

}
```



