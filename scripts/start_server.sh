#!/bin/bash


sudo chmod -R 777 /home/ec2-user/build

echo "cd to build File"
source /home/ec2-user/.bash_profile
cd /home/ec2-user/build


pm2 kill
pm2 flush

# yarn prisma db push --force-reset
# yarn prisma generate
# yarn seed

pm2 start ./dist/main.js