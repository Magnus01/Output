
echo "Creating Docker Image"
docker build . --no-cache -t 'virtual_machine' -f - < Dockerfile
#docker build --no-cache -t 'virtual_machine' - < Dockerfile
echo "Retrieving Installed Docker Images"
docker images
