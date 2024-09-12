//导入连接数据库的第三方包
const mssql = require('mssql');

//导入连接数据库的配置模块
const config = require('../database/config.js');

//添加工资信息
module.exports.addPayRTS = (req,res)=>{
    let Zno = req.body.Zno;
    let Pay = req.body.Pay;
    let bonus = req.body.bonus;
    let rts = req.body.rts;
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
            let sqlAdd = `INSERT INTO Pay_Table(Zno,Pay,Bonus,RTS) VALUES(${Zno},${Pay},${bonus},${rts})`;
            sqlConnect.query(sqlAdd,(err,recordset)=>{
                if(err){
                    return res.wrong(err);
                }
                if(recordset.rowsAffected[0]!==1){
                    return res.wrong('添加工资信息失败');
                }
                res.wrong('添加工资信息成功',0);
            })
        })
    })
}

//渲染工资信息
module.exports.rederingPayRTS = (req,res)=>{
    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlStr = `SELECT Zno,Pay,Bonus,RTS FROM Pay_Table`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0] < 0){
                return res.wrong('渲染工资信息失败');
            }
            res.send({
                status:0,
                message:'渲染工资信息成功',
                data:recordset.recordset
            })
        })
    })
}

//根据员工编号修改工资信息
module.exports.modifyPayRTS = (req,res)=>{
    let Zno = req.body.Zno;
    let Pay = req.body.Pay;
    let bonus = req.body.bonus;
    let rts = req.body.rts;
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
            let sqlAdd = `UPDATE Pay_Table SET Pay=${Pay},Bonus=${bonus},RTS=${rts} WHERE Zno=${Zno}`;
            sqlConnect.query(sqlAdd,(err,recordset)=>{
                if(err){
                    return res.wrong(err);
                }
                if(recordset.rowsAffected[0]!==1){
                    return res.wrong('修改工资信息失败');
                }
                res.wrong('修改工资信息成功',0);
            })
        })
    })
}

//根据员工编号查询工资信息
module.exports.selectPayRTS = (req,res)=>{
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
            let sqlSelect = `SELECT Zno,Pay,Bonus,RTS FROM Pay_Table WHERE Pay_Table.Zno=${Zno}`;
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

//根据员工编号删除员工工资信息
module.exports.deletePayRTS = (req,res)=>{
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
            let sqlDelete = `DELETE FROM Pay_Table WHERE Zno=${Zno}`;
            sqlConnect.query(sqlDelete,(err,recordset)=>{
                if(err){
                    return res.wrong(err);
                }
                if(recordset.rowsAffected[0]!==1){
                    return res.wrong('删除工资信息失败');
                }
                res.wrong('删除工资信息成功',0);
            })
        })
    })
}