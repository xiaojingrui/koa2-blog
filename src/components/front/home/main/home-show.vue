<template>
    <div class="show">
        <div class="show-content">
            
            <article class="article" v-for="article in contents.articles" :key="article.id">
                <header class="post-title"><a :href="'/visit/' + article.id">{{ article.title }}</a></header>
                <div class="post-content">
                    <p>摘要 {{ article.intro }}
                        <a class="full-text" :href="'/visit/' + article.id">阅读全文</a>
                    </p>
                </div>
                <footer class="post-desc">
                    <p>posted @ {{ article.post_time }} {{ article.author }} 阅读({{ article.hit_pv }}) 评论({{ article.comment_pv }}) <a class="edit" href="javascript:void(0)" @click="turn('/edit/' + article.id)" v-show="loginName === 'liyanlei'">编辑</a></p>
                </footer>
            </article>
            <div class="pager">
                <span>共{{ contents.max_page }}页</span>
                <a :href="'/?page=' + (contents.page - 1)" @click.prevent="turnPage(contents.page - 1)">上一页</a>
                <a :href="'/?page=' + index" v-for="index in contents.max_page" :key="index" :data-index="index" :class="{current: index == contents.page}" @click.prevent="turnPage(index)">{{ index }}</a>
                <a :href="'/?page=' + (contents.page + 1)" @click.prevent="turnPage(contents.page + 1)">下一页</a>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '@/api/bus.js';
import axios from 'axios';
export default {
    mounted () {
        // console.log(this.content);
        let _this = this;
         // 检查是否登录
        axios.post('api/checkLogin')
        .then( (res) => {
            _this.isLogin = res.data.isLogin;
            _this.loginName = res.data.loginName;
            // console.log(_this.isLogin);
        })
        .catch((err) => {
            console.log('err is ', err);            
        })
    },
    props: ['contents'],
    data () {
        return {
            isLogin: false,
            loginName: ''
        }
    },
    methods: {
        turnPage (page) {
            Bus.$emit('turnPage', page);
        },
        turn (url) {
            if (this.isLogin) {
                window.location = url;
            } else {
                window.location = '/login';
            }
        }
    }
}
</script>

<style lang="scss">
.show {
    // width: 1570px;
    width: 100%;
    float: left;
    margin-right: -250px;
    // background-color: #eee;
    .show-content {
        // height: 500px;  
        margin: 0 250px 0 0;
        .article {
            padding: 25px 25px 0 0;
            border-bottom: 2px solid #eee;
            border-right: 2px solid #eee;
            .post-title {
                a {
                    font-size: 18px;
                    font-weight: bold;
                    color: #000;
                    &:hover {
                        text-decoration: underline;
                    }
                }
                
                
            } 
            .post-content {
                font-size: 14px;
                line-height: 1.5;
            }
            .post-desc {
                text-align: right;
                font-size: 12px;
            }
            .full-text,
            .edit {
                color: #075DB3;
                text-decoration: underline;
            }
        }
        .pager {
            margin: 10px 0;
            padding-right: 25px;
            text-align: right;
            font-size: 12px;
            a {
                margin: 0 2px;
                padding: 2px 5px;
                border: 1px solid #9aafe5;
            }
            .current {
                border: none;
                padding: 0;
            }
        }
    }
}
@media screen and (max-width: 890px){
    .show {
        margin-right: 0;
        .show-content {
            margin-right: 0;
            .article {
                border-right: none;
            }
        }
        
    }
}
</style>
