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

``cd`` to the project root and run

``` bash
$ npm install
```

Npm will then start loading the dependencies and configuration scripts will take care of manual dependency builds.

For development, `grunt` is configured to watch the file system and run mocha tests on changes, written in CoffeeScript, automatically. In order to start `grunt`, `cd` to the project root directory and run

``` bash
$ grunt
``` 

This also enables `jshint` static code analysis and runs webpack once. Finally, the application is built via

``` bash
$ node build
```

The build script will then generate the index.html main page with all scripts packed in a single JavaScript file.

Running
-------

1. You need a fatsecret API key. For security reasons it is included neither in the client JavaScript nor in the git repository. By default, a plain text file called ``signature`` is expected in the ``config`` subdirectory in the project root (i.e. ``yarse/config/signature`` with just one line of text). You may edit the location (``yarse.signatureFile``) in the project ``package.json`` file.
2. If you put the key there, ``cd`` to the project root directory and start the signature server via ``node src/server``.
3. Open the ``index.html`` file you created before by running ``node build`` in your browser and enjoy the app.

[vs]: http://www.microsoft.com/visualstudio/eng/products/visual-studio-2010-express
[python]: http://www.python.org/download/releases/2.7.3#download
[ssh]: https://help.github.com/articles/generating-ssh-keys
[git]: http://git-scm.com/downloads
[winsdk]: http://www.microsoft.com/download/en/details.aspx?displayLang=en&id=8279
[fatsecret]: http://platform.fatsecret.com/api/
[oauth]: http://platform.fatsecret.com/api/Default.aspx?screen=rapiauth#correctly_signing
