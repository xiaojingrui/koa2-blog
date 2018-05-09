const render = async (url) => {
    let html = await fs.readFileSync('../dist/home.html', 'utf-8');
    return html;
}

module.exports = render;