# bbs-signatures-sample

To use this package within your project simply run

```
npm install @mattrglobal/bbs-signatures
```

Or with [Yarn](https://yarnpkg.com/)

```
yarn add @mattrglobal/bbs-signatures
```

Install MQTT:
```
npm install mqtt --save
```

Install mosquitto:
```
sudo apt-get install mosquitto
sudo apt-get install mosquitto-clients
```

To start mosquitto server,

```
cd /server
```
Run:

```
mosquitto -c server-config.conf
```

To run the subscribers: 


```
cd certs/client/

```

Permission:

```
chmod +x subscriberA.sh
chmod +x subscriberB.sh

```
in one terminal, run the first subscriber:
```
./subscriberA.sh
```

in other terminal, run the second subscriber:
```
./subscriberB.sh
```

to run the publisher:

```
yarn publisher-and-subscriber
```

