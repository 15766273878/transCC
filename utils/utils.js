const {
  s,
  t
} = require('./lang');

const fs = require('fs')

class Common {

  static tranformCC(str) {
    const index = s.indexOf(str)
    return index === -1 ? str : t[index] || str
  }

  static stat = path => new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err)
        return
      }
      stats.isDir = stats.isDirectory()
      stats.isFile = stats.isFile()
      stats.filePath = path
      resolve(stats)
    })
  })

  static readdir = path => new Promise((resolve, reject) => {
    fs.readdir(path, {}, (err, files) => {
      if (err) {
        reject(err)
        return
      }
      resolve(files)
    })
  })

  static readFile = path => new Promise((resolve, reject) => {
    fs.readFile(path, {
      encoding: 'utf-8'
    }, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })

  static writeFile = (path, data) => new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    });
  })

}
module.exports = Common