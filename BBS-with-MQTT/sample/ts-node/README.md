# BBS signatures with MQTT without TLS

The publisher sends a document (inputDocument) to the server with the following items:

- "Temperature",
- "GPS_Lat"
- "GPS_Long"
- "Suburb"

The server creates a two diferent versions in topics:

- Topic 1: temp_with_suburb
- Topic 2: temp_with_gps

Subscriber A only receive Topic 1 with temperature and Suburb information.

Subscriber B receive the Topic 2 with all informations (i.e., temperature, GPS_Lat, GPS_Long, and Suburb)

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
