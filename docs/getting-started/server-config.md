---
id: server-config
title: Server config
sidebar_label: Server config
---

`server_config.json` is the default file used by Vortex to specify startup configuration. You can use and modify the file in samples folder ([github link](https://github.com/d0si/vortex/blob/master/samples/server_config.json))

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

You can specify custom path to configuration file by using `-c=[path/to/file]` or  `-config=[path/to/file]`. The path must be relative to the directory from which Vortex command is being started (current working directory).

For ease of use all of the configuration is done in JSON format.

## Config sections

### Servers array
`servers` is the main array of any listeners you want to start by running single instance of Vortex. The amount is not limited but they cannot be listening on the same port.
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

##### Available options (server)
- `ip` option must be a valid IPv4 address and is the address on which program will listen for incoming requests. Most commonly used options are:
  - `0.0.0.0` that represents any address (this will listen on chosen port but will not care about address)
  - `127.0.0.1` that represents localhost (if running with this option the server will only be accessible from the host itself - not available outside computer that is running the program unless proxied in different way)
  - Network card ip (this will listen on single network card interface only)

- `port` option must be an integer number between 0 and 65535. The selection depends on platform, ports that are already used and your needs. Most popular http ports are 80 and 8080, but on linux you may need to provide superuser privileges to use port numbers below 1024.

- `thread_count` should be an integer that sets how many listener threads will be created. This means when new request comes in it will be immediately taken by next available thread. If there are no more threads available then it waits in the queue. Please note that increasing this number may improve performance quite a lot when many requests come at the same time but will also increase system resource usage (RAM and CPU).

### Storage object
```json
...
"storage": {
    "default_backend": "Filesystem",
    "config": {
        ...
    }
},
...
```

`storage` object configures the way Vortex is storing and reading data. Data management in Vortex is done through `StorageBackend` interfaces that provide common functions (create, read, update, delete,...) in their implementations and allow for different backend solutions to be used.
This way the data operations inside Vortex are independent of what storage method we are using (filesystem, MongoDb, SQL,...).

##### Available options (storage)
- `default_backend` *(optional, default=Mongo if enabled otherwise Filesystem)*
  - This option specifies the primary backend that will be used as the default way whenever requests to storage interface are made. If the backend does not exist (either misspelled name or if it was disabled/not enabled while building the project) exception will be thrown in the initialization step (happens on the program startup).
- `config` *(optional)*
  - This option is an object of additional config options for each backend individually (see section below for more info)

#### Storage backend config
```json
...
"config": {
  "Mongo": {
    ...
  },
  "Filesystem": {
    ...
  },
  ...
},
...
```

Config object contains specific backend configs. For each backend its full name is used as key.

##### Mongo backend config options
```json
"Mongo": {
    "enabled": true,
    "username": "vortex_admin_user",
    "password": "vortex_secure_password",
    "host": "vortex_mongo_host",
    "port": 12345,
    "database": "system",
    "default_database": "vortex_1"
}
```

- `enabled` *(optional, default=true)*
  - This option enables or disables the whole backend. When disabled the backend will be unavailable and will not be loaded
- `username` *(optional)*
- `password` *(optional)*
- `host` *(optional, default=localhost)*
- `port` *(optional)*
- `database` *(optional)*
- `default_database` *(optional, default=vortex)*

##### Filesystem backend config options
```json
"Filesystem": {
  "root_path": "../../../../samples",
  "cache_enabled": true,
  "cache_expiry": 120,
  "in_memory_only": true
}
```

- `root_path`
- `cache_enabled` *(optional, default=false)*
- `cache_expiry` *(optional, default=60)*
- `in_memory_only` *(optional, default=false)*

### Cache object
```json
...
"cache": {
  "enabled": true,
  "default_backend": "MemoryCache",
  "config": {
    "MemoryCache": {
      ...
    },
    ...
  }
},
...
```

`cache` is used for configuration of Vortex caching system. Just like with storage, caching is done through common interface backends. You can select default one, disable whole system globally or configure each backend to your own settings.

##### Available options (cache)
- `enabled` *(optional, default=false)*
  - Enables the caching subsystem, please note that if it is disabled other configuration options may not work (setting default_backend will fail if it does not exist)
- `default_backend` *(optional, default=MemoryCache)*
  - Sets the default backend that is primarily used if no specific backend name is specified in requests. If backend is not loaded the program will throw an error and exit.

#### Cache backend config
```json
"config": {
  "MemoryCache": {
    ...
  },
  "Redis": {
    ...
  },
  "DummyCache": {
    ...
  },
  ...
}
```

Config object contains specific backend configs. For each backend its full name is used as key.

##### MemoryCache backend options
```json
"MemoryCache": {
  "enabled": true
}
```

- `enabled` *(optional, default=false)*

##### Redis backend options
```json
"Redis": {
  "enabled": true,
  "address": "redisserver",
  "port": 9876
}
```

- `enabled` *(optional, default=false)*
- `address` *(optional, default=127.0.0.1)*
- `port` *(optional, default=6379)*

##### DummyCache backend options
```json
"DummyCache": {}
```

This backend does not use any specific options. Its only purpose is to emulate caching backend that doesn't do anything.
