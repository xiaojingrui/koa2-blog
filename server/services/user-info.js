const userInfoModel = require('./../models/user-info');

const userInfoService = {
    async getUserInfoByUserNameAndPassword(formData) {
        // console.log('serviceformData = ', formData);
        let resultData = await userInfoModel.getUserInfoByUserNameAndPassword({
            'username': formData.username,
            'password': formData.password
        });
        return resultData;
    },
    async getUserInfoByUserName (formData) {
        console.log('service = ', formData.username);
        let result = await userInfoModel.getUserInfoByUserName(formData.username);
        console.log('serverResult = ', result);
        return result;
    },
    async registerUser (formData) {
        let result = await userInfoModel.registerUser({
            username: formData.username,
            password: formData.password
        });
        if (result.affectedRows === 1)  {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = userInfoService;