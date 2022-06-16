#!/bin/bash

#mosquitto_sub -p 8883 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_suburb
#mosquitto_sub -p 8883 -u suba -P suba@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_suburb | xargs -d$'\n' -L1 bash -c 'date +"%T.%3N"' >> end_time_subA.txt
mosquitto_sub -p 8883 -u suba -P suba@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_suburb | xargs -d$"\n}\n}" -L1 bash -c 'date +"%T.%3N"' >> end_time_subA.txt


#now=$(date +"%T.%3N")
#echo "Current time : $now" >> end_time_subA.txt