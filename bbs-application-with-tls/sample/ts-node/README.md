# jsonld-signatures-bbs-MQTT-TLS

The publisher sends two different proofs to the Topics:

Temperature: Only the derived proof with temperature;

Allfields: The derived proof containing all the data;

To generate the derived proofs run the publisher code:

```
yarn install --frozen-lockfile
yarn publisher
```

to run the clients/subscribers:

```
cd certs/client/

chmod +x subscriberA.sh 

chmod +x subscriberB.sh 

./subscriberA


```
in other terminal:

```
./subscriberB
```
