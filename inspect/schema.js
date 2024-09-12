//导入配置表单验证规则的第三方包joi
const joi = require('joi');

//alphanum()表示只能是字母或者是数字
module.exports.login = {
    //校验req.body中的数据
    body:{
        //用户名的验证规则
        username:joi.string().alphanum().min(1).max(10).required(),
        //密码的验证规则
        password:joi.string().pattern(/^[\S]{6,12}$/).required()
    }
}

module.exports.department = {
    body:{
        //部门编号的验证规则
        Bno:joi.string().alphanum().min(1).max(4).required(),
        //部门名称的验证规则
        Bn:joi.string().min(1).max(10).required()
    }
}

module.exports.selectOrDeleteDepartment = {
    body:{
        //部门名称的验证规则
        Bn:joi.string().min(1).max(10).required()
    }
}

module.exports.modifyDepartment = {
    body:{
        //部门名称的验证规则
        Bn:joi.string().min(1).max(10).required(),
        modifyBno:joi.string().alphanum().min(1).max(4).required(),
        modifyBn:joi.string().min(1).max(10).required()
    }
}

module.exports.addStaff = {
    body:{
        Zn:joi.string().required(),
        Sex:joi.string().required(),
        Age:joi.number().min(1).max(150).required(),
        Phone:joi.string().pattern(/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/).required(),
        Education:joi.string().required(),
        Bno:joi.string().alphanum().min(1).max(4).required(),
        Duties:joi.string().required(),
        Title:joi.string().required()
    }
}

module.exports.modifyStaff = {
    body:{
        Zno:joi.number().required(),
        Zn:joi.string().required(),
        Sex:joi.string().required(),
        Age:joi.number().min(1).max(150).required(),
        Phone:joi.string().pattern(/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/).required(),
        Education:joi.string().required(),
        Bno:joi.string().alphanum().min(1).max(4).required(),
        Duties:joi.string().required(),
        Title:joi.string().required()
    }
}

module.exports.selectDeleteStaff = {
    body:{
        Zno:joi.number().required()
    }
}

module.exports.addModifyPayRTS = {
    body:{
        Zno:joi.number().required(),
        Pay:joi.number().required(),
        bonus:joi.number().required(),
        rts:joi.number().required()
    }
}

module.exports.selectDelectPayRTS = {
    body:{
        Zno:joi.number().required()
    }
}

module.exports.addModifyPaySS = {
    body:{
        Zno:joi.number().required(),
        Subsidy:joi.number().required(),
        Deduction:joi.number().required(),
        Insure:joi.number().required(),
        ss:joi.number().required()
    }
}

module.exports.addModifyPayNS = {
    body:{
        Zno:joi.number().required(),
        dt:joi.number().required(),
        iit:joi.number().required(),
        ns:joi.number().required()
    }
}

module.exports.userChangePSW = {
    body:{
        username:joi.string().alphanum().min(1).max(10).required(),
        oldPassword:joi.string().pattern(/^[\S]{6,12}$/).required(),
        newPassword:joi.not(joi.ref('oldPassword')).concat(joi.string().pattern(/^[\S]{6,12}$/).required())
    }
}