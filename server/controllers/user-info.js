const userInfoService = require('./../services/user-info');
const codes = require('../codes/user-info.js');

// 与user相关的数据接口处理函数
const signIn = async (ctx) => {

    let formData = ctx.request.body;
    let result = {
        success: false,
        message: '',
        data: {},
        code: ''
    }
    // if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
    //     // ctx.body = 'login success';
    //     result.success = true;
    // } 




    // 数据库查询
    let userResult = await userInfoService.getUserInfoByUserName(formData);
    console.log('userResult = ', userResult);
    // 检查+设置code
    if (userResult) {
        if (formData.password === userResult.password) {
            result.success = true;
            result.data.username = userResult.username;
        } else {
            result.message = codes.FAIL_PASSWORD_ERROR;
            result.code = codes.FAIL_PASSWORD_ERROR;
        }
    } else {
        result.message = codes.FAIL_USER_NO_EXIST;
        result.code = codes.FAIL_USER_NO_EXIST;
    }
    // 设置session_id
    if (result.success === true) {
        let session = ctx.session;
        session.isLogin = true;
        session.userName = userResult.username;
        session.userId = userResult.id;
    }

    // console.log(result);
    ctx.body = result; 
    // ctx.redirect('/');  
}

const checkLogin = (ctx) => {
    let result = {
        isLogin: false,
        loginName: ''
    }
    console.log('session = ', ctx.session);
    if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
        result.isLogin = true; 
        result.loginName = ctx.session.userName;
    }
    ctx.body = result;
}

const registerUser = async (ctx) => {
    let formData = ctx.request.body;
    // console.log('formData = ', formData);
    let result = {
        success: false,
        message: '',
        data: ''
    };
    let retData = await userInfoService.registerUser(formData);
    if (retData) {
        result.success = true;
        result.message = '注册成功';
    } else {
        result.message = '注册失败';
    }
    ctx.body = result;
}  

module.exports = {
    signIn,
    checkLogin,
    registerUser
}