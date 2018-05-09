import crypto from 'crypto';
const md5 = (password) => {
    const hash = crypto.createHash('md5');
    hash.update('username');
    hash.update(password);
    hash.update('remember');
    hash.update('bsbw');
    // encoding格式 hex
    return hash.digest('hex');
}

export default md5;