#!/bin/bash


if [ -d /home/ec2-user/build ]; then
    sudo rm -rf /home/ec2-user/build
fi
mkdir /home/ec2-user/build



sudo chmod -R 777 /home/ec2-user/build

echo "cd to build File"
source /home/ec2-user/.bash_profile
cd /home/ec2-user/build


pm2 kill
pm2 flush
pm2 start ./dist/main.js