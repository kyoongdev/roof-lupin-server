#!/bin/bash

# I want to make sure that the directory is clean and has nothing left over from
# previous deployments. The servers auto scale so the directory may or may not
# exist.
if [ -d /home/ec2-user/build ]; then
    sudo rm -rf /home/ec2-user/build
fi
mkdir /home/ec2-user/build

cd /home/ec2-user/build
echo "cd to build File"
source /home/ec2-user/.bash_profile

npm -v
node -v

npm install -g yarn 
yarn -v
npm install -g pm2


yarn install