const path = require('path')
const Common = require('./utils/utils')
const {
  info
} = require('./utils/log')
//^[\u2E80-\u9FFF]+$ 匹配所有东亚区的语言
//^[\u4E00-\u9FFF]+$ 匹配简体和繁体
//^[\u4E00-\u9FA5]+$ 匹配简体
const regx = /^[\u4E00-\u9FFF]+$/

const dirPath = process.argv[2]

const transType = process.argv[3] || 0

const types = ['js', 'vue', 'html'] //指定要替换的文件类型

if (!dirPath) {
  console.error('请输入文件路径')
  return
}


//获取到所有需要替换的文件
mapFiles(dirPath)

async function mapFiles(dirPath) {
  const res = await Common.stat(dirPath)
  //不是文件夹就进入改变文件
  if (!res.isDir) {
    transFile(res.filePath)
  } else {
    const files = await Common.readdir(dirPath)
    const arr = files.map(async item => {
      const res = await Common.stat(path.resolve(dirPath, item))
      return Promise.resolve(res)
    });
    //获取到目录里所有文件及其类型
    const result = await Promise.all(arr);
    result.forEach(async item => {
      mapFiles(item.filePath)
    })
  }
}


//转换一个文件
async function transFile(filePath) {
  const ext = filePath.slice(filePath.lastIndexOf('.') + 1).toLocaleLowerCase()

  //当文件类型是这些后缀才去转换
  if (types.includes(ext)) {
    //获取文件内容
    const res = await Common.readFile(filePath)
    //简体转繁体后的文件内容
    const result = mapString(res)
    try {
      await Common.writeFile(filePath, result)
    } catch (e) {
      info(`文件替换发生错误[${filePath}] : ${e.toString()}`)
    }
  }

}


//获取转换一个文件的中文简体到繁体
function mapString(str) {
  return Array.prototype.map.call(str, item => {
    if (new RegExp(regx).test(item)) {
      item = Common.tranformCC(item, transType)
    }
    return item
  }).join('')
}