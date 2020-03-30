---
id: view
title: View
sidebar_label: View
---

View provides an interface to the response part of communication. It is being used to generate the response output (page/content) and set its properties (headers).

The basic principle of view is supposed to allow you to create `template` that holds the structure of many pages and then only set different `pages` that are then injected into template.

Most of the interaction with view is done through scripting engine. It exposes interface for setting the template and page as well as some response parameters.


### Template
Example of what template object might look like:
```json
{
    "_id": {
        "$oid": "5e80bd41d65e88b7ce19bf02"
    },
    "app_id": "5e805072024c6e3cc72bf2c9",
    "contents": "<!DOCTYPE html><html><body>{= view.parse_page() =}</body></html>",
    "name": "base_template",
}
```

This basic example is saved under name `base_template` and is available under application with id `5e805072024c6e3cc72bf2c9`. This means that any controller in this application can call `view.set_template('base_template')` and set it as the chosen template.

The `contents` value is string that is about to be parsed by view parsing engine ([see below](#parsing-engine)).
In there we can see that `view.parse_page()` function is used inside `{= ... =}` element. This means the executed code (parsed page) will be then outputted into that spot in template.


### Page
Example of what page object might look like:
```json
{
    "_id": {
        "$oid": "5e80c23610c40379e5b2eeff"
    },
    "app_id": "5e805072024c6e3cc72bf2c9",
    "contents": "Hello World! from test_page",
    "name": "test_page",
}
```

Just like with template this page is saved under name `test_page` and is available under application with id `5e805072024c6e3cc72bf2c9`.

The `contents` value is string that is about to be parsed by view parsing engine ([see below](#parsing-engine)). The parsing will be done once `view.parse_page()` is called and is returned back so it can be outputted.


### Scripting interface (Duktape)

#### `echo(string value)`
- Outputs the `value` into the end of rendered output

#### `set_content_type(string content_type)`
- Sets `Content-Type` http header to `content_type`

#### `set_status_code(int status_code)`
- Sets http status code to `status_code`

#### `set_cookie(string cookie_value)`
- Adds `Add-Cookie` http header with value of `cookie_value`

#### `set_template(string template_name)`
- Finds and sets the template with `template_name` from application storage

#### `set_page(string page_name)`
- Finds and sets the page with `page_name` from application storage

#### `parse_page(): string`
- Parses page contents and returns rendered page. You need to echo this into the location you want your page to be rendered.

#### `finish()`
- Clears the page and template values to prevent further execution of view and sets the response body to rendered output. This is useful when working with content that does not use template to be rendered (e.g. json data).


### Parsing engine
In order to allow dynamic pages to be rendered, view engine is used to find special tokens in contents and interpret them either as scripts, echo functions or server-side comments.

If we take a look at something similar to the template contents seen upper:
```html
<!DOCTYPE html>
<html>
    {{
        // Run script
        var current_controller = router.controller;
    }}
<title>{= current_controller + ' - ' + application.get_title() =}</title>
<body>
    {= view.parse_page() =}
    {#
        This is a comment and will not be visible in output
    #}
</body>
</html>
```

This may return something like this:
```html
<!DOCTYPE html>
<html>

<title>test_controller - Demo Application</title>
<body>
    Hello World! from test_page
    
</body>
</html>
```

##### `{{ ... }}`
To execute scripts inside pages or templates use `{{` to start script block and `}}` to end it. The brackets and script in between will not be visible in the render result. If you do `view.echo('...')` inside that block the `...` value will be added to rendered result in place where that script block is.

##### `{= ... =}`
Echoing to rendered part can be done in multiple ways. First one would be using script block `{{ view.echo(...); }}` and it works as expected, it echoes result of code inside parenthesis into output. Second mode is shortened way of doing exactly same thing using `{= ... =}`. `{=` and `=}` are used to specify that this is echo code block. Inside this block you can still put scripting code but you must not use semicolon (`;`) at the end of the code.

##### `{# ... #}`
Server side comments can be acheived using `{#` and `#}`. Anything in between those brackets will be ignored and discarded from rendering output. This includes any script blocks or echos.

##### Escaping tokens
As parser does not know the context of contents it is parsing, anything with sequences that match start or end tokens (`{{, {=, {#` and `}}, =}, #}`) is going to be parsed as part of special code. To prevent this interfering with your own code you will need to escape such sequences using backslash on the second character if it matches. So `Lorem ipsum {= dolor sit }} amet` becomes `Lorem ipsum {\= dolor sit }\} amet`
