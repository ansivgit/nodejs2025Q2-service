# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker Desktop](https://www.docker.com/products/docker-desktop/).

## Downloading

```
git clone https://github.com/ansivgit/nodejs2025Q2-service.git
```
## Pull docker image
```
docker pull ansiv/myapp:latest
```

## Check docker image size
```
docker images | grep myapp
```

## Build docker image
```
docker build -t ansiv/myapp:latest .
```

## Run docker image
```
docker compose up --build
```

## Installing NPM modules

```
git checkout develop
npm install
```

## Create docker container

```
docker-compose up -d
```

## Running migrations

```
npm run typeorm:create
npm run typeorm:generate
npm run typeorm:run
```

## Running application

```
npm start
```

❗️ Please don't forget to copy `.env.example` to `.env` with port 4000, if there's no 'env'.

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

❗️ Please don't forget to run server (`npm run start:dev`) before running tests.
After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


Generate access token
```
node -e "console.log('JWT_ACCESS_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
```

Generate token
```
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
```
