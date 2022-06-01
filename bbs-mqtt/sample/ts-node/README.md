# jsonld-signatures-bbs

The publisher sends two different proofs to the Topics:

Temperature: Only the derived proof with temperature;

Allfields: The derived proof containing all the data;


Start the broker using the command:

```
mosquitto -p 2020
```

Run the subscribers in ``` sample/ts-node  ``` directory:

```
node subscriberA.js
```
in other terminal:
```
node subscriberB.js
```

To generate the derived proofs run the publisher code in ```sample/ts-node``` directory:

```
yarn install --frozen-lockfile
yarn publisher
```







