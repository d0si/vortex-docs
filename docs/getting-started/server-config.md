---
id: server-config
title: Server config
sidebar_label: Server config
---

`server_config.json` is the default file used by vortex to specify startup configuration. You can use and modify the file in samples folder ([github link](https://github.com/d0si/vortex/blob/master/samples/server_config.json))

The file looks something like this:
```json
{
  "servers": [
    {
      "server": {
        "ip": "0.0.0.0",
        "port": 8080,
        "thread_count": 2
      },
      "storage": {
        "default_backend": "Filesystem",
        "config": {
          "Mongo": {
            "enabled": false
          },
          "Filesystem": {
            "root_path": "../../../../samples",
            "cache_enabled": true,
            "in_memory_only": true
          }
        }
      },
      "cache": {
        "enabled": true,
        "default_backend": "MemoryCache",
        "config": {
          "MemoryCache": {
            "enabled": true
          }
        }
      }
    }
  ]
}
```

You can specify custom path to configuration file by using `-c=[path/to/file]` or  `-config=[path/to/file]`. The path must be relative to the directory from which vortex command is being started (current working directory).

For ease of use all of the configuration is done in JSON format.

## Config sections

### Servers array
`servers` is the main array of any listeners you want to start by running single instance of vortex. The amount is not limited but they cannot be listening on the same port.
```json
{
    "servers": [
        {...}, {...}, ...
    ],
    ...
}
```

Each of the objects in servers array has its own startup and runtime configuration:
```json
{
    "server": {
        ...
    },
    "storage": {
        ...
    },
    "cache": {
        ...
    },
    ...
}
```

### Server object (inside servers array element)
`server` object, located inside server array element is meant to specify the information needed to launch new server. Here the ip address and port of listener are specified as well as number of threads.
```json
...
"server": {
    "ip": "0.0.0.0",
    "port": 8080,
    "thread_count": 2
},
...
```

`ip` option must be a valid IPv4 address and is the address on which program will listen for incoming requests. Most commonly used options are:
- `0.0.0.0` that represents any address (this will listen on chosen port but will not care about address)
- `127.0.0.1` that represents localhost (if running with this option the server will only be accessible from the host itself - not available outside computer that is running the program unless proxied in different way)
- Network card ip (this will listen on single network card interface only)

`port` option must be an integer number between 0 and 65535. The selection depends on platform, ports that are already used and your needs. Most popular http ports are 80 and 8080, but on linux you may need to provide superuser privileges to use port numbers below 1024.

`thread_count` should be an integer that sets how many listener threads will be created. This means when new request comes in it will be immediately taken by next available thread. If there are no more threads available then it waits in the queue. Please note that increasing this number may improve performance quite a lot when many requests come at the same time but will also increase system resource usage (RAM and CPU).
