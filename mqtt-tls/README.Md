# MQTT-TLS

MQTT with TLS implementation without BBS+

### Instructions

To start mosquitto server, run:

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