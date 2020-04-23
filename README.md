## Description

> 对指定文件夹中指定文件类型的文件内容 进行 繁简体切换

## Setup

```bash
# install dependencies
yarn install

# 修改要替换的文件类型: src/index.js
const types = ['js', 'vue', 'html']

# 替换目标文件夹下指定文件类型的简体中文
yarn start xxx(文件夹绝对路径|必填) 1(是否繁=>简|选填|默认: 简=>繁)
```
