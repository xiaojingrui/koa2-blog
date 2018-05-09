
const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

const clearCookie = (name) => {  
    setCookie(name, "", -1);  
}

export default {
    clearCookie,
    setCookie
}