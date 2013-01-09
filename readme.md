Requirements
------------

For Windows, you will need:

[Python][python] `2.7.3` on PATH
[Git][git] installed

Additionally, for Windows 7:
Visual Studio 2010, at least [Express][vs2010]
[Windows 7 x64 SDK][winsdk] for x64 systems

On Windows 8, try [Microsoft Visual Studio C++ 2012][vs2010] alone. If that doesn't work, you might need to add as well [Microsoft Visual Studio C++ 2012][vs2012]

Installation
------------

Requirements (see https://github.com/TooTallNate/node-gyp):

After cloning the repository, ``cd`` to the project root and run

``` bash
$ npm install
```

Npm will then start loading the dependencies and configuration scripts will take care of manual dependency builds.

For development, `grunt` is configured to watch the file system and run mocha tests on changes, written in CoffeeScript, automatically. In order to start `grunt`, `cd` to the project root directory and type

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

[vs2010]: http://www.microsoft.com/visualstudio/eng/products/visual-studio-2010-express
[vs2012]: http://go.microsoft.com/?linkid=9816758
[python]: http://www.python.org/download/releases/2.7.3#download
[git]: http://git-scm.com/downloads
[winsdk]: http://www.microsoft.com/download/en/details.aspx?displayLang=en&id=8279
[fatsecret]: http://platform.fatsecret.com/api/
[oauth]: http://platform.fatsecret.com/api/Default.aspx?screen=rapiauth#correctly_signing
