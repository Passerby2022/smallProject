//导入第三方包express
const express = require('express');

//导入第三方包cors实现跨域访问
const cors = require('cors');

//导入第三方包joi
const joi = require('joi');

//创建web服务器
const app = express();

//注册cors中间件
app.use(cors());

//配置解析表单application/x-www-urlencoded格式数据的中间件
//express.urlencoded({extended:false})为express的内置中间件
//配置解析表单application/json格式数据的中间件
//express.json()为express的内置中间件
//app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//返回错误提示信息的中间件
//err:err instanceof Error?err.message:err
//err instanceof Error判断是一个错误对象还是一个错误字符串
app.use((req,res,next)=>{
    res.wrong = (err,status=1)=>{
        res.send({
            status:status,
            err:err instanceof Error?err.message:err
        })
    }
    next();
})

//导入登录路由模块
const router = require('./router/user.js');

//注册为路由模块
app.use('/api',router);

//注册错误级别中间件来处理服务器运行时产生的错误
app.use((err,req,res,next)=>{
    //表单验证失败产生的错误
    if(err instanceof joi.ValidationError){
        return res.wrong(err);
    }
    //未知错误
    res.wrong(err);
    next();
})

//开启web服务器
//'192.168.253.1'
//'127.0.0.1'
app.listen(3000,'192.168.253.1',(req,res)=>{
    console.log('http://192.168.253.1:8080/');
})