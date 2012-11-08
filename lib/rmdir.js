'use strict';

/*
 * (c) guybedford
 * https://gist.github.com/807712
 */

var fs = require('fs');

function rmdir(dirPath) {
      try { var files = fs.readdirSync(dirPath); }
      catch(e) { throw e; }
      if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
          var filePath = dirPath + '/' + files[i];
          if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
          else
            rmdir(filePath);
        }
      fs.rmdirSync(dirPath);
    };
    
module.exports = rmdir;