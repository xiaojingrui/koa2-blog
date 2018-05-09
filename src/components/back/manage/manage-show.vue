<template>
    <div class="show">
        <div class="show-content">
            <table class="post-list">
                <tbody>
                    <tr>
                        <th class="post-title">标题</th>
                        <th class="post-status">发布状态</th>
                        <th>评论数</th>
                        <th>阅读数</th>
                        <th>操作</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="article in contents.articles" :key="article.id">
                        <td class="post-title"><a :href="'/visit/' + article.id">{{ article.title }}</a></td>
                        <td>发布</td>
                        <td>{{ article.comment_pv }}</td>
                        <td>{{ article.hit_pv }}</td>
                        <td>
                            <a :href="'edit/' + article.id" @click="editArticle(article.id, article.title)">编辑</a>
                        </td>
                        <td>
                            <a href="javascript:void(0)" @click.prevent="deleteArticle(article.id, article.title)">删除</a>
                        </td>
                    </tr>
                </tbody>
            </table>
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
export default {
    mounted () {
        console.log(this.content);
    },
    props: ['contents'],
    data () {
        return {
            // currentPage: contents.page
        }
    },
    methods: {
        turnPage (page) {
            Bus.$emit('turnPage', page);
        },
        deleteArticle (id, title) {
            // alert(1);
            let ret = confirm(`确认要删除标题为'${title}'的文章?`);
            if (ret) {
                Bus.$emit('deleteArticle', id);
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
        .post-list {
            width: 100%;
            margin-top: 25px;
            border-right: 1px solid #eee;
            border-collapse: collapse;
            /*border: 0;*/
            tr {
                /*display: block;*/
                /*border-bottom: 1px solid #6b86b3;*/
                font-size: 14px;
                a {
                    color: #23527c;
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline;
                    }
                }
                .post-title {
                    width: auto;
                    padding-left: 5px;
                    text-align: left;
                }
                .post-status {
                    width: 70px;
                }
                th {
                    font-weight: bold;
                    border-bottom: 1px solid #6b86b3;
                    width: 50px;
                    text-align: center; 
                }
                td {
                    padding: 5px;
                    text-align: center;
                    border-bottom: 1px solid #e6e6e6;
                    height: 22px;
                }
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
