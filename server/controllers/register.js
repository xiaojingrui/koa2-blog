const render= require('../utils/render');
const fs = require('fs');


const registerPage = async (ctx) => { 
    // ctx.cookies.set(
    //     'USER_SID', 
    //     '',
    //     {
    //         domain: 'localhost',  // 写cookie所在的域名
    //         path: '/',       // 写cookie所在的路径
    //         maxAge: -1, // cookie有效时长
    //         // expires: date.toGMTString(),  // cookie失效时间
    //         httpOnly: true,  // 是否只用于http请求中获取
    //         overwrite: true  // 是否允许重写
    //     }
    // );
    // console.log('login test......');
    ctx.render('register.pug');
}

module.exports = registerPage;