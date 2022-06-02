#!/bin/bash

mosquitto_sub -p 8883 -u suba -P suba@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_suburb
