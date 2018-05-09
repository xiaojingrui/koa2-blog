
const visitPage = (ctx) => {
    ctx.render('visit.pug', {
        id: ctx.params['id']
    })
}

module.exports = visitPage;