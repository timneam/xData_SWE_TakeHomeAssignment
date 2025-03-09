# Backend developed using Python and FastAPI

# Table of Contents

1. [How to run the backend](#how-to-run-the-backend)
2. [Check if docker exist in local](#check-if-docker-exist-in-local)
2. [Run application in Docker](#run-application-in-docker)
   - [Build Docker Image](#build-docker-image)
   - [Run the Docker Container](#run-the-docker-container)
   - [Get Docker Container ID](#get-docker-container_id)
   - [Check Docker Logs](#check-docker-logs)
3. [Stop the Container](#stop-the-container)
4. [Remove the Docker Image](#remove-the-docker-image)
5. [Access the FastAPI Documentation](#to-access-the-fastapi-documentation)
6. [Run Test Cases](#run-test-cases)

# How to run the backend

## Check if docker exist in local
Ensure that docker is installed in your local
```bash
docker --version
```

If docker is not installed, use the following commands to install

Linux
```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable --now docker
```

Mac (Using Homebrew)
```bash
brew install --cask docker
```

Windows (Using Chocolatey)
```bash
choco install docker-desktop
```

Verify the installation
```bash
docker --version
```

## Run application in docker
### Build Docker image
 ```bash
docker build -t xdata_backend .
```
   
### Run the Docker Container
 ```bash
 docker run -d -p 5001:5001 xdata_backend
 ```

### Get Docker container_id
 ```bash
docker ps -a
```

### Check docker logs
 ```bash
 docker logs <container_id>
 ```

## Stop the container
```bash
docker stop <container_id_or_name>
```

## Remove the container
```bash
docker rm <container_id_or_name>
```

## Remove the docker image
**Find the image using below command**
```commandline
docker images
```
**Remove docker image using below command**
```bash
docker rmi <image_id_or_name>
```

## To access the FastAPI documentation
Navigate to the following URL in your browser
```commandline
http://localhost:5001/docs
```

## Run test cases
navigate to the root directory of `backend` project and run the following command
```commandline
pytest test_main.py
```