<template>
    <div>
        <input type="text" v-model="title" class="article-title" placeholder="文章标题">
        <script id="editor" type="text/plain" style="height: 500px;width: 100%;"></script>
        <button @click="saveArticle">提交</button>
        <!-- 上传图片测试 -->
        <!-- <div class="upload-image">
            <form action="/api/uploadImage" enctype="multipart/form-data" method="post">
                <input type="file" name="uploadImage" multiple="multiple"/>
                <button type="submit">upload</button>
            </form>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios';
import getAbstract from '@/api/abstract';
import format from '@/api/format.js'
export default {
    mounted () {
        const _this = this;
        this.editor = this.editor.getEditor('editor');
      
        this.id = window.id;
        if (this.id !== '0') {
            axios.get('./api/getArticleById', {
                params: {
                    id: this.id
                }
            })
            .then((res) => {
                console.log('res = ', res.data.data);
                let data = res.data.data;
                this.editor.addListener("ready", function () {
                    _this.editor.setContent(data.content); // 确保UE加载完成后，放入内容。
                    _this.title = data.title;
                    _this.article = data;
                });
            })
            .catch((err) => {
                console.log('err = ', err);
            })
        }
        
    },
    data () {
        return {
            editor: UE,
            id: '',
            title: '',
            article: '',
            fileContent: ''
        }
    },
    methods: {
        saveArticle () { // 获取内容方法
            let content = this.editor.getContent();
            // console.log('content = ', content);
            // console.log(getAbstract(content));
            let params = {
                id: this.id,
                title: this.title,
                content: content,
                intro: getAbstract(content),
                post_time: this.article || format(new Date(), "yyyy-MM-dd hh:mm:ss"),
                update_time: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
            };
            // console.log('params = ', params);
            axios.post('/api/saveArticle', params)
            .then((res) => {
                console.log('saveRes = ', res);
                if (res.data.success) {
                    alert('保存成功');
                    window.location = "http://localhost:3000/"
                }
            })
            .catch((err) => {
                console.log('saveErr = ', err);
            })
        }
        // uploadImage (e) {
        //     console.log('event = ', e);
        //     let file = e.target.files[0];
        //     console.log('file = ', file);
        //     let param = new FormData();
        //     param.append('file', file, file.name);
        //     console.log('formFile = ', param.get('file'));
        //     let config = {
        //         headers: {
        //             "Content-Type": "multipart/form-data"
        //         }
        //     };
        //     axios.post('/api/uploadImage', param, config)
        //         .then( res => {
        //             console.log('res = ', res);
        //         })
        //         .catch( err => {
        //             console.log('err = ', err);
        //         } )
        // }
    }
}
</script>

<style lang="scss">
.article-title {
    display: block;
    height: 30px;
    width: 100%;
    margin-top: 25px;
    padding-left: 1em;
    // outline: none;
    font-size: 20px;
    font-weight: bold;
}
#editor {
    // margin: 0 auto;
    margin-top: 25px;
}
</style>
