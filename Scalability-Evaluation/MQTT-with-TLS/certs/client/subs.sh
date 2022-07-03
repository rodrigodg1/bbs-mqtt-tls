#!/bin/bash









for i in {0..7}
do
 mosquitto_sub -p 8883 -u suba -P suba@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_suburb | xargs -d$"\n}\n}" -L1 bash -c 'date +"%T.%3N"' >> end_time_subA$i.txt &

 mosquitto_sub -p 8883 -u subb -P subb@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_gps | xargs -d$"\n}\n}" -L1 bash -c 'date +"%T.%3N"' >> end_time_subB$i.txt &

done






#mosquitto_sub -p 8883 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_suburb
#mosquitto_sub -p 8883 -u suba -P suba@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_suburb | xargs -d$'\n' -L1 bash -c 'date +"%T.%3N"' >> end_time_subA.txt
#with debug
#mosquitto_sub -p 8883 -u suba -P suba@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_suburb -d


#now=$(date +"%T.%3N")
#echo "Current time : $now" >> end_time_subA.txt