
echo "Creating Docker Image"

docker build -t 'virtual_machine' - < DockerfilePython


echo "Retrieving Installed Docker Images"
docker images
