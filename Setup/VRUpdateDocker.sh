
echo "Creating Docker Image"
#docker build . --no-cache -t 'aframe' -f - < Dockerfile
docker build -t 'virtual_machine' - < Dockerfile
#docker build --no-cache -t 'virtual_machine' - < Dockerfile
echo "Retrieving Installed Docker Images"
docker images
