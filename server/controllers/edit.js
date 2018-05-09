const editPage = (ctx) => {
    ctx.render('edit.pug', {
        id: ctx.params['id']
    });
}

module.exports = editPage;