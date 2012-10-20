Requirements
------------

For Windows, you will need:

[Python][python] `2.7.3` on PATH
Visual Studio 2010, at least [Express][vs]
[Windows 7 x64 SDK][winsdk] for x64 systems
[Git][git] installed and [ssh][ssh] configured (ssh for development only)

Installation
------------

Requirements (see https://github.com/TooTallNate/node-gyp):

`cd` to the project root and run

``` bash
$ npm install
```

Npm will then start loading the dependencies and configuration scripts will take care of manual dependency builds.

For development, `grunt` is configured to watch the file system and run mocha tests on changes, written in JavaScript or CoffeeScript, automatically. In order to start `grunt`, `cd` to the project root directory and run

``` bash
$ grunt
``` 

This also enables `jshint` static code analysis and runs webpack once.

Running
-------

You can run `yarse` by cloning this repository and opening `index.html` in your browser. Please note that `yarse` requires a signature server to run (src/SignatureServer.js) in order to sign its API calls. By default, it requires a plain text file containing nothing but the FatSecret.com application secret under ./config/signature.

[vs]: http://www.microsoft.com/visualstudio/eng/products/visual-studio-2010-express
[python]: http://www.python.org/download/releases/2.7.3#download
[ssh]: https://help.github.com/articles/generating-ssh-keys
[git]: http://git-scm.com/downloads
[winsdk]: http://www.microsoft.com/download/en/details.aspx?displayLang=en&id=8279
[fatsecret]: http://platform.fatsecret.com/api/
[oauth]: http://platform.fatsecret.com/api/Default.aspx?screen=rapiauth#correctly_signing
