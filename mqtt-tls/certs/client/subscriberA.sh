#!/bin/bash

mosquitto_sub -p 8883 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temperature
