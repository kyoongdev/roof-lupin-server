#!/bin/bash

sudo chmod -R 777 /home/ec2-user/build

echo "cd to build File"
source /home/ec2-user/.bash_profile
cd /home/ec2-user/build


pm2 kill

yarn config:dev
yarn prisma db push --accept-data-loss	
yarn seed



pm2 start ecosystem.json