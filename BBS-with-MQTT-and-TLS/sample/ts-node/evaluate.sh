#!/bin/bash


for i in {1..1100}
do
    echo "execution: $i"
    yarn publisher-and-server
done

