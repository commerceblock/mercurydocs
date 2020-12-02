# Build and run Mercury Server

## Build

To build mercury server, use Docker with provided Dockerfile in [mercury repo](https://github.com/commerceblock/mercury).

Steps:
```bash
git clone git@github.com:commerceblock/mercury.git
cd mercury && docker build -t commerceblock/mercury:local .
```

This will build local copy of mercury server. To start server use:
```bash
docker run --rm -it -p 8000:8000 commerceblock/mercury:local server
```

To test response from the local server:
```bash
curl -vk localhost:8000/ping

Output at the end should be:
< HTTP/1.1 200 OK
```

## Run

You can run pre-built version of Mercury server by downloading latest image from DockerHub.

Steps:
```bash
docker run --rm -it -p 8000:8000 commerceblock/mercury server
```

Test:
```bash
curl -vk localhost:8000/ping

Output at the end should be:
< HTTP/1.1 200 OK
```