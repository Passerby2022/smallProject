//数据库的相关配置信息
const config={
    server:'127.0.0.1',
    user:'program',
    password:'123456',
    database:'wages',
    port:1433,
    options:{
        encrypt:false
    },
    pool:{
        min:0,
        max:10,
        idleTimeoutMillis:3000
    }
}

//向外导出数据库配置信息的模块
module.exports = config;