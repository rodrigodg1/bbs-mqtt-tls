#!/bin/bash


for i in {1..20}
do
    echo "execution: $i"
    yarn publisher-and-server
done

