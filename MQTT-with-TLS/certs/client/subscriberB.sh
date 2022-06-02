#!/bin/bash

#mosquitto_sub -p 8883 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_gps
mosquitto_sub -p 8883 -u subb -P subb@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_gps