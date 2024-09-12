//导入连接数据库的第三方包
const mssql = require('mssql');

//导入连接数据库的配置模块
const config = require('../database/config.js');

//添加工资税率信息
module.exports.addPayNS = (req,res)=>{
    let Zno = req.body.Zno;
    let dt = req.body.dt;
    let iit = req.body.iit;
    let ns = req.body.ns;
    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlStr = `SELECT * FROM Pay_Table WHERE Zno=${Zno}`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0]!==1){
                return res.wrong('查询不到该员工的信息');
            }
            let sqlAdd = `UPDATE Pay_Table SET DT=${dt},IIT=${iit},NS=${ns} WHERE Zno=${Zno}`;
            sqlConnect.query(sqlAdd,(err,recordset)=>{
                if(err){
                    return res.wrong(err);
                }
                if(recordset.rowsAffected[0]!==1){
                    return res.wrong('添加工资税率信息失败');
                }
                res.wrong('添加工资税率信息成功',0);
            })
        })
    })
}

//获取工资税率信息
module.exports.rederingss = (req,res)=>{
    let Zno = req.body.Zno;
    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlStr = `SELECT SS FROM Pay_Table WHERE Zno=${Zno}`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0] !== 1){
                return res.wrong('查询不到该员工的信息');
            }
            res.send({
                status:0,
                message:'渲染工资信息成功',
                ss:recordset.recordset[0].SS
            })
        })
    })
}

//渲染工资税率信息
module.exports.rederingPayNS = (req,res)=>{
    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlStr = `SELECT Zno,DT,IIT,NS FROM Pay_Table`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0] < 0){
                return res.wrong('渲染工资税率信息失败');
            }
            res.send({
                status:0,
                message:'渲染工资税率信息成功',
                data:recordset.recordset
            })
        })
    })
}

//根据员工编号修改调整工资信息
module.exports.modifyPayNS = (req,res)=>{
    let Zno = req.body.Zno;
    let dt = req.body.dt;
    let iit = req.body.iit;
    let ns = req.body.ns;
    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlStr = `SELECT * FROM Pay_Table WHERE Zno=${Zno}`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0]!==1){
                return res.wrong('查询不到该员工的信息');
            }
            let sqlAdd = `UPDATE Pay_Table SET DT=${dt},IIT=${iit},NS=${ns} WHERE Zno=${Zno}`;
            sqlConnect.query(sqlAdd,(err,recordset)=>{
                if(err){
                    return res.wrong(err);
                }
                if(recordset.rowsAffected[0]!==1){
                    return res.wrong('修改工资税率信息失败');
                }
                res.wrong('修改工资税率信息成功',0);
            })
        })
    })
}

//根据员工编号查询调整工资信息
module.exports.selectPayNS = (req,res)=>{
    let Zno = req.body.Zno;
    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlStr = `SELECT * FROM Pay_Table WHERE Zno=${Zno}`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0]!==1){
                return res.wrong('查询不到该员工的信息');
            }
            let sqlSelect = `SELECT Zno,DT,IIT,NS FROM Pay_Table WHERE Zno=${Zno}`;
            sqlConnect.query(sqlSelect,(err,recordset)=>{
                if(err){
                    return res.wrong(err);
                }
                res.send({
                    status:0,
                    message:'查询员工信息成功',
                    data:recordset.recordset
                })
            })
        })
    })
}

//根据员工编号删除调整工资信息
module.exports.deletePayNS = (req,res)=>{
    let Zno = req.body.Zno;
    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlStr = `SELECT * FROM Pay_Table WHERE Zno=${Zno}`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0]!==1){
                return res.wrong('查询不到该员工的信息');
            }
            let sqlDelete = `UPDATE Pay_Table SET DT=0,IIT=0,NS=0 WHERE Zno=${Zno}`;
            sqlConnect.query(sqlDelete,(err,recordset)=>{
                if(err){
                    return res.wrong(err);
                }
                if(recordset.rowsAffected[0]!==1){
                    return res.wrong('删除工资税率信息失败');
                }
                res.wrong('删除工资税率信息成功',0);
            })
        })
    })
}