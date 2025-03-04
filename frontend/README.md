# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

## Table of Contents

1. [Docker](#docker)
    - [Check if docker exist in local](#check-if-docker-exist-in-local)
    - [Running the Application in Docker](#running-application-in-docker)
    - [Stopping and Removing the Docker Container](#stop-the-container)
    - [Removing the Docker Image](#remove-the-docker-image)
2. [Running the Project Locally](#how-to-run-the-project-locally)
    - [Install Dependencies](#install-dependencies)
    - [Start the Application](#run-project)
3. [Test Suites](#test-suites)
    - [Run Tests](#run-tests)
    - [Clear Jest Cache](#clear-jests-cache)
4. [Optional Commands](#optional-commands)
    - [npm run build](#npm-run-build)
    - [npm run eject](#npm-run-eject)
5. [Learn More](#learn-more)
    - [React Documentation](#react-documentation)
    - [Code Splitting](#code-splitting)
    - [Analyzing the Bundle Size](#analyzing-the-bundle-size)
    - [Making a Progressive Web App](#making-a-progressive-web-app)
    - [Advanced Configuration](#advanced-configuration)
    - [Deployment](#deployment)
    - [npm run build fails to minify](#npm-run-build-fails-to-minify)

---

## Docker

### Check if docker exist in local
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

### Running application in Docker
1) Build and run your dockerized React app
```bash
docker build -t xdata_frontend .
```

2) Running the Docker container
```bash
docker run -d -p 3000:3000 xdata_frontend
```

### Stop the container
To find docker container
```bash
docker ps -a
```

To stop the container, run the command below in the terminal
```bash
docker stop <container_id_or_name>
```

To remove the container, use
```bash
docker rm <container_id_or_name>
```

### Remove the docker image
Find the image using below command
```bash
docker images
```

Remove docker image using below command
```bash
docker rmi <image_id_or_name>
```

## Assessing application
Next, open your browser and go to:

```http://localhost:3000```
You should see your React app running inside a Docker container

## How to run the project locally

### Install dependencies
Navigate to the root directory of this application and install dependencies
```bash
npm install
```

### Run project
Run Poject using the command below
```bash
npm start
```

Once the app is running in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Test suites
In the root directory, run the below command

### Run tests
Run the command below to run all the test cases
```
npm test
```

### Clear Jests Cache
Run the command below to clear Jest's cache
```
npx jest --clearCache
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Optional Commands

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

### React documentation

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
