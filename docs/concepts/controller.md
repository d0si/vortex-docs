---
id: controller
title: Controller
sidebar_label: Controller
---

One of the base components of this system is controller. It handles requests and executes necessary actions to process it.

Correct controller is selected by (Router)[concepts/router.md] which parses the request query (URL) and based on routing rules sets the search value. Controller is then searched by its router parsed name, method (GET, POST,...) and application id.

Example of controller object:
```json
{
    "_id": {
        "$oid": "5e80506678dfda688ad2d62b"
    },
    "app_id": "5e805072024c6e3cc72bf2c9",
    "method": "GET",
    "name": "index/index",
    "script": "view.echo('Controller started');\n view.set_page('index_page');\n",
    "post_script": "view.echo('Controller finished');\n"
}
```

- `_id` field is used as unique identifier and in this case is based directly on MongoDb ObjectId style
- `app_id` specifies the application in which controller is available. If this field is not present the controller is available in all of applications
- `method` limits the method type that is used in request (GET and POST methods can call the same url but be resolved into different controllers)
- `name` is the value that router will parse to use that controller
- `script` script that is executed in normal sequence order (first application script, host then controller)
- `post_script` script that is executed after everything else (first application post_script, host then controller) but before the template is parsed
