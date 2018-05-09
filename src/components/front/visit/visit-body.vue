<template>
    <div>
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-show" v-html="article.content">
        </div>
        <div class="comment-show">
            <h3>评论列表</h3>
            <ul>
                <li v-for="comment in comments" :key="comment.id">
                    <h4>{{ comment.create_time }} <span>{{comment.commentar}}</span></h4>
                    <div v-html="comment.content"></div>
                </li>
            </ul>
        </div>
        <div class="comment">
            <h3 class="comment-title">发表评论</h3>
            <script id="editor" type="text/plain" style="height: 300px;width: 100%;"></script>
            <button @click="submitComment">提交评论</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import format from '@/api/format.js';
export default {
    mounted () {
        this.editor = this.editor.getEditor('editor');
        this.id = window.id;
        const _this = this;
        // 获取文章
        axios.get('/api/getArticleById', {
            params: {
                id: this.id
            }
        })
        .then((res) => {
            console.log('res = ', res.data.data);
            _this.article = res.data.data;
        })
        .catch((err) => {
            console.log('err = ', err);
        });
        // 获取文章对应评论
        axios.get('/api/getCommentByAid', {
            params: {
                aid: this.id
            }
        })
        .then((res) => {
            console.log('res = ', res.data.data);
            _this.comments = res.data.data;
        })
        .catch((err) => {
            console.log('err = ', err);
        })
    }
    ,
    data () {
        return {
            editor: UE,
            id: '',
            article: '',
            comments: [],

        }
    },
    methods: {
        submitComment () {
            let content = this.editor.getContent();
            let params = {
                aid: id,
                content,
                create_time: format(new Date(), "yyyy-MM-dd hh:mm:ss")
            }
            axios.post('/api/saveComment', params)
            .then((res) => {
                console.log('saveRes = ', res);
                if (res.data.success) {
                    alert('评论成功');
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log('saveErr = ', err);
            })
        }
    }
}
</script>

<style lang="scss">
.article-title {
    // margin-top: 
    margin: 25px 0;
    text-align: center;
}
.article-show {
    padding: 25px;
    border: 1px solid #eee;
}
.comment-show {
    li {
        border-bottom: 1px solid #eee;
    }
}
.comment {
    margin-top: 25px;
}
</style>
