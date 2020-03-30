---
id: router
title: Router
sidebar_label: Router
---

Router is used to parse request uri into correct parameters using routing rules. Based on rules it parses things like controller, language and arguments from uri.

For example if routing rules (`url_schemes` object) are set to something like this:
```json
"url_schemes": [
    "lang",
    {
        "type": "controller",
        "default_value": "index"
    },
    "controller",
    "args"
]
```
And you query it using url: `http://localhost/en_US/controller_1/action_1/value_1`

Router will split the url after `...localhost/` part by forward slash (`/`) and resolve the request into:
- `hostname` = `localhost`
- `lang` = `en_US`
- `controller` = `controller_1/action_1`
- `args` = `["value_1"]`

Here you can see that controller is made of two parts that were joined back by forward slash (`/`). Other components can not be joined together.


### Scripting interface (Duktape)

#### `hostname: string` and `get_hostname(): string`
- Returns the hostname from request. This may contain the port number also (e.g. `...:8080`)

#### `lang: string` and `get_lang() : string`
- Returns the parsed language. Default: `en`

#### `controller: string` and `get_controller() : string`
- Returns the parsed controller. Default: `index`

#### `args: [string]` and `get_args() : [string]`
- Returns the parsed arguments. Default: []

#### `post: string` and `get_post() : string`
- Returns the request body.

#### `get_cookie(string cookie_name): string`
- Finds and returns cookie with specified name in request

#### `get_cookies_json(): string`
- Returns json object of all cookies in request
