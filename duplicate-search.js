const
  yargs = require('yargs'),
  dir = require('node-dir')
treeify = require('treeify')
crypto = require('crypto');
let directory = process.argv.slice(2).toString()
let data = {}
dir.readFiles(directory,
  function(err, content, files, next) {
    if (err)
      throw err;
    contents = content.trim().split('\r\n').toString()
    const hash = crypto.createHash('sha256')
    hash.update(contents)
    data[files] = hash.digest('hex')
    next()
  },
  function(err, files) {        
    if (err) throw err;        
    const key = Object.keys(data)        
    const value = Object.values(data)        
    for (let i = 0; i < value.length; i++) {            
      for (let j = i + 1; j < value.length; j++) {                
        if (value[j] == value[i] && i !== j) {                    
          console.log(treeify.asTree({
            [key[i]]: {
              [key[j]]: null
            }
          }))                
        }            
      }        
    }    
  })
