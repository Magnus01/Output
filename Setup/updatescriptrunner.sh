#!/bin/sh

###########################
# Docker SETUP

# Start Docker
###########################
chmod 777 ../API/DockerTimeout.sh
chmod 777 ../API/Payload/scriptunit.sh
chmod 777 ../API/Payload/javaRunner.sh
chmod 777 UpdateDocker.sh

systemctl restart docker
./UpdateDocker.sh
