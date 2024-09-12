//导入连接数据库的第三方包
const mssql = require('mssql');

//导入连接数据库的配置模块
const config = require('../database/config.js');

//添加部门信息的处理函数
module.exports.addDepartment = (req,res)=>{
    //接收客户端提交的部门编号和部门名称
    let Bno = req.body.Bno;
    let Bn = req.body.Bn;
    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        //通过部门名称判断是否已经存在该部门
        let sqlBn = `SELECT Bn FROM B_Table WHERE Bn='${Bn}'`;
        sqlConnect.query(sqlBn,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0]===1){
                return res.wrong('该部门已存在');
            }
            //通过部门编号判断是否已经存在该部门
            let sqlBno = `SELECT Bn FROM B_Table WHERE Bn='${Bno}'`;
            sqlConnect.query(sqlBno,(err,recordset)=>{
                if(err){
                    return res.wrong(err);
                }
                if(recordset.rowsAffected[0]===1){
                    return res.wrong('该部门已存在');
                }
                //若该部门不存在则添加
                let sqlAdd = `INSERT INTO B_Table(Bno,Bn) VALUES('${Bno}','${Bn}')`;
                sqlConnect.query(sqlAdd,(err,recordset)=>{
                    if(err){
                        return res.wrong(err);
                    }
                    if(recordset.rowsAffected[0]!==1){
                        return res.wrong('添加部门信息失败');
                    }
                    
                    res.wrong('添加部门信息成功',0);
                })
            })
        })
    })
}

//渲染部门信息的处理函数
module.exports.rederingDepartment = (req,res)=>{
    mssql.connect(config,(err)=>{
        if(err){
            res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlSelect = 'SELECT * FROM B_Table';
        sqlConnect.query(sqlSelect,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0] < 0){
                return res.wrong('部门信息渲染失败');
            }
            res.send({
                status:0,
                message:'渲染部门信息成功',
                data:recordset.recordset
            });
        })
    })
}

//修改部门信息的处理函数
module.exports.modifyDepartment = (req,res)=>{
    let Bn = req.body.Bn;
    let modifyBno = req.body.modifyBno;
    let modifyBn = req.body.modifyBn;

    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlStr = `SELECT * FROM B_Table WHERE Bn='${Bn}'`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0]!==1){
                return res.wrong('该部门不存在');
            }
            let sqlModify = `UPDATE B_Table SET Bno='${modifyBno}',Bn='${modifyBn}' WHERE Bn='${Bn}'`;
            sqlConnect.query(sqlModify,(err,recordset)=>{
                if(err){
                    return res.wrong(err);
                }
                if(recordset.rowsAffected[0]!==1){
                    return res.wrong('修改部门信息失败');
                }
                res.wrong('修改部门信息成功',0);
            })
        })
    })
}

//根据部门名称查询部门信息的处理函数
module.exports.selectDepartment = (req,res)=>{
    //接收客户端提交的部门名称
    let Bn = req.body.Bn;
    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlStr = `SELECT * FROM B_Table WHERE Bn='${Bn}'`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0]!==1){ 
                return res.wrong('查询不到该部门信息');
            }
            let sqlSelect = `SELECT B_Table.Bno,Bn,Z_Table.Zno,Zn,Sex,Age,Phone,Education,
            Duties,Title,Pay,Bonus,RTS,Subsidy,Deduction,
            Insure,SS,DT,IIT,NS
            FROM Z_Table,B_Table,Pay_Table
            WHERE Z_Table.Bno=B_Table.Bno AND Z_Table.Zno=Pay_Table.Zno AND B_Table.Bn='${Bn}'`;
            sqlConnect.query(sqlSelect,(err,recordset)=>{
                if(err){
                    return res.wrong(err);
                }
                if(recordset.rowsAffected[0] < 0){
                    return res.wrong('部门信息查询失败');
                }
                res.send({
                    status:0,
                    message:'查询部门信息成功',
                    data:recordset.recordset
                });
            })
        })
    })
}

//根据部门名称删除部门信息的处理函数
module.exports.deleteDepartment = (req,res)=>{
    //接收客户端提交的部门名称
    let Bn = req.body.Bn;
    mssql.connect(config,(err)=>{
        if(err){
            return res.wrong(err);
        }
        const sqlConnect = new mssql.Request();
        let sqlStr = `DELETE FROM B_Table WHERE Bn='${Bn}'`;
        sqlConnect.query(sqlStr,(err,recordset)=>{
            if(err){
                return res.wrong(err);
            }
            if(recordset.rowsAffected[0]!==1){
                return res.wrong('删除部门信息失败');
            }
            res.wrong('删除部门信息成功',0);
        })
    })
}