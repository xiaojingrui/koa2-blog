const render= require('../utils/render');
const fs = require('fs');

// home主页渲染函数
// const loginPage = async (ctx) => {
//     console.log('------------------------------------ok1');
//     let html = await fs.readFileSync('./dist/login.html', 'utf-8');
//     ctx.body = html;
// }

const loginPage = async (ctx) => {
    
    ctx.cookies.set(
        'USER_SID', 
        '',
        {
            domain: 'localhost',  // 写cookie所在的域名
            path: '/',       // 写cookie所在的路径
            maxAge: -1, // cookie有效时长
            // expires: date.toGMTString(),  // cookie失效时间
            httpOnly: true,  // 是否只用于http请求中获取
            overwrite: true  // 是否允许重写
        }
    );
    console.log('login test......');
    ctx.render('login.pug');
}

module.exports = loginPage;