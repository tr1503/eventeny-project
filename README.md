# eventeny-project

## Tech stack
I used php and apache as backend, mySQL as database and Node.js/HTML/CSS/JavaScript as frontend.

## Prerequisites

Before you begin, ensure you have the following tools installed on your system:

- [Docker](https://www.docker.com/)

## Build and Run with Docker Compose

### Build and start the Docker containers:
```
docker-compose up --build
```

### Run the application locally:
**Frontend**: Open your browser and navigate to **http://localhost:3000**.
**Backend**: Open your browser and navigate to **http://localhost:8080**, and you can see the api interface. 
Ensure port 3000 and 8080 are accessible.

### View logs:

```
docker logs php-apache
docker logs node
docker logs db
```