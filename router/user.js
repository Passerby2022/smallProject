//导入第三方包express
const express = require('express');

//创建路由模块
const router = express.Router();

//导入登录的路由处理函数
const router_function = require('../router_function/user.js');

//导入第三方包express-joi来实现自动对表单数据进行验证的功能
const expressJoi = require('@escook/express-joi');

//导入配置好的表单验证规则
//使用了对象解构的方式
const {login,department,selectOrDeleteDepartment,modifyDepartment
    ,addStaff,modifyStaff,selectDeleteStaff,addModifyPayRTS
    ,selectDelectPayRTS,addModifyPaySS,addModifyPayNS,userChangePSW} = require('../inspect/schema.js');

//导入部门信息的路由处理函数
const department_function = require('../router_function/department.js');

//导入员工信息的路由处理函数
const staff_function = require('../router_function/staff.js');

//导入工资项目表的路由处理函数
const payRts_function = require('../router_function/payRTS.js');

//导入调整税率的路由处理函数
const paySS_function = require('../router_function/PaySS.js');

//导入工资税率表的路由处理函数
const payNS_function = require('../router_function/PayNS.js');

//导入员工界面查询的路由处理函数
const userindex_function = require('../router_function/userindex.js');

//创建登录到首页接口
//获取数据，渲染数据的接口
router.post('/login',router_function.loginFunction);

//导出数据
router.post('/out',router_function.outFunction);

//创建提交管理员的用户名和密码到数据库的接口
router.post('/pdata',expressJoi(login),router_function.postData);

//创建提交用户的用户名和密码到数据库的接口
router.post('/puserdata',expressJoi(login),router_function.postUserData);

//创建获取首页的接口
router.post('/index',expressJoi(login),router_function.indexFunction);

//创建获取用户首页接口
router.post('/user',expressJoi(login),router_function.userFunction);

//用户界面获取相应信息的模块
router.post('/userindex',expressJoi(selectDelectPayRTS),userindex_function.userindex);

//用户界面修改密码的接口
router.post("/userChangePsw",expressJoi(userChangePSW),router_function.userChangePsw);

//创建部门信息接口
//添加部门信息的接口
router.post('/addDepartment',expressJoi(department),department_function.addDepartment);

//渲染部门信息的接口
router.get('/rederingDepartment',department_function.rederingDepartment);

//根据部门名称修改部门信息的接口
router.post('/modifyDepartment',expressJoi(modifyDepartment),department_function.modifyDepartment);

//根据部门名称查询部门信息的接口
router.post('/selectDepartment',expressJoi(selectOrDeleteDepartment),department_function.selectDepartment);

//根据部门名称删除部门信息的接口
router.post('/deleteDepartment',expressJoi(selectOrDeleteDepartment),department_function.deleteDepartment);

//创建员工信息接口
//添加员工信息的接口
router.post('/addStaff',expressJoi(addStaff),staff_function.addStaff);

//渲染员工信息的接口
router.get('/rederingStaff',staff_function.rederingStaff);

//修改员工信息的接口
router.post('/modifyStaff',expressJoi(modifyStaff),staff_function.modifyStaff);

//查询员工信息的接口
router.post('/selectStaff',expressJoi(selectDeleteStaff),staff_function.selectStaff);

//删除员工信息的接口
router.post('/deleteStaff',expressJoi(selectDeleteStaff),staff_function.deleteStaff);

//创建工资项目表的接口
//添加工资信息的接口
router.post('/addPayRTS',expressJoi(addModifyPayRTS),payRts_function.addPayRTS);

//渲染工资信息的接口
router.get('/rederingPayRTS',payRts_function.rederingPayRTS);

//修改工资信息的接口
router.post('/modifyPayRTS',expressJoi(addModifyPayRTS),payRts_function.modifyPayRTS);

//查询工资信息的接口
router.post('/selectPayRTS',expressJoi(selectDelectPayRTS),payRts_function.selectPayRTS);

//删除工资信息的接口
router.post('/deletePayRTS',expressJoi(selectDelectPayRTS),payRts_function.deletePayRTS);

//创建工资税率表的接口
//添加工资税率信息的接口
router.post('/addPayNS',expressJoi(addModifyPayNS),payNS_function.addPayNS);

router.post('/rederingss',payNS_function.rederingss)

//渲染工资税率信息的接口
router.get('/rederingPayNS',payNS_function.rederingPayNS);

//修改工资税率信息的接口
router.post('/modifyPayNS',expressJoi(addModifyPayNS),payNS_function.modifyPayNS);

//查询工资税率信息的接口
router.post('/selectPayNS',expressJoi(selectDelectPayRTS),payNS_function.selectPayNS);

//删除工资税率信息的接口
router.post('/deletePayNS',expressJoi(selectDelectPayRTS),payNS_function.deletePayNS);

//创建调整工资表的接口
//添加调整工资信息的接口
router.post('/addPaySS',expressJoi(addModifyPaySS),paySS_function.addPaySS);

router.post('/redering',paySS_function.rederingrts)

//渲染调整工资信息的接口
router.get('/rederingPaySS',paySS_function.rederingPaySS);

//修改调整工资信息的接口
router.post('/modifyPaySS',expressJoi(addModifyPaySS),paySS_function.modifyPaySS);

//查询调整工资信息的接口
router.post('/selectPaySS',expressJoi(selectDelectPayRTS),paySS_function.selectPaySS);

//删除调整工资信息的接口
router.post('/deletePaySS',expressJoi(selectDelectPayRTS),paySS_function.deletePaySS);

//向外导出路由模块
module.exports = router;