const
  yargs = require('yargs'),
  dir = require('node-dir')
treeify = require('treeify')
crypto = require('crypto');
const hash = crypto.createHash('sha256')
let directory = process.argv.slice(2).toString()
console.log(directory)
let files = {}
dir.readFiles(directory,
  function(err, content, filepath, next) {
    if (err)
      throw err;
    contents = content.trim().split('\r\n')
    const hash = crypto.createHash('sha256')
    contents.forEach((item) => {
      hash.update(item)
      const hashValue = hash.digest('hex').toString()
      const fileloc = filepath.toString()
      files[fileloc] = hashValue
      const key = Object.keys(files)
      const value = Object.values(files)
      for (var i = 0; i < value.length; i++) {
        for (var j = i + 1; j < value.length; j++) {
          if (value[j] === value[i] && i !== j) {
            console.log(treeify.asTree({
              [key[i]]: {
                [key[j]]: null
              }
            }))
          }
        }
      }
    })
    next()
  })
