---
id: building-from-source
title: Building from source
sidebar_label: Building from source
---

## Build process
This project is using CMake build system to allow for cross-platform and easy to configure build environment.

The main problem is finding and installing correct dependencies localy. This process varies by operating system and also different distributions however it stays mostly the same for many Linux distributions.

## Prerequisites for Linux (gcc)
You will need **[CMake](https://cmake.org/)** version 3.10 or higher to begin and C++ compiler (the most of builds are using **gcc** version 9.2.0 and up).

The next important things required are **[Boost C++ libraries](https://www.boost.org/)** (version 1.72.0 or higher) with development headers and **OpenSSL** development libraries.

Other dependencies are not completely neccessary for the build but keep in mind that final build will not have the features if dependency is not enabled.
- **[Mongo C driver](http://mongoc.org/)** (recommended version 1.16.0) and **[Mongo C++ driver](http://mongocxx.org/)** (recommended version 3.4.0)
- **[cpp_redis](https://github.com/cpp-redis/cpp_redis)** and **[tacopie](https://github.com/Cylix/tacopie)**
- **[crypto++](https://www.cryptopp.com/)** (recommended version 8.2.0)
- **[duktape](https://duktape.org/)** runtime (recommended version 2.5.0) and **[duktape-cpp](https://github.com/vmanucharyan/duktape-cpp)** headers (those are already included in reopository git submodules)

## Building on Linux
Clone the [vortex](https://github.com/d0si/vortex) git repo locally and cd into it. Also clone all of the submodules using `git submodule update --init --recursive`.

Then make a directory where the build will be performed (e.g. `mkdir build`). In that directory run `cmake ..` and let CMake do the neccessary preconfiguration steps.

To build just run `make` or `make -j8` where 8 is the number if concurrent build jobs ('threads') to speed up the build.
> Note: Larger number will require more system memory (RAM).

### Additional dependencies
If you installed any additional dependencies you need to use the flags to enable them in build process:
- MongoDB: `-DVORTEX_ENABLE_FEATURE_MONGO=ON`
- Redis: `-DVORTEX_ENABLE_FEATURE_REDIS=ON`
- Duktape: `-DVORTEX_ENABLE_FEATURE_DUKTAPE=ON`
- CryptoPP: `-DVORTEX_ENABLE_FEATURE_CRYPTOPP=ON`

Run the newly built executable using `./bin/vortex --config=../samples/server_config.json`.

## Prerequisites for Windows
The build on Windows should be straightforward since **[vcpkg](https://github.com/microsoft/vcpkg)** tool provides a way to manage most of the dependencies.

You also need to have Visual Studio installed (2019 version has native CMake support and Community version is free) with **Desktop development with C++** workload installed.

Use vcpkg to install the following (if you want 64-bit build you will need to add the `:x64-windows` part to the end of each library name):
- **boost**
- **openssl**
Optional dependencies:
- **mongo-c-driver** and **mongo-cxx-driver**
- **cpp_redis** and **tacopie**
- **cryptopp**
- **duktape**

Use the CMake support in Visual Studio to open project and wait until it is configured. If you have installed any optional dependencies you can enable them in `Project/CMake Settings for VortexProject` and search CMake variables for things that start with `VORTEX_ENABLE_FEATURE_...`.

To build just use `Build/Build All` or `Ctrl+Shift+B`.

Then copy `server_config.json` file from samples folder into the same folder as the built binary (build/bin) and edit it to your needs. See [Server Config file](getting-started/server-config.md) for more info.

When all of that is ready select the `Vortex.exe` as debug target and start it.
