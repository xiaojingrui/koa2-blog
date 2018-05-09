<template>
    <div class="header-nav">
        <ul class="clearfix">
            <li><a :class="current.home ? 'current' : ''" href="/">home</a></li>
            <li><a :class="current.manage ? 'current' : ''" href="javascript:void(0)" @click="turn('/manage')">manage</a></li>
            <li><a :class="current.write ? 'current' : ''" href="javascript:void(0)" @click="turn('/edit/0')">write</a></li>
            <li><a :class="current.github ? 'current' : ''" href="javascript:void(0)" @click="toGithub">github</a></li>
            <li><a :class="current.about ? 'current' : ''" href="javascript:void(0)">about</a></li>
            <!-- <i class="underline"></i> -->
        </ul>
        <input type="text" class="search" placeholder="Enter to Search" v-model="filterText" @keydown.enter="filterArticle" />
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['current'],
    mounted () {
        let _this = this;
        // 检查是否登录
        axios.post('api/checkLogin')
        .then( (res) => {
            _this.isLogin = res.data.isLogin;
            _this.loginName = res.data.loginName;
        })
        .catch((err) => {
            console.log('err is ', err);            
        })
    },
    data () {
        return {
            filterText: '',
            isLogin: false,
            loginName: ''
        }
    },
    methods: {
        filterArticle () {
            console.log(this.filterText);
            this.$emit('filterChange', this.filterText);
        },
        turn (url) {
             if (this.loginName === 'liyanlei') {
                 if (this.isLogin) {
                    window.location = url;
                } else {
                    window.location = '/login';
                }
             }
        },
        toGithub () {
            window.location = "https://github.com/"
        },
        islogin (){
            console.log(this.isLogin);
        }
    }
}
</script>

<style lang="scss">
.header-nav {
    position: relative;
    width: 100%;
    height: 40px;
    border-top: 3px solid #eee;
    border-bottom: 3px solid #eee;
    line-height: 40px;
    ul {
        float: left;
        li {
            float: left;
            line-height: 40px;
            padding: 0 10px;
            a {
                
                border-bottom: 1px solid #eee;
                font-size: 18px;
                font-weight: 600;
                &.current {
                    border-bottom: 2px solid #999;                
                }
                &:hover {
                    border-bottom: 2px solid #999;
                }
            }
        }
        .underline {
            position: absolute;
            left: 13px;
            bottom: 5px;
            display: block;
            width: 55px;
            // height: 3px;
            border-bottom: 3px solid #999;
        }
    }
    .search {
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;
        width: 200px;
        height: 40px;
        padding: 5px 0 10px;
        float: right;
        outline: none;
        border: none;
        font-size: 18px;
        color: #555;
    }
}
</style>

