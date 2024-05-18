// 该文件用于合并所有接口文件并批量导出所有的接口请求
const files = require.context('.', true, /\.api\.js$/) // 模块接口名称必须是：模块名称.api.js

let module = {} // 用于存放接口并一起导出
files.keys().forEach((key, index) => {
    // 第一种: 按模块来 this.$api.xxx.xxx().then()
    /* let obj = {}
    let moduleName = key.split('/')[2].split('.')[0]
    obj[moduleName] = {}
    Object.assign(obj[moduleName], files(key).default)
    module = Object.assign(module, obj) */

    // 第二种: 下面这种是每个每个模块不能有重名,this.$api.xxx().then()
    module = Object.assign(module, files(key).default)
})

//导出所有接口请求
export default module