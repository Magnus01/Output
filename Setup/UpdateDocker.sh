
echo "Creating Docker Image"
docker build -t 'python' - < Dockerfile
docker build -t 'javascript' - < DockerfileReactJS
echo "Retrieving Installed Docker Images"
docker images
