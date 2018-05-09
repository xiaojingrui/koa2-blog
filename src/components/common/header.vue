<template>
    <header class="header">

        <h1>bsbw blog</h1>
        <h3>hello world~</h3>
        
        <span class="welcome" v-if="isLogin">欢迎您，{{ loginName }}<span class="signout" @click="signout">&nbsp;&nbsp;退出</span></span>
        <div v-else>
            <a class="login" href="/login">signin</a>
            <a class="register" href="/register">register</a>
        </div>
    </header>
</template>

<script>
import axios from 'axios';
import cookier from '@/api/cookie.js'
export default {
    created () {
        let _this = this;
         // 检查是否登录
        axios.post('api/checkLogin')
        .then( (res) => {
            _this.isLogin = res.data.isLogin;
            _this.loginName = res.data.loginName;
            console.log(_this.isLogin);
        })
        .catch((err) => {
            console.log('err is ', err);            
        })
    },
    data () {
        return {
            isLogin: false,
            loginName: ''
        }
    },
    methods: {
        signout () {
            let ret = confirm('您确认要退出登录？');
            if (ret) {
                window.location = '/login';
            }
            
        }
    }
}
</script>

<style lang="scss">
.header {
    position: relative;
    width: 100%;
    height: 150px;
    /*border-bottom: 3px solid #eee;*/
    h1 {
        text-align: center;
        color: #555;
        font-size: 55px;
        margin: 20px auto;
    }
    h3 {
        text-align: center;
        color: #777;
        font-weight: 400;
        font-style: italic;
    }
    .login,
    .welcome,
    .register {
        position: absolute;
        right: 0;
        top: 0;
    }
    .login {
        right: 70px;
    }
    .signout {
        font-size: 14px;
        color: #333;
        cursor: pointer;
    }
}
</style>

