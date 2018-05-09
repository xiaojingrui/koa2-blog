const removeTag = (html) => {
    let reg = /<[^>]+>/g;
    return html.replace(reg, '');
}

const getAbstract = (html) => {
    // console.log('html = ', html);
    let text = removeTag(html);
    // if (text.length <= 300) {
    //     return text;
    // }
    return text.substr(0, 300);
}

export default getAbstract;
