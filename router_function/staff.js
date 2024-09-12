//导入连接数据库的第三方包
const mssql = require('mssql');

//导入连接数据库的配置模块
const config = require('../database/config.js');

//添加员工信息模块
module.exports.addStaff = (req,res)=>{
    //接收客户端提交的员工编号，员工名字，性别，年龄，学历，电话号码，职位，职称;
    let Zn = req.body.Zn;
    let Sex = req.body.Sex;
    let Age = req.body.Age;
    let Phone = req.body.Phone;
    let Education = req.body.Education;
    let Bno = req.body.Bno;
    let Duties = req.body.Duties;
    let Title = req.body.Title;

    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlAdd = `INSERT INTO Z_Table(Zn,Sex,Age,Phone,Education,Bno,Duties,Title)
        VALUES('${Zn}','${Sex}','${Age}','${Phone}','${Education}','${Bno}','${Duties}','${Title}')`;
        sqlConnect.query(sqlAdd,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0]!==1){
                return res.wrong('添加员工信息失败');
            }
            res.wrong('添加员工信息成功',0);
        })
    })
}

//渲染员工信息模块
module.exports.rederingStaff = (req,res)=>{
    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlStr = `SELECT * FROM Z_Table`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0] < 0){
                return res.wrong('员工信息渲染失败');
            }
            res.send({
                status:0,
                message:'渲染员工信息成功',
                data:recordset.recordset
            })
        })
    })
}

//根据员工号修改员工信息模块
module.exports.modifyStaff = (req,res)=>{
    mssql.connect(config,(err)=>{
        let Zno = req.body.Zno;
        let Zn = req.body.Zn;
        let Sex = req.body.Sex;
        let Age = req.body.Age;
        let Phone = req.body.Phone;
        let Education = req.body.Education;
        let Bno = req.body.Bno;
        let Duties = req.body.Duties;
        let Title = req.body.Title;

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
                return res.wrong('查询不到该员工的信息');
            }
            let sqlChange = `UPDATE Z_Table SET
            Zn='${Zn}',Sex='${Sex}',Age='${Age}',Phone='${Phone}',Education='${Education}'
            ,Bno='${Bno}',Duties='${Duties}',Title='${Title}'
            WHERE Zno=${Zno}`;
            sqlConnect.query(sqlChange,(err,recordset)=>{
                if(err){
                    return res.wrong(err);
                }
                if(recordset.rowsAffected[0]!==1){
                    return res.wrong('修改员工信息失败');
                }
                res.wrong('修改员工信息成功',0);
            })
        })
    })
}

//根据员工编号查询员工信息
module.exports.selectStaff = (req,res)=>{
    mssql.connect(config,(err)=>{
        let Zno = req.body.Zno;
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
                return res.wrong('查询不到该员工的信息');
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
                    message:'查询员工信息成功',
                    data:recordset.recordset
                })
            })
        })
    })
}

//根据员工编号删除员工信息
module.exports.deleteStaff = (req,res)=>{
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
                return res.wrong('查询不到该员工的信息');
            }
            let sqlDelete = `DELETE FROM Z_Table WHERE Zno=${Zno}`;
            sqlConnect.query(sqlDelete,(err,recordset)=>{
                if(err){
                    return res.wrong(err);
                }
                if(recordset.rowsAffected[0]!==1){
                    return res.wrong('删除该员工信息失败');
                }
                res.wrong('删除员工信息成功',0);
            })
        })
    })
}