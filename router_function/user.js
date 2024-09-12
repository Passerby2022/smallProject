//导入数据库配置信息
const databaseConfig = require('../database/config.js');

const FileReader = require('filereader');

//导入第三方包xlsx
const xlsx = require('xlsx');

//导入第三方包mssql
//实现与SQL Server数据库的连接
const mssql = require('mssql');

//导入第三方包bcryptjs
//实现对密码的加密和解密
const bcryptjs = require('bcryptjs');

//登录之后跳转到首页所需的处理函数
module.exports.loginFunction = (req,res)=>{
    //与SQL Server数据库进行连接，实现查询功能
    mssql.connect(databaseConfig,(err)=>{
        const sqlConnect = new mssql.Request();
        if(err){
            return res.wrong(err);
        }
        //查询数据库中的数据，定义查询数据的sql语句
        const sqlStr = `SELECT Z_Table.Zno,Zn,Sex,Age,Phone,Education,
        Bn,B_Table.Bno,Duties,Title,Pay,Bonus,RTS,Subsidy,Deduction,
        Insure,SS,DT,IIT,NS
        FROM Z_Table,B_Table,Pay_Table
        WHERE Z_Table.Bno=B_Table.Bno AND Z_Table.Zno=Pay_Table.Zno`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0] < 0){
                return res.wrong('数据库连接失败');
            }
            //将查询到的数据返回给客户端
            res.send({
                status:0,
                message:'数据库连接成功',
                data:recordset.recordset
            });
        })
    })
}

//导出首页的处理函数
module.exports.outFunction = (req,res)=>{
    //与SQL Server数据库进行连接，实现查询功能
    mssql.connect(databaseConfig,(err)=>{
        const sqlConnect = new mssql.Request();
        if(err){
            return res.wrong(err);
        }
        //查询数据库中的数据，定义查询数据的sql语句
        const sqlStr = `SELECT Z_Table.Zno,Zn,Sex,Age,Phone,Education,
        Bn,B_Table.Bno,Duties,Title,Pay,Bonus,RTS,Subsidy,Deduction,
        Insure,SS,DT,IIT,NS
        FROM Z_Table,B_Table,Pay_Table
        WHERE Z_Table.Bno=B_Table.Bno AND Z_Table.Zno=Pay_Table.Zno`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0] < 0){
                return res.wrong('导出Excel表格失败');
            }
            let data = [];
            let title = ['员工编号','员工姓名','性别','年龄','电话号码','学历','所属部门名称',
            '所属部门编号','职务','职称','基本工资','浮动奖金','核定工资总额','交通/通讯等补助',
            '迟到/旷工等扣减','养老/医疗/失业保险','合计应发','应缴税额','个人所得税','实发工资'];
            data.push(title);
            let rows = recordset.recordset;
            rows.forEach((element)=>{
                let arr = [];
                arr.push(element.Zno);
                arr.push(element.Zn);
                arr.push(element.Sex);
                arr.push(element.Age);
                arr.push(element.phone);
                arr.push(element.Education);
                arr.push(element.Bn);
                arr.push(element.Bno);
                arr.push(element.Duties);
                arr.push(element.Title);
                arr.push(element.Pay);
                arr.push(element.Bonus);
                arr.push(element.RTS);
                arr.push(element.Subsidy);
                arr.push(element.Deduction);
                arr.push(element.Insure);
                arr.push(element.SS);
                arr.push(element.DT);
                arr.push(element.IIT);
                arr.push(element.NS);
                data.push(arr);
            })

            function exportExcel(result){
                let sheet = xlsx.utils.json_to_sheet(result);
                let workbook = {
                    SheetNames:['nodejs-sheetname'],
                    Sheets:{'nodejs-sheetname':sheet}//nodejs-sheetname 为sheet名字//Object.assign({},sheet)
                  }
                xlsx.writeFile(workbook,'D:/index.xlsx');
            }

            exportExcel(data);
        })
    })
}

//提交管理员的用户名和密码到数据库
module.exports.postData = (req,res)=>{
    //获取服务器提交上来的用户名和密码
    let username = req.body.username;
    let password = req.body.password;
    //连接数据库
    mssql.connect(databaseConfig,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        password = bcryptjs.hashSync(password,10);
        //定义添加数据的sql语句
        let sqlAdd = `INSERT INTO Data_Table(username,password) VALUES('${username}','${password}')`;
        sqlConnect.query(sqlAdd,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            //recordset.rowsAffected[0]表示查询结果影响的行数
            if(recordset.rowsAffected[0]!==1){
                return res.wrong('添加用户名和密码失败');
            }
            res.wrong('添加用户名和密码成功',0);
        })
    })
}

//提交用户的用户名和密码到数据库
module.exports.postUserData = (req,res)=>{
    //获取服务器提交上来的用户名和密码
    let username = req.body.username;
    let password = req.body.password;
    //连接数据库
    mssql.connect(databaseConfig,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        password = bcryptjs.hashSync(password,10);
        //定义添加数据的sql语句
        let sqlAdd = `INSERT INTO User_Table(username,password) VALUES('${username}','${password}')`;
        sqlConnect.query(sqlAdd,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            //recordset.rowsAffected[0]表示查询结果影响的行数
            if(recordset.rowsAffected[0]!==1){
                return res.wrong('添加用户的用户名和密码失败');
            }
            res.wrong('添加用户的用户名和密码成功',0);
        })
    })
}

//验证用户名和密码以及跳转首页所需的处理函数
module.exports.indexFunction = (req,res)=>{
    //获取服务器提交上来的用户名和密码
    let username = req.body.username;
    let password = req.body.password;
    //连接数据库
    mssql.connect(databaseConfig,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        //查询数据库中是否有该用户，定义查询数据的sql语句
        let sqlStr = `SELECT * FROM Data_Table WHERE username='${username}'`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            //recordset.rowsAffected[0]表示查询结果影响的行数
            if(recordset.rowsAffected[0]!==1){
                return res.wrong('该用户不存在');
            }
            //进行正式的密码验证
            //获取数据库中的密码recordset.recordset[0].password
            let flag = bcryptjs.compareSync(password,recordset.recordset[0].password);
            if(!flag){
                return res.wrong('登陆失败，密码不正确');
            }
            res.send({
                status:0,
                data:'./index.html'
            });
        })
    })
}

//验证用户名和密码以及跳转用户首页所需的处理函数
module.exports.userFunction = (req,res)=>{
    //获取服务器提交上来的用户名和密码
    let username = req.body.username;
    let password = req.body.password;
    //连接数据库
    mssql.connect(databaseConfig,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        //查询数据库中是否有该用户，定义查询数据的sql语句
        let sqlStr = `SELECT * FROM User_Table WHERE username='${username}'`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            //recordset.rowsAffected[0]表示查询结果影响的行数
            if(recordset.rowsAffected[0]!==1){
                return res.wrong('该用户不存在');
            }
            //进行正式的密码验证
            //获取数据库中的密码recordset.recordset[0].password
            let flag = bcryptjs.compareSync(password,recordset.recordset[0].password);
            if(!flag){
                return res.wrong('登陆失败，密码不正确');
            }
            res.send({
                status:0,
                data:'./userindex.html'
            });
        })
    })
}

//验证用户名和密码以及用户界面修改密码的处理函数
module.exports.userChangePsw = (req,res)=>{
    //获取服务器提交上来的用户名和密码
    let username = req.body.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    //连接数据库
    mssql.connect(databaseConfig,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        //查询数据库中是否有该用户，定义查询数据的sql语句
        let sqlStr = `SELECT * FROM User_Table WHERE username='${username}'`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            //recordset.rowsAffected[0]表示查询结果影响的行数
            if(recordset.rowsAffected[0]!==1){
                return res.wrong('该用户不存在');
            }
            //进行正式的密码验证
            //获取数据库中的密码recordset.recordset[0].password
            let flag = bcryptjs.compareSync(oldPassword,recordset.recordset[0].password);
            if(!flag){
                return res.wrong('修改密码失败，原密码不正确');
            }
            newPassword = bcryptjs.hashSync(newPassword,10);
            let sqlChange = `UPDATE User_Table SET password='${newPassword}' WHERE username='${username}'`;
            sqlConnect.query(sqlChange,(err,recordset)=>{
                if(err){
                    return res.wrong(err);
                }
                res.wrong('修改密码成功',0);
            })
        })
    })
}