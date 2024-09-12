//导入连接数据库的第三方包
const mssql = require('mssql');

//导入连接数据库的配置模块
const config = require('../database/config.js');

//添加工资信息
module.exports.addPaySS = (req,res)=>{
    let Zno = req.body.Zno;
    let Subsidy = req.body.Subsidy;
    let Deduction = req.body.Deduction;
    let Insure = req.body.Insure;
    let ss = req.body.ss;
    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlStr = `SELECT * FROM Z_Table WHERE Z_Table.Zno=${Zno}`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0]!==1){
                return res.wrong('查询不到该员工的信息');
            }
            let sqlAdd = `UPDATE Pay_Table SET Subsidy=${Subsidy},Deduction=${Deduction},Insure=${Insure},SS=${ss} WHERE Zno=${Zno}`;
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

//获取工资信息
module.exports.rederingrts = (req,res)=>{
    let Zno = req.body.Zno;
    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlStr = `SELECT RTS FROM Pay_Table WHERE Zno=${Zno}`;
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
                rts:recordset.recordset[0].RTS
            })
        })
    })
}

//渲染调整工资信息
module.exports.rederingPaySS = (req,res)=>{
    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlStr = `SELECT Zno,Subsidy,Deduction,Insure,SS FROM Pay_Table`;
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
module.exports.modifyPaySS = (req,res)=>{
    let Zno = req.body.Zno;
    let Subsidy = req.body.Subsidy;
    let Deduction = req.body.Deduction;
    let Insure = req.body.Insure;
    let ss = req.body.ss;
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
            let sqlAdd = `UPDATE Pay_Table SET Subsidy=${Subsidy},Deduction=${Deduction},Insure=${Insure},SS=${ss} WHERE Zno=${Zno}`;
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
module.exports.selectPaySS = (req,res)=>{
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
            let sqlSelect = `SELECT Zno,Subsidy,Deduction,Insure,SS FROM Pay_Table WHERE Zno=${Zno}`;
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
module.exports.deletePaySS = (req,res)=>{
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
            let sqlDelete = `UPDATE Pay_Table SET Subsidy=0,Deduction=0,Insure=0,SS=0 WHERE Zno=${Zno}`;
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