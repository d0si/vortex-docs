---
id: using-docker-image
title: Using Docker image
sidebar_label: Using Docker image
---

Compared to building project from source using prebuilt Docker images or building Docker image is much simpler if you only want to run the program. This way the only dependency is [Docker](https://www.docker.com/) itself.

This method is preffered when you do not need to modify the project source code. It runs on Windows, Linux and macOS.

## Using prebuilt Docker image
The official build of master branch is located in [Docker Hub Vortex repository](https://hub.docker.com/repository/docker/d0si/vortex) tagged as `latest`.

Go ahead and pull the image using `docker pull d0si/vortex:latest`.

To run the container just run it with `docker run -it d0si/vortex:latest /vortex/build/bin/vortex`.

## Building Docker image
Clone the repository and its subrepositories and then run `docker build -t d0si/vortex:latest`.

Run it with the same command as when using prebuilt image: `docker run -it d0si/vortex:latest /vortex/build/bin/vortex`.
