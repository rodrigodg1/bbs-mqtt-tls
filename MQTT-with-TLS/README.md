# MQTT-TLS

MQTT with TLS implementation without BBS+

### Requirements

- Mosquitto

- Nodejs

- MQTT

## Instructions

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

change the path in `server-config.conf`

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
npm run publisher
```

Access control list

```
cat server/aclfile.acl
```

usernames and passwords are already established in the connections and publisher code:

```
cat certs/client/subscriberA.sh
```

and

```
cat certs/client/subscriberB.sh
```
