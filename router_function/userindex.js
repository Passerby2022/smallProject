//导入连接数据库的第三方包
const mssql = require('mssql');

//导入连接数据库的配置模块
const config = require('../database/config.js');

module.exports.userindex = (req,res)=>{
    let Zno = req.body.Zno;
    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlStr = `SELECT * FROM Z_Table WHERE Zno=${Zno}`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0]!==1){
                return res.wrong('查询该员工的信息');
            }
            let sqlSelect = `SELECT Z_Table.Zno,Zn,Sex,Age,Phone,Education,
            Bn,B_Table.Bno,Duties,Title,Pay,Bonus,RTS,Subsidy,Deduction,
            Insure,SS,DT,IIT,NS
            FROM Z_Table,B_Table,Pay_Table
            WHERE Z_Table.Bno=B_Table.Bno AND Z_Table.Zno=Pay_Table.Zno AND Z_Table.Zno=${Zno}`;
            sqlConnect.query(sqlSelect,(err,recordset)=>{
                if(err){
                    return res.wrong(err);
                }
                res.send({
                    status:0,
                    message:'查全部询信息成功',
                    data:recordset.recordset
                })
            })
        })
    })
}