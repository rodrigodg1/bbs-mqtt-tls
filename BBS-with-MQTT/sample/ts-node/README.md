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

in one terminal, run the first subscriber:

```
node subscriberA.js
```

in other terminal, run the second subscriber:

```
node subscriberB.js
```

to run the publisher and server software:

```
yarn publisher-and-server
```
