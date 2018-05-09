const render= require('../utils/render');
const fs = require('fs');
// home主页渲染函数
// const indexPage = async (ctx) => {
//     // console.log('------------------------------indexPage');
//     let html = await fs.readFileSync('./dist/home.html', 'utf-8');
//     // if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
//     //     ctx.body - html;
//     // } else {
//     //     ctx.redirect('/login');
//     // }
//     // ctx.end('../dist/index.html');
    
//     ctx.body = html;
// }

const indexPage = async (ctx) => {
    await ctx.render('home.pug', {
        title: 'home page'
    })
}
module.exports = indexPage;