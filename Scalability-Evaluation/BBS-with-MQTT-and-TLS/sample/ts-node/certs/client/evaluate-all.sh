#!/bin/bash



cd /home/rodrigo/Downloads/bbs-mqtt-tls/Scalability-Evaluation/BBS-with-MQTT-and-TLS/sample/ts-node
./delete-evaluations.sh 




#for i in {1..2}
#do
#mosquitto_sub -p 8883 -u suba -P suba@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_suburb | xargs -d$"\n}\n}" -L1 bash -c 'date +"%T.%3N"' >> 2subs/2_subs_time_subA$i.csv &

#mosquitto_sub -p 8883 -u subb -P subb@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_gps | xargs -d$"\n}\n}" -L1 bash -c 'date +"%T.%3N"' >> 2subs/2_subs_send_time_subB$i.csv &

#done





#for i in {1..4}
#do
#mosquitto_sub -p 8883 -u suba -P suba@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_suburb | xargs -d$"\n}\n}" -L1 bash -c 'date +"%T.%3N"' >> 4subs/4_subs_time_subA$i.csv &

#mosquitto_sub -p 8883 -u subb -P subb@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_gps | xargs -d$"\n}\n}" -L1 bash -c 'date +"%T.%3N"' >> 4subs/4_subs_send_time_subB$i.csv &

#done



echo "Starting evaluation with 6 subs per topic"
killall mosquitto_sub
sleep 10


echo " " >> start_time_publisher.csv
echo "Starting Time for 6 Subs !!!" >> start_time_publisher.csv
echo " " >> start_time_publisher.csv



cd /home/rodrigo/Downloads/bbs-mqtt-tls/Scalability-Evaluation/BBS-with-MQTT-and-TLS/sample/ts-node/certs/client

for i in {1..6}
do
mosquitto_sub -p 8883 -u suba -P suba@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_suburb | xargs -d$"\n}\n}" -L1 bash -c 'date +"%T.%3N"' >> 6subs/6_subs_time_subA$i.csv &

mosquitto_sub -p 8883 -u subb -P subb@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_gps | xargs -d$"\n}\n}" -L1 bash -c 'date +"%T.%3N"' >> 6subs/6_subs_send_time_subB$i.csv &

done


for i in {1..1050}
do
    echo "execution: $i"
    cd /home/rodrigo/Downloads/bbs-mqtt-tls/Scalability-Evaluation/BBS-with-MQTT-and-TLS/sample/ts-node
    yarn publisher-and-server
done








echo " " >> start_time_publisher.csv
echo "Starting Time for 8 Subs !!!" >> start_time_publisher.csv
echo " " >> start_time_publisher.csv


echo "Starting evaluation with 8 subs per topic"
killall mosquitto_sub
sleep 5


cd /home/rodrigo/Downloads/bbs-mqtt-tls/Scalability-Evaluation/BBS-with-MQTT-and-TLS/sample/ts-node/certs/client

for i in {1..8}
do
mosquitto_sub -p 8883 -u suba -P suba@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_suburb | xargs -d$"\n}\n}" -L1 bash -c 'date +"%T.%3N"' >> 8subs/8_subs_time_subA$i.csv &

mosquitto_sub -p 8883 -u subb -P subb@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_gps | xargs -d$"\n}\n}" -L1 bash -c 'date +"%T.%3N"' >> 8subs/8_subs_send_time_subB$i.csv &

done


for i in {1..1050}
do
    echo "execution: $i"
    cd /home/rodrigo/Downloads/bbs-mqtt-tls/Scalability-Evaluation/BBS-with-MQTT-and-TLS/sample/ts-node
    yarn publisher-and-server
done

echo " " >> start_time_publisher.csv
echo "Sub 8 finished !!!" >> start_time_publisher.csv
echo " " >> start_time_publisher.csv


echo "Finished Evaluation"
killall mosquitto_sub





#mosquitto_sub -p 8883 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_suburb
#mosquitto_sub -p 8883 -u suba -P suba@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_suburb | xargs -d$'\n' -L1 bash -c 'date +"%T.%3N"' >> end_time_subA.txt
#with debug
#mosquitto_sub -p 8883 -u suba -P suba@123 --cafile ../ca/ca.crt --cert client.crt --key client.key -h localhost -t temp_with_suburb -d


#now=$(date +"%T.%3N")
#echo "Current time : $now" >> end_time_subA.txt