var fs = require('fs')
var path = require('path')

module.exports = read

function read(root, filter, files, prefix) {
  prefix = prefix || ''
  files = files || []
  filter = filter || noDotFiles

  var dir = path.join(root, prefix)
  if (!fs.existsSync(dir)) return
  if (fs.statSync(dir).isDirectory())
    fs.readdirSync(dir)
    .filter(filter)
    .forEach(function (name) {
      read(root, filter, files, path.join(prefix, name))
    })
  else
    files.push(prefix)

  return files
}

function noDotFiles(x) {
  return x[0] !== '.'
}

